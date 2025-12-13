import type { Card } from '../types';

// Helper to keep definitions clean
const m = (
  type: import('../types').MechanicType, 
  trigger: import('../types').TriggerType = 'onPlay', 
  value?: number,
  target?: import('../types').Mechanic['target'], 
  payload?: string,
  secondaryValue?: number
): import('../types').Mechanic => ({
  type, trigger, value, target, payload, secondaryValue
});

export const HERO_CARDS: Card[] = [
  // --- ELARA (Scout/Draw) --- Uncommon
  {
    id: 'elara_t1', name: 'Elara, Scanner', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Scout 1.', faction: 'Jovian',
    baseAsset: 'elara', 
    mechanics: [m('scout', 'onPlay', 1)]
  },
  {
    id: 'elara_t2', name: 'Elara, Analyst', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Scout 1, Draw 1', faction: 'Jovian',
    baseAsset: 'elara', 
    mechanics: [m('scout', 'onPlay', 1), m('draw', 'onPlay', 1, 'self')]
  },
  {
    id: 'elara_t3', name: 'Elara, Omniscient', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Scout 1, Draw 2', faction: 'Jovian',
    baseAsset: 'elara', 
    mechanics: [m('scout', 'onPlay', 1), m('draw', 'onPlay', 2, 'self')]
  },

  // --- EUROPA (Stun/Spark) --- Rare
  {
    id: 'europa_t1', name: 'Europa, Adept', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'Stun. Spark 2', faction: 'Jovian',
    baseAsset: 'europa', 
    mechanics: [m('stun', 'onPlay', 1, 'random_enemy'), m('spark', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'europa_t2', name: 'Europa, Mentalist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'Stun. Spark 3', faction: 'Jovian',
    baseAsset: 'europa', 
    mechanics: [m('stun', 'onPlay', 1, 'random_enemy'), m('spark', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'europa_t3', name: 'Europa, Oracle', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'Stun All. Spark 2 All', faction: 'Jovian',
    baseAsset: 'europa', 
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('spark', 'onPlay', 2, 'all_enemies')]
  },

  // --- IO (Rally) --- Rare
  {
    id: 'io_t1', name: 'Io, Mechanic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rally', faction: 'Jovian',
    baseAsset: 'io', 
    mechanics: [m('rally', 'onTurnEnd', 1, 'random_ally')]
  },
  {
    id: 'io_t2', name: 'Io, Technomancer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rally 2', faction: 'Jovian',
    baseAsset: 'io', 
    mechanics: [m('rally', 'onTurnEnd', 2, 'random_ally')]
  },
  {
    id: 'io_t3', name: 'Io, Architect', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rally 2 (All Allies)', faction: 'Jovian',
    baseAsset: 'io', 
    mechanics: [m('rally', 'onTurnEnd', 2, 'all_allies')]
  },

  // --- LYSITHEA (Hack) --- Common
  {
    id: 'lysithea_t1', name: 'Lysithea, Glitch', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Hack 1.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    mechanics: [m('hack', 'onTurnStart', 1, 'random_enemy')]
  },
  {
    id: 'lysithea_t2', name: 'Lysithea, Unstable', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Hack 2.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    mechanics: [m('hack', 'onTurnStart', 2, 'random_enemy')]
  },
  {
    id: 'lysithea_t3', name: 'Lysithea, Singularity', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Hack 3.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    mechanics: [m('hack', 'onTurnStart', 3, 'random_enemy')]
  },

  // --- PASIPHAE (Swap/Rush) --- Rare
  {
    id: 'pasiphae_t1', name: 'Pasiphae, Ace', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Swap (random ally).', faction: 'Jovian',
    baseAsset: 'pasiphae', 
    mechanics: [m('rush', 'constant'), m('swap', 'onPlay', 1, 'random_ally')]
  },
  {
    id: 'pasiphae_t2', name: 'Pasiphae, Wingman', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Swap (random ally).', faction: 'Jovian',
    baseAsset: 'pasiphae', 
    mechanics: [m('rush', 'constant'), m('swap', 'onPlay', 1, 'random_ally')]
  },
  {
    id: 'pasiphae_t3', name: 'Pasiphae, Legend', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Swap. Gear Up (+1/+1).', faction: 'Jovian', 
    baseAsset: 'pasiphae', 
    mechanics: [m('rush', 'constant'), m('swap', 'onPlay', 1, 'random_ally'), m('support', 'onPlay', 1, 'random_ally', undefined, 1)]
  },

  // --- PRAXIDIKE (Decoy) --- Rare
  {
    id: 'praxidike_t1', name: 'Praxidike, Decoy', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Decoy.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1')]
  },
  {
    id: 'praxidike_t2', name: 'Praxidike, Illusionist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Decoy. Draw 1.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1'), m('draw', 'onPlay', 1, 'self')]
  },
  {
    id: 'praxidike_t3', name: 'Praxidike, Mastermind', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Decoy. Draw 1. Rush.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1'), m('draw', 'onPlay', 1, 'self'), m('rush', 'constant')]
  },

  // --- SINOPE (Disarm) --- Uncommon
  {
    id: 'sinope_t1', name: 'Sinope, Envoy', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Disarm 2 (random enemy).', faction: 'Jovian',
    baseAsset: 'sinope', 
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'sinope_t2', name: 'Sinope, Ambassador', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 1, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Disarm 3 (random enemy).', faction: 'Jovian',
    baseAsset: 'sinope', 
    mechanics: [m('disarm', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'sinope_t3', name: 'Sinope, Peacemaker', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 2, hp: 8, maxHp: 8 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Disarm 2 All enemies.', faction: 'Jovian',
    baseAsset: 'sinope', 
    mechanics: [m('disarm', 'onPlay', 2, 'all_enemies')]
  },

  // --- THEBE (Snipe) --- Common
  {
    id: 'thebe_t1', name: 'Thebe, Scout', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Jovian',
    baseAsset: 'thebe', 
    mechanics: []
  },
  {
    id: 'thebe_t2', name: 'Thebe, Sniper', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Snipe.', faction: 'Jovian',
    baseAsset: 'thebe', 
    mechanics: [m('snipe', 'constant')]
  },
  {
    id: 'thebe_t3', name: 'Thebe, Deadeye', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 7, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Snipe.', faction: 'Jovian',
    baseAsset: 'thebe', 
    mechanics: [m('snipe', 'constant')]
  },
  
  // --- NEW JOVIANS ---
  {
    id: 'ganymede_t1', name: 'Ganymede, Fighter', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Rage 1.', faction: 'Jovian', baseAsset: 'ganymede',
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1)]
  },
  {
    id: 'ganymede_t2', name: 'Ganymede, Veteran', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Rage 1.', faction: 'Jovian', baseAsset: 'ganymede',
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1)]
  },
  {
    id: 'ganymede_t3', name: 'Ganymede, Warlord', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. Rage 1. Double Attack.', faction: 'Jovian', baseAsset: 'ganymede',
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1), m('double_attack', 'constant')]
  },

  {
    id: 'himalia_t1', name: 'Himalia, Shield', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Jovian', baseAsset: 'himalia',
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'himalia_t2', name: 'Himalia, Bulwark', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard. Thorns 1.', faction: 'Jovian', baseAsset: 'himalia',
    mechanics: [m('guard', 'constant'), m('thorns', 'constant', 1)]
  },
  {
    id: 'himalia_t3', name: 'Himalia, Fortress', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard. Thorns 2.', faction: 'Jovian', baseAsset: 'himalia',
    mechanics: [m('guard', 'constant'), m('thorns', 'constant', 2)]
  },

  {
    id: 'leda_t1', name: 'Leda, Scavenger', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Jovian', baseAsset: 'leda',
    mechanics: []
  },
  {
    id: 'leda_t2', name: 'Leda, Hoarder', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'OnPlay: Add Tactic.', faction: 'Jovian', baseAsset: 'leda',
    mechanics: [m('add_random_tactic', 'onPlay', 1, 'self')]
  },
  {
    id: 'leda_t3', name: 'Leda, Quartermaster', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Common',
    text: 'OnPlay: Add 2 Tactics.', faction: 'Jovian', baseAsset: 'leda',
    mechanics: [m('add_random_tactic', 'onPlay', 2, 'self')]
  },

  {
    id: 'metis_t1', name: 'Metis, Empath', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 1, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Heal 3 to target.', faction: 'Jovian', baseAsset: 'metis',
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },
  {
    id: 'metis_t2', name: 'Metis, Healer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 2, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Heal 5 to target.', faction: 'Jovian', baseAsset: 'metis',
    mechanics: [m('heal', 'onPlay', 5, 'target_ally')]
  },
  {
    id: 'metis_t3', name: 'Metis, Saint', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 7, maxHp: 7 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Heal 99 to target.', faction: 'Jovian', baseAsset: 'metis',
    mechanics: [m('heal', 'onPlay', 99, 'target_ally')]
  },

  {
    id: 'amalthea_t1', name: 'Amalthea, Soldier', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Jovian', baseAsset: 'amalthea',
    mechanics: []
  },
  {
    id: 'amalthea_t2', name: 'Amalthea, Guard', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Jovian', baseAsset: 'amalthea',
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'amalthea_t3', name: 'Amalthea, Sentinel', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard. Heal 1 self turn end.', faction: 'Jovian', baseAsset: 'amalthea',
    mechanics: [m('guard', 'constant'), m('heal', 'onTurnEnd', 1, 'self')]
  },

  {
    id: 'callisto_t1', name: 'Callisto, Brawler', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Rage.', faction: 'Jovian', baseAsset: 'callisto',
    mechanics: [m('rage', 'onAttack', 1)]
  },
  {
    id: 'callisto_t2', name: 'Callisto, Berserker', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 5, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Rage. Rush.', faction: 'Jovian', baseAsset: 'callisto',
    mechanics: [m('rage', 'onAttack', 1), m('rush', 'constant')]
  },
  {
    id: 'callisto_t3', name: 'Callisto, Fury', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Rage. Rush.', faction: 'Jovian', baseAsset: 'callisto',
    mechanics: [m('rage', 'onAttack', 1), m('rush', 'constant')]
  },

  {
    id: 'carpo_t1', name: 'Carpo, Specialist', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Gear Up (+1/+1).', faction: 'Jovian', baseAsset: 'carpo',
    mechanics: [m('support', 'onPlay', 1, 'target_ally', undefined, 1)]
  },
  {
    id: 'carpo_t2', name: 'Carpo, Engineer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Gear Up (+2/+2).', faction: 'Jovian', baseAsset: 'carpo',
    mechanics: [m('support', 'onPlay', 2, 'target_ally', undefined, 2)]
  },
  {
    id: 'carpo_t3', name: 'Carpo, Machinist', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Gear Up (+3/+3).', faction: 'Jovian', baseAsset: 'carpo',
    mechanics: [m('support', 'onPlay', 3, 'target_ally', undefined, 3)]
  }
];

