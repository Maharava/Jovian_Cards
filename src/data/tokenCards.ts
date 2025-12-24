import type { Card } from '../types';
import { m } from './cardUtils';

export const TOKEN_CARDS: Card[] = [
  {
    id: 'neutral_drone', name: 'Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'NA',
    text: '', faction: 'Neutral', baseAsset: 'drone', 
    lore: "Standard automated unit.",
    mechanics: []
  },
  {
    id: 'neutral_drone_2', name: 'Drone', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'NA',
    text: '', faction: 'Neutral', baseAsset: 'drone', 
    lore: "Upgraded automated unit.",
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
