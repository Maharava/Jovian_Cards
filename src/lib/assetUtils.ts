import type { Card, Faction } from '../types';

export const FACTION_FOLDERS: Record<Faction, string> = {
  'Confederate': 'confederate',
  'Megacorp': 'megacorp',
  'Voidborn': 'voidborn',
  'Bio-horror': 'biohorror',
  'Republic': 'republic',
  'Neutral': 'neutral',
};

/**
 * Resolves card asset path (no tier suffixes - consolidated system)
 * All cards use their baseAsset directly without tier modifications
 */
export const getCardAssetPath = (card: Card): string => {
  const folder = FACTION_FOLDERS[card.faction] || 'neutral';
  return `/assets/cards/${folder}/${card.baseAsset}.png`;
};

/**
 * Get fallback path for failed asset loads
 */
export const getFallbackAssetPath = (
  baseAsset: string,
  faction: Faction
): string => {
  const folder = FACTION_FOLDERS[faction] || 'neutral';
  return `/assets/cards/${folder}/${baseAsset}.png`;
};
