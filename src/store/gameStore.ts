import { create } from 'zustand';
import type { GameState, Card, UnitInstance, PlayerState, EnemyState } from '../types';
import { ENEMY_CARDS, HERO_CARDS, TACTIC_CARDS, ALL_CARDS } from '../data/cards';
import { MechanicHandler } from '../logic/mechanics';
import { useMetaStore } from './metaStore';
import { MAX_BOARD_SLOTS, DEFAULT_PLAYER_HP, DEFAULT_ENERGY, MAX_ENERGY_CAP, DELAYS } from '../config/constants';
import { generateId, calculateLoot } from '../lib/utils';
import { AI } from '../logic/AI';

// Helper to get mechanic description
function getMechanicDescription(mechanic: import('../types').Mechanic, cardDef: Card | undefined): string {
  if (!cardDef?.text) return '';
  // Extract the specific ability from card text that matches this trigger
  const lines = cardDef.text.split('.');
  for (const line of lines) {
    if (mechanic.trigger === 'onTurnStart' && line.includes('Turn Start')) return line.trim();
    if (mechanic.trigger === 'onTurnEnd' && line.includes('Turn End')) return line.trim();
    if (mechanic.trigger === 'onPlay' && line.includes('OnPlay')) return line.trim();
  }
  return cardDef.text.split('.')[0]; // Return first sentence as fallback
}

// Fisher-Yates shuffle algorithm for proper uniform distribution
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create card lookup map for O(1) access
const CARD_MAP = new Map<string, Card>();
ALL_CARDS.forEach(card => CARD_MAP.set(card.id, card));

const VALID_FACTIONS = new Set(['Jovian', 'Megacorp', 'Republic', 'Confederate', 'Voidborn', 'Bio-horror', 'Neutral']);

