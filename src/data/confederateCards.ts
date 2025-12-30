import type { Card } from '../types';
import { m } from './cardUtils';

/**
 * Confederate Faction Cards (Consolidated - No Tiers)
 *
 * The Outer Confederacy - A loose alliance of independent settlements including
 * the Jovian Sisters as key members and allies.
 *
 * Card Count: 20 unique cards
 * - Common: 7 cards (use T1 stats)
 * - Uncommon: 5 cards (use T1 stats)
 * - Rare: 5 cards (use T2 stats)
 * - Legendary: 3 cards (use T3 stats)
 */

export const CONFEDERATE_CARDS: Card[] = [
  // ==================== COMMON CARDS (7) ====================

  // HIMALIA - Common (T1 stats)
  {
    id: 'himalia',
    name: 'Himalia',
    title: 'The Shield',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: '',
    faction: 'Confederate',
    baseAsset: 'himalia',
    lore: "Himalia just wants a normal life. Built like a tank, she's an absolute gym junkie.",
    cosmetics: [
      { id: 'himalia_alt1', name: 'Alt Appearance 1', asset: 'himalia_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'himalia_alt2', name: 'Alt Appearance 2', asset: 'himalia_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // AMALTHEA - Common (T1 stats)
  {
    id: 'amalthea',
    name: 'Amalthea',
    title: 'The Soldier',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: '',
    faction: 'Confederate',
    baseAsset: 'amalthea',
    lore: "A front line Confederate soldier. First in, last out.",
    cosmetics: [
      { id: 'amalthea_alt1', name: 'Alt Appearance 1', asset: 'amalthea_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'amalthea_alt2', name: 'Alt Appearance 2', asset: 'amalthea_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // LEDA - Common (T1 stats)
  {
    id: 'leda',
    name: 'Leda',
    title: 'The Thief',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: '',
    faction: 'Confederate',
    baseAsset: 'leda',
    lore: "A thief who lives amongst the free states. Reclusive and quiet.",
    cosmetics: [
      { id: 'leda_alt1', name: 'Alt Appearance 1', asset: 'leda_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'leda_alt2', name: 'Alt Appearance 2', asset: 'leda_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // LYSITHEA - Common (T1 stats)
  {
    id: 'lysithea',
    name: 'Lysithea',
    title: 'The Hacker',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Psionic',
    text: 'OnPlay: Hack 1 (Reduce random enemy ATK by 1 for 2 turns).',
    faction: 'Confederate',
    baseAsset: 'lysithea',
    lore: "A chaotic psychic whose presence disrupts technology.",
    cosmetics: [
      { id: 'lysithea_alt1', name: 'Alt Appearance 1', asset: 'lysithea_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'lysithea_alt2', name: 'Alt Appearance 2', asset: 'lysithea_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('hack', 'onPlay', 1, 'random_enemy')]
  },

  // KORE - Common (T1 stats)
  {
    id: 'kore',
    name: 'Kore',
    title: 'The Maiden',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'OnPlay: Scout 1 (Reveal 1 random enemy hand card).',
    faction: 'Confederate',
    baseAsset: 'kore',
    lore: "A socialite who lives for the weekend. Knows everyone, hears everything.",
    cosmetics: [
      { id: 'kore_alt1', name: 'Alt Appearance 1', asset: 'kore_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'kore_alt2', name: 'Alt Appearance 2', asset: 'kore_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('scout', 'onPlay', 1, 'random_enemy')]
  },

  // ADRASTEA - Common (T1 stats)
  {
    id: 'adrastea',
    name: 'Adrastea',
    title: 'The Provider',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Heal 2 (target ally).',
    faction: 'Confederate',
    baseAsset: 'adrastea',
    lore: "Runs a clinic that treats everyone, regardless of ability to pay.",
    cosmetics: [
      { id: 'adrastea_alt1', name: 'Alt Appearance 1', asset: 'adrastea_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'adrastea_alt2', name: 'Alt Appearance 2', asset: 'adrastea_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('heal', 'onPlay', 2, 'target_ally')]
  },

  // CARPO - Common (T1 stats)
  {
    id: 'carpo',
    name: 'Carpo',
    title: 'The Mechanic',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 },
    subtype: 'Cybernetic',
    text: '',
    faction: 'Confederate',
    baseAsset: 'carpo',
    lore: "Works on starships. Has an uncanny ability to spot defects.",
    cosmetics: [
      { id: 'carpo_alt1', name: 'Alt Appearance 1', asset: 'carpo_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'carpo_alt2', name: 'Alt Appearance 2', asset: 'carpo_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // ==================== UNCOMMON CARDS (5) ====================

  // SINOPE - Uncommon (T1 stats)
  {
    id: 'sinope',
    name: 'Sinope',
    title: 'The Seducer',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Disarm 2 (Set random enemy ATK to 0 for 2 turns).',
    faction: 'Confederate',
    baseAsset: 'sinope',
    lore: "A manipulator who uses looks and charm to get close to powerful men.",
    cosmetics: [
      { id: 'sinope_alt1', name: 'Alt Appearance 1', asset: 'sinope_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'sinope_alt2', name: 'Alt Appearance 2', asset: 'sinope_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },

  // EUPORIE - Uncommon (T1 stats)
  {
    id: 'euporie',
    name: 'Euporie',
    title: 'The Nurse',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Heal 3 (target ally).',
    faction: 'Confederate',
    baseAsset: 'euporie',
    lore: "A dedicated field nurse who specializes in combat medicine.",
    cosmetics: [
      { id: 'euporie_alt1', name: 'Alt Appearance 1', asset: 'euporie_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'euporie_alt2', name: 'Alt Appearance 2', asset: 'euporie_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },

  // CALLISTO - Uncommon (T1 stats)
  {
    id: 'callisto',
    name: 'Callisto',
    title: 'The Gang Queen',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'OnPlay: Summon a 1/1 Thug.',
    faction: 'Confederate',
    baseAsset: 'callisto',
    lore: "A gang leader who runs one of the largest crime rings on Enceladus.",
    cosmetics: [
      { id: 'callisto_alt1', name: 'Alt Appearance 1', asset: 'callisto_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'callisto_alt2', name: 'Alt Appearance 2', asset: 'callisto_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_thug')]
  },

  // TAYGETE - Uncommon (T1 stats)
  {
    id: 'taygete',
    name: 'Taygete',
    title: 'The Heavy',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: '',
    faction: 'Confederate',
    baseAsset: 'taygete',
    lore: "A quiet professional who speaks softly but carries a very big gun.",
    cosmetics: [
      { id: 'taygete_alt1', name: 'Alt Appearance 1', asset: 'taygete_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'taygete_alt2', name: 'Alt Appearance 2', asset: 'taygete_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: []
  },

  // CYLLENE - Uncommon (T1 stats)
  {
    id: 'cyllene',
    name: 'Cyllene',
    title: 'The Storm',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    subtype: 'Psionic',
    text: 'OnPlay: Spark 2 (Deal 2 damage to random enemy).',
    faction: 'Confederate',
    baseAsset: 'cyllene',
    lore: "A raw, unrefined psychic force. Chaos incarnate.",
    cosmetics: [
      { id: 'cyllene_alt1', name: 'Alt Appearance 1', asset: 'cyllene_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'cyllene_alt2', name: 'Alt Appearance 2', asset: 'cyllene_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('spark', 'onPlay', 2, 'random_enemy')]
  },

  // ==================== RARE CARDS (5) ====================

  // ELARA - Rare (T2 stats)
  {
    id: 'elara',
    name: 'Elara',
    title: 'The Biologist',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'OnPlay: Draw 2. Bio-Optimize 2 (Give target unit +2/+2).',
    faction: 'Confederate',
    baseAsset: 'elara',
    lore: "Arguably the best floral biologist past the Belt. Thinks at superhuman speeds.",
    cosmetics: [
      { id: 'elara_alt1', name: 'Alt Appearance 1', asset: 'elara_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'elara_alt2', name: 'Alt Appearance 2', asset: 'elara_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('draw', 'onPlay', 2, 'self'),
      m('bio_optimize', 'onPlay', 2, 'target_ally', undefined, 2)
    ]
  },

  // IO - Rare (T2 stats)
  {
    id: 'io',
    name: 'Io',
    title: 'The Drone Master',
    type: 'unit',
    rarity: 'Rare',
    cost: 2,
    stats: { atk: 2, hp: 5, maxHp: 5 },
    subtype: 'Cybernetic',
    text: 'OnPlay: Summon a 1/2 Drone.',
    faction: 'Confederate',
    baseAsset: 'io',
    lore: "The tech gremlin, always building something. Has a super-human knack for robotics.",
    cosmetics: [
      { id: 'io_alt1', name: 'Alt Appearance 1', asset: 'io_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'io_alt2', name: 'Alt Appearance 2', asset: 'io_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone_2')]
  },

  // PASIPHAE - Rare (T2 stats)
  {
    id: 'pasiphae',
    name: 'Pasiphae',
    title: 'The Ace',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Rush. OnPlay: Redeploy (Return a friendly unit to hand).',
    faction: 'Confederate',
    baseAsset: 'pasiphae',
    lore: "Giggly, shy mech pilot. Incredible reflexes.",
    cosmetics: [
      { id: 'pasiphae_alt1', name: 'Alt Appearance 1', asset: 'pasiphae_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'pasiphae_alt2', name: 'Alt Appearance 2', asset: 'pasiphae_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('redeploy', 'onPlay', 1, 'target_ally')
    ]
  },

  // PRAXIDIKE - Rare (T2 stats)
  {
    id: 'praxidike',
    name: 'Praxidike',
    title: 'The Trickster',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 3, hp: 2, maxHp: 2 },
    subtype: 'Cybernetic',
    text: 'OnPlay: Decoy (Summon 0/2 Hologram with Guard).',
    faction: 'Confederate',
    baseAsset: 'praxidike',
    lore: "Always up to mischief. Has cat ears and can read people's emotions.",
    cosmetics: [
      { id: 'praxidike_alt1', name: 'Alt Appearance 1', asset: 'praxidike_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'praxidike_alt2', name: 'Alt Appearance 2', asset: 'praxidike_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [m('decoy', 'onPlay', 1, 'self')]
  },

  // GANYMEDE - Rare (T2 stats)
  {
    id: 'ganymede',
    name: 'Ganymede',
    title: 'The Pugilist',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Rush. Rage 1 (Gain +1 ATK permanently when attacking).',
    faction: 'Confederate',
    baseAsset: 'ganymede',
    lore: "A brawler who loves to fight but hates to kill. Her muscles are stronger kg-for-kg than a bodybuilder.",
    cosmetics: [
      { id: 'ganymede_alt1', name: 'Alt Appearance 1', asset: 'ganymede_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'ganymede_alt2', name: 'Alt Appearance 2', asset: 'ganymede_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('rage', 'onAttack', 1, 'self')
    ]
  },

  // ==================== LEGENDARY CARDS (3) ====================

  // EUROPA - Legendary (T3 stats)
  {
    id: 'europa',
    name: 'Europa',
    title: 'The Mind Ocean',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 4, hp: 7, maxHp: 7 },
    subtype: 'Psionic',
    text: 'OnPlay: Stun All Enemies. Turn Start: Draw 1. Turn End: Heal all allies 3.',
    faction: 'Confederate',
    baseAsset: 'europa',
    lore: "A powerful psychic burdened by leadership. Hears the Whispers. Effectively immortal when going all out.",
    cosmetics: [
      { id: 'europa_alt1', name: 'Alt Appearance 1', asset: 'europa_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'europa_alt2', name: 'Alt Appearance 2', asset: 'europa_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('stun', 'onPlay', 1, 'all_enemies'),
      m('draw', 'onTurnStart', 1, 'self'),
      m('heal', 'onTurnEnd', 3, 'all_allies')
    ]
  },

  // METIS - Legendary (T3 stats)
  {
    id: 'metis',
    name: 'Metis',
    title: 'The Flare',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 6, hp: 6, maxHp: 6 },
    subtype: 'Psionic',
    text: 'OnPlay: Destroy target enemy. WhenAttacked: Spark 3 (attacker).',
    faction: 'Confederate',
    baseAsset: 'metis',
    lore: "Hunts for clues about the Whispers. Unlike Europa, mercy isn't in Metis' nature.",
    cosmetics: [
      { id: 'metis_alt1', name: 'Alt Appearance 1', asset: 'metis_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'metis_alt2', name: 'Alt Appearance 2', asset: 'metis_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('assassinate', 'onPlay', 1, 'target_enemy'),
      m('spark', 'onDamageTaken', 3, 'random_enemy') // Damage to attacker
    ]
  },

  // THEBE - Legendary (T3 stats)
  {
    id: 'thebe',
    name: 'Thebe',
    title: 'The Apex',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 7, hp: 7, maxHp: 7 },
    subtype: 'Biological',
    text: 'Snipe. Loot 1 (Draw 1 card when this kills an enemy). Turn End: Regenerate 2.',
    faction: 'Confederate',
    baseAsset: 'thebe',
    lore: "The wildest Jovian. A bio-hacker ranger and hunter. Solidly loyal to her family.",
    cosmetics: [
      { id: 'thebe_alt1', name: 'Alt Appearance 1', asset: 'thebe_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'thebe_alt2', name: 'Alt Appearance 2', asset: 'thebe_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('snipe', 'constant'),
      m('loot', 'onAttack', 1, 'self'),
      m('regenerate', 'onTurnEnd', 2, 'self')
    ]
  },
];
