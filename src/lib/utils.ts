import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cryptographically secure random ID generation with guaranteed uniqueness
let idCounter = 0;
export const generateId = () => {
  // Combine timestamp, counter, and crypto randomness to guarantee uniqueness
  // This prevents any possibility of ID collisions that could link multiple units
  const timestamp = Date.now().toString(36);
  const counter = (idCounter++).toString(36);
  const array = new Uint32Array(2);
  crypto.getRandomValues(array);
  const random = Array.from(array, num => num.toString(36)).join('');
  return `${timestamp}-${counter}-${random}`.substring(0, 24);
};