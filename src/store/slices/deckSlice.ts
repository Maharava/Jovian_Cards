import type { StateCreator } from 'zustand';
import type { Card } from '../../types';
import { generateId } from '../../lib/utils';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export interface DeckSlice {
  // Actions
  drawCard: (count?: number) => void;
  shuffleDeck: (cards: Card[]) => Card[];
  addCardToHand: (card: Card) => void;
  removeCardFromHand: (cardUid: string) => void;
}

export const createDeckSlice: StateCreator<
  any, // Full store state
  [],
  [],
  DeckSlice
> = (set) => ({
  drawCard: (count = 1) => set((state: any) => {
    const newHand = [...state.player.hand];
    const newDeck = [...state.player.deck];

    for (let i = 0; i < count; i++) {
      if (newDeck.length === 0) break;

      const card = newDeck.shift();
      if (card) {
        newHand.push({ ...card, uid: generateId() });
      }
    }

    return {
      player: {
        ...state.player,
        hand: newHand,
        deck: newDeck
      }
    };
  }),

  shuffleDeck: (cards: Card[]) => shuffleArray(cards),

  addCardToHand: (card: Card) => set((state: any) => ({
    player: {
      ...state.player,
      hand: [...state.player.hand, { ...card, uid: generateId() }]
    }
  })),

  removeCardFromHand: (cardUid: string) => set((state: any) => ({
    player: {
      ...state.player,
      hand: state.player.hand.filter((c: any) => c.uid !== cardUid)
    }
  }))
});
