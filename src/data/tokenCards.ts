import type { Card } from '../types';
import { m } from './cardUtils';

export const TOKEN_CARDS: Card[] = [
  {
    id: 'republic_guard', name: 'Republic Guard', type: 'unit', cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Republic', baseAsset: 'republic_guard', 
    lore: "Standard Republic military unit.",
    mechanics: []
  },
  {
    id: 'tactic_aerial_strike', name: 'Aerial Strike', type: 'tactic', cost: 0,
    text: 'Deal 2 damage to a random enemy.', faction: 'Republic', rarity: 'Common',
    baseAsset: 'aerial_strike',
    lore: "Precision bombardment from above.",
    mechanics: [m('damage', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'neutral_drone', name: 'Drone', type: 'unit', cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Neutral', baseAsset: 'drone', 
    lore: "Standard automated unit.",
    mechanics: []
  },
  {
    id: 'neutral_drone_2', name: 'Drone', type: 'unit', cost: 1,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Neutral', baseAsset: 'drone', 
    lore: "Upgraded automated unit.",
    mechanics: []
  },
  {
    id: 'neutral_thug', name: 'Thug', type: 'unit', cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Biological', rarity: 'Common',
    text: '', faction: 'Neutral', baseAsset: 'thug', 
    lore: "A hired gun.",
    mechanics: []
  },
  {
    id: 'madness', name: 'Madness', type: 'tactic', cost: 0,
    text: 'Unplayable. OnDraw: Deal 2 damage to your commander. Fades at end of turn.', faction: 'Voidborn', rarity: 'Common',
    baseAsset: 'madness',
    lore: "The whispering in your skull...",
    mechanics: [m('damage', 'onDraw', 2, 'player_commander'), m('fade', 'onTurnEnd')]
  }
];
