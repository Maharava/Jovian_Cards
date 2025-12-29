import type { StateCreator } from 'zustand';
import type { GameState } from '../../types';

export interface NavigationSlice {
  // Navigation actions
  enterFactionSelect: () => void;
  enterHangar: () => void;
  goToMainMenu: () => void;
  setPhase: (phase: GameState['phase']) => void;
}

export const createNavigationSlice: StateCreator<
  any,
  [],
  [],
  NavigationSlice
> = (set) => ({
  enterFactionSelect: () => set({ phase: 'faction_select' }),

  enterHangar: () => set({ phase: 'hangar' }),

  goToMainMenu: () => set({ phase: 'main_menu' }),

  setPhase: (phase) => set({ phase }),
});
