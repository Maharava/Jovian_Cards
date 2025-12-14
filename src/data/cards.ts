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
  // --- ELARA (Bio-Optimize/Draw) --- Rare
  {
    id: 'elara_t1', name: 'Elara', title: 'Researcher', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Bio-Optimize 1 (+1/+1). OnPlay: Draw 2.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('buff', 'onPlay', 1, 'target_ally', undefined, 1), m('draw', 'onPlay', 2, 'self')]
  },
  {
    id: 'elara_t2', name: 'Elara', title: 'Geneticist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Bio-Optimize 2 (+2/+2). OnPlay: Draw 2.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('buff', 'onPlay', 2, 'target_ally', undefined, 2), m('draw', 'onPlay', 2, 'self')]
  },
  {
    id: 'elara_t3', name: 'Elara', title: 'The Biologist', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Turn Start: Bio-Optimize 1. OnPlay: Draw 3.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('buff', 'onTurnStart', 1, 'random_ally', undefined, 1), m('draw', 'onPlay', 3, 'self')]
  },

  // --- EUROPA (Stun/Rally/Encourage) --- Legendary
  {
    id: 'europa_t1', name: 'Europa', title: 'Diplomat', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 3, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All Enemies.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies')]
  },
  {
    id: 'europa_t2', name: 'Europa', title: 'Matriarch', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 4, hp: 7, maxHp: 7 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All. When Attacked: Rally 2.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('rally', 'onDamageTaken', 2, 'random_ally')]
  },
  {
    id: 'europa_t3', name: 'Europa', title: 'The Mind Ocean', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 6, hp: 8, maxHp: 8 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All. When Attacked: Rally 2, Encourage 2.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('rally', 'onDamageTaken', 2, 'random_ally'), m('encourage', 'onDamageTaken', 2, 'random_ally')]
  },

  // --- IO (Summon) --- Rare
  {
    id: 'io_t1', name: 'Io', title: 'Hobbyist', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Summon 1/1 Drone.', faction: 'Jovian',
    baseAsset: 'io',
    lore: "The tech gremlin, always building something.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'io_t2', name: 'Io', title: 'Operator', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Summon 1/2 Drone.', faction: 'Jovian',
    baseAsset: 'io',
    lore: "The tech gremlin, always building something.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'io_t3', name: 'Io', title: 'The Drone Master', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Summon 1/2 Drone.', faction: 'Jovian',
    baseAsset: 'io',
    lore: "The tech gremlin, always building something.",
    mechanics: [m('summon', 'onTurnStart', 1, 'self', 'neutral_drone')]
  },

  // --- LYSITHEA (Hack) --- Common
  {
    id: 'lysithea_t1', name: 'Lysithea', title: 'Script-Kiddie', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Turn Start: Hack 1.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onTurnStart', 1, 'random_enemy')]
  },
  {
    id: 'lysithea_t2', name: 'Lysithea', title: 'White Hat', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Turn Start: Hack 2.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onTurnStart', 2, 'random_enemy')]
  },
  {
    id: 'lysithea_t3', name: 'Lysithea', title: 'The Hacker', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Turn Start: Hack 3.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onTurnStart', 3, 'random_enemy')]
  },

  // --- PASIPHAE (Swap/Rush) --- Rare
  {
    id: 'pasiphae_t1', name: 'Pasiphae', title: 'Gamer', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Swap.', faction: 'Jovian',
    baseAsset: 'pasiphae', 
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('swap', 'onPlay', 1, 'target_ally')]
  },
  {
    id: 'pasiphae_t2', name: 'Pasiphae', title: 'Pilot', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnPlay: Swap.', faction: 'Jovian',
    baseAsset: 'pasiphae', 
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('rush', 'constant'), m('swap', 'onPlay', 1, 'target_ally')]
  },
  {
    id: 'pasiphae_t3', name: 'Pasiphae', title: 'The Ace', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnPlay: Swap. Turn End: Rally 1.', faction: 'Jovian', 
    baseAsset: 'pasiphae', 
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('rush', 'constant'), m('swap', 'onPlay', 1, 'target_ally'), m('rally', 'onTurnEnd', 1, 'random_ally')]
  },

  // --- PRAXIDIKE (Decoy) --- Rare
  {
    id: 'praxidike_t1', name: 'Praxidike', title: 'Prankster', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Decoy.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1')]
  },
  {
    id: 'praxidike_t2', name: 'Praxidike', title: 'Illusionist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Decoy.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1')]
  },
  {
    id: 'praxidike_t3', name: 'Praxidike', title: 'The Trickster', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Decoy. When Attacked: Decoy.', faction: 'Jovian',
    baseAsset: 'praxidike', 
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1'), m('decoy', 'onDamageTaken', 1, 'self', 'hologram_1')]
  },

  // --- SINOPE (Disarm) --- Uncommon
  {
    id: 'sinope_t1', name: 'Sinope', title: 'Tease', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 2 (random enemy).', faction: 'Jovian',
    baseAsset: 'sinope', 
    lore: "A manipulator who uses her looks and charm.",
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'sinope_t2', name: 'Sinope', title: 'Manipulator', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 1, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 3 (random enemy).', faction: 'Jovian',
    baseAsset: 'sinope', 
    lore: "A manipulator who uses her looks and charm.",
    mechanics: [m('disarm', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'sinope_t3', name: 'Sinope', title: 'The Seducer', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 2, hp: 8, maxHp: 8 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 3. OnPlay: Scout 2.', faction: 'Jovian',
    baseAsset: 'sinope', 
    lore: "A manipulator who uses her looks and charm.",
    mechanics: [m('disarm', 'onPlay', 3, 'random_enemy'), m('scout', 'onPlay', 2)]
  },

  // --- THEBE (Snipe/Ambush) --- Legendary
  {
    id: 'thebe_t1', name: 'Thebe', title: 'Ranger', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Ambush.', faction: 'Jovian',
    baseAsset: 'thebe',
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('double_damage_undamaged', 'constant')]
  },
  {
    id: 'thebe_t2', name: 'Thebe', title: 'Stalker', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 7, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Ambush.', faction: 'Jovian',
    baseAsset: 'thebe', 
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('double_damage_undamaged', 'constant')]
  },
  {
    id: 'thebe_t3', name: 'Thebe', title: 'The Apex', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 7, hp: 7, maxHp: 7 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Ambush. Turn End: Regenerate 3.', faction: 'Jovian',
    baseAsset: 'thebe', 
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('double_damage_undamaged', 'constant'), m('regenerate', 'onTurnEnd', 3)]
  },
  
  // --- GANYMEDE --- Rare
  {
    id: 'ganymede_t1', name: 'Ganymede', title: 'Brawler', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush.', faction: 'Jovian', baseAsset: 'ganymede',
    lore: "A tease, a joker. Her muscles are stronger kg-for-kg than a bodybuilder's.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'ganymede_t2', name: 'Ganymede', title: 'Contender', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnAttack: Rage 1.', faction: 'Jovian', baseAsset: 'ganymede',
    lore: "A tease, a joker. Her muscles are stronger kg-for-kg than a bodybuilder's.",
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1)]
  },
  {
    id: 'ganymede_t3', name: 'Ganymede', title: 'The Pugilist', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnAttack: Rage 1. Double Attack.', faction: 'Jovian', baseAsset: 'ganymede',
    lore: "A tease, a joker. Her muscles are stronger kg-for-kg than a bodybuilder's.",
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1), m('double_attack', 'constant')]
  },

  // --- HIMALIA --- Common
  {
    id: 'himalia_t1', name: 'Himalia', title: 'Citizen', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Jovian', baseAsset: 'himalia',
    lore: "Himalia just wants a normal life. Built like a tank.",
    mechanics: []
  },
  {
    id: 'himalia_t2', name: 'Himalia', title: 'Heavy-weight', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Jovian', baseAsset: 'himalia',
    lore: "Himalia just wants a normal life. Built like a tank.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'himalia_t3', name: 'Himalia', title: 'The Shield', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Jovian', baseAsset: 'himalia',
    lore: "Himalia just wants a normal life. Built like a tank.",
    mechanics: [m('guard', 'constant')]
  },

  // --- LEDA --- Common
  {
    id: 'leda_t1', name: 'Leda', title: 'Prowler', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Jovian', baseAsset: 'leda',
    lore: "A thief who lives amongst the free states.",
    mechanics: []
  },
  {
    id: 'leda_t2', name: 'Leda', title: 'Burglar', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'OnPlay: Add Tactic.', faction: 'Jovian', baseAsset: 'leda',
    lore: "A thief who lives amongst the free states.",
    mechanics: [m('add_random_tactic', 'onPlay', 1, 'self')]
  },
  {
    id: 'leda_t3', name: 'Leda', title: 'The Thief', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Common',
    text: 'OnPlay: Add 2 Tactics.', faction: 'Jovian', baseAsset: 'leda',
    lore: "A thief who lives amongst the free states.",
    mechanics: [m('add_random_tactic', 'onPlay', 2, 'self')]
  },

  // --- METIS --- Legendary
  {
    id: 'metis_t1', name: 'Metis', title: 'Hunter', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 6, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Spark 3.', faction: 'Jovian', baseAsset: 'metis',
    lore: "The only other outright Psychic. Mercy isn't in her nature.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'metis_t2', name: 'Metis', title: 'Avenger', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 7, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Spark 3. When Attacked: Spark 3.', faction: 'Jovian', baseAsset: 'metis',
    lore: "The only other outright Psychic. Mercy isn't in her nature.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy'), m('spark', 'onDamageTaken', 3, 'random_enemy')]
  },
  {
    id: 'metis_t3', name: 'Metis', title: 'The Flare', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 9, hp: 7, maxHp: 7 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Destroy target enemy. When Attacked: Spark 3.', faction: 'Jovian', baseAsset: 'metis',
    lore: "The only other outright Psychic. Mercy isn't in her nature.",
    mechanics: [m('damage', 'onPlay', 100, 'target_enemy'), m('spark', 'onDamageTaken', 3, 'random_enemy')]
  },

  // --- AMALTHEA --- Common
  {
    id: 'amalthea_t1', name: 'Amalthea', title: 'Recruit', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Jovian', baseAsset: 'amalthea',
    lore: "A front line Confederate soldier. First in, Last out.",
    mechanics: []
  },
  {
    id: 'amalthea_t2', name: 'Amalthea', title: 'Veteran', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Jovian', baseAsset: 'amalthea',
    lore: "A front line Confederate soldier. First in, Last out.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'amalthea_t3', name: 'Amalthea', title: 'The Soldier', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard. Turn End: Regenerate 1.', faction: 'Jovian', baseAsset: 'amalthea',
    lore: "A front line Confederate soldier. First in, Last out.",
    mechanics: [m('guard', 'constant'), m('regenerate', 'onTurnEnd', 1)]
  },

  // --- CALLISTO --- Uncommon
  {
    id: 'callisto_t1', name: 'Callisto', title: 'Street Fighter', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon a 1/1 thug.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_thug')] 
  },
  {
    id: 'callisto_t2', name: 'Callisto', title: 'Thug Boss', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 5, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon 2 1/1 thugs.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('summon', 'onPlay', 2, 'self', 'neutral_thug')]
  },
  {
    id: 'callisto_t3', name: 'Callisto', title: 'The Gang Queen', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnAttack: Rage. OnPlay: Summon 2 1/1 thugs.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('rage', 'onAttack', 1), m('summon', 'onPlay', 2, 'self', 'neutral_thug')]
  },

  // --- CARPO --- Uncommon
  {
    id: 'carpo_t1', name: 'Carpo', title: 'Tinkerer', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: '', faction: 'Jovian', baseAsset: 'carpo',
    lore: "The other brother, femboy Carpo loves technology.",
    mechanics: []
  },
  {
    id: 'carpo_t2', name: 'Carpo', title: 'Engineer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'OnAttack: Breach.', faction: 'Jovian', baseAsset: 'carpo',
    lore: "The other brother, femboy Carpo loves technology.",
    mechanics: [m('breach', 'onAttack')] // Breach on attack usually? Or active? Lore implies ability. I'll make it onAttack for now or constant? It's a mechanic.
  },
  {
    id: 'carpo_t3', name: 'Carpo', title: 'The Mechanic', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'OnAttack: Breach.', faction: 'Jovian', baseAsset: 'carpo',
    lore: "The other brother, femboy Carpo loves technology.",
    mechanics: [m('breach', 'onAttack')]
  },

  // --- ADRASTEA --- Rare
  {
    id: 'adrastea_t1', name: 'Adrastea', title: 'Nurse', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Heal 2.', faction: 'Jovian', baseAsset: 'adrastea',
    lore: "The Provider runs a clinic that treats everyone.",
    mechanics: [m('heal', 'onPlay', 2, 'target_ally')]
  },
  {
    id: 'adrastea_t2', name: 'Adrastea', title: 'Field Medic', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Heal 3.', faction: 'Jovian', baseAsset: 'adrastea',
    lore: "The Provider runs a clinic that treats everyone.",
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },
  {
    id: 'adrastea_t3', name: 'Adrastea', title: 'The Provider', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Heal 3.', faction: 'Jovian', baseAsset: 'adrastea',
    lore: "The Provider runs a clinic that treats everyone.",
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },

  // --- KORE --- Common
  {
    id: 'kore_t1', name: 'Kore', title: 'Party Girl', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'OnPlay: Scout 1.', faction: 'Jovian', baseAsset: 'kore',
    lore: "A socialite who lives for the weekend.",
    mechanics: [m('scout', 'onPlay', 1)]
  },
  {
    id: 'kore_t2', name: 'Kore', title: 'Informant', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn Start: Scout 1.', faction: 'Jovian', baseAsset: 'kore',
    lore: "A socialite who lives for the weekend.",
    mechanics: [m('scout', 'onTurnStart', 1)]
  },
  {
    id: 'kore_t3', name: 'Kore', title: 'The Maiden', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 2, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn Start: Scout 2.', faction: 'Jovian', baseAsset: 'kore',
    lore: "A socialite who lives for the weekend.",
    mechanics: [m('scout', 'onTurnStart', 2)] 
  },

  // --- TAYGETE --- Uncommon
  {
    id: 'taygete_t1', name: 'Taygete', title: 'Loader', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Jovian', baseAsset: 'taygete',
    lore: "A quiet professional who works the heavy loaders.",
    mechanics: []
  },
  {
    id: 'taygete_t2', name: 'Taygete', title: 'Gunner', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Double Attack.', faction: 'Jovian', baseAsset: 'taygete',
    lore: "A quiet professional who works the heavy loaders.",
    mechanics: [m('double_attack', 'constant')]
  },
  {
    id: 'taygete_t3', name: 'Taygete', title: 'The Heavy', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Double Attack.', faction: 'Jovian', baseAsset: 'taygete',
    lore: "A quiet professional who works the heavy loaders.",
    mechanics: [m('double_attack', 'constant')]
  },

  // --- EUPORIE --- Uncommon
  {
    id: 'euporie_t1', name: 'Euporie', title: 'Intern', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Heal 3.', faction: 'Jovian', baseAsset: 'euporie',
    lore: "Field surgeon.",
    mechanics: [m('heal', 'onPlay', 3, 'target_ally')]
  },
  {
    id: 'euporie_t2', name: 'Euporie', title: 'Resident', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Heal 4.', faction: 'Jovian', baseAsset: 'euporie',
    lore: "Field surgeon.",
    mechanics: [m('heal', 'onPlay', 4, 'target_ally')]
  },
  {
    id: 'euporie_t3', name: 'Euporie', title: 'The Surgeon', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Heal 5.', faction: 'Jovian', baseAsset: 'euporie',
    lore: "Field surgeon.",
    mechanics: [m('heal', 'onPlay', 5, 'target_ally')]
  },

  // --- CYLLENE --- Uncommon
  {
    id: 'cyllene_t1', name: 'Cyllene', title: 'Static', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Spark 2.', faction: 'Jovian', baseAsset: 'cyllene',
    lore: "Chaotic energy.",
    mechanics: [m('spark', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'cyllene_t2', name: 'Cyllene', title: 'Surge', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Spark 3.', faction: 'Jovian', baseAsset: 'cyllene',
    lore: "Chaotic energy.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'cyllene_t3', name: 'Cyllene', title: 'The Storm', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 5, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnPlay: Spark 3, Stun.', faction: 'Jovian', baseAsset: 'cyllene',
    lore: "Chaotic energy.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy'), m('stun', 'onPlay', 1, 'target_enemy')]
  }
];

export const TACTIC_CARDS: Card[] = [
  {
    id: 'tactic_power_shot', name: 'Power Shot', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Deal 3 damage to an enemy unit.', faction: 'Neutral', rarity: 'Common',
    baseAsset: 'power_shot',
    lore: "Standard issue electromagnetic railgun tech. Reliable, punchy, and loud.",
    mechanics: [m('damage', 'onPlay', 3, 'target_enemy')]
  },
  {
    id: 'tactic_nano_repair', name: 'Nano-Repair', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Restore 2 Health to a unit.', faction: 'Confederate', rarity: 'Common',
    baseAsset: 'nano_repair',
    lore: "Military-grade nanites that stitch flesh and weld metal in seconds.",
    mechanics: [m('heal', 'onPlay', 2, 'target_ally')]
  },
  {
    id: 'tactic_emp_blast', name: 'EMP Blast', type: 'tactic', tier: 1, cost: 3,
    text: 'OnPlay: Stun an enemy unit.', faction: 'Republic', rarity: 'Uncommon',
    baseAsset: 'emp_blast',
    lore: "A localized electromagnetic pulse designed to fry sensors and servo-motors.",
    mechanics: [m('stun', 'onPlay', 1, 'target_enemy')]
  },
  {
    id: 'tactic_supply_drop', name: 'Supply Drop', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Draw 2 cards.', faction: 'Confederate', rarity: 'Uncommon',
    baseAsset: 'supply_drop',
    lore: "Orbital logistics are the backbone of the Confederate Navy.",
    mechanics: [m('draw', 'onPlay', 2, 'self')]
  },
  {
    id: 'tactic_reinforce', name: 'Reinforce', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Give a friendly unit +1/+1.', faction: 'Confederate', rarity: 'Common',
    baseAsset: 'reinforce',
    lore: "Hold the line! Support is incoming!",
    mechanics: [m('support', 'onPlay', 1, 'target_ally', undefined, 1)]
  },
  {
    id: 'tactic_scramble', name: 'Scramble', type: 'tactic', tier: 1, cost: 1,
    text: 'OnPlay: Return a unit to its owners hand.', faction: 'Republic', rarity: 'Uncommon',
    baseAsset: 'scramble',
    lore: "A tactical retreat is better than a strategic defeat.",
    mechanics: [m('bounce', 'onPlay', 1, 'target_unit')]
  },
  // --- MEGACORP TACTICS ---
  {
    id: 'tactic_asset_seizure', name: 'Asset Seizure', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Deal 4 damage to an enemy unit.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_seizure',
    lore: "Repossession in progress. Resistance will be billed to your next of kin.",
    mechanics: [m('damage', 'onPlay', 4, 'target_enemy')]
  },
  {
    id: 'tactic_outsource', name: 'Outsource', type: 'tactic', tier: 1, cost: 3,
    text: 'OnPlay: Summon two 1/2 Mining Drones.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_outsource',
    lore: "Why pay a human when two drones cost half as much and work twice as hard?",
    mechanics: [m('summon', 'onPlay', 2, 'self', 'corp_drone')]
  },
  {
    id: 'tactic_downsizing', name: 'Downsizing', type: 'tactic', tier: 1, cost: 1,
    text: 'OnPlay: Deal 1 damage to ALL units.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_downsizing',
    lore: "Budget cuts affect everyone. Collateral damage is just a line item.",
    mechanics: [m('damage', 'onPlay', 1, 'all_units')]
  },
  {
    id: 'tactic_hostile_takeover', name: 'Hostile Takeover', type: 'tactic', tier: 1, cost: 5,
    text: 'OnPlay: Mind Control enemy unit with <= 3 ATK.', faction: 'Megacorp', rarity: 'Rare',
    baseAsset: 'hostile_takeover',
    lore: "Your contract has been acquired. You work for us now.",
    mechanics: [m('mind_control', 'onPlay', 3, 'target_enemy')] 
  },
  {
    id: 'tactic_budget_cuts', name: 'Budget Cuts', type: 'tactic', tier: 1, cost: 0,
    text: 'OnPlay: Destroy a friendly unit. Gain 2 Energy.', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'budget_cuts',
    lore: "Your sacrifice for the quarterly earnings report is appreciated.",
    mechanics: [m('gain_energy', 'onPlay', 2)] 
  },
  {
    id: 'tactic_rapid_prototyping', name: 'Rapid Prototyping', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Give a unit +2/+2 and "Death: Draw a card".', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'rapid_prototyping',
    lore: "Field testing is the most efficient form of R&D.",
    mechanics: [m('buff', 'onPlay', 2, 'target_ally', undefined, 2)]
  },
  {
    id: 'tactic_cease_and_desist', name: 'Cease and Desist', type: 'tactic', tier: 1, cost: 3,
    text: 'OnPlay: Stun an enemy and Disarm it for 2 turns.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'cease_and_desist',
    lore: "Legal injunctions can be just as paralyzing as a stun baton.",
    mechanics: [m('stun', 'onPlay', 1, 'target_enemy'), m('disarm', 'onPlay', 2, 'target_enemy')]
  },
  {
    id: 'tactic_forced_arbitration', name: 'Forced Arbitration', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Silence a unit and Draw a card.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'forced_arbitration',
    lore: "There is no appeal process.",
    mechanics: [m('silence', 'onPlay', 1, 'target_unit'), m('draw', 'onPlay', 1, 'self')]
  },
  {
    id: 'tactic_liquidate_assets', name: 'Liquidate Assets', type: 'tactic', tier: 1, cost: 1,
    text: 'OnPlay: Destroy friendly unit. Deal its ATK to random enemy.', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'liquidate_assets',
    lore: "Cashing out before the crash.",
    mechanics: [m('damage', 'onPlay', 0, 'target_ally', 'sacrifice_self_damage_equal_atk')] 
  },
  {
    id: 'tactic_market_crash', name: 'Market Crash', type: 'tactic', tier: 1, cost: 4,
    text: 'OnPlay: Set ALL enemy units\' Attack to 1.', faction: 'Megacorp', rarity: 'Rare',
    baseAsset: 'market_crash',
    lore: "Panic selling wipes out billions in seconds.",
    mechanics: [m('set_atk', 'onPlay', 1, 'all_enemies')] 
  },
];

export const TOKEN_CARDS: Card[] = [
  {
    id: 'neutral_drone', name: 'Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'NA',
    text: '', faction: 'Neutral', baseAsset: 'drone', 
    lore: "Standard automated unit.",
    mechanics: []
  },
  {
    id: 'neutral_thug', name: 'Thug', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Biological', rarity: 'NA',
    text: '', faction: 'Neutral', baseAsset: 'thug', 
    lore: "A hired gun.",
    mechanics: []
  },
  {
    id: 'madness', name: 'Madness', type: 'tactic', tier: 1, cost: 0,
    text: 'Unplayable. OnDraw: Deal 2 damage to your commander. Fades at end of turn.', faction: 'Voidborn', rarity: 'NA',
    baseAsset: 'madness',
    lore: "The whispering in your skull...",
    mechanics: [m('damage', 'onDraw', 2, 'player_commander'), m('fade', 'onTurnEnd')]
  }
];

export const MEGACORP_CARDS: Card[] = [
  // Mining Drone (Common)
  {
    id: 'corp_drone', name: 'Mining Drone', title: 'Automated Miner', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Megacorp', baseAsset: 'corp_drone', 
    lore: "Mass-produced automated labor.",
    mechanics: []
  },
  {
    id: 'corp_drone_t2', name: 'Mining Drone', title: 'Rapid Extraction Drone', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_drone', 
    lore: "Upgraded servos allow for faster ore extraction.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_drone_t3', name: 'Mining Drone', title: 'Explosive Miner', type: 'unit', tier: 3, cost: 1,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. OnDeath: Deal 1 dmg to random enemy.', faction: 'Megacorp', baseAsset: 'corp_drone', 
    lore: "Rigged to detonate upon catastrophic failure.",
    mechanics: [m('rush', 'constant'), m('damage', 'onDeath', 1, 'random_enemy')]
  },

  // Security Bot (Common)
  {
    id: 'enemy_security', name: 'Security Bot', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Standard perimeter defense unit.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t2', name: 'Riot Control Bot', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Equipped with tear gas.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t3', name: 'Pacifier Unit', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Compliance is mandatory.",
    mechanics: [m('guard', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },

  // Corp Guard (Common)
  {
    id: 'corp_guard', name: 'Security Enforcer', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Minimum wage, maximum risk.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t2', name: 'Tactical Response Unit', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Veterans who have survived more than three shifts.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t3', name: 'Site Warden', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard. Turn End: Rally.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Oversees facility security.",
    mechanics: [m('guard', 'constant'), m('rally', 'onTurnEnd', 1, 'all_allies')] 
  },

  // Cyber-Hound (Common)
  {
    id: 'corp_hound', name: 'K9X Unit', title: 'Cyber-Hound', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Canine bio-frame.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t2', name: 'K9X Unit', title: 'Hunter-Killer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Tracks thermal signatures.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t3', name: 'K9X Unit', title: 'Alpha', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 5, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. Double Attack.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Pack leader algorithm installed.",
    mechanics: [m('rush', 'constant'), m('double_attack', 'constant')]
  },

  // Heavy Loader (Common)
  {
    id: 'corp_loader', name: 'Loader', title: 'Cargo Loader', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'corp_loader', 
    lore: "Industrial mech repurposed.",
    mechanics: [m('slow', 'constant')]
  },
  {
    id: 'corp_loader_t2', name: 'Loader', title: 'Industrial Mech', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'corp_loader', 
    lore: "Reinforced plating.",
    mechanics: [m('slow', 'constant')]
  },
  {
    id: 'corp_loader_t3', name: 'Loader', title: 'Payload Hauler', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 9, maxHp: 9 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow. Guard.', faction: 'Megacorp', baseAsset: 'corp_loader', 
    lore: "A mountain of moving metal.",
    mechanics: [m('slow', 'constant'), m('guard', 'constant')]
  },

  // Field Medic (Common)
  {
    id: 'corp_medic', name: 'Doc Ash', title: 'Field Medic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 1.', faction: 'Megacorp', baseAsset: 'corp_medic', 
    lore: "Company policy requires keeping assets functional.",
    mechanics: [m('heal', 'onTurnEnd', 1, 'random_ally')]
  },
  {
    id: 'corp_medic_t2', name: 'Doc Ash', title: 'Paramedic', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 2. If Megacorp, heal 3 instead.', faction: 'Megacorp', baseAsset: 'corp_medic',
    lore: "Triage protocols initiated.",
    mechanics: [m('heal', 'onTurnEnd', 2, 'random_ally', 'megacorp_bonus:3')]
  },
  {
    id: 'corp_medic_t3', name: 'Doc Ash', title: 'Biotech Surgeon', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 3. If Megacorp, also grant +0/+1.', faction: 'Megacorp', baseAsset: 'corp_medic',
    lore: "Can replace a limb in under three minutes.",
    mechanics: [m('heal', 'onTurnEnd', 3, 'random_ally', 'megacorp_rally:1')]
  },

  // Manager (Uncommon)
  {
    id: 'corp_manager', name: 'Alexandrea', title: 'Supervisor', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage 1.', faction: 'Megacorp', baseAsset: 'corp_manager', 
    lore: "Get back to work!",
    mechanics: [m('encourage', 'onTurnEnd', 1)]
  },
  {
    id: 'corp_manager_t2', name: 'Alexandrea', title: 'Manager', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage 2. If you have 3+ Megacorp units, Encourage 3.', faction: 'Megacorp', baseAsset: 'corp_manager',
    lore: "Productivity is down 0.4%.",
    mechanics: [m('encourage', 'onTurnEnd', 2, 'random_ally', 'threshold_3:3')]
  },
  {
    id: 'corp_manager_t3', name: 'Alexandrea', title: 'Executive', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage X, Rally X, where X = Megacorp units you control.', faction: 'Megacorp', baseAsset: 'corp_manager',
    lore: "You are all replaceable.",
    mechanics: [m('encourage', 'onTurnEnd', 0, 'random_ally', 'count_megacorp'), m('rally', 'onTurnEnd', 0, 'random_ally', 'count_megacorp')]
  },

  // Liquidator (Uncommon)
  {
    id: 'corp_liquidator', name: 'Ximena', title: 'Asset Liquidator', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Sent when a branch is closing down.",
    mechanics: []
  },
  {
    id: 'corp_liquidator_t2', name: 'Ximena', title: 'Clean-Up Crew', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 5, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1.', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Leaves no witnesses.",
    mechanics: [m('loot', 'constant', 1)]
  },
  {
    id: 'corp_liquidator_t3', name: 'Ximena', title: 'Black Ops Agent', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1. First Strike.', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Doesn't exist on any payroll.",
    mechanics: [m('loot', 'constant', 1), m('first_strike', 'constant')]
  },

  // Uplink (Uncommon)
  {
    id: 'enemy_uplink', name: 'Corrupted Uplink', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 1.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Broadcasting malware.",
    mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t2', name: 'Signal Jammer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 3.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Disrupting enemy communications.",
    mechanics: [m('hack', 'onTurnEnd', 3, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t3', name: 'Network Hub', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 5.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Central node for local drone control.",
    mechanics: [m('hack', 'onTurnEnd', 5, 'random_enemy')]
  },

  // Technician (Uncommon)
  {
    id: 'corp_technician', name: 'T4M3K0', title: 'Drone Mechanic', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon Drone.', faction: 'Megacorp', baseAsset: 'corp_technician', 
    lore: "Keeps the swarm operational.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'corp_technician_t2', name: 'T4M3K0', title: 'Line Engineer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Costs (1) less for each Megacorp unit. OnPlay: Summon Drone.', faction: 'Megacorp', baseAsset: 'corp_technician',
    lore: "Efficiency is paramount.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'corp_technician_t3', name: 'T4M3K0', title: 'Master Architect', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Costs (1) less for each Megacorp unit. OnPlay: Summon X Drones, where X = Megacorp units.', faction: 'Megacorp', baseAsset: 'corp_technician',
    lore: "Can build a fortress from scrap.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('summon', 'onPlay', 0, 'self', 'neutral_drone:count_megacorp')]
  },

  // Slaver (Uncommon)
  {
    id: 'corp_slaver', name: 'Mr. Harrison, Debt Collector', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_slaver', 
    lore: "You're late on your payments.",
    mechanics: []
  },
  {
    id: 'corp_slaver_t2', name: 'Mr. Harrison, Indentured Enforcer', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 2.', faction: 'Megacorp', baseAsset: 'corp_slaver', 
    lore: "Confiscating authorized equipment.",
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'corp_slaver_t3', name: 'Mr. Harrison, Contract Binder', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 2, Mind Control (<2 ATK).', faction: 'Megacorp', baseAsset: 'corp_slaver', 
    lore: "There's a clause in your contract...",
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy'), m('mind_control', 'onPlay', 2, 'target_enemy')]
  },

  // Solarin Control (Rare)
  {
    id: 'solarin_control', name: 'Solarin Control', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Gain 1 Energy.', faction: 'Megacorp', baseAsset: 'solarin_control', 
    lore: "Managing the flow of power.",
    mechanics: [m('gain_energy', 'onTurnStart', 1)] 
  },
  {
    id: 'solarin_control_t2', name: 'Solarin Control', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Gain 1 Energy for each Megacorp unit (max 4). Turn End: Repair 1 Cybernetic.', faction: 'Megacorp', baseAsset: 'solarin_control',
    lore: "Managing the flow of power.",
    mechanics: [m('gain_energy', 'onTurnStart', 0, 'self', 'count_megacorp:max_4'), m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')]
  },
  {
    id: 'solarin_control_t3', name: 'Solarin Control', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Costs (1) less for each Megacorp unit. Turn Start: Gain 1 Energy. Turn End: Repair 1 Cybernetic.', faction: 'Megacorp', baseAsset: 'solarin_control',
    lore: "Managing the flow of power.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('gain_energy', 'onTurnStart', 1), m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')]
  },

  // Director Kiz (Rare)
  {
    id: 'director_kiz', name: 'Director Kiz', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +1/+1.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 1, 'all_allies', 'faction:Megacorp', 1)] 
  },
  {
    id: 'director_kiz_t2', name: 'Director Kiz', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +1/+1 & Rush.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 1, 'all_allies', 'faction:Megacorp', 1), m('buff', 'onPlay', 0, 'all_allies', 'keyword:rush')]
  },
  {
    id: 'director_kiz_t3', name: 'Director Kiz', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +2/+2.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 2, 'all_allies', 'faction:Megacorp', 2)] 
  },

  // Enforcer Lee (Rare)
  {
    id: 'enforcer_lee', name: 'Enforcer Lee', title: 'Enforcer', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2.', faction: 'Megacorp', baseAsset: 'enforcer_lee', 
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd', 2)]
  },
  {
    id: 'enforcer_lee_t2', name: 'Enforcer Lee', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 5, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2.', faction: 'Megacorp', baseAsset: 'enforcer_lee', 
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd', 2)]
  },
  {
    id: 'enforcer_lee_t3', name: 'Enforcer Lee', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2. Double Attack.', faction: 'Megacorp', baseAsset: 'enforcer_lee', 
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1), m('regenerate', 'onTurnEnd', 2), m('double_attack', 'constant')]
  },

  // R0-VR (Rare)
  {
    id: 'r0vr', name: 'R0-VR', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. OnPlay: If you control another Megacorp unit, Scout 2.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('scout', 'onPlay', 2, 'self', 'if_megacorp')]
  },
  {
    id: 'r0vr_t2', name: 'R0-VR', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. OnPlay: Scout X, where X = Megacorp units you control.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('scout', 'onPlay', 0, 'self', 'count_megacorp')]
  },
  {
    id: 'r0vr_t3', name: 'R0-VR', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. Double Attack. OnPlay: Scout X, where X = Megacorp units.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('double_attack', 'constant'), m('scout', 'onPlay', 0, 'self', 'count_megacorp')]
  },

  // Director Vance (Legendary)
  {
    id: 'director_vance', name: 'Director Vance', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Passive: Played Megacorp units +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance', 
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('buff', 'passive', 1, 'all_allies', 'faction:Megacorp', 1)] 
  },
  {
    id: 'director_vance_t2', name: 'Director Vance', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 0, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 1. Passive: +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance', 
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('recycle', 'constant', 1), m('buff', 'passive', 1, 'all_allies', 'faction:Megacorp', 1)]
  },
  {
    id: 'director_vance_t3', name: 'Director Vance', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 0, hp: 10, maxHp: 10 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 2. Passive: +2/+2.', faction: 'Megacorp', baseAsset: 'director_vance', 
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('recycle', 'constant', 2), m('buff', 'passive', 2, 'all_allies', 'faction:Megacorp', 2)]
  },

  // The Auditor (Legendary)
  {
    id: 'the_auditor', name: 'The Auditor', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t2', name: 'The Auditor', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t3', name: 'The Auditor', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 5, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Assassinate.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('assassinate', 'constant')]
  },

  // Unit 734 (Legendary)
  {
    id: 'unit_734', name: 'Unit 734', title: 'Unit 734', type: 'unit', tier: 1, cost: 7,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 2 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 2, 'all_units', 'exclude_faction:Megacorp')] 
  },
  {
    id: 'unit_734_t2', name: 'Unit 735', title: 'Unit 735', type: 'unit', tier: 2, cost: 7,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 3 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 3, 'all_units', 'exclude_faction:Megacorp')] 
  },
  {
    id: 'unit_734_t3', name: 'Unit 736', title: 'Unit 736', type: 'unit', tier: 3, cost: 7,
    stats: { atk: 8, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 4 Dmg to all non-Megacorp. Shield.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 4, 'all_units', 'exclude_faction:Megacorp'), m('shield', 'constant')]
  }
];

