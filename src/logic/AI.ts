import type { GameState, UnitInstance, Card } from '../types';
import type { GameActions } from '../store/gameStore';
import { MechanicHandler } from './mechanics';
import { DELAYS, MAX_BOARD_SLOTS } from '../config/constants';
import { generateId } from '../lib/utils';

type SetState = (partial: GameState | Partial<GameState> | ((state: GameState) => GameState | Partial<GameState>)) => void;
type GetState = () => GameState & GameActions;

export const AI = {
    async runTurn(
        get: GetState, 
        set: SetState, 
        drawCard: (n: number) => void, 
        cleanDeadUnits: () => Promise<void>
    ) {
        set({ isProcessingQueue: true });

        try {
            // 1. Refresh Units (Start of Turn)
            set((state) => {
                const enemy = { ...state.enemy };
                enemy.board = enemy.board.map(u => {
                    const unit = { ...u };
                    unit.ready = true;
                    unit.attacksLeft = 1;

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

                // Shuffle hand for randomness? Hand is already "hand". 
                // But deck was shuffled. Hand order doesn't matter much for AI unless we pick index 0.
                return { enemy };
            });

            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            
            await delay(DELAYS.AI_THINK);

            // 2. Play Cards
            let thinking = true;
            let cardsPlayed = 0;
            
            while(thinking && cardsPlayed < 3) { 
                const { enemy } = get();
                const affordable = enemy.hand.filter(c => c.cost <= enemy.energy && c.type === 'unit');
                
                if (affordable.length > 0 && enemy.board.length < MAX_BOARD_SLOTS) {
                    const card = affordable[Math.floor(Math.random() * affordable.length)];
                    
                    const newUnit: UnitInstance = {
                        uid: generateId(),
                        cardId: card.id, name: card.name, baseAsset: card.baseAsset,
                        faction: card.faction,
                        atk: card.stats?.atk || 0, hp: card.stats?.hp || 1, maxHp: card.stats?.hp || 1, subtype: card.subtype,
                        owner: 'enemy', ready: card.mechanics.some(m => m.type === 'rush'), 
                        attacksLeft: card.mechanics.some(m => m.type === 'rush') ? 1 : 0, 
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
                            }
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

            // 3. Attacks
            let hasActed = true;
            let sanity = 0;
            
            while (hasActed && sanity < 10) { 
                hasActed = false;
                sanity++;
                const current = get();
                const attacker = current.enemy.board.find(u => u.ready && u.attacksLeft > 0 && (!u.status?.stun || u.status.stun <= 0));
                
                if (attacker) {
                    hasActed = true;
                    
                    const playerBoard = current.player.board;
                    const guards = playerBoard.filter(p => p.mechanics.some(m => m.type === 'guard') && p.hp > 0);
                    
                    let targetUid: string | undefined = undefined;
                    let targetType: 'unit' | 'player' = 'player';
                    
                    if (guards.length > 0) {
                        targetType = 'unit';
                        targetUid = guards[Math.floor(Math.random() * guards.length)].uid;
                    } else if (playerBoard.length > 0 && Math.random() > 0.3) {
                         targetType = 'unit';
                         targetUid = playerBoard[Math.floor(Math.random() * playerBoard.length)].uid;
                    } else {
                        targetType = 'player';
                    }

                    const targetId = targetType === 'unit' ? targetUid! : 'player_commander'; 

                    set({ attackingUnitId: attacker.uid, attackVector: { from: attacker.uid, to: targetId } });
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
                                t.hp -= u.atk;
                                u.hp -= t.atk;
                                
                                const thorns = t.mechanics.find(m => m.type === 'thorns');
                                if (thorns && thorns.value) {
                                    u.hp -= thorns.value;
                                }

                                if (t.hp <= 0) t.dying = true;
                                playerBoard[tIndex] = t;
                            }
                        } else {
                            state.player.hp -= u.atk;
                             if (u.mechanics.some(m => m.type === 'lifesteal')) {
                                 state.enemy.hp = Math.min(state.enemy.maxHp, state.enemy.hp + u.atk);
                             }
                             if (state.player.hp <= 0) {
                                 phase = 'game_over';
                             }
                        }

                        u.attacksLeft--;
                        if (u.hp <= 0) u.dying = true;
                        enemyBoard[uIndex] = u;

                        return { 
                            player: { ...state.player, board: playerBoard },
                            enemy: { ...state.enemy, board: enemyBoard },
                            phase
                        };
                    });
                    
                    await delay(DELAYS.AI_ATTACK_POST);

                    await cleanDeadUnits();
                    set({ attackingUnitId: null, attackVector: null });
                    
                    await delay(DELAYS.AI_ATTACK_POST);
                }
            }

            // 4. End Turn Logic & Draw
            await get().startPlayerTurn();

        } catch (e) {
            console.error("AI Error", e);
            set({ phase: 'player_turn' });
        }
        set({ isProcessingQueue: false });
    }
};
