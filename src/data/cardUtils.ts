
import type { Mechanic, MechanicType, TriggerType, CosmeticVariant, Rarity } from '../types';

// Helper to keep definitions clean
export const m = (
  type: MechanicType,
  trigger: TriggerType = 'onPlay',
  value?: number,
  target?: Mechanic['target'],
  payload?: string,
  secondaryValue?: number
): Mechanic => ({
  type, trigger, value, target, payload, secondaryValue
});

/**
 * Generate cosmetic variants for a card
 * FIXED: Eliminates duplicate cosmetic array definitions across all card files
 *
 * @param baseId - The base asset ID (e.g., 'corp_drone', 'kore')
 * @param rarity - Card rarity (determines unlock cost)
 * @param count - Number of cosmetic variants (default: 3)
 * @returns Array of cosmetic variants
 *
 * @example
 * cosmetics: generateCosmetics('corp_drone', 'Common')
 * cosmetics: generateCosmetics('europa', 'Rare', 2)
 */
export const generateCosmetics = (
  baseId: string,
  rarity: Rarity,
  count: number = 3
): CosmeticVariant[] => {
  const costs: Record<Rarity, number> = {
    Common: 50,
    Uncommon: 100,
    Rare: 250,
    Legendary: 500,
    NA: 0
  };

  return Array.from({ length: count }, (_, i) => ({
    id: `${baseId}_alt${i + 1}`,
    name: `Alt Appearance ${i + 1}`,
    asset: `${baseId}_alt${i + 1}`,
    unlockCost: { currency: 'platinum' as const, amount: costs[rarity] }
  }));
};