export const VOIDBORN_CARDS: Card[] = [
  {
    id: 'enemy_leech', name: 'Void Leech', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Biological', rarity: 'Common',
    text: 'Lifesteal.', faction: 'Voidborn', baseAsset: 'void_leech', 
    lore: "It feeds on what makes you, you.",
    mechanics: [m('lifesteal', 'constant')]
  },
  {
    id: 'void_voidling', name: 'Voidling', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Psionic', rarity: 'Common',
    text: 'Rush.', faction: 'Voidborn', baseAsset: 'void_ling', 
    lore: "A fragment of the nothingness.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'void_polyp', name: 'Whispering Polyp', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 0, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'Turn End: Pollute 1.', faction: 'Voidborn', baseAsset: 'void_polyp', 
    lore: "It doesn't speak with a mouth, but you hear it anyway.",
    mechanics: [m('pollute', 'onTurnEnd', 1)]
  },
  {
    id: 'void_horror', name: 'Gazing Horror', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 1, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'Guard. Thorns 1.', faction: 'Voidborn', baseAsset: 'void_horror', 
    lore: "If you stare back, you're already lost.",
    mechanics: [m('guard', 'constant'), m('thorns', 'constant', 1)]
  },
  {
    id: 'void_tear', name: 'Reality Tear', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Uncommon',
    text: 'OnDeath: Summon 2 Voidlings.', faction: 'Voidborn', baseAsset: 'void_tear', 
    lore: "A hole in the world where the monsters come in.",
    mechanics: [m('summon', 'onDeath', 2, 'self', 'void_voidling')]
  },
  {
    id: 'void_flayer', name: 'Mind Flayer', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Psionic', rarity: 'Rare',
    text: 'OnAttack: Pollute 1.', faction: 'Voidborn', baseAsset: 'void_flayer', 
    lore: "It peels away your thoughts layer by layer.",
    mechanics: [m('pollute', 'onAttack', 1)]
  }
];

export const ENEMY_CARDS = [...MEGACORP_CARDS, ...VOIDBORN_CARDS];

export const ALL_CARDS = [...HERO_CARDS, ...TACTIC_CARDS, ...ENEMY_CARDS, ...TOKEN_CARDS];
