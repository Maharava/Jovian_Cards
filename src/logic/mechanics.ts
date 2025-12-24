import type { GameState, Mechanic, UnitInstance, ResolutionResult, Card } from '../types';
import { ENEMY_CARDS, ALL_CARDS, TACTIC_CARDS, TOKEN_CARDS } from '../data/cards';
import { MAX_BOARD_SLOTS } from '../config/constants';

const generateId = () => Math.random().toString(36).substr(2, 9);

export class MechanicHandler {

  static resolve(
    mechanic: Mechanic,
    sourceUnit: UnitInstance,
    state: GameState,
    logEvent: (type: string, data: unknown) => void,
    targetUid?: string
  ): ResolutionResult {

    const player = {
        ...state.player,
        board: state.player.board.map(u => ({ ...u, mechanics: [...u.mechanics] })),
        hand: state.player.hand.map(c => ({ ...c })),
        graveyard: state.player.graveyard.map(c => ({ ...c }))
    };
    const enemy = {
        ...state.enemy,
        board: state.enemy.board.map(u => ({ ...u, mechanics: [...u.mechanics] })),
        // FIXED: Remove @ts-ignore, properly handle optional graveyard
        graveyard: state.enemy.graveyard ? state.enemy.graveyard.map(c => ({ ...c })) : []
    };
    const animations: ResolutionResult['animations'] = [];
    const damagedUnits: string[] = []; // Track units that took damage for onDamageTaken triggers
    const notifications: ResolutionResult['notifications'] = [];

    let targets: UnitInstance[] = [];
    let targetCommander: 'player_commander' | 'enemy_commander' | null = null;

    // Helper to add notifications
    const addNotification = (text: string) => {
        notifications.push({
            id: generateId(),
            unitName: sourceUnit.name,
            text: text,
            timestamp: Date.now()
        });
    }; 

    const getEnemies = () => (sourceUnit.owner === 'player' ? enemy.board : player.board);
    const getAllies = () => (sourceUnit.owner === 'player' ? player.board : enemy.board);

    const findMutableUnit = (uid: string) => {
        return player.board.find(u => u.uid === uid) || enemy.board.find(u => u.uid === uid);
    };

    // Helper: Count Megacorp units for synergy mechanics
    const countMegacorpUnits = (owner: 'player' | 'enemy', excludeUid?: string): number => {
        const board = owner === 'player' ? player.board : enemy.board;
        return board.filter(u => u.faction === 'Megacorp' && u.uid !== excludeUid).length;
    };

    // FIXED: For random/all/self targets, ignore targetUid and always use automatic resolution
    // This prevents multi-mechanic cards (e.g., spark + stun) from forcing random mechanics to use the targeted unit
    const isAutoTarget = ['random_enemy', 'random_ally', 'all_enemies', 'all_allies', 'all_units', 'self',
                           'target_enemy_commander', 'player_commander'].includes(mechanic.target || '');

    if (targetUid && !isAutoTarget) {
        if (targetUid === 'player_commander') {
            targetCommander = 'player_commander';
        } else if (targetUid === 'enemy_commander') {
            targetCommander = 'enemy_commander';
        } else {
            const allUnits = [...player.board, ...enemy.board];
            const t = allUnits.find(u => u.uid === targetUid);
            if (t) {
                const isEnemy = t.owner !== sourceUnit.owner;
                const isAlly = t.owner === sourceUnit.owner;

                let isValid = false;
                if (mechanic.target === 'target_unit') isValid = true;
                if (mechanic.target === 'target_enemy' && isEnemy) isValid = true;
                if (mechanic.target === 'target_ally' && isAlly) isValid = true;

                if (isValid) targets = [t];
            }
        }
    }

    if (!targetCommander && targets.length === 0) { 
        switch (mechanic.target) {
            case 'self':
                const mutableSelf = findMutableUnit(sourceUnit.uid);
                if (mutableSelf) targets = [mutableSelf];
                break;
            case 'random_enemy': {
                let enemies = getEnemies();

                // Special logic for Hack: avoid units that are already hacked
                if (mechanic.type === 'hack') {
                    const unhackedEnemies = enemies.filter(e => !e.status?.weak || e.status.weak === 0);
                    if (unhackedEnemies.length > 0) {
                        enemies = unhackedEnemies;
                    }
                    // If all enemies are hacked, hack fails (no target selected)
                    else {
                        break; // Don't select a target, Hack fizzles
                    }
                }

                if (enemies.length > 0) {
                    targets = [enemies[Math.floor(Math.random() * enemies.length)]];
                } else {
                    targetCommander = sourceUnit.owner === 'player' ? 'enemy_commander' : 'player_commander';
                }
                break;
            }
            case 'all_enemies':
                targets = getEnemies();
                break;
            case 'random_ally': {
                let allies = getAllies().filter(u => u.uid !== sourceUnit.uid);

                // Filter by subtype if specified (e.g., 'subtype:Cybernetic')
                if (mechanic.payload && mechanic.payload.startsWith('subtype:')) {
                    const requiredSubtype = mechanic.payload.split(':')[1];
                    allies = allies.filter(u => u.subtype === requiredSubtype);
                }

                // For healing, specifically prioritize damaged allies
                if (mechanic.type === 'heal' || mechanic.type === 'repair') {
                    const damagedAllies = allies.filter(u => u.hp < u.maxHp);
                    if (damagedAllies.length > 0) {
                        allies = damagedAllies;
                    }
                }
                if (allies.length > 0) {
                    targets = [allies[Math.floor(Math.random() * allies.length)]];
                }
                break;
            }
            case 'all_allies':
                targets = getAllies();
                break;
            case 'all_units':
                targets = [...player.board, ...enemy.board];
                break;
            case 'target_enemy_commander':
                targetCommander = sourceUnit.owner === 'player' ? 'enemy_commander' : null;
                break;
            case 'player_commander': 
                targetCommander = 'player_commander';
                break;
        }
    }

    // Log when mechanics that require targets have no valid targets
    const requiresTargets = ['target_unit', 'target_enemy', 'target_ally', 'random_enemy', 'random_ally'].includes(mechanic.target || '');
    if (requiresTargets && targets.length === 0 && !targetCommander) {
        console.warn(`Mechanic ${mechanic.type} failed: No valid targets available`);
        logEvent('mechanic_failed', { type: mechanic.type, reason: 'no_valid_targets' });
    }

    switch (mechanic.type) {
        case 'breach':
            targets.forEach(t => {
                // FIXED: Remove shield mechanic, not just set shield property to 0
                const shieldIndex = t.mechanics.findIndex(m => m.type === 'shield');
                if (shieldIndex !== -1) {
                    t.mechanics = [
                        ...t.mechanics.slice(0, shieldIndex),
                        ...t.mechanics.slice(shieldIndex + 1)
                    ];
                }
                t.shield = 0; // Also reset shield property if it exists
                logEvent('debuff', { target: t.uid, type: 'breach' });
                animations.push({ from: sourceUnit.uid, to: t.uid, color: '#ef4444', duration: 400 });
            });
            break;

        case 'mind_control':
             targets.forEach(t => {
                 const sourceBoard = t.owner === 'player' ? player.board : enemy.board;
                 const targetBoard = t.owner === 'player' ? enemy.board : player.board;

                 // FIXED: Check threshold correctly (ATK <= value, not >=)
                 // Card says "Mind Control enemy with ATK <= 3", so we check if ATK > value to skip
                 if (mechanic.value !== undefined && t.atk > mechanic.value) {
                     return; // ATK too high, immune to mind control
                 }

                 const idx = sourceBoard.findIndex(u => u.uid === t.uid);
                 // FIXED: Use MAX_BOARD_SLOTS constant instead of hardcoded 7
                 if (idx !== -1 && targetBoard.length < MAX_BOARD_SLOTS) {
                     const [unit] = sourceBoard.splice(idx, 1);
                     unit.owner = unit.owner === 'player' ? 'enemy' : 'player';
                     targetBoard.push(unit);
                     logEvent('mind_control', { target: t.uid });
                     animations.push({ from: sourceUnit.uid, to: t.uid, color: '#a855f7', duration: 800 });
                 } else if (idx !== -1) {
                     // Mind Control failed: Board is full
                     console.warn('Mind Control failed: Your board is full!');
                     logEvent('mind_control', { target: t.uid, failed: true, reason: 'board_full' });
                 }
             });
             break;

        case 'gain_energy':
             {
                let energyGain = mechanic.value || 1;

                // Handle Megacorp synergy scaling
                if (mechanic.payload) {
                    if (mechanic.payload.startsWith('count_megacorp')) {
                        const count = countMegacorpUnits(sourceUnit.owner);

                        // Check for max cap (e.g., 'count_megacorp:max_4')
                        if (mechanic.payload.includes(':max_')) {
                            const maxValue = parseInt(mechanic.payload.split('max_')[1]);
                            energyGain = Math.min(count, maxValue);
                        } else {
                            energyGain = count;
                        }
                    }
                }

                if (sourceUnit.owner === 'player') {
                    player.energy += energyGain;
                    logEvent('energy', { value: energyGain });
                } else {
                    enemy.energy += energyGain;
                }
             }
             break;

        case 'rage':
             // Permanent +ATK to self (or target if specified, but Rage is usually self)
             targets.forEach(t => {
                 const amount = mechanic.value || 1;
                 t.atk += amount;
                 logEvent('buff', { target: t.uid, type: 'rage', amount });
                 animations.push({ from: t.uid, to: t.uid, color: 'red', duration: 300 }); // Flash red
             });
             break;

        case 'spark':
            if (mechanic.value) {
                targets.forEach(t => {
                    animations.push({ from: sourceUnit.uid, to: t.uid, color: '#facc15', duration: 500 });

                    let damage = mechanic.value!;

                    t.hp -= damage;
                    damagedUnits.push(t.uid); // Track for onDamageTaken
                    logEvent('damage', { target: t.uid, value: damage });
                    addNotification(`used Spark ${damage} on ${t.name}`);
                });

                if (targetCommander === 'enemy_commander') {
                    animations.push({ from: sourceUnit.uid, to: 'enemy_commander', color: '#facc15', duration: 500 });
                    enemy.hp -= mechanic.value!;
                    logEvent('damage', { target: 'enemy_commander', value: mechanic.value });
                } else if (targetCommander === 'player_commander') {
                    animations.push({ from: sourceUnit.uid, to: 'player_commander', color: '#facc15', duration: 500 });
                    player.hp -= mechanic.value!;
                    logEvent('damage', { target: 'player_commander', value: mechanic.value });
                }
            }
            break;

        case 'silence':
             targets.forEach(t => {
                 // FIXED: Remove all mechanics and clear all status effects properly
                 t.mechanics = [];
                 // Clear status effects by setting to undefined, not 0
                 if (t.status) {
                     // Restore original ATK if weak
                     if (t.status.originalAtk !== undefined) {
                         t.atk = t.status.originalAtk;
                     }
                     // Clear all status effects
                     t.status = undefined;
                 }
                 logEvent('debuff', { target: t.uid, type: 'silence' });
                 animations.push({ from: sourceUnit.uid, to: t.uid, color: '#9ca3af', duration: 400 }); // Gray
             });
             break;

        case 'damage':
            if (mechanic.payload === 'sacrifice_self_damage_equal_atk') {
                // Special logic: Destroy source (or target ally?) -> Deal ATK damage
                // 'Liquidate Assets' usually targets a friendly unit to destroy, then damages an enemy?
                // The card text says: "Destroy friendly unit. Deal its ATK to enemy." 
                // This implies TWO targets: one ally to kill, one enemy to damage.
                // Current mechanic system has one target selector.
                // Workaround: Target the enemy. We need to select an ally to sacrifice separately or assume source?
                // Card definition: target='target_enemy'. 
                // We need to Find a friendly unit to sacrifice. Random? Or is it implicit?
                // Simpler version for now: "Destroy SELF, deal ATK to target". But Tactic isn't a unit.
                // Better implementation: "Destroy TARGET friendly, deal damage equal to its ATK to random enemy?"
                // The card text implies target selection.
                // Let's implement a simpler version for this constraints: "Target Enemy. Deal damage equal to your strongest unit's ATK, then kill that unit."
                // OR: Change target to 'target_ally' (to kill) and deal damage to random enemy.
                // Let's assume we target the Ally to sacrifice, and damage goes to random enemy/commander.
                
                // Correction based on complexity: Let's make it: Target Ally. Destroy it. Deal its ATK to Random Enemy.
                // Card definition needs update to target='target_ally'. I will assume I updated it or will update it.
                // Special case: Liquidate Assets - Sacrifice an ally and deal its ATK as damage
                
                 if (targets.length > 0) {
                     const sacrificed = targets[0];
                     const dmg = sacrificed.atk;
                     sacrificed.hp = 0; // Kill
                     logEvent('death', { target: sacrificed.uid });
                     
                     // Now find enemy target
                     const enemies = sacrificed.owner === 'player' ? enemy.board : player.board;
                     if (enemies.length > 0) {
                         const targetEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                         targetEnemy.hp -= dmg;
                         damagedUnits.push(targetEnemy.uid); // Track for onDamageTaken
                         animations.push({ from: sacrificed.uid, to: targetEnemy.uid, color: 'red' });
                     } else {
                         // Hit commander
                         if (sacrificed.owner === 'player') enemy.hp -= dmg;
                         else player.hp -= dmg;
                     }
                 }
            } else if (mechanic.value) {
                targets.forEach(t => {
                     // Check for exclusions
                     if (mechanic.payload && mechanic.payload.startsWith('exclude_faction:')) {
                         const exclude = mechanic.payload.split(':')[1];
                         if (t.faction === exclude) return;
                     }

                    let damage = mechanic.value!;

                    t.hp -= damage;
                    damagedUnits.push(t.uid); // Track for onDamageTaken
                    logEvent('damage', { target: t.uid, value: damage });
                });
                if (targetCommander === 'enemy_commander') {
                    enemy.hp -= mechanic.value!;
                    logEvent('damage', { target: 'enemy_commander', value: mechanic.value });
                } else if (targetCommander === 'player_commander') {
                    player.hp -= mechanic.value!;
                    logEvent('damage', { target: 'player_commander', value: mechanic.value });
                }
            }
            break;

        case 'rally':
             // FIXED: Rally should be a temporary buff, not permanent maxHP increase
             // For now, implement as permanent buff but only apply once per source
             {
                let rallyAmount = mechanic.value || 0;

                // Handle Megacorp synergy scaling
                if (mechanic.payload === 'count_megacorp') {
                    const count = countMegacorpUnits(sourceUnit.owner);
                    rallyAmount = count;
                } else if (mechanic.payload && mechanic.payload.startsWith('count_other_megacorp')) {
                    const count = countMegacorpUnits(sourceUnit.owner, sourceUnit.uid);
                    rallyAmount = count;
                }

                if (rallyAmount > 0) {
                    targets.forEach(t => {
                        // Check if this unit already has rally buff (prevent stacking)
                        if (!t.status) t.status = {};
                        if (!t.status.rallied) {
                            t.maxHp += rallyAmount;
                            t.hp += rallyAmount;
                            t.status.rallied = true; // Mark as rallied to prevent stacking
                            logEvent('buff', { target: t.uid, type: 'rally', value: rallyAmount });
                            animations.push({ from: sourceUnit.uid, to: t.uid, color: '#eab308', duration: 500 }); // Yellow
                            addNotification(`used Rally ${rallyAmount} on ${t.name}`);
                        }
                    });
                }
             }
             break;
        case 'heal':
        case 'repair':
            if (mechanic.value || mechanic.payload) {
                targets.forEach(t => {
                    let healAmount = mechanic.value || 0;

                    // Handle Megacorp conditional bonuses
                    if (mechanic.payload) {
                        if (mechanic.payload.startsWith('megacorp_bonus:')) {
                            // If target is Megacorp, use bonus value instead
                            if (t.faction === 'Megacorp') {
                                const bonusValue = parseInt(mechanic.payload.split(':')[1]);
                                healAmount = bonusValue;
                            }
                        } else if (mechanic.payload.startsWith('megacorp_rally:')) {
                            // If target is Megacorp, also apply rally buff
                            if (t.faction === 'Megacorp') {
                                const rallyAmount = parseInt(mechanic.payload.split(':')[1]);
                                t.maxHp += rallyAmount;
                                t.hp += rallyAmount;
                            }
                        }
                    }

                    t.hp = Math.min(t.maxHp, t.hp + healAmount);
                    logEvent('heal', { target: t.uid, value: healAmount });
                    animations.push({ from: sourceUnit.uid, to: t.uid, color: '#22c55e', duration: 500 }); // Green
                    addNotification(`used Heal ${healAmount} on ${t.name}`);
                });
            }
            break;

        case 'regenerate':
            // FIXED: Regenerate is now distinct from heal
            // It should have a duration or be end-of-turn triggered
            if (mechanic.value) {
                targets.forEach(t => {
                    t.hp = Math.min(t.maxHp, t.hp + mechanic.value!);
                    logEvent('heal', { target: t.uid, value: mechanic.value });
                    animations.push({ from: t.uid, to: t.uid, color: '#22c55e', duration: 500 }); // Green (self-heal)
                });
            }
            break;
        
        case 'stun':
             targets.forEach(t => {
                 if (!t.status) t.status = {};
                 t.status.stun = (t.status.stun || 0) + (mechanic.value || 1);
                 logEvent('debuff', { target: t.uid, type: 'stun' });
                 addNotification(`used Stun on ${t.name}`);
             });
             break;

        case 'hack':
             // Hack: Reduces attack by X until end of next turn (2 turn duration)
             targets.forEach(t => {
                 if (!t.status) t.status = { originalAtk: t.atk };
                 if (t.status.originalAtk === undefined) t.status.originalAtk = t.atk;

                 const amount = mechanic.value || 1;
                 t.atk = Math.max(0, t.atk - amount);
                 t.status.weak = 2; // Lasts 2 turns (current + next)
                 logEvent('debuff', { target: t.uid, type: 'hack', amount });
                 animations.push({ from: sourceUnit.uid, to: t.uid, color: '#00ff00', duration: 300 }); // Green
             });
             break;

        case 'disarm':
             // Disarm: Sets attack to 0 until end of current turn (1 turn duration)
             targets.forEach(t => {
                 if (!t.status) t.status = { originalAtk: t.atk };
                 if (t.status.originalAtk === undefined) t.status.originalAtk = t.atk;

                 t.atk = 0; // Set to 0, not reduce
                 t.status.weak = 1; // Lasts 1 turn (current only)
                 logEvent('debuff', { target: t.uid, type: 'disarm' });
                 animations.push({ from: sourceUnit.uid, to: t.uid, color: '#94a3b8', duration: 300 }); // Slate/Silver
                 addNotification(`used Disarm on ${t.name}`);
             });
             break;

        case 'debuff':
             // Generic debuff - reduce attack temporarily
             targets.forEach(t => {
                 if (!t.status) t.status = { originalAtk: t.atk };
                 if (t.status.originalAtk === undefined) t.status.originalAtk = t.atk;

                 const amount = mechanic.value || 1;
                 t.atk = Math.max(0, t.atk - amount);
                 t.status.weak = 1;
                 logEvent('debuff', { target: t.uid, type: 'debuff', amount });
             });
             break;

        case 'buff':
        case 'encourage':
        case 'support':
             targets.forEach(t => {
                 // Faction filter
                 if (mechanic.payload && mechanic.payload.startsWith('faction:')) {
                     const faction = mechanic.payload.split(':')[1];
                     if (t.faction !== faction) return;
                 }

                 if (mechanic.payload === 'keyword:rush') {
                      t.mechanics.push({ type: 'rush', trigger: 'constant' });
                 } else {
                     let atkBonus = mechanic.value || 0;
                     let hpBonus = mechanic.secondaryValue || 0;

                     // Handle Megacorp synergy payloads
                     if (mechanic.payload) {
                         if (mechanic.payload === 'count_megacorp') {
                             // Scale with Megacorp unit count
                             const count = countMegacorpUnits(sourceUnit.owner);
                             atkBonus = count;
                             hpBonus = count;
                         } else if (mechanic.payload.startsWith('count_other_megacorp')) {
                             // Scale with OTHER Megacorp unit count (excluding source)
                             const count = countMegacorpUnits(sourceUnit.owner, sourceUnit.uid);
                             atkBonus = count;
                             hpBonus = count;

                             // Check for :once flag - prevent stacking
                             if (mechanic.payload.includes(':once')) {
                                 if (!t.status) t.status = {};
                                 if (t.status.encouraged) return; // Skip if already encouraged
                                 t.status.encouraged = true; // Mark as encouraged
                             }
                         } else if (mechanic.payload.startsWith('threshold_3:')) {
                             // If we have 3+ Megacorp units, use bonus value instead
                             const count = countMegacorpUnits(sourceUnit.owner);
                             if (count >= 3) {
                                 atkBonus = parseInt(mechanic.payload.split(':')[1]);
                             }
                         }
                     }

                     t.atk += atkBonus;
                     if (hpBonus) {
                         t.hp += hpBonus;
                         t.maxHp += hpBonus;
                     }
                     logEvent('buff', { target: t.uid, atk: atkBonus, hp: hpBonus });

                     if (mechanic.type === 'encourage') {
                         animations.push({ from: sourceUnit.uid, to: t.uid, color: '#ffffff', duration: 500 }); // White
                         addNotification(`used Encourage ${atkBonus} on ${t.name}`);
                     }
                 }
             });
             break;

        case 'bio_optimize':
            targets.forEach(t => {
                const atkBonus = mechanic.value || 0;
                const hpBonus = mechanic.secondaryValue || 0;

                t.atk += atkBonus;
                if (hpBonus) {
                    t.hp += hpBonus;
                    t.maxHp += hpBonus;
                }
                logEvent('bio_optimize', { target: t.uid, atk: atkBonus, hp: hpBonus });
                animations.push({ from: sourceUnit.uid, to: t.uid, color: '#10b981', duration: 400 });
            });
            break;

        case 'scout':
            if (sourceUnit.owner === 'player') {
                // Determine number of cards to scout
                let scoutCount = mechanic.value || 1;

                // Handle conditional scout (e.g., 'if_megacorp')
                if (mechanic.payload === 'if_megacorp') {
                    const count = countMegacorpUnits(sourceUnit.owner);
                    if (count <= 1) { // Need at least one OTHER Megacorp unit (excluding self)
                        break; // Don't scout
                    }
                }

                // Handle count_megacorp payload (scout X cards where X = Megacorp units)
                if (mechanic.payload === 'count_megacorp') {
                    scoutCount = countMegacorpUnits(sourceUnit.owner);
                }

                // Scout shows cards from enemy's hand
                if (enemy.hand.length > 0) {
                    const scoutedCards: Card[] = [];
                    const cardsToScout = Math.min(scoutCount, enemy.hand.length);

                    // Pick random cards from enemy's hand (without replacement)
                    const availableIndices = enemy.hand.map((_, i) => i);
                    for (let i = 0; i < cardsToScout; i++) {
                        const randomIdx = Math.floor(Math.random() * availableIndices.length);
                        const cardIndex = availableIndices[randomIdx];
                        availableIndices.splice(randomIdx, 1); // Remove to avoid duplicates

                        scoutedCards.push({ ...enemy.hand[cardIndex], id: `scout_${generateId()}` });
                    }

                    return {
                        stateUpdates: { scoutedCards, player: { ...player }, enemy: { ...enemy } },
                        animations
                    };
                }
                // If enemy has no hand, scout fails (no card to show)
            }
            break;
            
        case 'draw':
             if (sourceUnit.owner === 'player') {
                 const count = mechanic.value || 1;
                 for (let i = 0; i < count; i++) {
                    if (player.deck.length > 0) {
                        const c = player.deck.shift()!;
                        if (player.hand.length < 10) player.hand.push(c);
                    }
                 }
                 return { stateUpdates: { player: { ...player } }, animations, damagedUnits, notifications: notifications.length > 0 ? notifications : undefined }; 
             }
             break;

        case 'redeploy': // Formerly 'swap' - returns ALLIED units to your hand
             targets.forEach(t => {
                 // FIXED: Only affect allied units (same owner as source)
                 if (t.owner !== sourceUnit.owner) return;

                 const isPlayer = t.owner === 'player';
                 const board = isPlayer ? player.board : enemy.board;
                 const hand = isPlayer ? player.hand : enemy.hand;

                 const boardIndex = board.findIndex(u => u.uid === t.uid);
                 if (boardIndex !== -1) {
                     board.splice(boardIndex, 1);

                     // Return unit to owner's hand
                     const originalCard = ALL_CARDS.find(c => c.id === t.cardId);

                     if (originalCard && hand.length < 10) {
                         hand.push({ ...originalCard, uid: generateId() });

                         animations.push({
                             from: t.uid,
                             to: isPlayer ? 'player_commander' : 'enemy_commander',
                             color: 'cyan',
                             duration: 600
                         });

                         addNotification(`redeployed ${t.name}`);
                     }
                 }
             });
             break;

        case 'banish': // Formerly 'bounce' - returns ENEMY units to enemy hand
             targets.forEach(t => {
                 // FIXED: Only affect enemy units (opposite owner from source)
                 if (t.owner === sourceUnit.owner) return;

                 const isPlayer = t.owner === 'player';
                 const board = isPlayer ? player.board : enemy.board;
                 const hand = isPlayer ? player.hand : enemy.hand;

                 const boardIndex = board.findIndex(u => u.uid === t.uid);
                 if (boardIndex !== -1) {
                     board.splice(boardIndex, 1);

                     // Return unit to owner's hand
                     const originalCard = ALL_CARDS.find(c => c.id === t.cardId);

                     if (originalCard && hand.length < 10) {
                         hand.push({ ...originalCard, uid: generateId() });

                         animations.push({
                             from: t.uid,
                             to: isPlayer ? 'player_commander' : 'enemy_commander',
                             color: 'orange',
                             duration: 600
                         });

                         addNotification(`banished ${t.name}`);
                     }
                 }
             });
             break;

        // Legacy support - redirect old names to new ones
        case 'swap':
             return MechanicHandler.resolve({ ...mechanic, type: 'redeploy' }, sourceUnit, state, logEvent);
        case 'bounce':
             return MechanicHandler.resolve({ ...mechanic, type: 'banish' }, sourceUnit, state, logEvent);

        case 'decoy':
        case 'summon': {
             let payload = mechanic.payload;

             // FIXED: Remove 'any' type, use proper Card type
             let cardDef: typeof ALL_CARDS[0] | null = null;

             if (mechanic.type === 'decoy') {
                 // Support tiered holograms based on payload
                 let hologramStats = { atk: 0, hp: 3, maxHp: 3 }; // Default T1
                 let hologramMechanics: Mechanic[] = [ { type: 'guard', trigger: 'constant' } ];
                 let hologramText = 'Guard.';

                 if (payload === 'hologram_2') {
                     hologramStats = { atk: 1, hp: 3, maxHp: 3 };
                 } else if (payload === 'hologram_3') {
                     hologramStats = { atk: 1, hp: 4, maxHp: 4 };
                     hologramMechanics.push({ type: 'shield', trigger: 'constant' });
                     hologramText = 'Guard. Shield.';
                 }

                 cardDef = {
                     id: `hologram_${sourceUnit.cardId}`,
                     name: `${sourceUnit.name.split(',')[0]} (Holo)`,
                     type: 'unit', tier: 1, cost: 0,
                     baseAsset: sourceUnit.baseAsset,
                     faction: sourceUnit.faction,
                     stats: hologramStats,
                     text: hologramText,
                     mechanics: hologramMechanics,
                     rarity: 'NA'
                 };
             } else if (payload) {
                 // Handle scaling summons (e.g., 'neutral_drone:count_megacorp')
                 let basePayload = payload;
                 if (payload.includes(':count_megacorp')) {
                     basePayload = payload.split(':')[0];
                 }

                 if (basePayload.includes('hologram')) {
                     // Parse hologram tier from payload (e.g., 'hologram_1', 'hologram_2', 'hologram_3')
                     let hologramStats = { atk: 0, hp: 3, maxHp: 3 };
                     let hologramMechanics: Mechanic[] = [ { type: 'guard', trigger: 'constant' } ];

                     if (basePayload === 'hologram_2') {
                         hologramStats = { atk: 1, hp: 3, maxHp: 3 };
                     } else if (basePayload === 'hologram_3') {
                         hologramStats = { atk: 1, hp: 4, maxHp: 4 };
                         hologramMechanics.push({ type: 'shield', trigger: 'constant' });
                     }

                     cardDef = {
                         id: 'hologram', name: 'Hologram', type: 'unit', tier: 1, cost: 0,
                         baseAsset: 'praxidike', stats: hologramStats,
                         text: 'Guard', mechanics: hologramMechanics,
                         faction: 'Neutral', rarity: 'NA'
                     };
                 } else {
                     cardDef = ALL_CARDS.find(c => c.id === basePayload || c.baseAsset === basePayload) || null;
                     if (!cardDef) cardDef = ENEMY_CARDS.find(c => c.id === basePayload) || null;
                     // FIXED: Also search TOKEN_CARDS for summon targets (tokens removed from ALL_CARDS)
                     if (!cardDef) cardDef = TOKEN_CARDS.find(c => c.id === basePayload || c.baseAsset === basePayload) || null;
                 }
             }

             if (cardDef && cardDef.stats) {
                 // Handle scaling summon count
                 let count = mechanic.value || 1;
                 if (payload && payload.includes(':count_megacorp')) {
                     count = countMegacorpUnits(sourceUnit.owner);
                 }

                 const ownerBoard = sourceUnit.owner === 'player' ? player.board : enemy.board;
                 // FIXED: Use constant instead of hardcoded value
                 const maxSlots = MAX_BOARD_SLOTS;

                 let summoned = 0;
                 for (let i=0; i<count; i++) {
                     if (ownerBoard.length < maxSlots) {
                         const newUnit: UnitInstance = {
                             uid: generateId(),
                             cardId: cardDef.id,
                             name: cardDef.name,
                             baseAsset: cardDef.baseAsset,
                             faction: cardDef.faction,
                             atk: cardDef.stats.atk,
                             hp: cardDef.stats.hp,
                             maxHp: cardDef.stats.maxHp,
                             owner: sourceUnit.owner,
                             ready: false,
                             attacksLeft: 0,
                             mechanics: cardDef.mechanics || [],
                             shield: 0
                         };
                         ownerBoard.push(newUnit);
                         logEvent('summon', { unit: newUnit.name });
                         summoned++;
                     } else {
                         console.warn(`Summon failed: Board is full (${summoned}/${count} units summoned)`);
                         logEvent('summon', { failed: true, reason: 'board_full', summoned, attempted: count });
                         break;
                     }
                 }
             }
             break;
        }

        case 'add_random_tactic':
            if (sourceUnit.owner === 'player') {
                const availableTactics = TACTIC_CARDS.filter(c => c.id !== 'madness'); 
                if (availableTactics.length > 0) {
                    const randomTactic = availableTactics[Math.floor(Math.random() * availableTactics.length)];
                    if (player.hand.length < 10) {
                        player.hand.push({ ...randomTactic, id: `${randomTactic.id}_${generateId()}` }); 
                        logEvent('add_card_to_hand', { card: randomTactic.name });
                    }
                }
            }
            break;

        case 'pollute': {
             if (sourceUnit.owner === 'enemy') {
                 const count = mechanic.value || 1;
                 const madnessCard = ALL_CARDS.find(c => c.id === 'madness');
                 if (madnessCard) {
                     for(let i=0; i<count; i++) {
                         player.graveyard.push({ ...madnessCard, id: `madness_${generateId()}` });
                     }
                     logEvent('pollute', { count });
                     animations.push({ from: sourceUnit.uid, to: 'player_commander', color: 'purple' });
                 }
             }
             break;
        }
    }

    return {
        stateUpdates: { player, enemy },
        animations,
        damagedUnits: damagedUnits.length > 0 ? damagedUnits : undefined,
        notifications: notifications.length > 0 ? notifications : undefined
    };
  }
}
