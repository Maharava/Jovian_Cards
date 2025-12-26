import type { Card, MechanicPayload } from '../../types';
import { ENEMY_CARDS } from '../../data/cards';

const isStringPayload = (payload: string | MechanicPayload | undefined): payload is string => {
    return typeof payload === 'string';
};

const DECK_SIZE = 15;

type Archetype = 'Aggro' | 'Swarm' | 'Control' | 'Midrange';

interface DeckProfile {
  name: Archetype;
  costDistribution: { min: number; max: number; count: number }[];
  preferredMechanics: string[];
}

const ARCHETYPES: Record<Archetype, DeckProfile> = {
  Aggro: {
    name: 'Aggro',
    costDistribution: [
      { min: 1, max: 2, count: 7 },
      { min: 3, max: 4, count: 6 },
      { min: 5, max: 10, count: 2 }
    ],
    preferredMechanics: ['rush', 'double_attack', 'spark', 'first_strike']
  },
  Swarm: {
    name: 'Swarm',
    costDistribution: [
      { min: 1, max: 2, count: 8 },
      { min: 3, max: 4, count: 5 },
      { min: 5, max: 10, count: 2 }
    ],
    preferredMechanics: ['summon', 'rally', 'buff', 'cost_reduction']
  },
  Control: {
    name: 'Control',
    costDistribution: [
      { min: 1, max: 2, count: 4 },
      { min: 3, max: 4, count: 7 },
      { min: 5, max: 10, count: 4 }
    ],
    preferredMechanics: ['guard', 'heal', 'stun', 'damage', 'lifesteal']
  },
  Midrange: {
    name: 'Midrange',
    costDistribution: [
      { min: 1, max: 2, count: 5 },
      { min: 3, max: 4, count: 7 },
      { min: 5, max: 10, count: 3 }
    ],
    preferredMechanics: ['rally', 'buff', 'heal', 'guard']
  }
};

export class DeckBuilder {
  /**
   * Generate AI deck based on faction and difficulty level
   */
  static generateDeck(faction: string, level: number): Card[] {
    const pool = this.getCardPool(faction, level);

    if (pool.length === 0) {
      console.warn(`No cards available for faction ${faction} at level ${level}`);
      return [];
    }

    // L1-L2: Pure random with tier restrictions
    if (level <= 2) {
      return this.randomDeck(pool, level);
    }

    // L3+: Smart drafting
    const archetype = this.selectArchetype(faction, level);
    const profile = ARCHETYPES[archetype];

    return this.smartDraft(pool, profile, level);
  }

  /**
   * Filter card pool based on level restrictions
   */
  private static getCardPool(faction: string, level: number): Card[] {
    let pool = ENEMY_CARDS.filter(c => c.faction === faction || c.faction === 'Megacorp');

    switch (level) {
      case 1:
        // L1: Tier 1 only, cost <= 3
        return pool.filter(c => c.tier === 1 && c.cost <= 3);
      case 2:
        // L2: T1 + T2
        return pool.filter(c => c.tier <= 2);
      case 3:
        // L3: All tiers
        return pool;
      case 4:
      case 5:
        // L4-L5: All tiers
        return pool;
      default:
        return pool.filter(c => c.tier === 1);
    }
  }

  /**
   * Select archetype based on faction and level
   */
  private static selectArchetype(faction: string, level: number): Archetype {
    // Megacorp specializes in Aggro and Swarm
    if (faction === 'Megacorp') {
      const rand = Math.random();

      if (level === 3) {
        return rand < 0.7 ? 'Aggro' : 'Swarm';
      } else if (level === 4) {
        if (rand < 0.5) return 'Aggro';
        if (rand < 0.8) return 'Swarm';
        return 'Control';
      } else {
        // L5: Equal distribution
        if (rand < 0.4) return 'Aggro';
        if (rand < 0.7) return 'Swarm';
        return 'Control';
      }
    }

    // Default: Midrange
    return 'Midrange';
  }

  /**
   * Pure random deck generation (L1-L2)
   */
  private static randomDeck(pool: Card[], level: number): Card[] {
    const deck: Card[] = [];
    const tierCaps = this.getTierCaps(level);
    const tierCounts = { 1: 0, 2: 0, 3: 0 };

    let attempts = 0;
    const maxAttempts = DECK_SIZE * 100;

    while (deck.length < DECK_SIZE && attempts < maxAttempts) {
      attempts++;
      const card = pool[Math.floor(Math.random() * pool.length)];
      const tier = card.tier as 1 | 2 | 3;

      // Check tier cap
      if (tierCaps[tier] !== -1 && tierCounts[tier] >= tierCaps[tier]) {
        continue;
      }

      deck.push({ ...card });
      tierCounts[tier]++;
    }

    if (deck.length < DECK_SIZE) {
      console.warn(`DeckBuilder: Could only generate ${deck.length}/${DECK_SIZE} cards for level ${level}`);
    }

    return deck;
  }

