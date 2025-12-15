import { ALL_CARDS } from '../data/cards';
import type { Card as CardType, Rarity } from '../types';
import type { PackDefinition } from '../data/market';

export interface OpenPackResult {
    card: CardType;
    isNew: boolean;
    partsGained?: { type: string; amount: number };
}

// Helpers
const generateRarity = (chances: { Common: number; Uncommon: number; Rare: number; Legendary: number }): Rarity => {
    const r = Math.random();
    if (r < chances.Legendary) return 'Legendary';
    if (r < chances.Legendary + chances.Rare) return 'Rare';
    if (r < chances.Legendary + chances.Rare + chances.Uncommon) return 'Uncommon';
    return 'Common';
};

const getCardPool = (rarity: Rarity, factionFilter?: string, isVoidborn = false, isBio = false): CardType[] => {
    // If a specific faction is forced (e.g. Faction Pack 50% chance)
    if (factionFilter) {
        const factionPool = ALL_CARDS.filter(c => c.rarity === rarity && c.tier === 1 && c.faction === factionFilter);
        if (factionPool.length > 0) return factionPool;
        // Fallback to standard if empty?
    }

    let pool = ALL_CARDS.filter(c => c.rarity === rarity && c.tier === 1);
    
    if (isVoidborn) {
        const voidPool = ALL_CARDS.filter(c => c.faction === 'Voidborn' && c.rarity === rarity && c.tier === 1);
        if (voidPool.length > 0) return voidPool;
    } 
    
    if (isBio) {
        const bioPool = ALL_CARDS.filter(c => c.faction === 'Bio-horror' && c.rarity === rarity && c.tier === 1);
        if (bioPool.length > 0) return bioPool;
    }

    // Standard Pool: Exclude Voidborn AND Bio-horror
    return pool.filter(c => c.faction !== 'Voidborn' && c.faction !== 'Bio-horror');
};

export const processPackOpening = (
    pack: PackDefinition, 
    collection: Record<string, number>,
    unlockCard: (id: string) => void,
    addResource: (type: 'parts' | 'bio' | 'psi', amount: number) => void,
    currentRotationFaction?: string
): OpenPackResult[] => {
    const results: OpenPackResult[] = [];
            
    for (let i = 0; i < pack.count; i++) {
        const rarity = generateRarity(pack.chances);
        let isVoid = false;
        let isBio = false;
        let factionFilter: string | undefined = undefined;

        if (pack.isExotic) {
            if (Math.random() < 0.15) {
                isVoid = true;
            } else if (Math.random() < 0.15) { 
                isBio = true;
            }
        }

        if (pack.isFaction && currentRotationFaction) {
            if (Math.random() < 0.50) {
                factionFilter = currentRotationFaction;
            }
        }

        let pool = getCardPool(rarity, factionFilter, isVoid, isBio);
        
        // Safety Fallback
        if (pool.length === 0) {
            pool = ALL_CARDS.filter(c => c.rarity === rarity && c.faction !== 'Voidborn' && c.faction !== 'Bio-horror');
        }
        if (pool.length === 0) {
             results.push({ card: ALL_CARDS[0], isNew: true });
             continue;
        }

        const card = pool[Math.floor(Math.random() * pool.length)];
        const owned = collection[card.id] || 0;
        
        if (owned >= 3) {
            // Convert to parts
            let partType = 'parts'; 
            if (card.subtype === 'Biological') partType = 'bio';
            if (card.subtype === 'Psionic') partType = 'psi';
            if (card.faction === 'Voidborn') partType = 'psi'; 
            if (card.faction === 'Bio-horror') partType = 'bio';

            let amount = 1;
            if (card.rarity === 'Uncommon') amount = 2;
            if (card.rarity === 'Rare') amount = 3;
            if (card.rarity === 'Legendary') amount = 5;

            addResource(partType as any, amount);
            results.push({ card, isNew: false, partsGained: { type: partType, amount } });
        } else {
            unlockCard(card.id);
            results.push({ card, isNew: true });
        }
    }
    
    return results;
};
