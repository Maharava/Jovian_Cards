import type { Card } from '../types';

export const HERO_CARDS: Card[] = [
  // --- ELARA ---
  {
    id: 'elara_t1', name: 'Elara, Scanner', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    text: 'OnPlay: Scout 1 enemy card.',
    baseAsset: 'elara', mechanics: ['scout']
  },
  {
    id: 'elara_t2', name: 'Elara, Analyst', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 3, hp: 4, maxHp: 4 },
    text: 'OnPlay: Scout 1. If Tactic, draw 1.',
    baseAsset: 'elara', mechanics: ['scout']
  },
  {
    id: 'elara_t3', name: 'Elara, Omniscient', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 4, hp: 5, maxHp: 5 },
    text: 'Passive: Reveal enemy hand. Enemy Tactics cost +2.',
    baseAsset: 'elara', mechanics: ['reveal']
  },

  // --- EUROPA ---
  {
    id: 'europa_t1', name: 'Europa, Adept', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    text: 'OnPlay: Stun an enemy unit.',
    baseAsset: 'europa', mechanics: ['stun']
  },
  {
    id: 'europa_t2', name: 'Europa, Mentalist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    text: 'OnPlay: Stun an enemy. Deal 2 damage to it.',
    baseAsset: 'europa', mechanics: ['stun']
  },
  {
    id: 'europa_t3', name: 'Europa, Oracle', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 },
    text: 'OnPlay: Stun ALL enemy units.',
    baseAsset: 'europa', mechanics: ['stun']
  },

  // --- IO ---
  {
    id: 'io_t1', name: 'Io, Mechanic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    text: 'Support: Give random ally +1 ATK.',
    baseAsset: 'io', mechanics: ['support']
  },
  {
    id: 'io_t2', name: 'Io, Technomancer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 5, maxHp: 5 },
    text: 'Support: Give random ally +1/+1.',
    baseAsset: 'io', mechanics: ['support']
  },
  {
    id: 'io_t3', name: 'Io, Architect', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 6, maxHp: 6 },
    text: 'Support: All allies +1/+1 and Repair 1.',
    baseAsset: 'io', mechanics: ['support', 'repair']
  },

  // --- LYSITHEA ---
  {
    id: 'lysithea_t1', name: 'Lysithea, Glitch', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    text: 'Glitch (50% chance to attack random target).',
    baseAsset: 'lysithea', mechanics: ['glitch']
  },
  {
    id: 'lysithea_t2', name: 'Lysithea, Unstable', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 5, hp: 4, maxHp: 4 },
    text: 'Glitch. Death: Deal 3 dmg to ALL characters.',
    baseAsset: 'lysithea', mechanics: ['glitch']
  },
  {
    id: 'lysithea_t3', name: 'Lysithea, Singularity', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 8, hp: 8, maxHp: 8 },
    text: 'Glitch. TurnEnd: Transform random enemy to 1/1 Bot.',
    baseAsset: 'lysithea', mechanics: ['glitch', 'transform']
  },

  // --- PASIPHAE ---
  {
    id: 'pasiphae_t1', name: 'Pasiphae, Ace', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 },
    text: 'Rush.',
    baseAsset: 'pasiphae', mechanics: ['rush']
  },
  {
    id: 'pasiphae_t2', name: 'Pasiphae, Wingman', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 },
    text: 'Rush. OnPlay: Return friendly unit to hand.',
    baseAsset: 'pasiphae', mechanics: ['rush', 'bounce']
  },
  {
    id: 'pasiphae_t3', name: 'Pasiphae, Legend', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 },
    text: 'Rush. Windfury (Attacks twice).',
    baseAsset: 'pasiphae', mechanics: ['rush', 'windfury']
  },

  // --- PRAXIDIKE ---
  {
    id: 'praxidike_t1', name: 'Praxidike, Decoy', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 1, maxHp: 1 },
    text: 'OnPlay: Summon 0/2 Hologram with Guard.',
    baseAsset: 'praxidike', mechanics: ['summon']
  },
  {
    id: 'praxidike_t2', name: 'Praxidike, Illusionist', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    text: 'OnPlay: Summon two 0/2 Holograms with Guard.',
    baseAsset: 'praxidike', mechanics: ['summon']
  },
  {
    id: 'praxidike_t3', name: 'Praxidike, Mastermind', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 },
    text: 'OnPlay: Fill board with 1/1 Holograms with Guard.',
    baseAsset: 'praxidike', mechanics: ['summon']
  },

  // --- SINOPE ---
  {
    id: 'sinope_t1', name: 'Sinope, Envoy', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    text: 'OnPlay: Give enemy -2 ATK this turn.',
    baseAsset: 'sinope', mechanics: ['debuff']
  },
  {
    id: 'sinope_t2', name: 'Sinope, Ambassador', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 1, hp: 6, maxHp: 6 },
    text: 'OnPlay: Set enemy ATK to 0 this turn.',
    baseAsset: 'sinope', mechanics: ['debuff']
  },
  {
    id: 'sinope_t3', name: 'Sinope, Peacemaker', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 2, hp: 8, maxHp: 8 },
    text: 'Passive: All enemies have -1 ATK.',
    baseAsset: 'sinope', mechanics: ['debuff']
  },

  // --- THEBE ---
  {
    id: 'thebe_t1', name: 'Thebe, Scout', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    text: 'Snipe (Bypasses Guard).',
    baseAsset: 'thebe', mechanics: ['snipe']
  },
  {
    id: 'thebe_t2', name: 'Thebe, Sniper', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 },
    text: 'Snipe. OnPlay: Deal 2 damage to target.',
    baseAsset: 'thebe', mechanics: ['snipe']
  },
  {
    id: 'thebe_t3', name: 'Thebe, Deadeye', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 3, maxHp: 3 },
    text: 'Snipe. Double damage vs undamaged targets.',
    baseAsset: 'thebe', mechanics: ['snipe']
  },
];

export const ENEMY_CARDS: Card[] = [
  {
    id: 'enemy_drone', name: 'Mining Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    text: '', baseAsset: 'enemy_drone', mechanics: []
  },
  {
    id: 'enemy_security', name: 'Security Bot', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    text: 'Guard.', baseAsset: 'enemy_bot', mechanics: ['guard']
  },
  {
    id: 'enemy_leech', name: 'Void Leech', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 3, hp: 1, maxHp: 1 },
    text: 'Lifesteal.', baseAsset: 'enemy_leech', mechanics: ['lifesteal']
  },
  {
    id: 'enemy_uplink', name: 'Corrupted Uplink', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 },
    text: 'TurnEnd: Summon 1/1 Drone.', baseAsset: 'enemy_uplink', mechanics: ['summon']
  },
  {
    id: 'enemy_loader', name: 'Heavy Loader', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 4, hp: 6, maxHp: 6 },
    text: 'Slow (Attacks every other turn).', baseAsset: 'enemy_loader', mechanics: ['slow']
  },
];

export const ALL_CARDS = [...HERO_CARDS, ...ENEMY_CARDS];
