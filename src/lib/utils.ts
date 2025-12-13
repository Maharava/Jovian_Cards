import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CHANCES } from '../config/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateLoot = (difficulty: number) => {
    const safeDifficulty = (typeof difficulty === 'number' && !isNaN(difficulty) && difficulty > 0) ? difficulty : 1;
    return {
        parts: Math.random() > CHANCES.LOOT_PARTS ? (Math.floor(Math.random() * (safeDifficulty + 1)) + 1) : 0,
        bio: Math.random() > CHANCES.LOOT_BIO ? 1 : 0,
        psi: Math.random() > CHANCES.LOOT_PSI ? 1 : 0,
        credits: 50 * safeDifficulty + Math.floor(Math.random() * 20)
    };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);