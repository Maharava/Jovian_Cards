import type { Card } from '../types';
import { m } from './cardUtils';

/**
 * Megacorp Faction Cards (Consolidated - No Tiers)
 *
 * The Megacorporation - A ruthless corporate empire that values efficiency,
 * control, and profit above all else.
 *
 * Card Count: 18 unique cards
 * - Common: 6 cards (use T1 stats)
 * - Uncommon: 5 cards (use T1 stats)
 * - Rare: 4 cards (use T2 stats)
 * - Legendary: 3 cards (use T3 stats)
 */

export const MEGACORP_CARDS: Card[] = [
  // ==================== COMMON CARDS (6) ====================

  // Mining Drone - Common (T1 stats)
  {
    id: 'corp_drone',
    name: 'Mining Drone',
    title: 'Automated Miner',
    type: 'unit',
    rarity: 'Common',
    cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 },
    subtype: 'Cybernetic',
    text: 'Vanilla unit.',
    faction: 'Megacorp',
    baseAsset: 'corp_drone',
    lore: "Mass-produced automated labor.",
    cosmetics: [
      { id: 'corp_drone_alt1', name: 'Alt Appearance 1', asset: 'corp_drone_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_drone_alt2', name: 'Alt Appearance 2', asset: 'corp_drone_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_drone_alt3', name: 'Alt Appearance 3', asset: 'corp_drone_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // Security Bot - Common (T1 stats)
  {
    id: 'enemy_security',
    name: 'Security Bot',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Cybernetic',
    text: 'Guard.',
    faction: 'Megacorp',
    baseAsset: 'corp_bot',
    lore: "Standard perimeter defense unit.",
    cosmetics: [
      { id: 'corp_bot_alt1', name: 'Alt Appearance 1', asset: 'corp_bot_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_bot_alt2', name: 'Alt Appearance 2', asset: 'corp_bot_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_bot_alt3', name: 'Alt Appearance 3', asset: 'corp_bot_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('guard', 'constant')]
  },

  // Corp Guard - Common (T1 stats)
  {
    id: 'corp_guard',
    name: 'Security Enforcer',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Guard.',
    faction: 'Megacorp',
    baseAsset: 'corp_guard',
    lore: "Minimum wage, maximum risk.",
    cosmetics: [
      { id: 'corp_guard_alt1', name: 'Alt Appearance 1', asset: 'corp_guard_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_guard_alt2', name: 'Alt Appearance 2', asset: 'corp_guard_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_guard_alt3', name: 'Alt Appearance 3', asset: 'corp_guard_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('guard', 'constant')]
  },

  // Cyber-Hound - Common (T1 stats)
  {
    id: 'corp_hound',
    name: 'K9X Unit',
    title: 'Cyber-Hound',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 },
    subtype: 'Cybernetic',
    text: 'Rush.',
    faction: 'Megacorp',
    baseAsset: 'corp_hound',
    lore: "Canine bio-frame.",
    cosmetics: [
      { id: 'corp_hound_alt1', name: 'Alt Appearance 1', asset: 'corp_hound_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_hound_alt2', name: 'Alt Appearance 2', asset: 'corp_hound_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_hound_alt3', name: 'Alt Appearance 3', asset: 'corp_hound_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('rush', 'constant')]
  },

  // Heavy Loader - Common (T1 stats)
  {
    id: 'corp_loader',
    name: 'Loader',
    title: 'Cargo Loader',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 6, maxHp: 6 },
    subtype: 'Cybernetic',
    text: 'Slow.',
    faction: 'Megacorp',
    baseAsset: 'corp_loader',
    lore: "Industrial mech repurposed.",
    cosmetics: [
      { id: 'corp_loader_alt1', name: 'Alt Appearance 1', asset: 'corp_loader_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_loader_alt2', name: 'Alt Appearance 2', asset: 'corp_loader_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_loader_alt3', name: 'Alt Appearance 3', asset: 'corp_loader_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('slow', 'constant')]
  },

  // Field Medic - Common (T1 stats)
  {
    id: 'corp_medic',
    name: 'Doc Ash',
    title: 'Field Medic',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Turn End: Heal 1.',
    faction: 'Megacorp',
    baseAsset: 'corp_medic',
    lore: "Company policy requires keeping assets functional.",
    cosmetics: [
      { id: 'corp_medic_alt1', name: 'Alt Appearance 1', asset: 'corp_medic_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_medic_alt2', name: 'Alt Appearance 2', asset: 'corp_medic_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_medic_alt3', name: 'Alt Appearance 3', asset: 'corp_medic_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('heal', 'onTurnEnd', 1, 'random_ally')]
  },

  // ==================== UNCOMMON CARDS (5) ====================

  // Manager - Uncommon (T1 stats)
  {
    id: 'corp_manager',
    name: 'Alexandrea',
    title: 'Supervisor',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 0, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Turn End: Encourage 1.',
    faction: 'Megacorp',
    baseAsset: 'corp_manager',
    lore: "Get back to work!",
    cosmetics: [
      { id: 'corp_manager_alt1', name: 'Alt Appearance 1', asset: 'corp_manager_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_manager_alt2', name: 'Alt Appearance 2', asset: 'corp_manager_alt2', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_manager_alt3', name: 'Alt Appearance 3', asset: 'corp_manager_alt3', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('encourage', 'onTurnEnd', 1, 'random_ally')]
  },

  // Liquidator - Uncommon (T1 stats)
  {
    id: 'corp_liquidator',
    name: 'Ximena',
    title: 'Asset Liquidator',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 4, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Vanilla unit.',
    faction: 'Megacorp',
    baseAsset: 'corp_liquidator',
    lore: "Sent when a branch is closing down.",
    cosmetics: [
      { id: 'corp_liquidator_alt1', name: 'Alt Appearance 1', asset: 'corp_liquidator_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_liquidator_alt2', name: 'Alt Appearance 2', asset: 'corp_liquidator_alt2', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_liquidator_alt3', name: 'Alt Appearance 3', asset: 'corp_liquidator_alt3', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: []
  },

  // Uplink - Uncommon (T1 stats)
  {
    id: 'enemy_uplink',
    name: 'Hacking Uplink',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: 'Turn End: Hack 1.',
    faction: 'Megacorp',
    baseAsset: 'corp_uplink',
    lore: "Broadcasting malware.",
    cosmetics: [
      { id: 'corp_uplink_alt1', name: 'Alt Appearance 1', asset: 'corp_uplink_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_uplink_alt2', name: 'Alt Appearance 2', asset: 'corp_uplink_alt2', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_uplink_alt3', name: 'Alt Appearance 3', asset: 'corp_uplink_alt3', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy')]
  },

  // Technician - Uncommon (T1 stats)
  {
    id: 'corp_technician',
    name: 'T4M3K0',
    title: 'Drone Mechanic',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'OnPlay: Summon Drone.',
    faction: 'Megacorp',
    baseAsset: 'corp_technician',
    lore: "Keeps the swarm operational.",
    cosmetics: [
      { id: 'corp_technician_alt1', name: 'Alt Appearance 1', asset: 'corp_technician_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_technician_alt2', name: 'Alt Appearance 2', asset: 'corp_technician_alt2', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_technician_alt3', name: 'Alt Appearance 3', asset: 'corp_technician_alt3', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },

  // Slaver - Uncommon (T1 stats)
  {
    id: 'corp_slaver',
    name: 'Mr. Harrison, Debt Collector',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Vanilla unit.',
    faction: 'Megacorp',
    baseAsset: 'corp_slaver',
    lore: "You're late on your payments.",
    cosmetics: [
      { id: 'corp_slaver_alt1', name: 'Alt Appearance 1', asset: 'corp_slaver_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_slaver_alt2', name: 'Alt Appearance 2', asset: 'corp_slaver_alt2', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'corp_slaver_alt3', name: 'Alt Appearance 3', asset: 'corp_slaver_alt3', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: []
  },

  // ==================== RARE CARDS (4) ====================

  // Solarin Control - Rare (T2 stats)
  {
    id: 'solarin_control',
    name: 'Process Manager',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 },
    subtype: 'Cybernetic',
    text: 'Turn Start: Gain 1 Energy for each Megacorp unit (max 4). Turn End: Repair 1 Cybernetic.',
    faction: 'Megacorp',
    baseAsset: 'solarin_control',
    lore: "Managing the flow of power.",
    cosmetics: [
      { id: 'solarin_control_alt1', name: 'Alt Appearance 1', asset: 'solarin_control_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'solarin_control_alt2', name: 'Alt Appearance 2', asset: 'solarin_control_alt2', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'solarin_control_alt3', name: 'Alt Appearance 3', asset: 'solarin_control_alt3', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('gain_energy', 'onTurnStart', 0, 'self', 'count_megacorp:max_4'),
      m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')
    ]
  },

  // Director Kiz - Rare (T2 stats)
  {
    id: 'director_kiz',
    name: 'Kiz',
    title: 'Director: Earth',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Buff Megacorp +1/+1 & Rush.',
    faction: 'Megacorp',
    baseAsset: 'director_kiz',
    lore: "Head of Regional Operations.",
    cosmetics: [
      { id: 'director_kiz_alt1', name: 'Alt Appearance 1', asset: 'director_kiz_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'director_kiz_alt2', name: 'Alt Appearance 2', asset: 'director_kiz_alt2', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'director_kiz_alt3', name: 'Alt Appearance 3', asset: 'director_kiz_alt3', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('buff', 'onPlay', 1, 'all_allies', 'faction:Megacorp', 1),
      m('buff', 'onPlay', 0, 'all_allies', 'keyword:rush')
    ]
  },

  // Enforcer Lee - Rare (T2 stats)
  {
    id: 'enforcer_lee',
    name: 'Enforcer Lee',
    title: 'Enforcer',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 5, hp: 5, maxHp: 5 },
    subtype: 'Biological',
    text: 'OnAttack: Rage. Turn End: Regenerate 2.',
    faction: 'Megacorp',
    baseAsset: 'enforcer_lee',
    lore: "A one-man army on the payroll.",
    cosmetics: [
      { id: 'enforcer_lee_alt1', name: 'Alt Appearance 1', asset: 'enforcer_lee_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'enforcer_lee_alt2', name: 'Alt Appearance 2', asset: 'enforcer_lee_alt2', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'enforcer_lee_alt3', name: 'Alt Appearance 3', asset: 'enforcer_lee_alt3', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rage', 'onAttack', 1, 'self'),
      m('regenerate', 'onTurnEnd', 2, 'self')
    ]
  },

  // R0-VR - Rare (T2 stats)
  {
    id: 'r0vr',
    name: 'R0-VR',
    title: 'Iteration Two',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 },
    subtype: 'Cybernetic',
    text: 'Rush. Shield. OnPlay: Scout X, where X = Megacorp units you control.',
    faction: 'Megacorp',
    baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    cosmetics: [
      { id: 'r0vr_alt1', name: 'Alt Appearance 1', asset: 'r0vr_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'r0vr_alt2', name: 'Alt Appearance 2', asset: 'r0vr_alt2', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'r0vr_alt3', name: 'Alt Appearance 3', asset: 'r0vr_alt3', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('shield', 'constant'),
      m('scout', 'onPlay', 0, 'self', 'count_megacorp')
    ]
  },

  // ==================== LEGENDARY CARDS (3) ====================

  // Director Vance - Legendary (T3 stats)
  {
    id: 'director_vance',
    name: 'Vance',
    title: 'Director: Acquisitions',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 0, hp: 10, maxHp: 10 },
    subtype: 'Cybernetic',
    text: 'Shield. Recycle 2. Passive: Played Megacorp units +2/+2.',
    faction: 'Megacorp',
    baseAsset: 'director_vance',
    lore: "The CEO. The Board. The Law.",
    cosmetics: [
      { id: 'director_vance_alt1', name: 'Alt Appearance 1', asset: 'director_vance_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'director_vance_alt2', name: 'Alt Appearance 2', asset: 'director_vance_alt2', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'director_vance_alt3', name: 'Alt Appearance 3', asset: 'director_vance_alt3', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('shield', 'constant'),
      m('recycle', 'constant', 2),
      m('buff', 'passive', 2, 'all_allies', 'faction:Megacorp', 2)
    ]
  },

  // The Auditor - Legendary (T3 stats)
  {
    id: 'the_auditor',
    name: 'Unknown',
    type: 'unit',
    rarity: 'Legendary',
    cost: 5,
    stats: { atk: 5, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Snipe. Assassinate.',
    faction: 'Megacorp',
    baseAsset: 'the_auditor',
    lore: "You have been found wanting.",
    cosmetics: [
      { id: 'the_auditor_alt1', name: 'Alt Appearance 1', asset: 'the_auditor_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'the_auditor_alt2', name: 'Alt Appearance 2', asset: 'the_auditor_alt2', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'the_auditor_alt3', name: 'Alt Appearance 3', asset: 'the_auditor_alt3', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('snipe', 'constant'),
      m('assassinate', 'constant')
    ]
  },

  // Unit 734 - Legendary (T3 stats)
  {
    id: 'unit_734',
    name: 'Unit 736',
    title: 'Unit 736',
    type: 'unit',
    rarity: 'Legendary',
    cost: 7,
    stats: { atk: 6, hp: 6, maxHp: 6 },
    subtype: 'Cybernetic',
    text: 'OnPlay: 4 Dmg to all non-Megacorp. Shield.',
    faction: 'Megacorp',
    baseAsset: 'unit_734',
    lore: "A relic of the old wars, reactivated.",
    cosmetics: [
      { id: 'unit_734_alt1', name: 'Alt Appearance 1', asset: 'unit_734_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'unit_734_alt2', name: 'Alt Appearance 2', asset: 'unit_734_alt2', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'unit_734_alt3', name: 'Alt Appearance 3', asset: 'unit_734_alt3', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('damage', 'onPlay', 4, 'all_units', 'exclude_faction:Megacorp'),
      m('shield', 'constant')
    ]
  }
];
