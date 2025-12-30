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
> = (set, get) => ({
  drawCard: (count = 1) => {
    const state = get();
    // Use mutable copies
    const newHand = [...state.player.hand];
    let newDeck = [...state.player.deck];
    let newGraveyard = [...state.player.graveyard];
    let shouldEndTurn = false;

    for (let i = 0; i < count; i++) {
      if (newDeck.length === 0) {
        if (newGraveyard.length > 0) {
           // Recycle Graveyard
           newDeck = shuffleArray(newGraveyard);
           newGraveyard = [];
           
           // Draw 1 card from new deck
           const card = newDeck.shift();
           if (card) {
               newHand.push({ ...card, uid: generateId() });
           }

           // Flag to end turn immediately (Fatigue/Cycle penalty)
           shouldEndTurn = true;
           break; // Stop drawing
        } else {
           // No cards left at all
           break;
        }
      } else {
        const card = newDeck.shift();
        if (card) {
          newHand.push({ ...card, uid: generateId() });
        }
      }
    }

    set({
      player: {
        ...state.player,
        hand: newHand,
        deck: newDeck,
        graveyard: newGraveyard
      }
    });

    if (shouldEndTurn) {
        // We need to access endPlayerTurn from the main store actions
        // Since get() returns the full store state/actions
        (get() as any).endPlayerTurn();
    }
  },

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
