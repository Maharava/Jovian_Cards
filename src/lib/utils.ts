import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateLoot = (difficulty: number, faction: string) => {
    const safeDifficulty = (typeof difficulty === 'number' && !isNaN(difficulty) && difficulty > 0) ? difficulty : 1;
    
    let parts = 0;
    let bio = 0;
    let psi = 0;

    // Base amounts
    const primaryAmount = (safeDifficulty * 2) + Math.floor(Math.random() * 3); // 2-5 at diff 1
    const secondaryChance = 0.3; 

    if (faction === 'Megacorp') {
        parts = primaryAmount;
        if (Math.random() < secondaryChance) bio = 1;
        if (Math.random() < secondaryChance) psi = 1;
    } else if (faction === 'Voidborn') {
        psi = primaryAmount;
        if (Math.random() < secondaryChance) parts = 1;
        if (Math.random() < secondaryChance) bio = 1;
    } else if (faction === 'Bio-horror') {
        bio = primaryAmount;
        if (Math.random() < secondaryChance) parts = 1;
        if (Math.random() < secondaryChance) psi = 1;
    } else { 
        // Republic, Jovian, Neutral, etc. - Balanced
        parts = Math.floor(primaryAmount / 3) + (Math.random() > 0.5 ? 1 : 0);
        bio = Math.floor(primaryAmount / 3) + (Math.random() > 0.5 ? 1 : 0);
        psi = Math.floor(primaryAmount / 3) + (Math.random() > 0.5 ? 1 : 0);
    }

    return {
        parts,
        bio,
        psi,
        credits: 70 * safeDifficulty + Math.floor(Math.random() * 40)
    };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);