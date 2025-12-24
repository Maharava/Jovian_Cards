import type { Card } from '../types';
import { m } from './cardUtils';

export const HERO_CARDS: Card[] = [
  // --- ELARA (Bio-Optimize/Draw) --- Rare
  {
    id: 'elara_t1', name: 'Elara', title: 'Researcher', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Bio-Optimize 1 (+1/+1). Turn Start: Draw 1.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('bio_optimize', 'onPlay', 1, 'target_ally', undefined, 1), m('draw', 'onTurnStart', 1, 'self')]
  },
  {
    id: 'elara_t2', name: 'Elara', title: 'Geneticist', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Bio-Optimize 2 (+2/+2). Turn Start: Draw 1.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('bio_optimize', 'onPlay', 2, 'target_ally', undefined, 2), m('draw', 'onTurnStart', 1, 'self')]
  },
  {
    id: 'elara_t3', name: 'Elara', title: 'The Biologist', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Bio-Optimize 1 (+1/+1). Turn Start: Draw 2.', faction: 'Jovian',
    baseAsset: 'elara',
    lore: "Elara is a scientist, arguably the best floral biologist past the Belt.",
    mechanics: [m('bio_optimize', 'onPlay', 1, 'target_ally', undefined, 1), m('draw', 'onTurnStart', 2, 'self')]
  },

  // --- EUROPA (Stun/Support) --- Legendary
  {
    id: 'europa_t1', name: 'Europa', title: 'Diplomat', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 2, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All Enemies. Turn End: Heal random ally 2.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('heal', 'onTurnEnd', 2, 'random_ally')]
  },
  {
    id: 'europa_t2', name: 'Europa', title: 'Matriarch', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 3, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All Enemies. Turn End: Heal all allies 2.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('heal', 'onTurnEnd', 2, 'all_allies')]
  },
  {
    id: 'europa_t3', name: 'Europa', title: 'The Mind Ocean', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 4, hp: 7, maxHp: 7 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Stun All Enemies. Turn Start: Draw 1. Turn End: Heal all allies 3.', faction: 'Jovian',
    baseAsset: 'europa',
    lore: "Psychic, quite powerful. Hears the Whispers. Diplomatic and motherly.",
    mechanics: [m('stun', 'onPlay', 1, 'all_enemies'), m('draw', 'onTurnStart', 1, 'self'), m('heal', 'onTurnEnd', 3, 'all_allies')]
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
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone_2')]
  },
  {
    id: 'io_t3', name: 'Io', title: 'The Drone Master', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Summon 1/2 Drone.', faction: 'Jovian',
    baseAsset: 'io',
    lore: "The tech gremlin, always building something.",
    mechanics: [m('summon', 'onTurnStart', 1, 'self', 'neutral_drone_2')]
  },

  // --- LYSITHEA (Hack) --- Common
  {
    id: 'lysithea_t1', name: 'Lysithea', title: 'Script-Kiddie', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Psionic', rarity: 'Common',
    text: 'OnPlay: Hack 1.', faction: 'Jovian',
    baseAsset: 'lysithea',
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onPlay', 1, 'random_enemy')]
  },
  {
    id: 'lysithea_t2', name: 'Lysithea', title: 'White Hat', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Common',
    text: 'OnPlay: Hack 2.', faction: 'Jovian',
    baseAsset: 'lysithea',
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'lysithea_t3', name: 'Lysithea', title: 'The Hacker', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Psionic', rarity: 'Common',
    text: 'OnPlay: Hack 3.', faction: 'Jovian',
    baseAsset: 'lysithea', 
    lore: "A chaotic psychic whose presence disrupts technology.",
    mechanics: [m('hack', 'onPlay', 3, 'random_enemy')]
  },

  // --- PASIPHAE (Redeploy/Rush) --- Rare
  {
    id: 'pasiphae_t1', name: 'Pasiphae', title: 'Gamer', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Redeploy.', faction: 'Jovian',
    baseAsset: 'pasiphae',
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('redeploy', 'onPlay', 1, 'target_ally')]
  },
  {
    id: 'pasiphae_t2', name: 'Pasiphae', title: 'Pilot', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnPlay: Redeploy.', faction: 'Jovian',
    baseAsset: 'pasiphae',
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('rush', 'constant'), m('redeploy', 'onPlay', 1, 'target_ally')]
  },
  {
    id: 'pasiphae_t3', name: 'Pasiphae', title: 'The Ace', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnPlay: Redeploy. Turn End: Rally 1.', faction: 'Jovian',
    baseAsset: 'pasiphae',
    lore: "Giggly, a bit shy, massive gamer girl and nerd.",
    mechanics: [m('rush', 'constant'), m('redeploy', 'onPlay', 1, 'target_ally'), m('rally', 'onTurnEnd', 1, 'random_ally')]
  },

  // --- PRAXIDIKE (Decoy) --- Rare
  {
    id: 'praxidike_t1', name: 'Praxidike', title: 'Prankster', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Summon 0/3 Hologram with Guard.', faction: 'Jovian',
    baseAsset: 'praxidike',
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_1')]
  },
  {
    id: 'praxidike_t2', name: 'Praxidike', title: 'Illusionist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Summon 1/3 Hologram with Guard.', faction: 'Jovian',
    baseAsset: 'praxidike',
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_2')]
  },
  {
    id: 'praxidike_t3', name: 'Praxidike', title: 'The Trickster', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'OnPlay: Summon 1/4 Hologram (Guard, Shield). When Attacked: Summon 1/4 Hologram.', faction: 'Jovian',
    baseAsset: 'praxidike',
    lore: "A storm in a package. Always up to mischief.",
    mechanics: [m('decoy', 'onPlay', 1, 'self', 'hologram_3'), m('decoy', 'onDamageTaken', 1, 'self', 'hologram_3')]
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

  // --- METIS (The Flare) --- Legendary
  {
    id: 'metis_t1', name: 'Metis', title: 'Hunter', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 6, hp: 5, maxHp: 5 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Spark 3.', faction: 'Jovian',
    baseAsset: 'metis',
    lore: "The only other outright Psychic. Unlike Europa, mercy isn't in Metis' nature.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy')]
  },
  {
    id: 'metis_t2', name: 'Metis', title: 'Avenger', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 7, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Spark 3. WhenAttacked: Spark 3.', faction: 'Jovian',
    baseAsset: 'metis',
    lore: "The only other outright Psychic. Unlike Europa, mercy isn't in Metis' nature.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy'), m('spark', 'onDamageTaken', 3, 'random_enemy')]
  },
  {
    id: 'metis_t3', name: 'Metis', title: 'The Flare', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Psionic', rarity: 'Legendary',
    text: 'OnPlay: Destroy target enemy. WhenAttacked: Spark 3.', faction: 'Jovian',
    baseAsset: 'metis',
    lore: "The only other outright Psychic. Unlike Europa, mercy isn't in Metis' nature.",
    mechanics: [m('damage', 'onPlay', 100, 'target_enemy'), m('spark', 'onDamageTaken', 3, 'random_enemy')]
  },

  // --- THEBE (Snipe/Loot) --- Legendary
  {
    id: 'thebe_t1', name: 'Thebe', title: 'Ranger', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 6, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Loot 1.', faction: 'Jovian',
    baseAsset: 'thebe',
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('loot', 'constant', 1)]
  },
  {
    id: 'thebe_t2', name: 'Thebe', title: 'Stalker', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 7, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Loot 1.', faction: 'Jovian',
    baseAsset: 'thebe',
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('loot', 'constant', 1)]
  },
  {
    id: 'thebe_t3', name: 'Thebe', title: 'The Apex', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 7, hp: 7, maxHp: 7 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Loot 1. Turn End: Regenerate 2.', faction: 'Jovian',
    baseAsset: 'thebe',
    lore: "The wildest Jovian. A bio-hacker, hunter and finder.",
    mechanics: [m('snipe', 'constant'), m('loot', 'constant', 1), m('regenerate', 'onTurnEnd', 2)]
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
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1, 'self')]
  },
  {
    id: 'ganymede_t3', name: 'Ganymede', title: 'The Pugilist', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'Rush. OnAttack: Rage 1.', faction: 'Jovian', baseAsset: 'ganymede',
    lore: "A tease, a joker. Her muscles are stronger kg-for-kg than a bodybuilder's.",
    mechanics: [m('rush', 'constant'), m('rage', 'onAttack', 1, 'self')]
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
    id: 'himalia_t3', name: 'Himalia', title: 'The Shield', type: 'unit', tier: 3, cost: 4,
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
    mechanics: [m('guard', 'constant'), m('regenerate', 'onTurnEnd', 1, 'self')]
  },

  // --- CALLISTO --- Uncommon
  {
    id: 'callisto_t1', name: 'Callisto', title: 'Street Fighter', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon a 1/1 thug.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_thug')]
  },
  {
    id: 'callisto_t2', name: 'Callisto', title: 'Thug Boss', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon 2 1/1 thugs.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('summon', 'onPlay', 2, 'self', 'neutral_thug')]
  },
  {
    id: 'callisto_t3', name: 'Callisto', title: 'The Gang Queen', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnAttack: Rage. OnPlay: Summon 2 1/1 thugs.', faction: 'Jovian', baseAsset: 'callisto',
    lore: "Always a troublesome Jovian, now a gang leader.",
    mechanics: [m('rage', 'onAttack', 1, 'self'), m('summon', 'onPlay', 2, 'self', 'neutral_thug')]
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
    mechanics: [m('breach', 'onAttack', undefined, 'target_unit')]
  },
  {
    id: 'carpo_t3', name: 'Carpo', title: 'The Mechanic', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'OnAttack: Breach.', faction: 'Jovian', baseAsset: 'carpo',
    lore: "The other brother, femboy Carpo loves technology.",
    mechanics: [m('breach', 'onAttack', undefined, 'target_unit')]
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
    text: 'OnPlay: Spark 3.', faction: 'Jovian', baseAsset: 'cyllene',
    lore: "Chaotic energy.",
    mechanics: [m('spark', 'onPlay', 3, 'random_enemy')]
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