// Helper: Calculate actual card cost with reductions
function getCardCost(card: Card, board: UnitInstance[]): number {
  let cost = card.cost;

  // Check for cost_reduction mechanics
  const hasCostReduction = card.mechanics?.some(m => m.type === 'cost_reduction');
  if (hasCostReduction) {
    const costReductionMechanic = card.mechanics?.find(m => m.type === 'cost_reduction');
    if (costReductionMechanic?.payload === 'count_megacorp') {
      const megacorpCount = board.filter(u => u.faction === 'Megacorp').length;
      const reduction = (costReductionMechanic.value || 1) * megacorpCount;
      cost = Math.max(0, cost - reduction);
    }
  }

  return cost;
}

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
                // Use card map for O(1) lookup and validate cards exist
                deckToUse = active.cardIds
                    .map(id => CARD_MAP.get(id))
                    .filter((c): c is Card => c !== undefined);

                // Warn if some cards were missing
                if (deckToUse.length !== active.cardIds.length) {
                    console.warn(`Deck contained ${active.cardIds.length - deckToUse.length} missing/invalid cards`);
                }
            }
        } catch (e) {
            console.warn("Failed to load deck from MetaStore", e);
        }
    }

    if (!deckToUse || deckToUse.length === 0) {
        // TEST: Add one copy of every unique Jovian unit (Tier 1) + standard tactics
        // We filter for Tier 1 Jovian units to get the base characters.
        const jovianUnits = HERO_CARDS.filter(c => c.faction === 'Jovian' && c.tier === 1);

        // Also ensure we have enough cards to play, so maybe add tactics too.
        deckToUse = [
            ...jovianUnits,
            ...TACTIC_CARDS
        ];
    }
    const shuffledDeck = shuffleArray(deckToUse);

    set({
      player: { ...INITIAL_PLAYER_STATE, deck: shuffledDeck },
      phase: 'main_menu',
    });
  },

  enterFactionSelect: () => set({ phase: 'faction_select' }),

  enterHangar: () => set({ phase: 'hangar' }),

  goToMainMenu: () => set({ phase: 'main_menu' }),

  startBattle: (faction: string, difficulty: number) => {
      // Validate faction
      if (!VALID_FACTIONS.has(faction)) {
          console.warn(`Invalid faction "${faction}", defaulting to Megacorp`);
          faction = 'Megacorp';
      }

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
          player.deck = shuffleArray(fullDeck);
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
              const droneCard = availableEnemyCards.find(c => c.id === 'corp_drone') || availableEnemyCards[0];
              
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

      const actualCost = getCardCost(card, player.board);
      if (player.energy < actualCost) return;

      set({ isProcessingQueue: true });

      set(state => ({
          player: {
              ...state.player,
              energy: state.player.energy - actualCost,
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

              // Accumulate updates properly without resetting
              accumulatedStateUpdates = { ...accumulatedStateUpdates, ...stateUpdates };
              set(stateUpdates);
              currentState = get();
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
                deck = shuffleArray(graveyard);
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

    const actualCost = getCardCost(card, player.board);
    if (player.energy < actualCost) return;
    if (player.board.length >= MAX_BOARD_SLOTS) return;

    set({ isProcessingQueue: true });

    const hasRush = card.mechanics?.some(m => m.type === 'rush') || false;
    const hasDoubleAttack = card.mechanics?.some(m => m.type === 'double_attack') || false;

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
        ready: hasRush,
        attacksLeft: hasRush ? (hasDoubleAttack ? 2 : 1) : 0,
        mechanics: card.mechanics || [],
        shield: 0
    };

    set(state => ({
        player: {
            ...state.player,
            energy: state.player.energy - actualCost,
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

            // Accumulate updates properly without resetting
            accumulatedStateUpdates = { ...accumulatedStateUpdates, ...stateUpdates };
            set(stateUpdates);
            currentState = get();
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

        // Update player board with status decrements and trigger onTurnEnd
        intermediateState.player.board = state.player.board.map(unit => {
            const updatedUnit = { ...unit };

            // Decrement stun at end of turn
            if (updatedUnit.status?.stun && updatedUnit.status.stun > 0) {
                updatedUnit.status.stun -= 1;
            }

            // Decrement weak at end of turn (FIXED: was at start)
            if (updatedUnit.status?.weak && updatedUnit.status.weak > 0) {
                updatedUnit.status.weak -= 1;
                if (updatedUnit.status.weak === 0 && updatedUnit.status.originalAtk !== undefined) {
                    updatedUnit.atk = updatedUnit.status.originalAtk;
                    delete updatedUnit.status.originalAtk;
                }
            }

            return updatedUnit;
        });

        // Process onTurnEnd mechanics
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
          
          // Rotate Market Faction
          meta.rotateMarketFaction();

          return { 
              enemy: { ...s.enemy, hp: 0 }, 
              phase: 'victory',
              lastLoot: loot
          };
      }
      return { enemy: { ...s.enemy, hp: newHp } };
  }),

  attackTarget: async (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => {
      const { enemy, player, isProcessingQueue } = get();
      if (isProcessingQueue) return;

      let attacker = player.board.find(u => u.uid === attackerUid);
      let isPlayerAttacker = true;
      if (!attacker) {
          attacker = enemy.board.find(u => u.uid === attackerUid);
          isPlayerAttacker = false;
      }
      if (!attacker) return; // Should not happen

      // FIXED: Prevent units with 0 attack from attacking
      if (attacker.atk <= 0) {
          console.warn('Cannot attack with 0 attack unit');
          return;
      }

      // Guard check logic depends on who is attacking.
      // If Player attacking -> check Enemy guards.
      // If Enemy attacking -> check Player guards.
      const defenderBoard = isPlayerAttacker ? enemy.board : player.board;
      const guards = defenderBoard.filter(u => u.mechanics.some(m => m.type === 'guard'));
      const isSnipe = attacker.mechanics.some(m => m.type === 'snipe');

      // If guards exist and attacker doesn't have snipe, must target a guard unit
      if (guards.length > 0 && !isSnipe) {
          if (targetType === 'enemy') {
              // Cannot attack commander when guards exist
              return;
          }
          if (targetType === 'unit') {
              // Must be targeting a guard unit
              if (!targetUid || !guards.find(g => g.uid === targetUid)) {
                  return;
              }
          }
      }

      set({ isProcessingQueue: true });

      const targetId = targetType === 'unit' ? targetUid! : (isPlayerAttacker ? 'enemy_commander' : 'player_commander');
      set({ attackingUnitId: attackerUid, attackVector: { from: attackerUid, to: targetId } });
      
      await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));

      // OnAttack (Attacker Triggers)
      const attackerState = get(); 
      // Re-find to be safe
      const currentAttacker = isPlayerAttacker ? attackerState.player.board.find(u => u.uid === attackerUid) : attackerState.enemy.board.find(u => u.uid === attackerUid);
      
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

      // Damage Resolution
      set((state) => {
          // Re-fetch everything to ensure state is fresh after OnAttack
          const pBoard = [...state.player.board];
          const eBoard = [...state.enemy.board];
          
          const att = isPlayerAttacker ? pBoard.find(u => u.uid === attackerUid) : eBoard.find(u => u.uid === attackerUid);
          if (!att) return {};

          let newState = { ...state, player: { ...state.player, board: pBoard }, enemy: { ...state.enemy, board: eBoard } };
          let phase = state.phase;

          // Target Resolution
          if (targetType === 'enemy') {
              // Commander Damage
              if (isPlayerAttacker) {
                  newState.enemy.hp -= att.atk;
                  if (att.mechanics.some(m => m.type === 'lifesteal')) {
                      newState.player.hp = Math.min(newState.player.maxHp, newState.player.hp + att.atk);
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
                      newState.lastLoot = loot;
                  }
              } else {
                  newState.player.hp -= att.atk;
                  if (att.mechanics.some(m => m.type === 'lifesteal')) {
                      newState.enemy.hp = Math.min(newState.enemy.maxHp, newState.enemy.hp + att.atk);
                  }
                  if (newState.player.hp <= 0) {
                      newState.player.hp = 0;
                      phase = 'game_over';
                  }
              }
          } else if (targetUid) {
              // Unit Combat
              const defBoard = isPlayerAttacker ? eBoard : pBoard;
              const tIndex = defBoard.findIndex(u => u.uid === targetUid);
              
              if (tIndex !== -1) {
                  const target = { ...defBoard[tIndex] };
                  
                  // Attacker deals damage to Target
                  let damage = att.atk;
                  if (att.mechanics.some(m => m.type === 'double_damage_undamaged') && target.hp === target.maxHp) {
                      damage *= 2;
                  }

                  // Shield check - shield mechanic prevents damage once
                  // Look for shield mechanic, not shield property
                  const shieldMechIndex = target.mechanics.findIndex(m => m.type === 'shield');
                  if (shieldMechIndex !== -1 && damage > 0) {
                      // Create new mechanics array without the shield
                      target.mechanics = [
                          ...target.mechanics.slice(0, shieldMechIndex),
                          ...target.mechanics.slice(shieldMechIndex + 1)
                      ];
                      damage = 0; // Shield absorbs all damage
                  }

                  target.hp -= damage;

                  // Counter-attack (only if not stunned and target is alive)
                  // Fixed: Stun > 0 means stunned, <= 0 means not stunned
                  const isStunned = (target.status?.stun || 0) > 0;
                  if (!isStunned && target.hp > 0) {
                       // Attacker takes damage from counter-attack
                       let counterDmg = target.atk;
                       att.hp -= counterDmg;
                  }

                  // Thorns
                  const thorns = target.mechanics.find(m => m.type === 'thorns');
                  if (thorns && thorns.value) {
                      att.hp -= thorns.value;
                  }
                  
                  if (target.hp <= 0) target.dying = true;
                  if (att.hp <= 0) att.dying = true;
                  
                  defBoard[tIndex] = target;
              }
          }

          // Reduce attacks left
          att.attacksLeft--;
          if (att.attacksLeft <= 0) att.ready = false;

          return { ...newState, phase };
      });
      
      // OnDamageTaken triggers (Post-combat) - specifically for Defender
      const postCombatState = get();
      const postCombatDefenderBoard = isPlayerAttacker ? postCombatState.enemy.board : postCombatState.player.board;
      // We need to find the defender unit again. If it died, it might be in graveyard or marked dying?
      // If it died, it's still in board but marked dying or HP <= 0.
      // Or we check mechanics on the targetUid.

      if (targetType === 'unit' && targetUid) {
          const defender = postCombatDefenderBoard.find(u => u.uid === targetUid);
          if (defender) {
               for (const m of defender.mechanics) {
                   if (m.trigger === 'onDamageTaken') {
                       // Don't pass attackerUid as target - let mechanic resolve based on its own targeting
                       const { stateUpdates, animations } = MechanicHandler.resolve(m, defender, get(), () => {});
                       for (const anim of animations) {
                           set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                           await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));
                       }
                       if (animations.length > 0) set({ effectVector: null });
                       set(stateUpdates);
                   }
               }
          }
      }
      
      await new Promise(r => setTimeout(r, DELAYS.AI_ATTACK_POST));
      await get().cleanDeadUnits();
      set({ attackingUnitId: null, attackVector: null, isProcessingQueue: false });
  },

  startPlayerTurn: async () => {
    set(state => {
         const playerBoard = state.player.board.map(u => {
              const unit = { ...u };
              unit.ready = true;
              unit.attacksLeft = unit.mechanics.some(m => m.type === 'double_attack') ? 2 : 1;

               if (unit.status?.stun && unit.status.stun > 0) {
                    unit.ready = false;
                    unit.attacksLeft = 0;
                    // Stun is decremented at end of turn (endPlayerTurn) to persist icon
               }
               // Weak status is decremented at END of turn, not start
               // This is handled in endPlayerTurn now
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

                 // Show ability notification
                 const cardDef = ALL_CARDS.find(c => c.id === unit.cardId);
                 const abilityText = getMechanicDescription(m, cardDef);
                 if (abilityText) {
                     set({ abilityNotification: { unitUid: unit.uid, text: abilityText, timestamp: Date.now() } });
                 }

                 for (const anim of animations) {
                     set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                     await new Promise(r => setTimeout(r, DELAYS.ANIMATION_DEFAULT));
                 }
                 if (animations.length > 0) {
                     set({ effectVector: null });
                     await new Promise(r => setTimeout(r, DELAYS.ANIMATION_FAST));
                 }

                 // Accumulate updates properly without resetting
                 accumulatedUpdates = { ...accumulatedUpdates, ...stateUpdates };
                 set(stateUpdates);
                 currentState = get();
            }
        }
    }
    
    get().drawCard(1);
  },

  cleanDeadUnits: async () => {
    const MAX_DEATH_ITERATIONS = 20; // Prevent infinite loops from chained death triggers
    let iterations = 0;
    let processingDeaths = true;

    while (processingDeaths && iterations < MAX_DEATH_ITERATIONS) {
        iterations++;
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
                     try {
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

                         // Accumulate updates properly without resetting
                         accumulatedUpdates = { ...accumulatedUpdates, ...stateUpdates };
                         set(stateUpdates);
                     } catch (e) {
                         console.error('Error resolving onDeath mechanic:', e);
                     }
                }
            }
        }

        set(current => {
            const pBoard = current.player.board.filter(u => !playerDead.some(d => d.uid === u.uid));
            const eBoard = current.enemy.board.filter(u => !enemyDead.some(d => d.uid === u.uid));

            const pGraveyard = [...current.player.graveyard];
            playerDead.forEach(u => {
                 // Use card map for O(1) lookup
                 const cardDef = CARD_MAP.get(u.cardId);
                 if (cardDef) {
                     pGraveyard.push({ ...cardDef, uid: generateId() });
                 } else {
                     console.warn(`Card ${u.cardId} not found in CARD_MAP for graveyard`);
                 }
            });

            const eGraveyard = [...(current.enemy.graveyard || [])];
            enemyDead.forEach(u => {
                 const cardDef = CARD_MAP.get(u.cardId);
                 if (cardDef) {
                     eGraveyard.push({ ...cardDef, uid: generateId() });
                 }
            });

            return {
                player: { ...current.player, board: pBoard, graveyard: pGraveyard },
                enemy: { ...current.enemy, board: eBoard, graveyard: eGraveyard }
            };
        });

        await new Promise(r => setTimeout(r, 200));
    }

    if (iterations >= MAX_DEATH_ITERATIONS) {
        console.error('Death processing exceeded maximum iterations - possible infinite loop detected');
    }
  }

}));