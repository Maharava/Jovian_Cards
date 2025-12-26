import type { Card, Faction } from '../types';

export const FACTION_FOLDERS: Record<Faction, string> = {
  'Jovian': 'jovian',
  'Megacorp': 'megacorp',
  'Voidborn': 'voidborn',
  'Bio-horror': 'biohorror',
  'Republic': 'republic',
  'Confederate': 'neutral',
  'Neutral': 'neutral',
};

/**
 * Resolves card asset path with tier suffix
 * - Tactics and tokens (rarity='NA') use base asset without tier suffix
 * - Regular units use _tierN suffix
 */
export const getCardAssetPath = (card: Card): string => {
  const assetSuffix = (card.type === 'tactic' || card.rarity === 'NA')
    ? ''
    : (card.tier === 1 ? '_tier1' : `_tier${card.tier}`);

  const folder = FACTION_FOLDERS[card.faction] || 'neutral';
  return `/assets/cards/${folder}/${card.baseAsset}${assetSuffix}.png`;
};

/**
 * Get fallback path for failed asset loads
 */
export const getFallbackAssetPath = (
  baseAsset: string,
  faction: Faction,
  isTacticOrToken: boolean
): string => {
  const fallbackSuffix = isTacticOrToken ? '' : '_tier1';
  const folder = FACTION_FOLDERS[faction] || 'neutral';
  return `/assets/cards/${folder}/${baseAsset}${fallbackSuffix}.png`;
};
