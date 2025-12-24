import type { Card } from '../types';
import { HERO_CARDS } from './jovianCards';
import { TACTIC_CARDS } from './tacticCards';
import { MEGACORP_CARDS } from './megacorpCards';
// VOIDBORN: Faction incomplete - removed from game until implementation finished
// import { VOIDBORN_CARDS } from './voidbornCards';

export { HERO_CARDS } from './jovianCards';
export { TACTIC_CARDS } from './tacticCards';
export { MEGACORP_CARDS } from './megacorpCards';
// export { VOIDBORN_CARDS } from './voidbornCards';
export { TOKEN_CARDS } from './tokenCards';

// VOIDBORN: Removed from ENEMY_CARDS until faction is complete
export const ENEMY_CARDS = [...MEGACORP_CARDS]; // , ...VOIDBORN_CARDS];

// FIXED: TOKEN_CARDS removed from ALL_CARDS - tokens should NOT appear in deck/market
export const ALL_CARDS = [...HERO_CARDS, ...TACTIC_CARDS, ...ENEMY_CARDS];

export function getFactionCards(faction: string): Card[] {
  return ALL_CARDS.filter(c => c.faction === faction);
}