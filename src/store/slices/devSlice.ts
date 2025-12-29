import type { StateCreator } from 'zustand';
import type { UnitInstance } from '../../types';
import { generateId } from '../../lib/utils';
import { MAX_BOARD_SLOTS, MAX_ENERGY_CAP } from '../../config/constants';

// Note: CARD_MAP will be passed from gameStore to avoid circular dependencies

export interface DevSlice {
  // Dev mode actions
  devSetPlayerHP: (hp: number) => void;
  devSetEnemyHP: (hp: number) => void;
  devSetUnitHP: (unitUid: string, hp: number) => void;
  devSetUnitATK: (unitUid: string, atk: number) => void;
  devSetPlayerEnergy: (energy: number) => void;
  devSetMaxEnergy: (maxEnergy: number) => void;
  devSpawnCard: (cardId: string) => void;
  devSpawnEnemyCard: (cardId: string) => void;
  devRemoveUnit: (unitUid: string) => void;
  devClearBoard: (side: 'player' | 'enemy' | 'both') => void;
}

export const createDevSlice: StateCreator<
  any,
  [],
  [],
  DevSlice
> = (set, get) => ({
  devSetPlayerHP: (hp: number) => {
    set((state: any) => ({
      player: {
        ...state.player,
        hp: Math.max(0, Math.min(hp, state.player.maxHp))
      }
    }));
  },

  devSetEnemyHP: (hp: number) => {
    set((state: any) => ({
      enemy: {
        ...state.enemy,
        hp: Math.max(0, Math.min(hp, state.enemy.maxHp))
      }
    }));
  },

  devSetUnitHP: (unitUid: string, hp: number) => {
    set((state: any) => {
      const playerUnit = state.player.board.find((u: UnitInstance) => u.uid === unitUid);
      const enemyUnit = state.enemy.board.find((u: UnitInstance) => u.uid === unitUid);

      if (playerUnit) {
        return {
          player: {
            ...state.player,
            board: state.player.board.map((u: UnitInstance) =>
              u.uid === unitUid
                ? { ...u, hp: Math.max(0, Math.min(hp, u.maxHp)) }
                : u
            )
          }
        };
      } else if (enemyUnit) {
        return {
          enemy: {
            ...state.enemy,
            board: state.enemy.board.map((u: UnitInstance) =>
              u.uid === unitUid
                ? { ...u, hp: Math.max(0, Math.min(hp, u.maxHp)) }
                : u
            )
          }
        };
      }
      return {};
    });
  },

  devSetUnitATK: (unitUid: string, atk: number) => {
    set((state: any) => {
      const playerUnit = state.player.board.find((u: UnitInstance) => u.uid === unitUid);
      const enemyUnit = state.enemy.board.find((u: UnitInstance) => u.uid === unitUid);

      if (playerUnit) {
        return {
          player: {
            ...state.player,
            board: state.player.board.map((u: UnitInstance) =>
              u.uid === unitUid ? { ...u, atk: Math.max(0, atk) } : u
            )
          }
        };
      } else if (enemyUnit) {
        return {
          enemy: {
            ...state.enemy,
            board: state.enemy.board.map((u: UnitInstance) =>
              u.uid === unitUid ? { ...u, atk: Math.max(0, atk) } : u
            )
          }
        };
      }
      return {};
    });
  },

  devSetPlayerEnergy: (energy: number) => {
    set((state: any) => ({
      player: {
        ...state.player,
        energy: Math.max(0, Math.min(energy, state.player.maxEnergy))
      }
    }));
  },

  devSetMaxEnergy: (maxEnergy: number) => {
    set((state: any) => ({
      player: {
        ...state.player,
        maxEnergy: Math.max(1, Math.min(maxEnergy, MAX_ENERGY_CAP))
      }
    }));
  },

  devSpawnCard: (cardId: string) => {
    set((state: any) => {
      // Access CARD_MAP from parent scope (gameStore)
      const CARD_MAP = (get() as any).__CARD_MAP;
      const card = CARD_MAP?.get(cardId);

      if (!card) {
        console.warn(`Card ${cardId} not found in CARD_MAP`);
        return {};
      }

      if (state.player.hand.length >= 10) {
        console.warn('Hand is full (10 cards), cannot spawn card');
        return {};
      }

      return {
        player: {
          ...state.player,
          hand: [...state.player.hand, { ...card, uid: generateId() }]
        }
      };
    });
  },

  devSpawnEnemyCard: (cardId: string) => {
    set((state: any) => {
      // Access CARD_MAP from parent scope (gameStore)
      const CARD_MAP = (get() as any).__CARD_MAP;
      const card = CARD_MAP?.get(cardId);

      if (!card) {
        console.warn(`Card ${cardId} not found in CARD_MAP`);
        return {};
      }
      if (card.type !== 'unit') {
        console.warn('Can only spawn unit cards for enemy');
        return {};
      }
      if (state.enemy.board.length >= MAX_BOARD_SLOTS) {
        console.warn('Enemy board is full, cannot spawn unit');
        return {};
      }

      const newUnit: UnitInstance = {
        uid: generateId(),
        cardId: card.id,
        name: card.name,
        baseAsset: card.baseAsset,
        faction: card.faction,
        subtype: card.subtype,
        atk: card.stats?.atk || 0,
        hp: card.stats?.hp || 1,
        maxHp: card.stats?.hp || 1,
        owner: 'enemy',
        ready: true,
        attacksLeft: 1,
        mechanics: card.mechanics || [],
        shield: 0
      };

      return {
        enemy: {
          ...state.enemy,
          board: [...state.enemy.board, newUnit]
        }
      };
    });
  },

  devRemoveUnit: (unitUid: string) => {
    set((state: any) => {
      const playerUnit = state.player.board.find((u: UnitInstance) => u.uid === unitUid);
      const enemyUnit = state.enemy.board.find((u: UnitInstance) => u.uid === unitUid);

      if (playerUnit) {
        return {
          player: {
            ...state.player,
            board: state.player.board.filter((u: UnitInstance) => u.uid !== unitUid)
          }
        };
      } else if (enemyUnit) {
        return {
          enemy: {
            ...state.enemy,
            board: state.enemy.board.filter((u: UnitInstance) => u.uid !== unitUid)
          }
        };
      }

      console.warn(`Unit ${unitUid} not found`);
      return {};
    });
  },

  devClearBoard: (side: 'player' | 'enemy' | 'both') => {
    set((state: any) => {
      if (side === 'player') {
        return {
          player: { ...state.player, board: [] }
        };
      } else if (side === 'enemy') {
        return {
          enemy: { ...state.enemy, board: [] }
        };
      } else {
        return {
          player: { ...state.player, board: [] },
          enemy: { ...state.enemy, board: [] }
        };
      }
    });
  }
});
