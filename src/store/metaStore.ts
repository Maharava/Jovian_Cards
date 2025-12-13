import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_CARDS } from '../data/cards';

export interface SavedDeck {
  id: string;
  name: string;
  cardIds: string[];
}

interface MetaState {
  collection: Record<string, number>; // Card ID -> Quantity owned
  savedDecks: SavedDeck[];
  activeDeckId: string | null;
  
  // Resources
  credits: number;
  parts: number;
  bioSamples: number;
  psiCrystals: number;
  
  unlockCard: (id: string, amount?: number) => void;
  saveDeck: (deck: SavedDeck) => void;
  deleteDeck: (id: string) => void;
  setActiveDeck: (id: string) => void;
  resetProgress: () => void;
  
  addResource: (type: 'credits' | 'parts' | 'bio' | 'psi', amount: number) => void;
  spendCredits: (amount: number) => boolean; // Returns success
  upgradeCard: (currentId: string, nextId: string, cost: number, resourceType: 'parts' | 'bio' | 'psi') => boolean;
}

// Initial unlocks: 2 copies of all Tier 1 Jovian Units & Tactics
const INITIAL_COLLECTION: Record<string, number> = {};
ALL_CARDS.forEach(c => {
    if (c.tier === 1 && (c.type === 'tactic' || c.faction === 'Jovian')) {
        INITIAL_COLLECTION[c.id] = 2;
    }
});

const DEFAULT_DECK_CARDS = ALL_CARDS
    .filter(c => c.tier === 1 && (c.type === 'tactic' || c.faction === 'Jovian'))
    .slice(0, 10)
    .flatMap(c => [c.id, c.id]); 

export const useMetaStore = create<MetaState>()(
  persist(
    (set, get) => ({
      collection: INITIAL_COLLECTION,
      savedDecks: [
          { 
              id: 'default_vanguard', 
              name: 'Vanguard Standard', 
              cardIds: DEFAULT_DECK_CARDS.slice(0, 20) 
          }
      ],
      activeDeckId: 'default_vanguard',
      
      credits: 1000, // Starter credits
      parts: 100,
      bioSamples: 100,
      psiCrystals: 100,

      unlockCard: (id, amount = 1) => set((state) => {
          const current = state.collection[id] || 0;
          if (current >= 3) return state; // Caller should handle overflow conversion before calling this if needed, or we just cap it.
          // The shop logic will handle duplicate conversion logic explicitly.
          return {
              collection: {
                  ...state.collection,
                  [id]: Math.min(3, current + amount)
              }
          };
      }),

      saveDeck: (deck) => set((state) => {
          const counts: Record<string, number> = {};
          const validIds: string[] = [];
          
          deck.cardIds.forEach(id => {
              counts[id] = (counts[id] || 0) + 1;
              const owned = state.collection[id] || 0;
              if (counts[id] <= owned && counts[id] <= 3) { 
                  validIds.push(id);
              }
          });

          const validatedDeck = { ...deck, cardIds: validIds };

          const existing = state.savedDecks.findIndex(d => d.id === deck.id);
          if (existing >= 0) {
              const newDecks = [...state.savedDecks];
              newDecks[existing] = validatedDeck;
              return { savedDecks: newDecks };
          }
          return { savedDecks: [...state.savedDecks, validatedDeck] };
      }),

      deleteDeck: (id) => set((state) => ({
          savedDecks: state.savedDecks.filter(d => d.id !== id),
          activeDeckId: state.activeDeckId === id ? (state.savedDecks[0]?.id || null) : state.activeDeckId
      })),

      setActiveDeck: (id) => set({ activeDeckId: id }),
      
      addResource: (type, amount) => set((state) => {
          switch(type) {
              case 'credits': return { credits: state.credits + amount };
              case 'parts': return { parts: state.parts + amount };
              case 'bio': return { bioSamples: state.bioSamples + amount };
              case 'psi': return { psiCrystals: state.psiCrystals + amount };
              default: return {};
          }
      }),
      
      spendCredits: (amount) => {
          const { credits } = get();
          if (credits >= amount) {
              set({ credits: credits - amount });
              return true;
          }
          return false;
      },

      upgradeCard: (currentId, nextId, cost, resourceType) => {
          const state = get();
          const currentCount = state.collection[currentId] || 0;
          
          // Check Resources
          let resourceAvailable = 0;
          if (resourceType === 'parts') resourceAvailable = state.parts;
          if (resourceType === 'bio') resourceAvailable = state.bioSamples;
          if (resourceType === 'psi') resourceAvailable = state.psiCrystals;

          if (currentCount > 0 && resourceAvailable >= cost) {
              // Deduct Resource
              const updates: Partial<MetaState> = {};
              if (resourceType === 'parts') updates.parts = state.parts - cost;
              if (resourceType === 'bio') updates.bioSamples = state.bioSamples - cost;
              if (resourceType === 'psi') updates.psiCrystals = state.psiCrystals - cost;

              // Update Collection
              const newCollection = { ...state.collection };
              newCollection[currentId] = currentCount - 1;
              if (newCollection[currentId] === 0) delete newCollection[currentId];
              
              newCollection[nextId] = Math.min(3, (newCollection[nextId] || 0) + 1);

              // Update Saved Decks to reflect upgrade
              const newSavedDecks = state.savedDecks.map(deck => {
                  const cardIds = [...deck.cardIds];
                  const index = cardIds.indexOf(currentId);
                  if (index !== -1) {
                      cardIds[index] = nextId;
                  }
                  return { ...deck, cardIds };
              });

              set({ ...updates, collection: newCollection, savedDecks: newSavedDecks });
              return true;
          }
          return false;
      },

      resetProgress: () => set({ 
          collection: INITIAL_COLLECTION, 
          savedDecks: [{ 
              id: 'default_vanguard', 
              name: 'Vanguard Standard', 
              cardIds: DEFAULT_DECK_CARDS.slice(0, 20) 
          }],
          activeDeckId: 'default_vanguard',
          credits: 1000, parts: 0, bioSamples: 0, psiCrystals: 0
      })
    }),
    {
      name: 'jovian_meta_storage_v4',
    }
  )
);
