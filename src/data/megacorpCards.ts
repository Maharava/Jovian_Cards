import type { Card } from '../types';
import { m } from './cardUtils';

/**
 * Megacorp Faction Cards (Consolidated - No Tiers)
 *
 * The Megacorporation - A ruthless corporate empire that values efficiency,
 * control, and profit above all else.
 *
 * Card Count: 18 unique cards
 * - Common: 6 cards
 * - Uncommon: 4 cards
 * - Rare: 5 cards
 * - Legendary: 3 cards
 */

export const MEGACORP_CARDS: Card[] = [
  // ==================== COMMON CARDS (6) ====================

  // Mining Drone - Common
  {
    id: 'corp_drone',
    name: 'Mining Drone',
    type: 'unit',
    rarity: 'Common',
    cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 },
    subtype: 'Cybernetic',
    text: 'Recycle 1 (When this dies, gain 1 energy).',
    faction: 'Megacorp',
    baseAsset: 'mining_drone',
    lore: "Solarin Industries' most reliable asset, designed for the zero-g of the Asteroid Belt, it is cheap, expendable, and entirely replaceable. Upgraded with high-torque servos for maximum throughput, it works until the gears melt or the battery dies, whichever comes first. When a drone is too damaged for repair, the \"Catastrophic Failure Protocol\" ensures it leaves nothing behind for the competition.",
    cosmetics: [
      { id: 'mining_drone_alt1', name: 'Alt Appearance 1', asset: 'mining_drone_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'mining_drone_alt2', name: 'Alt Appearance 2', asset: 'mining_drone_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('recycle', 'onDeath', 1, 'self')]
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
    text: 'Guard. OnPlay: If you control another Megacorp unit, gain +1/+1.',
    faction: 'Megacorp',
    baseAsset: 'corp_bot',
    lore: "Standard perimeter defense unit.",
    cosmetics: [
      { id: 'corp_bot_alt1', name: 'Alt Appearance 1', asset: 'corp_bot_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_bot_alt2', name: 'Alt Appearance 2', asset: 'corp_bot_alt2', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_bot_alt3', name: 'Alt Appearance 3', asset: 'corp_bot_alt3', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [
      m('guard', 'constant'),
      m('buff', 'onPlay', 1, 'self', 'condition:has_other_megacorp', 1)
    ]
  },

  // Corp Guard - Common
  {
    id: 'corp_guard',
    name: 'Corp Guard',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Quota 3: Guard',
    faction: 'Megacorp',
    baseAsset: 'corp_guard',
    lore: "Minimum wage and maximum risk are the standard terms of a corporate contract, and these guards are the first line of defense against hostile acquisitions and takeovers. As veterans of the boardroom skirmishes who have survived more than a year, they are equipped with better armor and a cynicism that only combat can provide. The Site Warden oversees facility security with an iron grip, responsible for ensuring that productivity never dips, even under fire.",
    cosmetics: [
      { id: 'corp_guard_alt1', name: 'Alt Appearance 1', asset: 'corp_guard_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'corp_guard_alt2', name: 'Alt Appearance 2', asset: 'corp_guard_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('guard', 'passive', 0, 'self', 'quota:3')]
  },

  // K9X Unit - Common
  {
    id: 'corp_hound',
    name: 'K9X Unit',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 },
    subtype: 'Cybernetic',
    text: 'Rush. Quota 4: Snipe',
    faction: 'Megacorp',
    baseAsset: 'k9x_unit',
    lore: "A canine robot encased in high-impact composites, it is a loyal hunter that never tires and never loses the scent of a debtor. Upgraded with thermal sensors and a predatory algorithm that mimics the wolves of ancient Earth, it can track a target through a vacuum-sealed station. The pack leader of the corporate kennel, the Alpha runs on a swarm-mind algorithm; when it barks, every drone in the sector joins the hunt.",
    cosmetics: [
      { id: 'k9x_unit_alt1', name: 'Alt Appearance 1', asset: 'k9x_unit_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'k9x_unit_alt2', name: 'Alt Appearance 2', asset: 'k9x_unit_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('snipe', 'passive', 0, 'self', 'quota:4')
    ]
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

  // ==================== UNCOMMON CARDS (4) ====================

  // Alexandrea - Uncommon
  {
    id: 'corp_manager',
    name: 'Alexandrea',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 0, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Turn End: Encourage 1 - Give a random ally +1 ATK. Quota 4: TurnEnd: Rally 1 (random ally)',
    faction: 'Megacorp',
    baseAsset: 'alexandrea',
    lore: "\"Get back to work!\" is the only command that matters, and the supervisor is there to ensure that every second of company time is accounted for. As a manager, productivity metrics are monitored in real-time, and if the numbers dip, Alexandrea is authorized to apply motivational measures to the workforce. In the eyes of the board, all are replaceable line items; as an executive, Alexandrea doesn't see people, she sees resources to be optimized or liquidated.",
    cosmetics: [
      { id: 'alexandrea_alt1', name: 'Alt Appearance 1', asset: 'alexandrea_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'alexandrea_alt2', name: 'Alt Appearance 2', asset: 'alexandrea_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [
      m('encourage', 'onTurnEnd', 1, 'random_ally'),
      m('rally', 'onTurnEnd', 1, 'random_ally', 'quota:4')
    ]
  },

  // Ximena - Uncommon
  {
    id: 'corp_liquidator',
    name: 'Ximena',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 4, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Quota 4: +2/+2 while Quota is met.',
    faction: 'Megacorp',
    baseAsset: 'ximena',
    lore: "Sent when a branch is underperforming or a settlement is in default, Ximena is the herald of a hostile takeover, arriving with a briefcase and a gun. As the Clean-Up Crew, they leave no witnesses and no paper trail; when they arrive, the past is erased to make room for the new quarterly report. As a Black Ops Agent, they don't exist on any payroll and answer only to the Board, the unseen hand of corporate power executing orders that never officially happened.",
    cosmetics: [
      { id: 'ximena_alt1', name: 'Alt Appearance 1', asset: 'ximena_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'ximena_alt2', name: 'Alt Appearance 2', asset: 'ximena_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('buff', 'constant', 2, 'self', 'quota:4', 2)]
  },

  // Hacking Uplink - Uncommon
  {
    id: 'enemy_uplink',
    name: 'Hacking Uplink',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: 'Turn End: Hack 1 (random enemy) - Reduce ATK by 1 for 2 turns. Quota 4: Hack 2 instead.',
    faction: 'Megacorp',
    baseAsset: 'black_betty',
    lore: "Broadcasting malware across unsecured channels to disrupt local infrastructure, it is a digital parasite that feeds on the enemy's sensors. As a specialized node, it can flood the frequency with white noise and logic bombs, rendering enemy drones blind and their masters helpless. The central hub for a local drone control, it can override a station's security with a single packet, a poltergeist in the machine.",
    cosmetics: [
      { id: 'black_betty_alt1', name: 'Alt Appearance 1', asset: 'black_betty_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'black_betty_alt2', name: 'Alt Appearance 2', asset: 'black_betty_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy', 'quota:4:2')]
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
    text: 'OnPlay: Summon Worker Drone.',
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

  // ==================== RARE CARDS (5) ====================

  // Mr. Harrison - Rare
  {
    id: 'corp_slaver',
    name: 'Mr. Harrison',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 4, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Mind Control 3 (Take control of enemy unit with ATK ≤ 3)',
    faction: 'Megacorp',
    baseAsset: 'mr_harrison',
    lore: "\"There's a clause in your contract...\" By the time you've read it, Harrison owns you. A debt collector turned hostile acquisitions specialist, he doesn't just seize assets—he seizes people. His neural control collars turn debtors into corporate property, their minds rewritten to serve Ira Corp until their contracts are paid in full. Which, of course, they never are.",
    cosmetics: [
      { id: 'mr_harrison_alt1', name: 'Alt Appearance 1', asset: 'mr_harrison_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'mr_harrison_alt2', name: 'Alt Appearance 2', asset: 'mr_harrison_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [m('mind_control', 'onPlay', 3, 'target_enemy')]
  },

  // Solarin Control - Rare
  {
    id: 'solarin_control',
    name: 'Solarin Control',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 },
    subtype: 'Cybernetic',
    text: 'Turn Start: Gain 1 Energy. Turn End: Repair 1 Cybernetic. Quota 4: Gain 2 energy instead.',
    faction: 'Megacorp',
    baseAsset: 'solarin_control',
    lore: "Managing the flow of power through the local grid, it is the invisible pulse of the corporate machine, ensuring the lights stay on. As a Process Manager, it optimizes energy distribution across the entire sector, able to reroute power from life support to weapon systems in a heartbeat. The Swarm Manager is a massive AI core that coordinates the energy needs of a thousand units, the brain that keeps the corporate swarm hungry and lethal.",
    cosmetics: [
      { id: 'solarin_control_alt1', name: 'Alt Appearance 1', asset: 'solarin_control_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'solarin_control_alt2', name: 'Alt Appearance 2', asset: 'solarin_control_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('gain_energy', 'onTurnStart', 1, 'self', 'quota:4:2'),
      m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')
    ]
  },

  // Director Kiz - Rare
  {
    id: 'director_kiz',
    name: 'Director Kiz',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Give all other Megacorp units +1/+1 and Rush',
    faction: 'Megacorp',
    baseAsset: 'director_kiz',
    lore: "The head of regional operations for the Red Planet, Kiz ensures that the mines are productive and the workers are sufficiently 'encouraged'. Promoted to the heart of the Republic, he now navigates the treacherous waters of the Senate, bribing, lobbying and bullying with equal skill to ensure lucrative government contracts flow. When hostile acquisitions become the only option, Kiz takes the helm, viewing the entire system as a spreadsheet to be balanced with blood.",
    cosmetics: [
      { id: 'director_kiz_alt1', name: 'Alt Appearance 1', asset: 'director_kiz_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'director_kiz_alt2', name: 'Alt Appearance 2', asset: 'director_kiz_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
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

  // Director Vance - Legendary
  {
    id: 'director_vance',
    name: 'Director Vance',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 2, hp: 8, maxHp: 8 },
    subtype: 'Biological',
    text: 'Shield. Passive: When you play a Megacorp unit, give it +1/+1. Quota 4: Give it +2/+2 instead.',
    faction: 'Megacorp',
    baseAsset: 'director_vance',
    lore: "Vance oversees the credit flow of the entire corporation, knowing that the Board and the Law are just tools to be used for profit. Controlling the psychic investments and assets of Ira Corp, she is no slouch in power herself. Arguably the most powerful Director in Ira Corp, Vance orchestrates the acquisition of the Jovian sisters itself. But in the dark of the night, she hears the Whispers, and is afraid.",
    cosmetics: [
      { id: 'director_vance_alt1', name: 'Alt Appearance 1', asset: 'director_vance_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'director_vance_alt2', name: 'Alt Appearance 2', asset: 'director_vance_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('shield', 'constant'),
      m('buff', 'passive', 1, 'all_allies', 'faction:Megacorp', 1),
      m('buff', 'passive', 1, 'all_allies', 'quota:4:faction:Megacorp', 1)
    ]
  },

  // The Auditor - Legendary
  {
    id: 'the_auditor',
    name: 'The Auditor',
    type: 'unit',
    rarity: 'Legendary',
    cost: 5,
    stats: { atk: 5, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Snipe. OnPlay: Disarm 2 (target enemy). OnAttack: If target has 0 ATK, destroy it.',
    faction: 'Megacorp',
    baseAsset: 'the_auditor',
    lore: "You have been found wanting, and the Auditor is here to deliver the notice. She moves through the shadows of the high-sec stations, an invisible judge of corporate performance; when the Shadow is seen, the trial is already over. With no name, no face, and no records, the Auditor is the final firing notice for those who have failed the Board, a ghost that executes without a word.",
    cosmetics: [
      { id: 'the_auditor_alt1', name: 'Alt Appearance 1', asset: 'the_auditor_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'the_auditor_alt2', name: 'Alt Appearance 2', asset: 'the_auditor_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('snipe', 'constant'),
      m('disarm', 'onPlay', 2, 'target_enemy'),
      m('assassinate', 'onAttack', 1, 'target_enemy', 'condition:zero_atk')
    ]
  },

  // Unit 734 - Legendary (T3 stats)
  {
    id: 'unit_734',
    name: 'Unit 734',
    title: 'Unit 734',
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
