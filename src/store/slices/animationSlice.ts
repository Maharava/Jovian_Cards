import type { StateCreator } from 'zustand';
import { generateId } from '../../lib/utils';

export interface AnimationSlice {
  // Animation State
  attackingUnitId: string | null;
  attackVector: { from: string; to: string } | null;
  effectVector: { from: string; to: string; color: string } | null;
  abilityNotification: { unitUid: string; text: string; timestamp: number } | null;
  abilityNotifications: Array<{ id: string; unitName: string; text: string; timestamp: number }>;

  // Actions
  setAttackingUnit: (uid: string | null) => void;
  setAttackVector: (vector: { from: string; to: string } | null) => void;
  setEffectVector: (vector: { from: string; to: string; color: string } | null) => void;
  addAbilityNotification: (unitName: string, abilityText: string) => void;
  clearAnimations: () => void;
}

export const createAnimationSlice: StateCreator<
  AnimationSlice,
  [],
  [],
  AnimationSlice
> = (set) => ({
  attackingUnitId: null,
  attackVector: null,
  effectVector: null,
  abilityNotification: null,
  abilityNotifications: [],

  setAttackingUnit: (uid) => set({ attackingUnitId: uid }),

  setAttackVector: (vector) => set({ attackVector: vector }),

  setEffectVector: (vector) => set({ effectVector: vector }),

  addAbilityNotification: (unitName, abilityText) => set((state) => ({
    abilityNotifications: [
      ...state.abilityNotifications,
      {
        id: generateId(),
        unitName,
        text: abilityText,
        timestamp: Date.now()
      }
    ]
  })),

  clearAnimations: () => set({
    attackingUnitId: null,
    attackVector: null,
    effectVector: null,
    abilityNotification: null
  })
});
