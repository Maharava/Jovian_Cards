import type { Card } from '../types';
import { CONFEDERATE_CARDS } from './confederateCards';
import { TACTIC_CARDS } from './tacticCards';
import { MEGACORP_CARDS } from './megacorpCards';
import { REPUBLIC_CARDS } from './republicCards';
// VOIDBORN: Faction incomplete - removed from game until implementation finished
// import { VOIDBORN_CARDS } from './voidbornCards';

export { CONFEDERATE_CARDS } from './confederateCards';
export { TACTIC_CARDS } from './tacticCards';
export { MEGACORP_CARDS } from './megacorpCards';
export { REPUBLIC_CARDS } from './republicCards';
// export { VOIDBORN_CARDS } from './voidbornCards';
export { TOKEN_CARDS } from './tokenCards';

// Legacy export for backwards compatibility (deprecated - use CONFEDERATE_CARDS)
export const HERO_CARDS = CONFEDERATE_CARDS;

// VOIDBORN: Removed from ENEMY_CARDS until faction is complete
export const ENEMY_CARDS = [...MEGACORP_CARDS, ...REPUBLIC_CARDS]; // , ...VOIDBORN_CARDS];

// FIXED: TOKEN_CARDS removed from ALL_CARDS - tokens should NOT appear in deck/market
export const ALL_CARDS = [...CONFEDERATE_CARDS, ...TACTIC_CARDS, ...ENEMY_CARDS];

export function getFactionCards(faction: string): Card[] {
  return ALL_CARDS.filter(c => c.faction === faction);
}