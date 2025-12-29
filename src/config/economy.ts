/**
 * Economy Configuration
 *
 * This file centralizes all economy-related values (costs, drop rates, loot formulas)
 * to make balancing and testing easier. All values here are PLACEHOLDERS and should
 * be adjusted based on playtesting.
 */

// ============================================================================
// LOOT CONFIGURATION
// ============================================================================

export const LOOT_CONFIG = {
  credits: {
    base: 100,
    perDifficulty: 100,
    randomBonus: 50,
  },
  platinum: {
    base: 20,
    perDifficulty: 20,
    randomBonus: 10,
  },
  mossan: {
    dropChance: 0.05, // 5% chance per win
    amount: 1,
  },
} as const;

// ============================================================================
// COSMETIC UNLOCK COSTS
// ============================================================================

export const COSMETIC_COSTS = {
  // Standard cosmetics (unlocked with Platinum)
  platinum: {
    common: 50,
    uncommon: 100,
    rare: 250,
    legendary: 500,
  },
  // Void-themed cosmetics (unlocked with Mossan)
  mossan: {
    voidborn: 1,        // Voidborn faction card variants
    voidThemed: 2,      // Void-themed variants on non-Voidborn cards
    legendaryAlt2: 3,   // Second legendary variant (prestige)
  },
} as const;

// ============================================================================
// CARD PACK COSTS
// ============================================================================

export const PACK_COSTS = {
  // Generic packs (purchased with Credits)
  credits: {
    surplusCrate: 100,
    requisition: 250,
    contraband: 500,
  },
  // Faction-specific packs (purchased with Platinum)
  platinum: {
    confederate: 300,
    megacorp: 300,
    republic: 300,
  },
  // Voidborn pack (purchased with Mossan)
  mossan: {
    voidborn: 5,
  },
} as const;

// ============================================================================
// STARTING RESOURCES
// ============================================================================

export const STARTING_RESOURCES = {
  credits: 500,
  platinum: 0,
  mossan: 0,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate loot rewards based on difficulty level
 * @param difficulty - Difficulty level (1-5)
 * @returns Object containing credits, platinum, and mossan rewards
 */
export function calculateLoot(difficulty: number): {
  credits: number;
  platinum: number;
  mossan: number;
} {
  const credits =
    LOOT_CONFIG.credits.base * difficulty +
    Math.floor(Math.random() * LOOT_CONFIG.credits.randomBonus);

  const platinum =
    LOOT_CONFIG.platinum.base * difficulty +
    Math.floor(Math.random() * LOOT_CONFIG.platinum.randomBonus);

  const mossan = Math.random() < LOOT_CONFIG.mossan.dropChance
    ? LOOT_CONFIG.mossan.amount
    : 0;

  return { credits, platinum, mossan };
}

/**
 * Get the cost to unlock a cosmetic variant
 * @param rarity - Card rarity
 * @param isVoidThemed - Whether the cosmetic is Void-themed
 * @returns Object with currency type and amount
 */
export function getCosmeticCost(
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary',
  isVoidThemed: boolean = false
): { currency: 'platinum' | 'mossan'; amount: number } {
  if (isVoidThemed) {
    return {
      currency: 'mossan',
      amount: rarity === 'Legendary'
        ? COSMETIC_COSTS.mossan.legendaryAlt2
        : COSMETIC_COSTS.mossan.voidThemed,
    };
  }

  return {
    currency: 'platinum',
    amount: COSMETIC_COSTS.platinum[rarity.toLowerCase() as keyof typeof COSMETIC_COSTS.platinum],
  };
}

/**
 * Get the cost of a card pack
 * @param packType - Type of pack to purchase
 * @returns Object with currency type and amount
 */
export function getPackCost(
  packType: 'surplusCrate' | 'requisition' | 'contraband' | 'confederate' | 'megacorp' | 'republic' | 'voidborn'
): { currency: 'credits' | 'platinum' | 'mossan'; amount: number } {
  if (packType === 'voidborn') {
    return { currency: 'mossan', amount: PACK_COSTS.mossan.voidborn };
  }

  if (packType in PACK_COSTS.credits) {
    return {
      currency: 'credits',
      amount: PACK_COSTS.credits[packType as keyof typeof PACK_COSTS.credits]
    };
  }

  return {
    currency: 'platinum',
    amount: PACK_COSTS.platinum[packType as keyof typeof PACK_COSTS.platinum]
  };
}
