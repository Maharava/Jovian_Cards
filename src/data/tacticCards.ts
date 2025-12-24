import type { Card } from '../types';
import { m } from './cardUtils';

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
    text: 'OnPlay: Return a friendly unit to your hand.', faction: 'Republic', rarity: 'Uncommon',
    baseAsset: 'scramble',
    lore: "A tactical retreat is better than a strategic defeat.",
    mechanics: [m('redeploy', 'onPlay', 1, 'target_ally')]
  },
  // --- MEGACORP TACTICS ---
  {
    id: 'tactic_asset_seizure', name: 'Asset Seizure', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Deal 3 damage to an enemy unit.', faction: 'Megacorp', rarity: 'Uncommon',
    baseAsset: 'corp_seizure',
    lore: "Repossession in progress. Resistance will be billed to your next of kin.",
    mechanics: [m('damage', 'onPlay', 3, 'target_enemy')]
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
    id: 'tactic_budget_cuts', name: 'Budget Cuts', type: 'tactic', tier: 1, cost: 1,
    text: 'OnPlay: Destroy a friendly unit. Gain 2 Energy.', faction: 'Megacorp', rarity: 'Common',
    baseAsset: 'budget_cuts',
    lore: "Your sacrifice for the quarterly earnings report is appreciated.",
    mechanics: [m('gain_energy', 'onPlay', 2)]
  },
  {
    id: 'tactic_rapid_prototyping', name: 'Rapid Prototyping', type: 'tactic', tier: 1, cost: 2,
    text: 'OnPlay: Give a unit +2/+2.', faction: 'Megacorp', rarity: 'Common',
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
    text: 'OnPlay: Reduce ALL enemy units\' Attack by 2.', faction: 'Megacorp', rarity: 'Rare',
    baseAsset: 'market_crash',
    lore: "Panic selling wipes out billions in seconds.",
    mechanics: [m('debuff', 'onPlay', 2, 'all_enemies')]
  },
];
