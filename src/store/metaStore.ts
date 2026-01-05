import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultStarterDeck } from '../data/starterDecks';

export interface SavedDeck {
  id: string;
  name: string;
  cardIds: string[];
}

interface MetaState {
  collection: Record<string, number>; // Card ID -> Quantity owned
  savedDecks: SavedDeck[];
  activeDeckId: string | null;
  marketRotationFaction: string; // Tracks the current faction for the Faction Pack

  // Resources
  credits: number;
  platinum: number;
  mossan: number;

  // Cosmetics
  unlockedCosmetics: Record<string, string[]>; // Card ID -> Array of unlocked cosmetic IDs
  activeCosmetics: Record<string, string>; // Card ID -> Active cosmetic ID

  // Actions
  unlockCard: (id: string, amount?: number) => void;
  saveDeck: (deck: SavedDeck) => void;
  deleteDeck: (id: string) => void;
  setActiveDeck: (id: string) => void;
  resetProgress: () => void;
  rotateMarketFaction: () => void;

  addResource: (type: 'credits' | 'platinum' | 'mossan', amount: number) => void;
  spendCredits: (amount: number) => boolean;
  spendPlatinum: (amount: number) => boolean;
  spendMossan: (amount: number) => boolean;

  // Cosmetic actions
  unlockCosmetic: (cardId: string, cosmeticId: string) => void;
  setActiveCosmetic: (cardId: string, cosmeticId: string) => void;
}

// Get the default starter deck configuration
const DEFAULT_STARTER = getDefaultStarterDeck();

// Build initial collection from starter deck
const INITIAL_COLLECTION: Record<string, number> = {};
DEFAULT_STARTER.cardIds.forEach(id => {
    INITIAL_COLLECTION[id] = (INITIAL_COLLECTION[id] || 0) + 1;
}); 

export const useMetaStore = create<MetaState>()(
  persist(
    (set, get) => ({
      collection: INITIAL_COLLECTION,
      savedDecks: [
          {
              id: `default_${DEFAULT_STARTER.faction.toLowerCase()}`,
              name: DEFAULT_STARTER.name,
              cardIds: DEFAULT_STARTER.cardIds
          }
      ],
      activeDeckId: `default_${DEFAULT_STARTER.faction.toLowerCase()}`,
      marketRotationFaction: DEFAULT_STARTER.faction,

      credits: 1000, // Starter credits
      platinum: 0,
      mossan: 0,

      unlockedCosmetics: {},
      activeCosmetics: {},

      rotateMarketFaction: () => set(() => {
          const options = ['Confederate', 'Megacorp', 'Republic']; // Expandable list
          const next = options[Math.floor(Math.random() * options.length)];
          return { marketRotationFaction: next };
      }),

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
              case 'platinum': return { platinum: state.platinum + amount };
              case 'mossan': return { mossan: state.mossan + amount };
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

      spendPlatinum: (amount) => {
          const { platinum } = get();
          if (platinum >= amount) {
              set({ platinum: platinum - amount });
              return true;
          }
          return false;
      },

      spendMossan: (amount) => {
          const { mossan } = get();
          if (mossan >= amount) {
              set({ mossan: mossan - amount });
              return true;
          }
          return false;
      },

      unlockCosmetic: (cardId, cosmeticId) => set((state) => {
          const unlocked = state.unlockedCosmetics[cardId] || [];
          if (unlocked.includes(cosmeticId)) return state; // Already unlocked

          return {
              unlockedCosmetics: {
                  ...state.unlockedCosmetics,
                  [cardId]: [...unlocked, cosmeticId]
              }
          };
      }),

      setActiveCosmetic: (cardId, cosmeticId) => set((state) => ({
          activeCosmetics: {
              ...state.activeCosmetics,
              [cardId]: cosmeticId
          }
      })),

      resetProgress: () => set({
          collection: INITIAL_COLLECTION,
          savedDecks: [{
              id: `default_${DEFAULT_STARTER.faction.toLowerCase()}`,
              name: DEFAULT_STARTER.name,
              cardIds: DEFAULT_STARTER.cardIds
          }],
          activeDeckId: `default_${DEFAULT_STARTER.faction.toLowerCase()}`,
          marketRotationFaction: DEFAULT_STARTER.faction,
          credits: 1000,
          platinum: 0,
          mossan: 0,
          unlockedCosmetics: {},
          activeCosmetics: {}
      })
    }),
    {
      name: 'jovian_meta_storage_v5', // Incremented version to invalidate old saves
    }
  )
);