export const TACTIC_CARDS: Card[] = [
  {
    id: 'tactic_power_shot', name: 'Power Shot', type: 'tactic', tier: 1, cost: 2,
    text: 'Deal 3 damage to an enemy unit.', faction: 'Neutral', rarity: 'Common',
    baseAsset: 'power_shot',
    mechanics: [m('damage', 'onPlay', 3, 'target_enemy')]
  },
  {
    id: 'tactic_nano_repair', name: 'Nano-Repair', type: 'tactic', tier: 1, cost: 2,
    text: 'Restore 2 Health to a unit.', faction: 'Confederate', rarity: 'Common',
    baseAsset: 'nano_repair',
    mechanics: [m('heal', 'onPlay', 2, 'target_ally')]
  },
  {
    id: 'tactic_emp_blast', name: 'EMP Blast', type: 'tactic', tier: 1, cost: 3,
    text: 'Stun an enemy unit.', faction: 'Republic', rarity: 'Uncommon',
    baseAsset: 'emp_blast',
    mechanics: [m('stun', 'onPlay', 1, 'target_enemy')]
  },
  {
    id: 'tactic_supply_drop', name: 'Supply Drop', type: 'tactic', tier: 1, cost: 2,
    text: 'Draw 2 cards.', faction: 'Confederate', rarity: 'Uncommon',
    baseAsset: 'supply_drop',
    mechanics: [m('draw', 'onPlay', 2, 'self')]
  },
  {
    id: 'tactic_reinforce', name: 'Reinforce', type: 'tactic', tier: 1, cost: 2,
    text: 'Give a friendly unit +1/+1.', faction: 'Confederate', rarity: 'Common',
    baseAsset: 'reinforce',
    mechanics: [m('support', 'onPlay', 1, 'target_ally', undefined, 1)]
  },
  {
    id: 'tactic_scramble', name: 'Scramble', type: 'tactic', tier: 1, cost: 1,
    text: 'Return a unit to its owners hand.', faction: 'Republic', rarity: 'Uncommon',
    baseAsset: 'scramble',
    mechanics: [m('bounce', 'onPlay', 1, 'target_unit')]
  },
  // --- MEGACORP TACTICS ---
  {
    id: 'tactic_asset_seizure', name: 'Asset Seizure', type: 'tactic', tier: 1, cost: 2,
    text: 'Deal 4 damage to an enemy unit.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_seizure',
    mechanics: [m('damage', 'onPlay', 4, 'target_enemy')]
  },
  {
    id: 'tactic_outsource', name: 'Outsource', type: 'tactic', tier: 1, cost: 3,
    text: 'Summon two 1/2 Mining Drones.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_outsource',
    mechanics: [m('summon', 'onPlay', 2, 'self', 'enemy_drone')]
  },
  {
    id: 'tactic_downsizing', name: 'Downsizing', type: 'tactic', tier: 1, cost: 1,
    text: 'Deal 1 damage to ALL units.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_downsizing',
    mechanics: [m('damage', 'onPlay', 1, 'all_units')]
  },
  // New Tactics
  {
    id: 'tactic_hostile_takeover', name: 'Hostile Takeover', type: 'tactic', tier: 1, cost: 5,
    text: 'Mind Control enemy unit with <= 3 ATK.', faction: 'Megacorp', rarity: 'Rare',
    baseAsset: 'hostile_takeover',
    mechanics: [] // Logic TBD
  },
  {
    id: 'tactic_budget_cuts', name: 'Budget Cuts', type: 'tactic', tier: 1, cost: 0,
    text: 'Destroy a friendly unit. Gain 2 Energy.', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'budget_cuts',
    mechanics: [] // Logic TBD
  },
  {
    id: 'tactic_rapid_prototyping', name: 'Rapid Prototyping', type: 'tactic', tier: 1, cost: 2,
    text: 'Give a unit +2/+2 and "Death: Draw a card".', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'rapid_prototyping',
    mechanics: [] // Logic TBD
  },
  {
    id: 'tactic_cease_and_desist', name: 'Cease and Desist', type: 'tactic', tier: 1, cost: 3,
    text: 'Stun an enemy and Disarm it for 2 turns.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'cease_and_desist',
    mechanics: [m('stun', 'onPlay', 1, 'target_enemy'), m('disarm', 'onPlay', 2, 'target_enemy')]
  },
  {
    id: 'tactic_forced_arbitration', name: 'Forced Arbitration', type: 'tactic', tier: 1, cost: 2,
    text: 'Silence a unit and Draw a card.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'forced_arbitration',
    mechanics: [] // Logic TBD (Silence not yet implemented)
  },
  {
    id: 'tactic_liquidate_assets', name: 'Liquidate Assets', type: 'tactic', tier: 1, cost: 1,
    text: 'Destroy friendly unit. Deal its ATK to enemy.', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'liquidate_assets',
    mechanics: [] // Logic TBD
  },
  {
    id: 'tactic_market_crash', name: 'Market Crash', type: 'tactic', tier: 1, cost: 4,
    text: 'Set ALL enemy units\' Attack to 1.', faction: 'Megacorp', rarity: 'Rare',
    baseAsset: 'market_crash',
    mechanics: [] // Logic TBD
  }
];

