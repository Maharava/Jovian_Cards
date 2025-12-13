import { create } from 'zustand';
import type { GameState, Card, UnitInstance, PlayerState, EnemyState } from '../types';
import { ENEMY_CARDS, HERO_CARDS, TACTIC_CARDS, ALL_CARDS } from '../data/cards';
import { MechanicHandler } from '../logic/mechanics';
import { useMetaStore } from './metaStore';
import { MAX_BOARD_SLOTS, DEFAULT_PLAYER_HP, DEFAULT_ENERGY, MAX_ENERGY_CAP, DELAYS } from '../config/constants';
import { generateId, calculateLoot } from '../lib/utils';
import { AI } from '../logic/AI';

export interface GameActions {
  startGame: (playerDeck?: Card[]) => void;
  enterFactionSelect: () => void;
  enterHangar: () => void;
  goToMainMenu: () => void;
  startBattle: (faction: string, difficulty: number) => void;
  drawCard: (count?: number) => void;
  playUnit: (card: Card, targetUid?: string) => Promise<void>; 
  playTactic: (card: Card, targetUid?: string) => Promise<void>;
  endPlayerTurn: () => void;
  enemyAction: () => void;
  damageUnit: (unitId: string, amount: number) => void;
  damagePlayer: (amount: number) => void;
  damageEnemy: (amount: number) => void;
  attackTarget: (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => void;
  closeScout: () => void;
  cleanDeadUnits: () => Promise<void>;
  startPlayerTurn: () => Promise<void>;
}

const INITIAL_PLAYER_STATE: PlayerState = {
  hp: DEFAULT_PLAYER_HP, maxHp: DEFAULT_PLAYER_HP,
  energy: DEFAULT_ENERGY, maxEnergy: DEFAULT_ENERGY,
  deck: [], hand: [], board: [], graveyard: []
};

const INITIAL_ENEMY_STATE: EnemyState = {
  hp: DEFAULT_PLAYER_HP, maxHp: DEFAULT_PLAYER_HP,
  energy: DEFAULT_ENERGY, maxEnergy: DEFAULT_ENERGY,
  deck: [], hand: [], board: [], graveyard: [],
  nextMoveDescription: 'Thinking...'
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  player: INITIAL_PLAYER_STATE,
  enemy: INITIAL_ENEMY_STATE,
  turn: 1,
  phase: 'main_menu',
  run: { node: 1, difficulty: 1 },
  eventQueue: [],
  isProcessingQueue: false,

  startGame: (playerDeck?: Card[]) => {
    let deckToUse = playerDeck;
    if (!deckToUse || deckToUse.length === 0) {
        try {
            const { savedDecks, activeDeckId } = useMetaStore.getState();
            const active = savedDecks.find(d => d.id === activeDeckId);
            if (active && active.cardIds.length > 0) {
                deckToUse = active.cardIds
                    .map(id => ALL_CARDS.find(c => c.id === id))
                    .filter(c => c !== undefined) as Card[];
            }
        } catch (e) {
            console.warn("Failed to load deck from MetaStore", e);
        }
    }

    if (!deckToUse || deckToUse.length === 0) {
        const tier1Heroes = HERO_CARDS.filter(c => c.tier === 1);
        deckToUse = [
            ...tier1Heroes,
            ...tier1Heroes,
            ...TACTIC_CARDS
        ];
    }
    const shuffledDeck = [...deckToUse].sort(() => Math.random() - 0.5);

    set({
      player: { ...INITIAL_PLAYER_STATE, deck: shuffledDeck },
      phase: 'main_menu',
    });
  },

  enterFactionSelect: () => set({ phase: 'faction_select' }),

  enterHangar: () => set({ phase: 'hangar' }),

  goToMainMenu: () => set({ phase: 'main_menu' }),

  startBattle: (faction: string, difficulty: number) => {
      set(state => {
          const player = { 
              ...state.player, 
              hp: state.player.maxHp, 
              energy: DEFAULT_ENERGY,
              maxEnergy: DEFAULT_ENERGY,
              hand: [], 
              board: [], 
              graveyard: [], 
          };
          
          const fullDeck = [...state.player.deck, ...state.player.hand, ...state.player.graveyard];
          player.deck = fullDeck.sort(() => Math.random() - 0.5);
          player.hand = [];
          player.graveyard = [];

          const initialEnemyBoard: UnitInstance[] = [];
          
          let availableEnemyCards = ENEMY_CARDS.filter(c => c.faction === faction || c.faction === 'Megacorp'); 
          
          if (difficulty === 1) {
              availableEnemyCards = availableEnemyCards.filter(c => c.tier === 1 && c.cost <= 3);
          } else {
              availableEnemyCards = availableEnemyCards.filter(c => c.tier <= difficulty);
          }

          if (availableEnemyCards.length === 0) {
              availableEnemyCards = ENEMY_CARDS.filter(c => c.tier === 1); 
          }

          if (faction === 'Megacorp') {
              const botCard = availableEnemyCards.find(c => c.id === 'enemy_security') || availableEnemyCards[0];
              const droneCard = availableEnemyCards.find(c => c.id === 'enemy_drone') || availableEnemyCards[0];
              
              if (botCard) {
                  initialEnemyBoard.push({
                      uid: generateId(), cardId: botCard.id, name: botCard.name, baseAsset: botCard.baseAsset,
                      faction: botCard.faction,
                      atk: botCard.stats?.atk || 0, hp: botCard.stats?.hp || 1, maxHp: botCard.stats?.hp || 1, subtype: botCard.subtype,
                      owner: 'enemy', ready: true, attacksLeft: 1, mechanics: botCard.mechanics, shield: 0
                  });
              }
              if (droneCard) {
                   initialEnemyBoard.push({
                      uid: generateId(), cardId: droneCard.id, name: droneCard.name, baseAsset: droneCard.baseAsset,
                      faction: droneCard.faction,
                      atk: droneCard.stats?.atk || 0, hp: droneCard.stats?.hp || 1, maxHp: droneCard.stats?.hp || 1, subtype: droneCard.subtype,
                      owner: 'enemy', ready: true, attacksLeft: 1, mechanics: droneCard.mechanics, shield: 0
                  });
              }
          }

          const enemyDeck = Array.from({ length: 15 }).map(() => {
              const c = availableEnemyCards[Math.floor(Math.random() * availableEnemyCards.length)];
              return c;
          });
          const enemyHand = enemyDeck.splice(0, 4);

          const enemyMaxHp = 10 + (difficulty * 10);
          return {
              player,
              enemy: { 
                  ...INITIAL_ENEMY_STATE, 
                  board: initialEnemyBoard, 
                  deck: enemyDeck, 
                  hand: enemyHand, 
                  graveyard: [],
                  maxHp: enemyMaxHp,
                  hp: enemyMaxHp,
                  faction: faction // Save faction
              },
              phase: 'player_turn',
              turn: 1,
              run: { ...state.run, difficulty }
          };
      });
      get().drawCard(3);
  },

  playTactic: async (card: Card, targetUid?: string) => {
      const { player, isProcessingQueue } = get();
      if (isProcessingQueue) return;
      if (player.energy < card.cost) return;

      set({ isProcessingQueue: true });

      set(state => ({
          player: {
              ...state.player,
              energy: state.player.energy - card.cost,
              hand: state.player.hand.filter(c => c.uid !== card.uid),
              graveyard: [...state.player.graveyard, card]
          }
      }));

      const sourceUnit: UnitInstance = {
          uid: 'player_commander', 
          cardId: card.id, name: card.name, baseAsset: card.baseAsset,
          faction: card.faction,
          atk: 0, hp: 0, maxHp: 0, owner: 'player', ready: true, attacksLeft: 0, mechanics: [], shield: 0
      };

      let currentState = get();
      let accumulatedStateUpdates: Partial<GameState> = {};

      for (const m of (card.mechanics || [])) {
          if (m.trigger === 'onPlay') {
              const { stateUpdates, animations } = MechanicHandler.resolve(
                  m, sourceUnit, { ...currentState, ...accumulatedStateUpdates } as GameState, 
                  () => {},
                  targetUid
              );

              for (const anim of animations) {
                  set({ effectVector: { from: 'player_commander', to: anim.to, color: anim.color } });
                  await new Promise(r => setTimeout(r, DELAYS.ANIMATION_DEFAULT));
              }
              if (animations.length > 0) {
                  set({ effectVector: null });
                  await new Promise(r => setTimeout(r, DELAYS.ANIMATION_FAST));
              }

              accumulatedStateUpdates = { ...accumulatedStateUpdates, ...stateUpdates };
              set(stateUpdates);
              currentState = get();
              accumulatedStateUpdates = {}; 
          }
      }
      await get().cleanDeadUnits();
      set({ isProcessingQueue: false });
  },

  drawCard: (count = 1) => {
    set((state) => {
      let deck = [...state.player.deck];
      let graveyard = [...state.player.graveyard];
      let hand = [...state.player.hand];
      let newState = { ...state, player: { ...state.player, hand, deck, graveyard } };

      for (let i = 0; i < count; i++) {
        if (deck.length === 0) {
            if (graveyard.length > 0) {
                deck = [...graveyard].sort(() => Math.random() - 0.5);
                graveyard = [];
                newState.player.deck = deck;
                newState.player.graveyard = graveyard;
            } else {
                break; 
            }
        }

        if (deck.length > 0) {
          const rawCard = deck.shift()!;
          const card = { ...rawCard, uid: generateId() };
          if (hand.length < 10) {
              hand.push(card);
              newState.player.hand = hand;
              newState.player.deck = deck;

              card.mechanics?.forEach(m => {
                  if (m.trigger === 'onDraw') {
                       const sourceUnit: UnitInstance = {
                           uid: 'player_commander', cardId: card.id, name: card.name, baseAsset: card.baseAsset,
                           faction: card.faction,
                           atk: 0, hp: 0, maxHp: 0, owner: 'player', ready: true, attacksLeft: 0, mechanics: [], shield: 0
                       };
                       
                       const { stateUpdates } = MechanicHandler.resolve(m, sourceUnit, newState, () => {});
                       newState = { ...newState, ...stateUpdates };
                       
                       if (stateUpdates.player) {
                           hand = [...stateUpdates.player.hand];
                           deck = [...stateUpdates.player.deck];
                           graveyard = [...stateUpdates.player.graveyard];
                       }
                  }
              });
          }
        }
      }
      return newState;
    });
  },

  playUnit: async (card: Card, targetUid?: string) => {
    const { player, isProcessingQueue } = get();
    if (isProcessingQueue) return;
    if (player.energy < card.cost) return;
    if (player.board.length >= MAX_BOARD_SLOTS) return;

    set({ isProcessingQueue: true });

    const newUnit: UnitInstance = {
        uid: card.uid!, // Use card's UID for consistent layoutId
        cardId: card.id,
        name: card.name,
        baseAsset: card.baseAsset,
        faction: card.faction,
        atk: card.stats?.atk || 0,
        hp: card.stats?.hp || 1,
        maxHp: card.stats?.hp || 1,
        subtype: card.subtype,
        owner: 'player',
        ready: card.mechanics?.some(m => m.type === 'rush') || false,
        attacksLeft: card.mechanics?.some(m => m.type === 'rush') ? (card.mechanics?.some(m => m.type === 'windfury') ? 2 : 1) : 0,
        mechanics: card.mechanics || [],
        shield: 0
    };

    set(state => ({
        player: {
            ...state.player,
            energy: state.player.energy - card.cost,
            hand: state.player.hand.filter(c => c.uid !== card.uid),
            board: [...state.player.board, newUnit]
        }
    }));

    let currentState = get();
    let accumulatedStateUpdates: Partial<GameState> = {};

    for (const m of (card.mechanics || [])) {
        if (m.trigger === 'onPlay') {
            const { stateUpdates, animations } = MechanicHandler.resolve(
                m, newUnit, { ...currentState, ...accumulatedStateUpdates } as GameState, 
                () => {},
                targetUid 
            );

            for (const anim of animations) {
                set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                await new Promise(r => setTimeout(r, DELAYS.ANIMATION_DEFAULT));
            }
            if (animations.length > 0) {
                set({ effectVector: null }); 
                await new Promise(r => setTimeout(r, DELAYS.ANIMATION_FAST)); 
            }

            accumulatedStateUpdates = { ...accumulatedStateUpdates, ...stateUpdates };
            set(stateUpdates);
            currentState = get();
            accumulatedStateUpdates = {}; 
        }
    }
    await get().cleanDeadUnits();
    set({ isProcessingQueue: false });
  },

  closeScout: () => set({ scoutedCard: null }),

  endPlayerTurn: () => {
    const { isProcessingQueue } = get();
    if (isProcessingQueue) return;

    set((state) => {
        const hand = state.player.hand.filter(c => !c.mechanics?.some(m => m.type === 'fade'));
        const fadedCards = state.player.hand.filter(c => c.mechanics?.some(m => m.type === 'fade'));
        const graveyard = [...state.player.graveyard, ...fadedCards];

        let intermediateState: GameState = { 
            ...state, 
            player: { ...state.player, hand, graveyard },
            phase: 'enemy_turn' 
        };
        
        state.player.board.forEach(unit => {
            unit.mechanics.forEach(m => {
                if (m.trigger === 'onTurnEnd') {
                    const { stateUpdates } = MechanicHandler.resolve(m, unit, intermediateState, () => {});
                    intermediateState = { ...intermediateState, ...stateUpdates };
                }
            });
        });

        const enemyMaxEnergy = Math.min(MAX_ENERGY_CAP, intermediateState.enemy.maxEnergy + 1);
        intermediateState.enemy.maxEnergy = enemyMaxEnergy;
        intermediateState.enemy.energy = enemyMaxEnergy;
        
        if (intermediateState.enemy.deck.length > 0) {
            const card = intermediateState.enemy.deck.shift()!;
            if (intermediateState.enemy.hand.length < 10) intermediateState.enemy.hand.push(card);
        }

        return intermediateState;
    });
  },

  enemyAction: async () => {
    const { phase, isProcessingQueue } = get();
    if (phase !== 'enemy_turn') return;
    if (isProcessingQueue) return; 

    // Delegate to AI logic
    await AI.runTurn(get, set, get().drawCard, get().cleanDeadUnits);
  },
  
  damageUnit: () => { /* ... */ },
  
  damagePlayer: (amount: number) => set(s => {
      const newHp = s.player.hp - amount;
      if (newHp <= 0) return { player: { ...s.player, hp: 0 }, phase: 'game_over' };
      return { player: { ...s.player, hp: newHp } };
  }),

  damageEnemy: (amount: number) => set(s => {
      const newHp = s.enemy.hp - amount;
      if (newHp <= 0) {
          const loot = calculateLoot(s.run.difficulty, s.enemy.faction || 'Republic');
          
          const meta = useMetaStore.getState();
          meta.addResource('credits', loot.credits);
          meta.addResource('parts', loot.parts);
          meta.addResource('bio', loot.bio);
          meta.addResource('psi', loot.psi);

          return { 
              enemy: { ...s.enemy, hp: 0 }, 
              phase: 'victory'
          };
      }
      return { enemy: { ...s.enemy, hp: newHp } };
  }),

  attackTarget: async (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => {
      const { enemy, isProcessingQueue } = get();
      if (isProcessingQueue) return; // Lock
      
      const guards = enemy.board.filter(u => u.mechanics.some(m => m.type === 'guard'));
      const attacker = get().player.board.find(u => u.uid === attackerUid);
      const isSnipe = attacker?.mechanics.some(m => m.type === 'snipe');

      if (guards.length > 0 && !isSnipe) {
          if (targetType === 'enemy') return; 
          if (targetType === 'unit' && !guards.find(g => g.uid === targetUid)) return; 
      }

      set({ isProcessingQueue: true });

      const targetId = targetType === 'unit' ? targetUid! : 'enemy_commander';
      set({ attackingUnitId: attackerUid, attackVector: { from: attackerUid, to: targetId } });
      
      await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));

      // OnAttack Mechanics Resolution
      const attackerState = get(); 
      const currentAttacker = attackerState.player.board.find(u => u.uid === attackerUid);
      if (currentAttacker) {
          for (const m of currentAttacker.mechanics) {
              if (m.trigger === 'onAttack') {
                  const { stateUpdates, animations } = MechanicHandler.resolve(m, currentAttacker, attackerState, () => {}, targetId); 
                  
                  for (const anim of animations) {
                      set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                      await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));
                  }
                  if (animations.length > 0) set({ effectVector: null });

                  set(stateUpdates);
              }
          }
      }

      set((state) => {
          const attacker = state.player.board.find(u => u.uid === attackerUid);
          if (!attacker || !attacker.ready) return {};

          const newState = { ...state };
          const enemyBoard = [...state.enemy.board];
          const playerBoard = [...state.player.board];
          let phase = state.phase;

          if (targetType === 'enemy') {
              newState.enemy.hp -= attacker.atk;
              if (attacker.mechanics.some(m => m.type === 'lifesteal')) {
                  newState.player.hp = Math.min(newState.player.maxHp, newState.player.hp + attacker.atk);
              }
              if (newState.enemy.hp <= 0) {
                  newState.enemy.hp = 0;
                  phase = 'victory';
                  
                  const loot = calculateLoot(newState.run.difficulty, newState.enemy.faction || 'Republic');
                  const meta = useMetaStore.getState();
                  meta.addResource('credits', loot.credits);
                  meta.addResource('parts', loot.parts);
                  meta.addResource('bio', loot.bio);
                  meta.addResource('psi', loot.psi);
              }
          } else if (targetUid) {
              const tIndex = enemyBoard.findIndex(u => u.uid === targetUid);
              if (tIndex !== -1) {
                  const target = { ...enemyBoard[tIndex] };
                  target.hp -= attacker.atk;
                  
                  if ((target.status?.stun || 0) <= 0) {
                       const aIndex = playerBoard.findIndex(u => u.uid === attackerUid);
                       if (aIndex !== -1) {
                           playerBoard[aIndex].hp -= target.atk;
                       }
                  }

                  const thorns = target.mechanics.find(m => m.type === 'thorns');
                  if (thorns && thorns.value) {
                      const aIndex = playerBoard.findIndex(u => u.uid === attackerUid);
                       if (aIndex !== -1) {
                           playerBoard[aIndex].hp -= thorns.value;
                       }
                  }
                  
                  if (target.hp <= 0) target.dying = true;
                  enemyBoard[tIndex] = target;
              }
          }

          const aIndex = playerBoard.findIndex(u => u.uid === attackerUid);
          if (aIndex !== -1) {
              playerBoard[aIndex].attacksLeft--;
              if (playerBoard[aIndex].attacksLeft <= 0) playerBoard[aIndex].ready = false;
              if (playerBoard[aIndex].hp <= 0) playerBoard[aIndex].dying = true;
          }

          return { player: { ...newState.player, board: playerBoard }, enemy: { ...newState.enemy, board: enemyBoard, hp: newState.enemy.hp }, phase };
      });
      
      await new Promise(r => setTimeout(r, DELAYS.AI_ATTACK_POST));
      
      await get().cleanDeadUnits();
      set({ attackingUnitId: null, attackVector: null, isProcessingQueue: false });
  },

  startPlayerTurn: async () => {
    set(state => {
         const playerBoard = state.player.board.map(u => {
              const unit = { ...u };
              unit.ready = true;
              unit.attacksLeft = unit.mechanics.some(m => m.type === 'windfury') ? 2 : 1;
              
               if (unit.status?.stun && unit.status.stun > 0) {
                    unit.ready = false;
                    unit.attacksLeft = 0;
                    unit.status.stun -= 1;
               }
               if (unit.status?.weak && unit.status.weak > 0) {
                    unit.status.weak -= 1;
                    if (unit.status.weak === 0 && unit.status.originalAtk !== undefined) {
                        unit.atk = unit.status.originalAtk;
                    }
               }
              return unit;
          });
          
          const newMax = Math.min(MAX_ENERGY_CAP, state.player.maxEnergy + 1);
          return {
              player: { ...state.player, board: playerBoard, maxEnergy: newMax, energy: newMax },
              phase: 'player_turn',
              turn: state.turn + 1
          };
    });
    
    // Process onTurnStart triggers
    let currentState = get();
    let accumulatedUpdates: Partial<GameState> = {};
    
    for (const unit of currentState.player.board) {
        for (const m of unit.mechanics) {
            if (m.trigger === 'onTurnStart') {
                 const { stateUpdates, animations } = MechanicHandler.resolve(
                     m, unit, { ...currentState, ...accumulatedUpdates } as GameState, 
                     () => {}
                 );
                 
                 for (const anim of animations) {
                     set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                     await new Promise(r => setTimeout(r, DELAYS.ANIMATION_DEFAULT));
                 }
                 if (animations.length > 0) {
                     set({ effectVector: null });
                     await new Promise(r => setTimeout(r, DELAYS.ANIMATION_FAST));
                 }

                 accumulatedUpdates = { ...accumulatedUpdates, ...stateUpdates };
                 set(stateUpdates);
                 currentState = get();
                 accumulatedUpdates = {}; 
            }
        }
    }
    
    get().drawCard(1);
  },

  cleanDeadUnits: async () => {
    let processingDeaths = true;
    while (processingDeaths) {
        const state = get();
        const playerDead = state.player.board.filter(u => u.hp <= 0 || u.dying);
        const enemyDead = state.enemy.board.filter(u => u.hp <= 0 || u.dying);
        
        if (playerDead.length === 0 && enemyDead.length === 0) {
            processingDeaths = false;
            break;
        }

        const allDead = [...playerDead, ...enemyDead];
        let accumulatedUpdates: Partial<GameState> = {};

        for (const unit of allDead) {
            for (const m of unit.mechanics) {
                if (m.trigger === 'onDeath') {
                     const currentState = { ...get(), ...accumulatedUpdates } as GameState;
                     const { stateUpdates, animations } = MechanicHandler.resolve(m, unit, currentState, () => {});
                     
                     for (const anim of animations) {
                        set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                        await new Promise(r => setTimeout(r, DELAYS.ANIMATION_DEFAULT));
                     }
                     if (animations.length > 0) {
                         set({ effectVector: null });
                         await new Promise(r => setTimeout(r, DELAYS.ANIMATION_FAST));
                     }

                     accumulatedUpdates = { ...accumulatedUpdates, ...stateUpdates };
                     set(stateUpdates);
                     accumulatedUpdates = {}; 
                }
            }
        }

        set(current => {
            const pBoard = current.player.board.filter(u => !playerDead.some(d => d.uid === u.uid));
            const eBoard = current.enemy.board.filter(u => !enemyDead.some(d => d.uid === u.uid));
            
            const pGraveyard = [...current.player.graveyard];
            playerDead.forEach(u => {
                 const cardDef = ALL_CARDS.find(c => c.id === u.cardId);
                 if (cardDef) pGraveyard.push({ ...cardDef, id: u.cardId }); 
            });

            const eGraveyard = [...(current.enemy.graveyard || [])]; 
            enemyDead.forEach(u => {
                 const cardDef = ALL_CARDS.find(c => c.id === u.cardId);
                 if (cardDef) eGraveyard.push({ ...cardDef, id: u.cardId }); 
            });

            return {
                player: { ...current.player, board: pBoard, graveyard: pGraveyard },
                enemy: { ...current.enemy, board: eBoard, graveyard: eGraveyard }
            };
        });
        
        await new Promise(r => setTimeout(r, 200));
    }
  }

}));