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
    text: 'Rush. Rage 1. Windfury.', faction: 'Jovian', baseAsset: 'ganymede',
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1), m('windfury', 'constant')]
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

export const ENEMY_CARDS: Card[] = [
  {
    id: 'enemy_drone', name: 'Mining Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Megacorp', baseAsset: 'enemy_drone', mechanics: []
  },
  {
    id: 'enemy_security', name: 'Security Bot', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'enemy_bot', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_leech', name: 'Void Leech', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Biological', rarity: 'Common',
    text: 'Lifesteal.', faction: 'Voidborn', baseAsset: 'void_leech', mechanics: [m('lifesteal', 'constant')]
  },
  {
    id: 'enemy_uplink', name: 'Corrupted Uplink', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Turn End: Hack 1 (Random Enemy).', faction: 'Megacorp', baseAsset: 'enemy_uplink', 
    mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy')]
  },
  {
    id: 'enemy_loader', name: 'Heavy Loader', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Slow (Attacks every other turn).', faction: 'Megacorp', baseAsset: 'enemy_loader', mechanics: [m('slow', 'constant')]
  },
  // --- MEGACORP (New) ---
  {
    id: 'corp_guard', name: 'Corp Guard', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_medic', name: 'Field Medic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Heal 2 (Random Ally).', faction: 'Megacorp', baseAsset: 'corp_medic', mechanics: [m('heal', 'onTurnEnd', 2, 'random_ally')]
  },
  {
    id: 'corp_hound', name: 'Cyber-Hound', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_manager', name: 'Project Manager', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Passive: Allies have +1 ATK. (Not impl. Using Rally for now)', faction: 'Megacorp', baseAsset: 'corp_manager', mechanics: [m('rally', 'onTurnEnd', 1, 'all_allies')] 
  },
  {
    id: 'corp_liquidator', name: 'Liquidation Squad', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 5, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'High damage.', faction: 'Megacorp', baseAsset: 'corp_liquidator', mechanics: []
  },

  // --- VOID BORN ---
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

export const ALL_CARDS = [...HERO_CARDS, ...TACTIC_CARDS, ...ENEMY_CARDS, ...TOKEN_CARDS];