export const TOKEN_CARDS: Card[] = [
  {
    id: 'madness', name: 'Madness', type: 'tactic', tier: 1, cost: 0,
    text: 'Unplayable. OnDraw: Deal 2 damage to your commander. Fades at end of turn.', faction: 'Voidborn', rarity: 'NA',
    baseAsset: 'madness',
    mechanics: [m('damage', 'onDraw', 2, 'player_commander'), m('fade', 'onTurnEnd')]
  }
];

export const MEGACORP_CARDS: Card[] = [
  // Mining Drone (Common)
  {
    id: 'enemy_drone', name: 'Mining Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Megacorp', baseAsset: 'enemy_drone', mechanics: []
  },
  {
    id: 'enemy_drone_t2', name: 'Quick Mining Drone', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'enemy_drone', mechanics: [m('rush', 'constant')]
  },
  {
    id: 'enemy_drone_t3', name: 'Strip-Miner', type: 'unit', tier: 3, cost: 1,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. Death: Deal 1 dmg to random enemy.', faction: 'Megacorp', baseAsset: 'enemy_drone', mechanics: [m('rush', 'constant'), m('damage', 'onDeath', 1, 'random_enemy')]
  },

  // Security Bot (Common)
  {
    id: 'enemy_security', name: 'Security Bot', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'enemy_bot', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t2', name: 'Riot Control Bot', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'enemy_bot', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t3', name: 'Pacifier Unit', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard. Stun target on attack.', faction: 'Megacorp', baseAsset: 'enemy_bot', mechanics: [m('guard', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },

  // Corp Guard (Common)
  {
    id: 'corp_guard', name: 'Corp Guard', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t2', name: 'Elite Guard', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t3', name: 'Site Warden', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard. Rally.', faction: 'Megacorp', baseAsset: 'corp_guard', mechanics: [m('guard', 'constant'), m('rally', 'onTurnEnd', 1, 'all_allies')] // Rally logic simplified
  },

  // Cyber-Hound (Common)
  {
    id: 'corp_hound', name: 'Cyber-Hound', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t2', name: 'Hunter-Killer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t3', name: 'Alpha Model', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 5, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. Double Attack.', faction: 'Megacorp', baseAsset: 'corp_hound', mechanics: [m('rush', 'constant'), m('double_attack', 'constant')]
  },

  // Heavy Loader (Common)
  {
    id: 'enemy_loader', name: 'Heavy Loader', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'enemy_loader', mechanics: [m('slow', 'constant')]
  },
  {
    id: 'enemy_loader_t2', name: 'Siege Breaker', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'enemy_loader', mechanics: [m('slow', 'constant')]
  },
  {
    id: 'enemy_loader_t3', name: 'Titan Hauler', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 9, maxHp: 9 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow. Guard.', faction: 'Megacorp', baseAsset: 'enemy_loader', mechanics: [m('slow', 'constant'), m('guard', 'constant')]
  },

  // Field Medic (Common)
  {
    id: 'corp_medic', name: 'Field Medic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Heal 1.', faction: 'Megacorp', baseAsset: 'corp_medic', mechanics: [m('heal', 'onTurnEnd', 1, 'random_ally')]
  },
  {
    id: 'corp_medic_t2', name: 'Paramedic', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Heal 2.', faction: 'Megacorp', baseAsset: 'corp_medic', mechanics: [m('heal', 'onTurnEnd', 2, 'random_ally')]
  },
  {
    id: 'corp_medic_t3', name: 'Biotech Surgeon', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Heal 3.', faction: 'Megacorp', baseAsset: 'corp_medic', mechanics: [m('heal', 'onTurnEnd', 3, 'random_ally')]
  },

  // Manager (Uncommon)
  {
    id: 'corp_manager', name: 'Supervisor', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Encourage 1.', faction: 'Megacorp', baseAsset: 'corp_manager', mechanics: [m('encourage', 'onTurnEnd', 1)]
  },
  {
    id: 'corp_manager_t2', name: 'Manager', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Encourage 2.', faction: 'Megacorp', baseAsset: 'corp_manager', mechanics: [m('encourage', 'onTurnEnd', 2)]
  },
  {
    id: 'corp_manager_t3', name: 'Director', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Encourage 2. Rally 1.', faction: 'Megacorp', baseAsset: 'corp_manager', mechanics: [m('encourage', 'onTurnEnd', 2), m('rally', 'onTurnEnd', 1)]
  },

  // Liquidator (Uncommon)
  {
    id: 'corp_liquidator', name: 'Asset Liquidator', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_liquidator', mechanics: []
  },
  {
    id: 'corp_liquidator_t2', name: 'Clean-Up Crew', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 5, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1.', faction: 'Megacorp', baseAsset: 'corp_liquidator', mechanics: [m('loot', 'constant', 1)]
  },
  {
    id: 'corp_liquidator_t3', name: 'Black Ops Agent', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1. First Strike.', faction: 'Megacorp', baseAsset: 'corp_liquidator', mechanics: [m('loot', 'constant', 1), m('first_strike', 'constant')]
  },

  // Uplink (Uncommon)
  {
    id: 'enemy_uplink', name: 'Corrupted Uplink', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Hack 1.', faction: 'Megacorp', baseAsset: 'enemy_uplink', mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t2', name: 'Signal Jammer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Hack 3.', faction: 'Megacorp', baseAsset: 'enemy_uplink', mechanics: [m('hack', 'onTurnEnd', 3, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t3', name: 'Network Hub', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Hack 5.', faction: 'Megacorp', baseAsset: 'enemy_uplink', mechanics: [m('hack', 'onTurnEnd', 5, 'random_enemy')]
  },

  // Technician (Uncommon)
  {
    id: 'corp_technician', name: 'Drone Mechanic', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Summon Drone.', faction: 'Megacorp', baseAsset: 'corp_technician', mechanics: [m('summon', 'onPlay', 1, 'self', 'enemy_drone')]
  },
  {
    id: 'corp_technician_t2', name: 'Line Engineer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Summon Drone. Recycle 1.', faction: 'Megacorp', baseAsset: 'corp_technician', mechanics: [m('summon', 'onPlay', 1, 'self', 'enemy_drone'), m('recycle', 'constant', 1)]
  },
  {
    id: 'corp_technician_t3', name: 'Master Architect', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Summon 2 Drones. Recycle 1.', faction: 'Megacorp', baseAsset: 'corp_technician', mechanics: [m('summon', 'onPlay', 2, 'self', 'enemy_drone'), m('recycle', 'constant', 1)]
  },

  // Slaver (Uncommon)
  {
    id: 'corp_slaver', name: 'Debt Collector', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_slaver', mechanics: []
  },
  {
    id: 'corp_slaver_t2', name: 'Indentured Enforcer', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Disarm 2.', faction: 'Megacorp', baseAsset: 'corp_slaver', mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'corp_slaver_t3', name: 'Contract Binder', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Disarm 2. Steal Control (<2 ATK).', faction: 'Megacorp', baseAsset: 'corp_slaver', mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },

  // Solarin Control (Rare)
  {
    id: 'solarin_control', name: 'Solarin Control', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Gain 1 Energy.', faction: 'Megacorp', baseAsset: 'solarin_control', mechanics: [] // Logic TBD
  },
  {
    id: 'solarin_control_t2', name: 'Solarin Control', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Gain 1 Energy. Repair 1 Mech.', faction: 'Megacorp', baseAsset: 'solarin_control', mechanics: [] // Logic TBD
  },
  {
    id: 'solarin_control_t3', name: 'Solarin Control', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Gain 2 Energy.', faction: 'Megacorp', baseAsset: 'solarin_control', mechanics: [] // Logic TBD
  },

  // Director Kiz (Rare)
  {
    id: 'director_kiz', name: 'Director Kiz', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Buff Megacorp +1/+1.', faction: 'Megacorp', baseAsset: 'director_kiz', mechanics: [] // Logic TBD
  },
  {
    id: 'director_kiz_t2', name: 'Director Kiz', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Buff Megacorp +1/+1 & Rush.', faction: 'Megacorp', baseAsset: 'director_kiz', mechanics: [] // Logic TBD
  },
  {
    id: 'director_kiz_t3', name: 'Director Kiz', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Buff Megacorp +2/+2.', faction: 'Megacorp', baseAsset: 'director_kiz', mechanics: [] // Logic TBD
  },

  // Enforcer Lee (Rare)
  {
    id: 'enforcer_lee', name: 'Enforcer Lee', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rage. Regenerate.', faction: 'Megacorp', baseAsset: 'enforcer_lee', mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd')]
  },
  {
    id: 'enforcer_lee_t2', name: 'Enforcer Lee', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 5, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rage. Regenerate.', faction: 'Megacorp', baseAsset: 'enforcer_lee', mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd')]
  },
  {
    id: 'enforcer_lee_t3', name: 'Enforcer Lee', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rage. Regenerate. Double Attack.', faction: 'Megacorp', baseAsset: 'enforcer_lee', mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd'), m('double_attack', 'constant')]
  },

  // R0-VR (Rare)
  {
    id: 'r0vr', name: 'R0-VR', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield.', faction: 'Megacorp', baseAsset: 'r0vr', mechanics: [m('rush', 'constant'), m('shield', 'constant')]
  },
  {
    id: 'r0vr_t2', name: 'R0-VR', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield.', faction: 'Megacorp', baseAsset: 'r0vr', mechanics: [m('rush', 'constant'), m('shield', 'constant')]
  },
  {
    id: 'r0vr_t3', name: 'R0-VR', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. Double Attack.', faction: 'Megacorp', baseAsset: 'r0vr', mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('double_attack', 'constant')]
  },

  // Director Vance (Legendary)
  {
    id: 'director_vance', name: 'Director Vance', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Passive: Played Megacorp units +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance', mechanics: [m('shield', 'constant')] // Logic TBD
  },
  {
    id: 'director_vance_t2', name: 'Director Vance', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 0, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 1. Passive: +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance', mechanics: [m('shield', 'constant'), m('recycle', 'constant', 1)] // Logic TBD
  },
  {
    id: 'director_vance_t3', name: 'Director Vance', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 0, hp: 10, maxHp: 10 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 2. Passive: +2/+2.', faction: 'Megacorp', baseAsset: 'director_vance', mechanics: [m('shield', 'constant'), m('recycle', 'constant', 2)] // Logic TBD
  },

  // The Auditor (Legendary)
  {
    id: 'the_auditor', name: 'The Auditor', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Stun on attack.', faction: 'Megacorp', baseAsset: 'the_auditor', mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t2', name: 'The Auditor', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Stun on attack.', faction: 'Megacorp', baseAsset: 'the_auditor', mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t3', name: 'The Auditor', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Assassinate.', faction: 'Megacorp', baseAsset: 'the_auditor', mechanics: [m('snipe', 'constant'), m('assassinate', 'constant')]
  },

  // Unit 734 (Legendary)
  {
    id: 'unit_734', name: 'Unit 734', type: 'unit', tier: 1, cost: 7,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 2 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', mechanics: [] // Logic TBD
  },
  {
    id: 'unit_734_t2', name: 'Unit 734', type: 'unit', tier: 2, cost: 7,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 3 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', mechanics: [] // Logic TBD
  },
  {
    id: 'unit_734_t3', name: 'Unit 734', type: 'unit', tier: 3, cost: 7,
    stats: { atk: 8, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 4 Dmg to all non-Megacorp. Shield.', faction: 'Megacorp', baseAsset: 'unit_734', mechanics: [m('shield', 'constant')] // Logic TBD
  }
];