  /**
   * Smart drafting with archetype and synergy (L3+)
   */
  private static smartDraft(pool: Card[], profile: DeckProfile, level: number): Card[] {
    const deck: Card[] = [];
    const tierCaps = this.getTierCaps(level);
    const tierCounts = { 1: 0, 2: 0, 3: 0 };

    // Fill each cost bucket
    for (const bucket of profile.costDistribution) {
      const bucketPool = pool.filter(c => c.cost >= bucket.min && c.cost <= bucket.max);

      for (let i = 0; i < bucket.count && deck.length < DECK_SIZE; i++) {
        const candidates = bucketPool.filter(c => {
          const tier = c.tier as 1 | 2 | 3;
          return tierCaps[tier] === -1 || tierCounts[tier] < tierCaps[tier];
        });

        if (candidates.length === 0) break;

        const scored = this.scoreCandidates(candidates, deck, profile, level);
        const card = this.pickWeighted(scored);

        deck.push({ ...card });
        tierCounts[card.tier as 1 | 2 | 3]++;
      }
    }

    // Fill remaining slots if any
    while (deck.length < DECK_SIZE) {
      const candidates = pool.filter(c => {
        const tier = c.tier as 1 | 2 | 3;
        return tierCaps[tier] === -1 || tierCounts[tier] < tierCaps[tier];
      });

      if (candidates.length === 0) {
        console.warn(`DeckBuilder: Could only generate ${deck.length}/${DECK_SIZE} cards - pool exhausted`);
        break;
      }

      const scored = this.scoreCandidates(candidates, deck, profile, level);
      const card = this.pickWeighted(scored);

      deck.push({ ...card });
      tierCounts[card.tier as 1 | 2 | 3]++;
    }

    return deck;
  }

  /**
   * Score candidates based on synergy and archetype fit
   */
  private static scoreCandidates(
    candidates: Card[],
    currentDeck: Card[],
    profile: DeckProfile,
    level: number
  ): Array<{ card: Card; weight: number }> {
    return candidates.map(card => {
      let score = 1.0;

      // Base score from tier/rarity
      if (card.tier === 3) score += 2.0;
      else if (card.tier === 2) score += 1.0;

      if (card.rarity === 'Legendary') score += 3.0;
      else if (card.rarity === 'Rare') score += 1.5;
      else if (card.rarity === 'Uncommon') score += 0.5;

      // Archetype mechanic bonus
      const hasPrefMech = card.mechanics.some(m =>
        profile.preferredMechanics.includes(m.type)
      );
      if (hasPrefMech) score += level >= 4 ? 4.0 : 2.0;

      // Synergy bonuses
      const deckFactionCount = currentDeck.filter(c => c.faction === card.faction).length;

      // Cost reduction synergy
      if (card.mechanics.some(m => m.type === 'cost_reduction' && m.payload === 'count_megacorp')) {
        const megacorpCount = currentDeck.filter(c => c.faction === 'Megacorp').length;
        score += megacorpCount * 0.5;
      }

      // Rally/Buff synergy (better with more allies)
      if (card.mechanics.some(m => m.type === 'rally' || m.type === 'buff')) {
        score += deckFactionCount * 0.3;
      }

      // Scaling units (better with more units)
      if (card.mechanics.some(m => (isStringPayload(m.payload) && m.payload.includes('count_')) || m.type === 'support')) {
        score += currentDeck.length * 0.2;
      }

      // Curve penalty (avoid too many of same cost)
      const sameCostCount = currentDeck.filter(c => c.cost === card.cost).length;
      if (sameCostCount >= 3) score *= 0.5;

      // Duplicate penalty (max 3 copies at L3+)
      const dupeCount = currentDeck.filter(c => c.id === card.id).length;
      if (dupeCount >= 3) score = 0;
      else if (dupeCount >= 2) score *= 0.3;
      else if (dupeCount >= 1) score *= 0.6;

      // L5: Boost high-value combos
      if (level === 5) {
        if (hasPrefMech) score += 2.0;
      }

      return { card, weight: Math.max(0.01, score) };
    });
  }

  /**
   * Weighted random selection
   */
  private static pickWeighted(scored: Array<{ card: Card; weight: number }>): Card {
    const totalWeight = scored.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const { card, weight } of scored) {
      rand -= weight;
      if (rand <= 0) return card;
    }

    return scored[scored.length - 1].card;
  }

  /**
   * Get tier caps per level
   */
  private static getTierCaps(level: number): Record<1 | 2 | 3, number> {
    switch (level) {
      case 1:
        return { 1: -1, 2: 0, 3: 0 }; // Unlimited T1, no T2/T3
      case 2:
        return { 1: -1, 2: 4, 3: 0 }; // Unlimited T1, max 4 T2, no T3
      case 3:
        return { 1: -1, 2: -1, 3: 5 }; // Unlimited T1/T2, max 5 T3
      case 4:
        return { 1: -1, 2: -1, 3: 10 }; // Unlimited T1/T2, max 10 T3
      case 5:
        return { 1: -1, 2: -1, 3: -1 }; // No restrictions
      default:
        return { 1: -1, 2: 0, 3: 0 };
    }
  }
}
