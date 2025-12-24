import type { GameState, UnitInstance } from '../types';
import type { GameActions } from '../store/gameStore';
import { MechanicHandler } from './mechanics';
import { DELAYS, MAX_BOARD_SLOTS } from '../config/constants';
import { generateId } from '../lib/utils';

type SetState = (partial: GameState | Partial<GameState> | ((state: GameState) => GameState | Partial<GameState>)) => void;
type GetState = () => GameState & GameActions;

/**
 * AI Controller - Handles enemy turn logic
 *
 * Turn Structure:
 * 1. Refresh units (reset ready status, restore attacks)
 * 2. Play cards (up to 3 units if affordable and board has space)
 * 3. Attack with ready units (prioritize guards, 70% units / 30% commander)
 * 4. Process end-of-turn mechanics
 * 5. Decrement status effects (stun, weak)
 * 6. Transition to player turn
 */
export const AI = {
    async runTurn(
        get: GetState,
        set: SetState,
        _drawCard: (n: number) => void,
        cleanDeadUnits: () => Promise<void>
    ) {
        set({ isProcessingQueue: true });

        try {
            // === PHASE 1: Refresh Units ===
            // Reset ready status and attacks for all units at start of turn
            set((state) => {
                const enemy = { ...state.enemy };
                enemy.board = enemy.board.map(u => {
                    const unit = { ...u };
                    unit.ready = true;
                    // FIXED: Support double_attack mechanic
                    unit.attacksLeft = unit.mechanics.some(m => m.type === 'double_attack') ? 2 : 1;

                    // FIXED: Only check stun for readiness, don't decrement yet
                    if (unit.status?.stun && unit.status.stun > 0) {
                        unit.ready = false;
                        unit.attacksLeft = 0;
                    }

                    return unit;
                });

                return { enemy };
            });

            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            await delay(DELAYS.AI_THINK);

            // === PHASE 2: Play Cards ===
            // AI plays up to 3 affordable unit cards if board has space
            let thinking = true;
            let cardsPlayed = 0;
            
            while(thinking && cardsPlayed < 3) { 
                const { enemy } = get();
                const affordable = enemy.hand.filter(c => c.cost <= enemy.energy && c.type === 'unit');
                
                if (affordable.length > 0 && enemy.board.length < MAX_BOARD_SLOTS) {
                    const card = affordable[Math.floor(Math.random() * affordable.length)];
                    
                    const hasRush = card.mechanics.some(m => m.type === 'rush');
                    const hasDoubleAttack = card.mechanics.some(m => m.type === 'double_attack');

                    const newUnit: UnitInstance = {
                        uid: generateId(),
                        cardId: card.id, name: card.name, baseAsset: card.baseAsset,
                        faction: card.faction,
                        atk: card.stats?.atk || 0, hp: card.stats?.hp || 1, maxHp: card.stats?.hp || 1, subtype: card.subtype,
                        owner: 'enemy', ready: hasRush,
                        // FIXED: Support double_attack without rush
                        attacksLeft: hasRush ? (hasDoubleAttack ? 2 : 1) : 0,
                        mechanics: card.mechanics || [], shield: 0
                    };

                    set(state => {
                        const hand = [...state.enemy.hand];
                        const cardIndex = hand.findIndex(c => c.id === card.id);
                        if (cardIndex !== -1) hand.splice(cardIndex, 1);

                        return {
                            enemy: {
                                ...state.enemy,
                                energy: state.enemy.energy - card.cost,
                                hand,
                                board: [...state.enemy.board, newUnit]
                            },
                            abilityNotifications: [
                                ...state.abilityNotifications,
                                {
                                    id: generateId(),
                                    unitName: 'Enemy',
                                    text: `played ${card.name}${card.title ? ', ' + card.title : ''}`,
                                    timestamp: Date.now()
                                }
                            ]
                        };
                    });

                    let currentState = get();
                    for (const m of (card.mechanics || [])) {
                        if (m.trigger === 'onPlay') {
                            const { stateUpdates, animations } = MechanicHandler.resolve(
                                m, newUnit, currentState, () => {} 
                            );
                            for (const anim of animations) {
                                set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                                await delay(DELAYS.ANIMATION_DEFAULT);
                            }
                            if (animations.length > 0) {
                                set({ effectVector: null });
                                await delay(DELAYS.ANIMATION_FAST);
                            }
                            set(stateUpdates);
                            currentState = get();
                        }
                    }
                    
                    cardsPlayed++;
                    await delay(DELAYS.AI_PLAY_CARD); 
                } else {
                    thinking = false; 
                }
            }

            // === PHASE 3: Combat ===
            // Attack with all ready units that have attacks remaining
            // Priority: Guards > Random Unit (70%) > Commander (30%)
            let hasActed = true;
            let sanity = 0;

            while (hasActed && sanity < 10) {
                hasActed = false;
                sanity++;
                const current = get();
                // FIXED: Prevent 0 attack units from attacking
                const attacker = current.enemy.board.find(u => u.ready && u.attacksLeft > 0 && u.atk > 0 && (!u.status?.stun || u.status.stun <= 0));

                if (attacker) {
                    hasActed = true;
                    
                    const playerBoard = current.player.board;
                    const guards = playerBoard.filter(p => p.mechanics.some(m => m.type === 'guard') && p.hp > 0);

                    let targetUid: string | undefined = undefined;
                    let targetType: 'unit' | 'enemy' = 'enemy'; // FIXED: was 'unit' | 'player'

                    if (guards.length > 0) {
                        targetType = 'unit';
                        targetUid = guards[Math.floor(Math.random() * guards.length)].uid;
                    } else if (playerBoard.length > 0 && Math.random() > 0.3) {
                         targetType = 'unit';
                         targetUid = playerBoard[Math.floor(Math.random() * playerBoard.length)].uid;
                    } else {
                        targetType = 'enemy'; // FIXED: was 'player'
                    }

                    const targetId = targetType === 'unit' ? targetUid! : 'player_commander';

                    // Log attack
                    const targetName = targetType === 'unit' && targetUid
                        ? current.player.board.find(u => u.uid === targetUid)?.name || 'Unknown'
                        : 'Player';

                    set(state => ({
                        attackingUnitId: attacker.uid,
                        attackVector: { from: attacker.uid, to: targetId },
                        abilityNotifications: [
                            ...state.abilityNotifications,
                            {
                                id: generateId(),
                                unitName: attacker.name,
                                text: `attacked ${targetName}`,
                                timestamp: Date.now()
                            }
                        ]
                    }));
                    await delay(DELAYS.AI_ATTACK_PRE);

                    set(state => {
                        const enemyBoard = [...state.enemy.board];
                        const playerBoard = [...state.player.board];
                        const uIndex = enemyBoard.findIndex(u => u.uid === attacker.uid);
                        if (uIndex === -1) return {};

                        const u = { ...enemyBoard[uIndex] };
                        let phase = state.phase;
                        
                        if (targetType === 'unit' && targetUid) {
                            const tIndex = playerBoard.findIndex(p => p.uid === targetUid);
                            if (tIndex !== -1) {
                                const t = { ...playerBoard[tIndex] };

                                // FIXED: Check for shield mechanic before dealing damage
                                const hasShield = t.mechanics.some(m => m.type === 'shield');
                                if (hasShield) {
                                    // Remove shield and don't deal damage
                                    t.mechanics = t.mechanics.filter(m => m.type !== 'shield');
                                    // Attacker still takes counter-attack damage unless first strike
                                    const counterDamage = t.atk;
                                    if (!(u.mechanics.some(m => m.type === 'first_strike'))) {
                                        u.hp -= counterDamage;
                                    }
                                } else {
                                    // Normal combat
                                    const attackerDamage = u.atk;
                                    const defenderDamage = t.atk;
                                    t.hp -= attackerDamage;
                                    u.hp -= defenderDamage;

                                    // Log damage dealt by attacker
                                    if (attackerDamage > 0) {
                                        const damageNotifications = [...(state.abilityNotifications || []), {
                                            id: generateId(),
                                            unitName: u.name,
                                            text: `dealt ${attackerDamage} damage to ${t.name}`,
                                            timestamp: Date.now()
                                        }];
                                        state.abilityNotifications = damageNotifications;
                                    }
                                }

                                const thorns = t.mechanics.find(m => m.type === 'thorns');
                                if (thorns && thorns.value) {
                                    u.hp -= thorns.value;
                                }

                                const wasTargetAlive = t.hp > 0;
                                if (t.hp <= 0) t.dying = true;

                                // Log card destruction
                                if (wasTargetAlive && t.dying) {
                                    const destroyNotifications = [...(state.abilityNotifications || []), {
                                        id: generateId(),
                                        unitName: u.name,
                                        text: `destroyed ${t.name}`,
                                        timestamp: Date.now()
                                    }];
                                    state.abilityNotifications = destroyNotifications;
                                }

                                playerBoard[tIndex] = t;
                            }
                        } else {
                            // Attacking player commander directly - update HP values
                            // (handled below after attacksLeft decrement)
                        }

                        // FIXED: Always decrement attacksLeft, regardless of target type
                        u.attacksLeft--;
                        if (u.attacksLeft <= 0) u.ready = false;
                        if (u.hp <= 0) u.dying = true;
                        enemyBoard[uIndex] = u;

                        // Update player HP if commander was attacked
                        let updatedPlayer = { ...state.player, board: playerBoard };
                        let updatedEnemy = { ...state.enemy, board: enemyBoard };

                        if (targetType === 'enemy') {
                            const newPlayerHp = state.player.hp - u.atk;
                            updatedPlayer.hp = newPlayerHp;

                            // Apply lifesteal healing to enemy commander if applicable
                            if (u.mechanics.some(m => m.type === 'lifesteal')) {
                                updatedEnemy.hp = Math.min(state.enemy.maxHp, state.enemy.hp + u.atk);
                            }

                            if (newPlayerHp <= 0) {
                                updatedPlayer.hp = 0;
                                phase = 'game_over';
                            }
                        }

                        return {
                            player: updatedPlayer,
                            enemy: updatedEnemy,
                            phase
                        };
                    });

                    await delay(DELAYS.AI_ATTACK_POST);

                    // FIXED: Process onDamageTaken triggers for defender (player units)
                    if (targetType === 'unit' && targetUid) {
                        const postCombatState = get();
                        const defender = postCombatState.player.board.find(u => u.uid === targetUid);
                        if (defender) {
                            for (const m of defender.mechanics) {
                                if (m.trigger === 'onDamageTaken') {
                                    const { stateUpdates, animations } = MechanicHandler.resolve(m, defender, get(), () => {});
                                    for (const anim of animations) {
                                        set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                                        await delay(DELAYS.ANIMATION_DEFAULT);
                                    }
                                    if (animations.length > 0) {
                                        set({ effectVector: null });
                                        await delay(DELAYS.ANIMATION_FAST);
                                    }
                                    set(stateUpdates);
                                }
                            }
                        }
                    }

                    await cleanDeadUnits();
                    set({ attackingUnitId: null, attackVector: null });

                    await delay(DELAYS.AI_ATTACK_POST);
                }
            }

            // === PHASE 4: Process End-of-Turn Mechanics ===
            // Trigger onTurnEnd abilities for all enemy units
            let currentState = get();
            const processedUnits = new Set<string>();

            // Process each unit's onTurnEnd mechanics with fresh state
            while (true) {
                const unitToProcess = currentState.enemy.board.find(
                    u => !processedUnits.has(u.uid) && u.mechanics.some(m => m.trigger === 'onTurnEnd')
                );

                if (!unitToProcess) break;

                processedUnits.add(unitToProcess.uid);

                for (const m of unitToProcess.mechanics) {
                    if (m.trigger === 'onTurnEnd') {
                        const { stateUpdates, animations, notifications } = MechanicHandler.resolve(
                            m, unitToProcess, currentState, () => {}
                        );

                        for (const anim of animations) {
                            set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
                            await delay(DELAYS.ANIMATION_DEFAULT);
                        }
                        if (animations.length > 0) {
                            set({ effectVector: null });
                            await delay(DELAYS.ANIMATION_FAST);
                        }

                        // Add detailed notifications from mechanic resolution
                        if (notifications && notifications.length > 0) {
                            set(state => ({
                                abilityNotifications: [...state.abilityNotifications, ...notifications]
                            }));
                        }

                        set(stateUpdates);
                        currentState = get(); // Refresh state after each mechanic
                    }
                }
            }

            // === PHASE 5: Decrement Status Effects ===
            // Reduce stun and weak durations at end of turn (matches player timing)
            set((state) => {
                const enemy = { ...state.enemy };
                enemy.board = enemy.board.map(unit => {
                    const updatedUnit = { ...unit };

                    // Decrement stun at end of turn
                    if (updatedUnit.status?.stun && updatedUnit.status.stun > 0) {
                        updatedUnit.status.stun -= 1;
                    }

                    // Decrement weak at end of turn
                    if (updatedUnit.status?.weak && updatedUnit.status.weak > 0) {
                        updatedUnit.status.weak -= 1;
                        if (updatedUnit.status.weak === 0 && updatedUnit.status.originalAtk !== undefined) {
                            updatedUnit.atk = updatedUnit.status.originalAtk;
                            delete updatedUnit.status.originalAtk;
                        }
                    }

                    return updatedUnit;
                });

                return { enemy };
            });

            // === PHASE 6: End Turn ===
            // Transition to player turn (player draws 1 card automatically)
            await get().startPlayerTurn();

        } catch (e) {
            console.error("AI Error", e);
            set({ phase: 'player_turn' });
        }
        set({ isProcessingQueue: false });
    }
};
