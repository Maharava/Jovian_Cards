import type { Card } from '../types';
import { m } from './cardUtils';

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
