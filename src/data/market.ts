export interface PackDefinition {
    id: string;
    name: string;
    cost: number;
    count: number;
    chances: { Common: number; Uncommon: number; Rare: number; Legendary: number };
    desc: string;
    img: string; // Static image or base placeholder
    isExotic?: boolean; // For purple glow / void mechanics
    isFaction?: boolean; // For dynamic faction rotation
}

export const PACKS: PackDefinition[] = [
    { 
        id: 'surplus', 
        name: 'Surplus Crate', 
        cost: 100, 
        count: 3, 
        chances: { Common: 0.60, Uncommon: 0.34, Rare: 0.05, Legendary: 0.01 }, 
        desc: 'Standard issue equipment. Reliable.', 
        img: 'surplus_crate.png' 
    },
    { 
        id: 'requisition', 
        name: 'Requisition', 
        cost: 250, 
        count: 5, 
        chances: { Common: 0.45, Uncommon: 0.40, Rare: 0.12, Legendary: 0.03 }, 
        desc: 'High-grade military assets.', 
        img: 'requisition.png' 
    },
    { 
        id: 'faction', 
        name: 'Faction Supply', // Name will be dynamic in UI probably? Or just "Faction Supply"
        cost: 300, 
        count: 5, 
        chances: { Common: 0.45, Uncommon: 0.40, Rare: 0.12, Legendary: 0.03 }, 
        desc: 'Supplies from a specific sector.', 
        img: 'requisition.png', // Placeholder, UI will override
        isFaction: true
    },
    { 
        id: 'contraband', 
        name: 'Contraband', 
        cost: 500, 
        count: 5, 
        chances: { Common: 0.30, Uncommon: 0.45, Rare: 0.20, Legendary: 0.05 }, 
        desc: 'Risk of Void corruption. Exotic goods.', 
        isExotic: true, 
        img: 'contraband.png' 
    },
];