export const VOIDBORN_CARDS: Card[] = [
  {
    id: 'enemy_leech', name: 'Void Leech', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Biological', rarity: 'Common',
    text: 'Lifesteal.', faction: 'Voidborn', baseAsset: 'void_leech', mechanics: [m('lifesteal', 'constant')]
  },
  {
    id: 'void_voidling', name: 'Voidling', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Rush.', faction: 'Voidborn', baseAsset: 'void_ling', mechanics: [m('rush', 'constant')]
  },
  {
    id: 'void_polyp', name: 'Whispering Polyp', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 0, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'Turn End: Pollute 1.', faction: 'Voidborn', baseAsset: 'void_polyp', mechanics: [m('pollute', 'onTurnEnd', 1)]
  },
  {
    id: 'void_horror', name: 'Gazing Horror', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 1, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'Guard. Thorns 1.', faction: 'Voidborn', baseAsset: 'void_horror', mechanics: [m('guard', 'constant'), m('thorns', 'constant', 1)]
  },
  {
    id: 'void_tear', name: 'Reality Tear', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'Death: Summon 2 Voidlings.', faction: 'Voidborn', baseAsset: 'void_tear', mechanics: [m('summon', 'onDeath', 2, 'self', 'void_voidling')]
  },
  {
    id: 'void_flayer', name: 'Mind Flayer', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'OnAttack: Pollute 1.', faction: 'Voidborn', baseAsset: 'void_flayer', mechanics: [m('pollute', 'onAttack', 1)]
  }
];

export const ENEMY_CARDS = [...MEGACORP_CARDS, ...VOIDBORN_CARDS];

export const ALL_CARDS = [...HERO_CARDS, ...TACTIC_CARDS, ...ENEMY_CARDS, ...TOKEN_CARDS];
