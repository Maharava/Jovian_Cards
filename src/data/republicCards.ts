import type { Card } from '../types';
import { m } from './cardUtils';

/**
 * Republic Faction Cards (Consolidated - No Tiers)
 *
 * The United Republic of Sol - The colossal, ancient, and terrifyingly bureaucratic
 * government of humanity. Slow to act, but overwhelming when fully authorized.
 *
 * Card Count: 18 unique cards
 * - Common: 7 cards
 * - Uncommon: 5 cards
 * - Rare: 4 cards
 * - Legendary: 2 cards
 */

export const REPUBLIC_CARDS: Card[] = [
  // ==================== COMMON CARDS (7) ====================

  // Torres (Recruit) - Common
  {
    id: 'torres',
    name: 'Torres',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Guard',
    faction: 'Republic',
    baseAsset: 'torres',
    lore: "Maya Torres survived basic training through sheer stubbornness. She holds the line because the regulations say so, and Torres always follows regulations.",
    cosmetics: [
      { id: 'torres_alt1', name: 'Alt Appearance 1', asset: 'torres_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'torres_alt2', name: 'Alt Appearance 2', asset: 'torres_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('guard', 'constant')]
  },

  // Lira Chen (Cadet) - Common
  {
    id: 'lira_chen',
    name: 'Lira Chen',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Psionic',
    text: 'OnPlay: Deal 2 damage to a random enemy unit. Turn End: Restore 1 HP to self.',
    faction: 'Republic',
    baseAsset: 'lira_chen',
    lore: "Lira Chen tested positive for psychic potential at age six. Now sixteen, she's still learning to control the fire that burns in her mind.",
    cosmetics: [
      { id: 'lira_chen_alt1', name: 'Alt Appearance 1', asset: 'lira_chen_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'lira_chen_alt2', name: 'Alt Appearance 2', asset: 'lira_chen_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [
      m('spark', 'onPlay', 2, 'random_enemy'),
      m('heal', 'onTurnEnd', 1, 'self')
    ]
  },

  // Protocol Droid (P-Series Droid) - Common
  {
    id: 'protocol_droid',
    name: 'Protocol Droid',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 0, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: 'Turn End: Heal 1 to a random ally.',
    faction: 'Republic',
    baseAsset: 'protocol_droid',
    lore: "Programmed with 47,000 regulations and emergency medical protocols. It cites the relevant statute before applying bandages.",
    cosmetics: [
      { id: 'protocol_droid_alt1', name: 'Alt Appearance 1', asset: 'protocol_droid_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'protocol_droid_alt2', name: 'Alt Appearance 2', asset: 'protocol_droid_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('heal', 'onTurnEnd', 1, 'random_ally')]
  },

  // James Park (Logistics Clerk) - Common
  {
    id: 'james_park',
    name: 'James Park',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Reveal 1 random card from enemy hand.',
    faction: 'Republic',
    baseAsset: 'james_park',
    lore: "James Park manages inventory with obsessive precision. Every bullet is accounted for, in triplicate. He knows where everything is—eventually.",
    cosmetics: [
      { id: 'james_park_alt1', name: 'Alt Appearance 1', asset: 'james_park_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'james_park_alt2', name: 'Alt Appearance 2', asset: 'james_park_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('scout', 'onPlay', 1, 'random_enemy')]
  },

  // Officer Volkov (Security Personnel) - Common
  {
    id: 'officer_volkov',
    name: 'Officer Volkov',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Guard',
    faction: 'Republic',
    baseAsset: 'officer_volkov',
    lore: "Sarah Volkov is authorized to use non-lethal force to maintain civil order, pending review by the Use of Force Committee.",
    cosmetics: [
      { id: 'officer_volkov_alt1', name: 'Alt Appearance 1', asset: 'officer_volkov_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'officer_volkov_alt2', name: 'Alt Appearance 2', asset: 'officer_volkov_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('guard', 'constant')]
  },

  // Advocate Cross (Junior Advocate) - Common
  {
    id: 'advocate_cross',
    name: 'Advocate Cross',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'OnPlay: Set a random enemy\'s ATK to 0 for 2 turns.',
    faction: 'Republic',
    baseAsset: 'advocate_cross',
    lore: "Helena Cross is armed with preliminary injunctions and temporary restraining orders. The paperwork alone is overwhelming.",
    cosmetics: [
      { id: 'advocate_cross_alt1', name: 'Alt Appearance 1', asset: 'advocate_cross_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'advocate_cross_alt2', name: 'Alt Appearance 2', asset: 'advocate_cross_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },

  // Republic Drone (Sentinel Drone) - Common
  {
    id: 'republic_drone',
    name: 'Republic Drone',
    type: 'unit',
    rarity: 'Common',
    cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 },
    subtype: 'Cybernetic',
    text: 'Requisition 3: Gain +1/+1 permanently.',
    faction: 'Republic',
    baseAsset: 'republic_drone',
    lore: "Mass-produced automated defense units. Cheap, reliable, and utterly replaceable. When authorization protocols activate, defense systems engage.",
    cosmetics: [
      { id: 'republic_drone_alt1', name: 'Alt Appearance 1', asset: 'republic_drone_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'republic_drone_alt2', name: 'Alt Appearance 2', asset: 'republic_drone_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('buff', 'passive', 1, 'self', 'requisition:3', 1)]
  },

  // ==================== UNCOMMON CARDS (5) ====================

  // Marcus Reeves (Squad Leader) - Uncommon
  {
    id: 'marcus_reeves',
    name: 'Marcus Reeves',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Turn End: Give a random ally +1 HP/MaxHP permanently.',
    faction: 'Republic',
    baseAsset: 'marcus_reeves',
    lore: "Marcus Reeves knows that keeping troops alive means more paperwork. So Reeves keeps them alive. Simple as that.",
    cosmetics: [
      { id: 'marcus_reeves_alt1', name: 'Alt Appearance 1', asset: 'marcus_reeves_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'marcus_reeves_alt2', name: 'Alt Appearance 2', asset: 'marcus_reeves_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('rally', 'onTurnEnd', 1, 'random_ally')]
  },

  // Elvie Webb (Mind Warden) - Uncommon
  {
    id: 'elvie_webb',
    name: 'Elvie Webb',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Psionic',
    text: 'OnPlay: Stun target enemy unit for 1 turn.',
    faction: 'Republic',
    baseAsset: 'elvie_webb',
    lore: "Elvie Webb projects psychic force that overwhelms the nervous system. She's authorized for crowd control operations and doesn't enjoy it.",
    cosmetics: [
      { id: 'elvie_webb_alt1', name: 'Alt Appearance 1', asset: 'elvie_webb_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'elvie_webb_alt2', name: 'Alt Appearance 2', asset: 'elvie_webb_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('stun', 'onPlay', 1, 'target_enemy')]
  },

  // Councilor Zhang (Committee Member) - Uncommon
  {
    id: 'councilor_zhang',
    name: 'Councilor Zhang',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 2,
    stats: { atk: 0, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Requisition 3: Draw 1 card at end of turn.',
    faction: 'Republic',
    baseAsset: 'councilor_zhang',
    lore: "Li Zhang spent twelve years drafting the current Energy Allocation Act. The paperwork finally paid off with a committee seat.",
    cosmetics: [
      { id: 'councilor_zhang_alt1', name: 'Alt Appearance 1', asset: 'councilor_zhang_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'councilor_zhang_alt2', name: 'Alt Appearance 2', asset: 'councilor_zhang_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('draw', 'passive', 1, 'self', 'requisition:3')]
  },

  // Dr. Singh (Field Surgeon) - Uncommon
  {
    id: 'dr_singh',
    name: 'Dr. Singh',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Heal 3 to target ally.',
    faction: 'Republic',
    baseAsset: 'dr_singh',
    lore: "Amara Singh was trained in emergency medicine and authorized to perform triage without prior approval. A rare exception in the Republic.",
    cosmetics: [
      { id: 'dr_singh_alt1', name: 'Alt Appearance 1', asset: 'dr_singh_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'dr_singh_alt2', name: 'Alt Appearance 2', asset: 'dr_singh_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },

  // Chief Engineer Kozlov (Repair Tech) - Uncommon
  {
    id: 'chief_engineer_kozlov',
    name: 'Chief Engineer Kozlov',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Cybernetic',
    text: 'Turn End: Restore 2 HP to a random damaged Cybernetic ally.',
    faction: 'Republic',
    baseAsset: 'chief_engineer_kozlov',
    lore: "Sofia Kozlov keeps the machines running with standard-issue tools and regulation maintenance procedures. Nothing fancy, just reliable.",
    cosmetics: [
      { id: 'chief_engineer_kozlov_alt1', name: 'Alt Appearance 1', asset: 'chief_engineer_kozlov_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'chief_engineer_kozlov_alt2', name: 'Alt Appearance 2', asset: 'chief_engineer_kozlov_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('repair', 'onTurnEnd', 2, 'random_ally', 'subtype:Cybernetic')]
  },

  // ==================== RARE CARDS (4) ====================

  // Commander Drake (Field Commander) - Rare
  {
    id: 'commander_drake',
    name: 'Commander Drake',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 5, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Deal 3 damage to the enemy Commander. Requisition 4: Add an Aerial Strike Tactic to your hand.',
    faction: 'Republic',
    baseAsset: 'commander_drake',
    lore: "Victoria Drake rose through the ranks on merit and an obsessive attention to proper procedure. She's earned every promotion. Commander Drake is authorized to make tactical decisions without prior committee review—a privilege few officers possess. She doesn't waste it.",
    cosmetics: [
      { id: 'commander_drake_alt1', name: 'Alt Appearance 1', asset: 'commander_drake_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'commander_drake_alt2', name: 'Alt Appearance 2', asset: 'commander_drake_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('spark', 'onPlay', 3, 'target_enemy_commander'),
      m('add_card', 'passive', 0, 'self', 'requisition:4:tactic_aerial_strike')
    ]
  },

  // Vera Frost (Thought Executioner) - Rare
  {
    id: 'vera_frost',
    name: 'Vera Frost',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 4, hp: 4, maxHp: 4 },
    subtype: 'Psionic',
    text: 'OnPlay: Deal 2 damage to all enemies. WhenAttacked: Deal 2 damage to attacker.',
    faction: 'Republic',
    baseAsset: 'vera_frost',
    lore: "Vera Frost is the Republic's most dangerous psychic weapon. When unleashed, minds shatter like glass under her assault. Protected by a psychic feedback loop, Inquisitor Frost punishes anyone foolish enough to strike her. The pain is... instructive.",
    cosmetics: [
      { id: 'vera_frost_alt1', name: 'Alt Appearance 1', asset: 'vera_frost_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'vera_frost_alt2', name: 'Alt Appearance 2', asset: 'vera_frost_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('spark', 'onPlay', 2, 'all_enemies'),
      m('spark', 'onDamageTaken', 2, 'random_enemy')
    ]
  },

  // Senator Okoye (Senior Senator) - Rare
  {
    id: 'senator_okoye',
    name: 'Senator Okoye',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 0, hp: 6, maxHp: 6 },
    subtype: 'Biological',
    text: 'Shield. Turn Start: Gain 1 Energy. Requisition 7: All other Republic units gain +1/+1 permanently.',
    faction: 'Republic',
    baseAsset: 'senator_okoye',
    lore: "Amaka Okoye represents twelve billion constituents and holds the power to allocate vast resources. Eventually. The wheels turn slowly. Senator Okoye has spent decades building political capital. When she spends it, things happen. Mountains move, committees convene, policies shift.",
    cosmetics: [
      { id: 'senator_okoye_alt1', name: 'Alt Appearance 1', asset: 'senator_okoye_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'senator_okoye_alt2', name: 'Alt Appearance 2', asset: 'senator_okoye_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('shield', 'constant'),
      m('gain_energy', 'onTurnStart', 1, 'self'),
      m('buff', 'passive', 1, 'all_allies', 'requisition:7:faction:Republic', 1)
    ]
  },

  // Commander Voss (Presidential Guard) - Rare
  {
    id: 'commander_voss',
    name: 'Commander Voss',
    type: 'unit',
    rarity: 'Rare',
    cost: 5,
    stats: { atk: 4, hp: 5, maxHp: 5 },
    subtype: 'Biological',
    text: 'Guard. Shield. Requisition 5: Spawn a 2/2 Senate Guard token.',
    faction: 'Republic',
    baseAsset: 'commander_voss',
    lore: "Lucia Voss was selected from the finest soldiers in the Republic. Her armor is pristine, her discipline absolute, her loyalty unquestioned. Commander Voss protects the highest offices of the Republic with unwavering loyalty and cutting-edge equipment. She's never failed a protection detail.",
    cosmetics: [
      { id: 'commander_voss_alt1', name: 'Alt Appearance 1', asset: 'commander_voss_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'commander_voss_alt2', name: 'Alt Appearance 2', asset: 'commander_voss_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('guard', 'constant'),
      m('shield', 'constant'),
      m('summon', 'passive', 1, 'self', 'requisition:5:senate_guard')
    ]
  },

  // ==================== LEGENDARY CARDS (2) ====================

  // Admiral Chen (Fleet Admiral) - Legendary
  {
    id: 'admiral_chen',
    name: 'Admiral Chen',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 5, hp: 8, maxHp: 8 },
    subtype: 'Biological',
    text: 'Guard. Shield. Requisition 6: At end of turn, deal 2 damage to all enemies.',
    faction: 'Republic',
    baseAsset: 'admiral_chen',
    lore: "Sorita Chen commands the Third Fleet with tactical brilliance, hampered only by the need for Senate approval on every engagement. She wins despite the bureaucracy. When the fleet is fully authorized, Vice Admiral Chen's strategic genius transforms the battlefield. She sees ten moves ahead. Fleet Admiral Chen is the Supreme Commander of Republic Naval Forces. When her orders are executed, star systems fall in line. No exceptions. When authorization codes finally clear, the fleet opens fire with devastating precision.",
    cosmetics: [
      { id: 'admiral_chen_alt1', name: 'Alt Appearance 1', asset: 'admiral_chen_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'admiral_chen_alt2', name: 'Alt Appearance 2', asset: 'admiral_chen_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('guard', 'constant'),
      m('shield', 'constant'),
      m('spark', 'passive', 2, 'all_enemies', 'requisition:6')
    ]
  },

  // Captain Aria Kane (Sentinel Prime) - Legendary
  {
    id: 'captain_aria_kane',
    name: 'Captain Aria Kane',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 8, hp: 6, maxHp: 6 },
    subtype: 'Biological',
    text: 'Rush. Snipe. Requisition 5: First Strike.',
    faction: 'Republic',
    baseAsset: 'captain_aria_kane',
    lore: "The youngest captain ever assigned to Senate Guard. Aria Kane earned her position through lethal precision, not politics. She's never missed. When threats arise, Captain Kane is the blade that cuts through them. Fast, deadly, and utterly loyal to the Republic. She doesn't hesitate. The living embodiment of Republic justice. Every kill sends a message: the Republic protects its own. Captain Kane is that message, written in blood. When authorization for lethal force is granted, her strikes become unstoppable—she eliminates targets before they can even respond.",
    cosmetics: [
      { id: 'captain_aria_kane_alt1', name: 'Alt Appearance 1', asset: 'captain_aria_kane_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'captain_aria_kane_alt2', name: 'Alt Appearance 2', asset: 'captain_aria_kane_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('snipe', 'constant'),
      m('first_strike', 'passive', 0, 'self', 'requisition:5')
    ]
  }
];
