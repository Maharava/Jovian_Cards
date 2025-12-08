import { create } from 'zustand';
import type { GameState, Card, UnitInstance, PlayerState, EnemyState } from '../types';
import { ENEMY_CARDS } from '../data/cards';

// Simple ID generator since we don't have uuid installed yet
const generateId = () => Math.random().toString(36).substr(2, 9);

interface GameActions {
  startGame: (playerDeck: Card[]) => void;
  drawCard: (count?: number) => void;
  playUnit: (card: Card) => void;
  endPlayerTurn: () => void;
  enemyAction: () => void; // Placeholder for AI execution
  damageUnit: (unitId: string, amount: number) => void;
  damagePlayer: (amount: number) => void;
  damageEnemy: (amount: number) => void;
  attackTarget: (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => void;
  closeScout: () => void;
}

const INITIAL_PLAYER_STATE: PlayerState = {
  hp: 30, maxHp: 30,
  energy: 3, maxEnergy: 3,
  deck: [], hand: [], board: [], graveyard: [],
  credits: 0, parts: 0
};

const INITIAL_ENEMY_STATE: EnemyState = {
  hp: 30, maxHp: 30,
  energy: 3, maxEnergy: 3,
  deck: [], board: [],
  nextMoveDescription: 'Thinking...'
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  player: INITIAL_PLAYER_STATE,
  enemy: INITIAL_ENEMY_STATE,
  turn: 1,
  phase: 'player_turn',
  run: { node: 1, difficulty: 1 },

  startGame: (playerDeck: Card[]) => {
    // Shuffle deck
    const shuffledDeck = [...playerDeck].sort(() => Math.random() - 0.5);
    set({
      player: { ...INITIAL_PLAYER_STATE, deck: shuffledDeck },
      enemy: { ...INITIAL_ENEMY_STATE, board: [] }, 
      turn: 1,
      phase: 'player_turn'
    });
    get().drawCard(3); // Initial hand
  },

  drawCard: (count = 1) => {
    set((state) => {
      const { deck, hand } = state.player;
      // ... (existing logic)
      if (deck.length === 0) return state; 
      const newHand = [...hand];
      const newDeck = [...deck];
      for (let i = 0; i < count; i++) {
        if (newDeck.length > 0) {
          const card = newDeck.shift()!;
          if (newHand.length < 10) newHand.push(card);
        }
      }
      return { player: { ...state.player, hand: newHand, deck: newDeck } };
    });
  },

  playUnit: (card: Card) => {
    set((state) => {
      if (state.player.energy < card.cost) return state;
      if (state.player.board.length >= 5) return state;

      // Create Unit Instance
      const newUnit: UnitInstance = {
        uid: generateId(),
        cardId: card.id,
        name: card.name,
        baseAsset: card.baseAsset,
        atk: card.stats?.atk || 0,
        hp: card.stats?.hp || 1,
        maxHp: card.stats?.hp || 1,
        owner: 'player',
        ready: card.mechanics?.includes('rush') || false,
        attacksLeft: card.mechanics?.includes('rush') ? (card.mechanics?.includes('windfury') ? 2 : 1) : 0,
        mechanics: card.mechanics || [],
        shield: 0
      };
      
      let extraUnits: UnitInstance[] = [];
      let scoutedCard: Card | null = null;

      // --- ABILITY LOGIC ---
      
      // 1. PRAXIDIKE (Summon)
      if (card.mechanics?.includes('summon')) {
           // Basic logic: Check if name/id contains Praxidike or check mechanic
           // For now, hardcode based on tier since mechanics string is generic 'summon'
           // Or just summon 1 hologram for now as proof of concept
           // Real logic should parse card data or use separate ability lookup
           if (state.player.board.length < 4) { // Need space
               const hologram: UnitInstance = {
                   uid: generateId(), cardId: 'hologram', name: 'Hologram', baseAsset: 'praxidike', // Re-use asset for now
                   atk: 0, hp: 2, maxHp: 2, owner: 'player', ready: false, attacksLeft: 0, mechanics: ['guard'], shield: 0
               };
               extraUnits.push(hologram);
           }
      }

      // 2. ELARA (Scout)
      if (card.mechanics?.includes('scout')) {
          // Pick a random real enemy card to reveal
          const randomEnemyCard = ENEMY_CARDS[Math.floor(Math.random() * ENEMY_CARDS.length)];
          scoutedCard = { ...randomEnemyCard, id: `scout_${Date.now()}` };
      }

      // 3. LYSITHEA (Glitch)
      // Glitch is passive (handled in attack) or on-play effect?
      // "50% chance to attack random target" is an attack replacement.
      // So no on-play logic needed unless it triggers something else.
      
      const newHand = state.player.hand.filter(c => c !== card);
      
      return {
        scoutedCard: scoutedCard, // Update global state
        player: {
          ...state.player,
          energy: state.player.energy - card.cost,
          hand: newHand,
          board: [...state.player.board, newUnit, ...extraUnits]
        }
      };
    });
  },

  closeScout: () => set({ scoutedCard: null }),

  endPlayerTurn: () => {
    // RESOLVE TURN END EFFECTS (Support/Repair)
    set((state) => {
        let playerBoard = [...state.player.board];
        
        playerBoard = playerBoard.map(unit => {
            let u = { ...unit };
            // Repair
            if (u.mechanics.includes('repair')) {
                u.hp = Math.min(u.maxHp, u.hp + 1);
            }
            return u;
        });

        // Support (Buff Random Ally) - specifically Io's mechanic "TurnEnd: Give random ally +1 ATK"
        playerBoard.forEach(unit => {
             if (unit.mechanics.includes('support')) {
                 // Pick random other ally
                 const targets = playerBoard.filter(t => t.uid !== unit.uid);
                 if (targets.length > 0) {
                     const target = targets[Math.floor(Math.random() * targets.length)];
                     target.atk += 1;
                     // If Tier 2/3 it might be +1/+1 or multi-target. 
                     if (unit.name.includes('Technomancer') || unit.name.includes('Architect')) {
                         target.hp += 1;
                         target.maxHp += 1;
                     }
                 }
             }
        });

        return { player: { ...state.player, board: playerBoard }, phase: 'enemy_turn' };
    });
  },

  enemyAction: () => {
    set((state) => {
      let enemy = { ...state.enemy };
      let player = { ...state.player };
      
      // 1. Ready all enemy units
      enemy.board = enemy.board.map(u => ({ ...u, ready: true, attacksLeft: 1 }));

      // 2. Spawn New Units
      const spawnSlots = 5 - enemy.board.length;
      if (spawnSlots > 0) {
          const spawnCount = Math.min(spawnSlots, Math.floor(Math.random() * 3) + 1);
          for(let i=0; i<spawnCount; i++) {
              const spawnType = Math.random() > 0.6 ? 'drone' : 'bot'; 
              const newUnit: UnitInstance = {
                uid: generateId(),
                cardId: spawnType,
                name: spawnType === 'drone' ? 'Mining Drone' : 'Security Bot',
                baseAsset: spawnType === 'drone' ? 'enemy_drone' : 'enemy_bot',
                atk: spawnType === 'drone' ? 1 : 2,
                hp: spawnType === 'drone' ? 2 : 3,
                maxHp: spawnType === 'drone' ? 2 : 3,
                owner: 'enemy',
                ready: false,
                attacksLeft: 0,
                mechanics: spawnType === 'bot' ? ['guard'] : [],
                shield: 0
              };
              enemy.board.push(newUnit);
          }
      }

      // 3. Attack Logic (Iterative to support Windfury/Multi-attacks)
      // We loop as long as there is at least one unit with attacksLeft > 0
      let active = true;
      let sanityCheck = 0;
      
      while (active && sanityCheck < 20) {
          active = false;
          sanityCheck++;

          // Find an attacker with attacks left
          // Note: We prioritize units in order. 
          for (let i = 0; i < enemy.board.length; i++) {
              const attacker = enemy.board[i];
              if (attacker.ready && attacker.attacksLeft > 0) {
                  active = true; // Found one, so we continue loop after this attack
                  
                  // Find valid targets (LIVING Player Units)
                  // Crucial Fix: filter for hp > 0 to avoid beating a dead horse
                  const guards = player.board.filter(u => u.mechanics.includes('guard') && u.hp > 0);
                  let target: UnitInstance | null = null;
                  let targetType: 'unit' | 'player' = 'player';

                  if (guards.length > 0) {
                      target = guards[0];
                      targetType = 'unit';
                  } else if (player.board.filter(u => u.hp > 0).length > 0) {
                       if (Math.random() > 0.3) {
                           // Pick random LIVING target
                           const livingUnits = player.board.filter(u => u.hp > 0);
                           target = livingUnits[Math.floor(Math.random() * livingUnits.length)];
                           targetType = 'unit';
                       }
                  }

                  if (targetType === 'unit' && target) {
                      // Combat Math
                      target.hp -= attacker.atk;
                      attacker.hp -= target.atk;
                      
                      // Update Target in Player Board
                      const tIndex = player.board.findIndex(u => u.uid === target!.uid);
                      if (tIndex !== -1) player.board[tIndex] = target;
                  } else {
                      // Face
                      player.hp -= attacker.atk;
                  }

                  // Lifesteal (Enemy)
                  if (attacker.mechanics.includes('lifesteal')) {
                      enemy.hp = Math.min(enemy.maxHp, enemy.hp + attacker.atk);
                  }

                  // Decrement Attack
                  attacker.attacksLeft -= 1;
                  enemy.board[i] = attacker; // Update attacker state

                  // If attacker died from recoil, stop using it
                  if (attacker.hp <= 0) break;
              }
          }
          
          // Cleanup Deaths immediately so next attacker doesn't target dead units
          player.board = player.board.filter(u => u.hp > 0);
          enemy.board = enemy.board.filter(u => u.hp > 0);
      }

      // 4. Pass Turn
      player.board = player.board.map(u => ({ 
          ...u, 
          ready: true, 
          attacksLeft: u.mechanics.includes('windfury') ? 2 : 1 
      }));
      const newMaxEnergy = Math.min(10, player.maxEnergy + 1);

      return {
          enemy,
          player: {
              ...player,
              maxEnergy: newMaxEnergy,
              energy: newMaxEnergy
          },
          phase: 'player_turn',
          turn: state.turn + 1
      };
    });
    
    get().drawCard(1);
  },
  
  damageUnit: (unitId: string, amount: number) => {
    set((state) => {
        // Search both boards
        let targetList = 'player';
        let board = state.player.board;
        let index = board.findIndex(u => u.uid === unitId);
        
        if (index === -1) {
            targetList = 'enemy';
            board = state.enemy.board;
            index = board.findIndex(u => u.uid === unitId);
        }

        if (index === -1) return state;

        const unit = { ...board[index] };
        unit.hp -= amount;

        const newBoard = [...board];
        if (unit.hp <= 0) {
            newBoard.splice(index, 1); // Death
        } else {
            newBoard[index] = unit;
        }

        if (targetList === 'player') {
            return { player: { ...state.player, board: newBoard } };
        } else {
            return { enemy: { ...state.enemy, board: newBoard } };
        }
    });
  },

  damagePlayer: (amount: number) => {
      set(state => ({ player: { ...state.player, hp: state.player.hp - amount } }));
  },

  damageEnemy: (amount: number) => {
      set(state => ({ enemy: { ...state.enemy, hp: state.enemy.hp - amount } }));
  },

  attackTarget: (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => {
      set((state) => {
          // 1. Get Attacker
          const attackerIndex = state.player.board.findIndex(u => u.uid === attackerUid);
          if (attackerIndex === -1) return state;
          const attacker = { ...state.player.board[attackerIndex] };
          
          if (!attacker.ready) return state; // Should be handled by UI too

          // 2. Resolve Combat
          let newEnemyBoard = [...state.enemy.board];
          let newPlayerBoard = [...state.player.board];
          let newEnemyHp = state.enemy.hp;
          
          // Check Guard
          const guards = newEnemyBoard.filter(u => u.mechanics.includes('guard'));
          
          // --- GLITCH MECHANIC (Lysithea) ---
          let finalTargetType = targetType;
          let finalTargetUid = targetUid;

          if (attacker.mechanics.includes('glitch') && Math.random() > 0.5) {
             // 50% chance to redirect
             // Simple random pick from all units + 2 commanders? 
             // Let's keep it simple: random enemy unit or face
             if (Math.random() > 0.3 && newEnemyBoard.length > 0) {
                 finalTargetType = 'unit';
                 const randomUnit = newEnemyBoard[Math.floor(Math.random() * newEnemyBoard.length)];
                 finalTargetUid = randomUnit.uid;
                 // Bypass guard if glitched? Yes, chaos.
             } else {
                 finalTargetType = 'enemy';
             }
             // Could also hit self/ally, but let's stick to "unreliable targeting" vs enemies for now to avoid frustration
          }
          // ----------------------------------

          if (guards.length > 0 && !attacker.mechanics.includes('snipe') && !attacker.mechanics.includes('glitch')) {
              // If target is not a guard and guards exist, prevent attack (unless sniper mechanics - omitted for brevity)
              if (finalTargetType === 'enemy' || (finalTargetType === 'unit' && !guards.find(g => g.uid === finalTargetUid))) {
                   // Only allow if sniper. For now, strict block.
                   // Returning state means action failed. 
                   // Ideally we throw error or return failure, but here we just no-op.
                   return state;
              }
          }

          if (finalTargetType === 'enemy') {
              // Attack Face
              newEnemyHp -= attacker.atk;
              // Player Lifesteal
              if (attacker.mechanics.includes('lifesteal')) {
                   state.player.hp = Math.min(state.player.maxHp, state.player.hp + attacker.atk);
              }
          } else if (targetType === 'unit' && targetUid) {
              // Attack Unit
              const targetIndex = newEnemyBoard.findIndex(u => u.uid === targetUid);
              if (targetIndex === -1) return state;
              
              const target = { ...newEnemyBoard[targetIndex] };
              
              // Damage Exchange
              target.hp -= attacker.atk;
              attacker.hp -= target.atk;
              
              // Player Lifesteal
              if (attacker.mechanics.includes('lifesteal')) {
                   state.player.hp = Math.min(state.player.maxHp, state.player.hp + attacker.atk);
              }

              // Update Target
              if (target.hp <= 0) {
                  newEnemyBoard.splice(targetIndex, 1);
              } else {
                  newEnemyBoard[targetIndex] = target;
              }
          }

          // Update Attacker (Retaliation damage or Exhaust)
          attacker.attacksLeft = Math.max(0, attacker.attacksLeft - 1);
          if (attacker.attacksLeft === 0) {
              attacker.ready = false; 
          }
          
          if (attacker.hp <= 0) {
              newPlayerBoard.splice(attackerIndex, 1);
          } else {
              newPlayerBoard[attackerIndex] = attacker;
          }

          return {
              player: { ...state.player, board: newPlayerBoard },
              enemy: { ...state.enemy, hp: newEnemyHp, board: newEnemyBoard }
          };
      });
  },

}));
