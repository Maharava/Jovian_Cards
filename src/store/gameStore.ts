import { create } from 'zustand';
import type { GameState, Card, UnitInstance, PlayerState, EnemyState } from '../types';

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
     // ... (existing logic)
     set((state) => {
      if (state.player.energy < card.cost) return state;
      if (state.player.board.length >= 5) return state;
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
        mechanics: card.mechanics || [],
        shield: 0
      };
      const newHand = state.player.hand.filter(c => c !== card);
      return {
        player: {
          ...state.player,
          energy: state.player.energy - card.cost,
          hand: newHand,
          board: [...state.player.board, newUnit]
        }
      };
    });
  },

  endPlayerTurn: () => {
    set({ phase: 'enemy_turn' });
    // AI triggered by component effect
  },

  enemyAction: () => {
    set((state) => {
      let enemy = { ...state.enemy };
      let player = { ...state.player };
      
      // 1. Ready all enemy units (remove summon sickness)
      enemy.board = enemy.board.map(u => ({ ...u, ready: true }));

      // 2. Spawn New Unit (Simulate playing cards)
      // Simple logic: 50% chance to spawn a drone or bot
      if (enemy.board.length < 5) {
          const spawnType = Math.random() > 0.5 ? 'drone' : 'bot';
          const newUnit: UnitInstance = {
            uid: generateId(),
            cardId: spawnType,
            name: spawnType === 'drone' ? 'Mining Drone' : 'Security Bot',
            baseAsset: spawnType === 'drone' ? 'enemy_drone' : 'enemy_bot',
            atk: spawnType === 'drone' ? 1 : 2,
            hp: spawnType === 'drone' ? 2 : 3,
            maxHp: spawnType === 'drone' ? 2 : 3,
            owner: 'enemy',
            ready: false, // Summon sickness
            mechanics: spawnType === 'bot' ? ['guard'] : [],
            shield: 0
          };
          enemy.board = [...enemy.board, newUnit];
      }

      // 3. Attack with all ready units
      // AI Priority: Kill Low HP Units -> Face
      // Guard Logic: Must attack guards first
      enemy.board.forEach(attacker => {
          if (!attacker.ready) return;

          // Find valid targets (Player Units)
          const guards = player.board.filter(u => u.mechanics.includes('guard'));
          let target: UnitInstance | null = null;
          let targetType: 'unit' | 'player' = 'player';

          if (guards.length > 0) {
              target = guards[0]; // Attack first guard
              targetType = 'unit';
          } else if (player.board.length > 0) {
               // Randomly attack unit or face? Let's say 50/50 if no guard
               if (Math.random() > 0.3) {
                   target = player.board[0];
                   targetType = 'unit';
               }
          }

          if (targetType === 'unit' && target) {
              // Combat Math
              target.hp -= attacker.atk;
              attacker.hp -= target.atk;
              
              // Update Target in temp array (need to reflect in real array)
              const tIndex = player.board.findIndex(u => u.uid === target!.uid);
              if (tIndex !== -1) player.board[tIndex] = target;
          } else {
              // Face
              player.hp -= attacker.atk;
          }
      });

      // Cleanup Deaths
      player.board = player.board.filter(u => u.hp > 0);
      enemy.board = enemy.board.filter(u => u.hp > 0);

      // 4. Pass Turn
      // Ready Player Units
      player.board = player.board.map(u => ({ ...u, ready: true }));
      // Refill Player Energy
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
    
    // Draw for player
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
          if (guards.length > 0) {
              // If target is not a guard and guards exist, prevent attack (unless sniper mechanics - omitted for brevity)
              if (targetType === 'enemy' || (targetType === 'unit' && !guards.find(g => g.uid === targetUid))) {
                   // Only allow if sniper. For now, strict block.
                   // Returning state means action failed. 
                   // Ideally we throw error or return failure, but here we just no-op.
                   return state;
              }
          }

          if (targetType === 'enemy') {
              // Attack Face
              newEnemyHp -= attacker.atk;
          } else if (targetType === 'unit' && targetUid) {
              // Attack Unit
              const targetIndex = newEnemyBoard.findIndex(u => u.uid === targetUid);
              if (targetIndex === -1) return state;
              
              const target = { ...newEnemyBoard[targetIndex] };
              
              // Damage Exchange
              target.hp -= attacker.atk;
              attacker.hp -= target.atk;

              // Update Target
              if (target.hp <= 0) {
                  newEnemyBoard.splice(targetIndex, 1);
              } else {
                  newEnemyBoard[targetIndex] = target;
              }
          }

          // Update Attacker (Retaliation damage or Exhaust)
          attacker.ready = false; // Exhaust
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
