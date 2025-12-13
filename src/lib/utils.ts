import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CHANCES } from '../config/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateLoot = (difficulty: number) => {
    const safeDifficulty = (typeof difficulty === 'number' && !isNaN(difficulty) && difficulty > 0) ? difficulty : 1;
    return {
        parts: (safeDifficulty * 2) + Math.floor(Math.random() * 3), // e.g., Diff 1 = 2-4 parts
        bio: Math.random() > CHANCES.LOOT_BIO ? (Math.random() > 0.7 ? 2 : 1) : 0,
        psi: Math.random() > CHANCES.LOOT_PSI ? (Math.random() > 0.7 ? 2 : 1) : 0,
        credits: 70 * safeDifficulty + Math.floor(Math.random() * 40)
    };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);