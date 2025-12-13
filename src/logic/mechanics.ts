import type { GameState, Mechanic, UnitInstance, ResolutionResult } from '../types';
import { ENEMY_CARDS, ALL_CARDS, TACTIC_CARDS } from '../data/cards';

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
        // @ts-ignore
        graveyard: (state.enemy.graveyard || []).map(c => ({ ...c })) 
    };
    const animations: ResolutionResult['animations'] = [];
    
    let targets: UnitInstance[] = [];
    let targetCommander: 'player_commander' | 'enemy_commander' | null = null; 

    const getEnemies = () => (sourceUnit.owner === 'player' ? enemy.board : player.board);
    const getAllies = () => (sourceUnit.owner === 'player' ? player.board : enemy.board);
    
    const findMutableUnit = (uid: string) => {
        return player.board.find(u => u.uid === uid) || enemy.board.find(u => u.uid === uid);
    };

    if (targetUid) {
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
                const enemies = getEnemies();
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
                const allies = getAllies().filter(u => u.uid !== sourceUnit.uid);
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

    switch (mechanic.type) {
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
                    
                    t.hp -= mechanic.value!;
                    logEvent('damage', { target: t.uid, value: mechanic.value });
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

        case 'damage':
            if (mechanic.value) {
                targets.forEach(t => {
                    t.hp -= mechanic.value!;
                    logEvent('damage', { target: t.uid, value: mechanic.value });
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
             if (mechanic.value) {
                targets.forEach(t => {
                    t.maxHp += mechanic.value!;
                    t.hp += mechanic.value!;
                    logEvent('buff', { target: t.uid, type: 'rally', value: mechanic.value });
                    animations.push({ from: sourceUnit.uid, to: t.uid, color: '#f59e0b', duration: 400 }); // Amber/Gold
                });
             }
             break;
        case 'heal':
        case 'repair':
            if (mechanic.value) {
                targets.forEach(t => {
                    t.hp = Math.min(t.maxHp, t.hp + mechanic.value!);
                    logEvent('heal', { target: t.uid, value: mechanic.value });
                });
            }
            break;
        
        case 'stun':
             targets.forEach(t => {
                 if (!t.status) t.status = {};
                 t.status.stun = (t.status.stun || 0) + (mechanic.value || 1);
                 logEvent('debuff', { target: t.uid, type: 'stun' });
             });
             break;

        case 'hack':
        case 'disarm': 
        case 'debuff':
             targets.forEach(t => {
                 if (!t.status) t.status = { originalAtk: t.atk };
                 if (t.status.originalAtk === undefined) t.status.originalAtk = t.atk;
                 
                 const amount = mechanic.value || 1;
                 t.atk = Math.max(0, t.atk - amount);
                 t.status.weak = (t.status.weak || 0) + 1; 
                 logEvent('debuff', { target: t.uid, type: 'weak', amount });
                 
                 if (mechanic.type === 'hack') {
                     animations.push({ from: sourceUnit.uid, to: t.uid, color: '#00ff00', duration: 300 }); // Green
                 } else if (mechanic.type === 'disarm') {
                     animations.push({ from: sourceUnit.uid, to: t.uid, color: '#94a3b8', duration: 300 }); // Slate/Silver
                 }
             });
             break;

        case 'support': 
             targets.forEach(t => {
                 t.atk += mechanic.value || 0;
                 if (mechanic.secondaryValue) {
                     t.hp += mechanic.secondaryValue;
                     t.maxHp += mechanic.secondaryValue;
                 }
                 logEvent('buff', { target: t.uid, atk: mechanic.value, hp: mechanic.secondaryValue });
             });
             break;
             
        case 'scout':
            if (sourceUnit.owner === 'player') {
                const randomEnemyCard = ENEMY_CARDS[Math.floor(Math.random() * ENEMY_CARDS.length)];
                const scoutedCard = { ...randomEnemyCard, id: `scout_${generateId()}` }; 
                return { 
                    stateUpdates: { scoutedCard, player: { ...player }, enemy: { ...enemy } }, 
                    animations 
                };
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
                 return { stateUpdates: { player: { ...player } }, animations }; 
             }
             break;

        case 'swap':
        case 'bounce':
             targets.forEach(t => {
                 const isPlayer = t.owner === 'player';
                 const board = isPlayer ? player.board : enemy.board;
                 const hand = isPlayer ? player.hand : enemy.hand;

                 const boardIndex = board.findIndex(u => u.uid === t.uid);
                 if (boardIndex !== -1) {
                     board.splice(boardIndex, 1);
                     const originalCard = ALL_CARDS.find(c => c.id === t.cardId);
                     if (originalCard && hand.length < 10) {
                         hand.push({ ...originalCard, id: `${originalCard.id}_${generateId()}` });
                         
                         animations.push({ 
                             from: t.uid, 
                             to: isPlayer ? 'player_commander' : 'enemy_commander', 
                             color: 'cyan',
                             duration: 600
                         });
                     }
                 }
             });
             break;

        case 'decoy':
        case 'summon': {
             let payload = mechanic.payload;
             
             let cardDef: any = null;

             if (mechanic.type === 'decoy') {
                 cardDef = { 
                     id: `hologram_${sourceUnit.cardId}`,
                     name: `${sourceUnit.name.split(',')[0]} (Holo)`, 
                     type: 'unit', tier: 1, cost: 0, 
                     baseAsset: sourceUnit.baseAsset, 
                     faction: sourceUnit.faction,
                     stats: { atk: 0, hp: 2, maxHp: 2 }, 
                     text: 'Guard. Decoy.', 
                     mechanics: [ { type: 'guard', trigger: 'constant' } ],
                     rarity: 'NA'
                 };
             } else if (payload) {
                 if (payload.includes('hologram')) {
                     cardDef = { 
                         id: 'hologram', name: 'Hologram', type: 'unit', tier: 1, cost: 0, 
                         baseAsset: 'praxidike', stats: { atk: 0, hp: 2, maxHp: 2 }, 
                         text: 'Guard', mechanics: [ { type: 'guard', trigger: 'constant' } ],
                         faction: 'Neutral', rarity: 'NA'
                     };
                 } else {
                     cardDef = ALL_CARDS.find(c => c.id === payload || c.baseAsset === payload);
                     if (!cardDef) cardDef = ENEMY_CARDS.find(c => c.id === payload);
                 }
             }

             if (cardDef && cardDef.stats) {
                 const count = mechanic.value || 1;
                 const ownerBoard = sourceUnit.owner === 'player' ? player.board : enemy.board;
                 const maxSlots = 5;

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

    return { stateUpdates: { player, enemy }, animations };
  }
}
