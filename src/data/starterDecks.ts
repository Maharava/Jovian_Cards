/**
 * Starter Decks for Each Faction
 *
 * Each deck contains 20 cards:
 * - 12 Commons (6 unique × 2 copies)
 * - 8 Uncommons (4 unique × 2 copies)
 *
 * Designed to teach core faction mechanics and synergies.
 */

export type FactionType = 'Confederate' | 'Megacorp' | 'Republic';

export interface StarterDeck {
  faction: FactionType;
  name: string;
  cardIds: string[];
}

// Confederate: Resourcefulness, repair, regenerate, jury-rigging
const CONFEDERATE_STARTER: string[] = [
  'callisto_militia', 'callisto_militia',
  'belt_prospector', 'belt_prospector',
  'jury_rigged_bot', 'jury_rigged_bot',
  'scrapyard_scavenger', 'scrapyard_scavenger',
  'amalthea', 'amalthea',
  'confederate_mechanic', 'confederate_mechanic',
  'enceladus_shocktroop', 'enceladus_shocktroop',
  'confederate_medic', 'confederate_medic',
  'callisto', 'callisto',
  'titan_breacher', 'titan_breacher'
];

// Megacorp: Efficiency, Quota mechanics, cybernetic synergies
const MEGACORP_STARTER: string[] = [
  'corp_drone', 'corp_drone',
  'enemy_security', 'enemy_security',
  'corp_guard', 'corp_guard',
  'corp_hound', 'corp_hound',
  'corp_medic', 'corp_medic',
  'corp_loader', 'corp_loader',
  'corp_manager', 'corp_manager',
  'enemy_uplink', 'enemy_uplink',
  'corp_technician', 'corp_technician',
  'corp_liquidator', 'corp_liquidator'
];

// Republic: Requisition mechanics, defensive/control, bureaucracy
const REPUBLIC_STARTER: string[] = [
  'republic_drone', 'republic_drone',
  'torres', 'torres',
  'lira_chen', 'lira_chen',
  'protocol_droid', 'protocol_droid',
  'advocate_cross', 'advocate_cross',
  'officer_volkov', 'officer_volkov',
  'marcus_reeves', 'marcus_reeves',
  'elvie_webb', 'elvie_webb',
  'councilor_zhang', 'councilor_zhang',
  'dr_singh', 'dr_singh'
];

export const STARTER_DECKS: Record<FactionType, StarterDeck> = {
  Confederate: {
    faction: 'Confederate',
    name: 'Vanguard Standard',
    cardIds: CONFEDERATE_STARTER
  },
  Megacorp: {
    faction: 'Megacorp',
    name: 'Corporate Efficiency',
    cardIds: MEGACORP_STARTER
  },
  Republic: {
    faction: 'Republic',
    name: 'Senate Protocol',
    cardIds: REPUBLIC_STARTER
  }
};

// Default starter faction (can be changed here for testing)
export const DEFAULT_STARTER_FACTION: FactionType = 'Confederate';

// Get starter deck by faction
export const getStarterDeck = (faction: FactionType): StarterDeck => {
  return STARTER_DECKS[faction];
};

// Get default starter deck
export const getDefaultStarterDeck = (): StarterDeck => {
  return STARTER_DECKS[DEFAULT_STARTER_FACTION];
};
