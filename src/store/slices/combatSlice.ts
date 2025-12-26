import type { StateCreator } from 'zustand';
import type { UnitInstance } from '../../types';
import { calculateLoot, generateId } from '../../lib/utils';
import { useMetaStore } from '../metaStore';
import { ALL_CARDS } from '../../data/cards';
import { MechanicHandler } from '../../logic/mechanics';
import { DELAYS } from '../../config/constants';

function getMechanicDescription(mechanic: import('../../types').Mechanic, cardDef: import('../../types').Card | undefined): string {
  if (!cardDef?.text) return '';
  const lines = cardDef.text.split('.');
  for (const line of lines) {
    if (mechanic.trigger === 'onTurnStart' && line.includes('Turn Start')) return line.trim();
    if (mechanic.trigger === 'onTurnEnd' && line.includes('Turn End')) return line.trim();
    if (mechanic.trigger === 'onPlay' && line.includes('OnPlay')) return line.trim();
  }
  return cardDef.text.split('.')[0];
}

export interface CombatSlice {
  // State
  isProcessingQueue: boolean;

  // Actions
  attackTarget: (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => Promise<void>;
  damageUnit: (unitId: string, amount: number) => void;
  damagePlayer: (amount: number) => void;
  damageEnemy: (amount: number) => void;
}

export const createCombatSlice: StateCreator<
  any,
  [],
  [],
  CombatSlice
> = (set, get) => ({
  isProcessingQueue: false,

  damageUnit: (unitId: string, amount: number) => set((s: any) => {
    const playerUnit = s.player.board.find((u: UnitInstance) => u.uid === unitId);
    if (playerUnit) {
      playerUnit.hp -= amount;
      if (playerUnit.hp <= 0) playerUnit.dying = true;
      return { player: { ...s.player, board: [...s.player.board] } };
    }

    const enemyUnit = s.enemy.board.find((u: UnitInstance) => u.uid === unitId);
    if (enemyUnit) {
      enemyUnit.hp -= amount;
      if (enemyUnit.hp <= 0) enemyUnit.dying = true;
      return { enemy: { ...s.enemy, board: [...s.enemy.board] } };
    }

    return {};
  }),

  damagePlayer: (amount: number) => set((s: any) => {
    let newHp = s.player.hp - amount;
    let phase = s.phase;
    if (newHp <= 0) {
      newHp = 0;
      phase = 'game_over';
    }
    return { player: { ...s.player, hp: newHp }, phase };
  }),

  damageEnemy: (amount: number) => set((s: any) => {
    let newHp = s.enemy.hp - amount;
    let phase = s.phase;
    if (newHp <= 0) {
      newHp = 0;
      phase = 'victory';
      const loot = calculateLoot(s.run.difficulty, s.enemy.faction || 'Republic');
      const meta = useMetaStore.getState();
      meta.addResource('credits', loot.credits);
      meta.addResource('parts', loot.parts);
      meta.addResource('bio', loot.bio);
      meta.addResource('psi', loot.psi);
      return { enemy: { ...s.enemy, hp: newHp }, phase, lastLoot: loot };
    }
    return { enemy: { ...s.enemy, hp: newHp } };
  }),

  attackTarget: async (attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string) => {
    const { enemy, player, isProcessingQueue } = get();
    if (isProcessingQueue) return;

    let attacker = player.board.find((u: UnitInstance) => u.uid === attackerUid);
    let isPlayerAttacker = true;
    if (!attacker) {
      attacker = enemy.board.find((u: UnitInstance) => u.uid === attackerUid);
      isPlayerAttacker = false;
    }
    if (!attacker) return;

    if (attacker.atk <= 0) {
      console.warn('Cannot attack with 0 attack unit');
      return;
    }

    const defenderBoard = isPlayerAttacker ? enemy.board : player.board;
    const guards = defenderBoard.filter((u: UnitInstance) => u.mechanics.some((m: any) => m.type === 'guard'));
    const isSnipe = attacker.mechanics.some((m: any) => m.type === 'snipe');

    if (guards.length > 0 && !isSnipe) {
      if (targetType === 'enemy') return;
      if (targetType === 'unit' && (!targetUid || !guards.find((g: any) => g.uid === targetUid))) return;
    }

    set({ isProcessingQueue: true });

    const targetId = targetType === 'unit' ? targetUid! : (isPlayerAttacker ? 'enemy_commander' : 'player_commander');
    set({ attackingUnitId: attackerUid, attackVector: { from: attackerUid, to: targetId } });

    // Log attack
    if (targetType === 'unit' && targetUid) {
      const target = defenderBoard.find((u: UnitInstance) => u.uid === targetUid);
      if (target) {
        set((state: any) => ({
          abilityNotifications: [
            ...state.abilityNotifications,
            {
              id: generateId(),
              unitName: attacker!.name,
              text: `attacked ${target.name}`,
              timestamp: Date.now()
            }
          ]
        }));
      }
    } else if (targetType === 'enemy') {
      set((state: any) => ({
        abilityNotifications: [
          ...state.abilityNotifications,
          {
            id: generateId(),
            unitName: attacker!.name,
            text: `attacked ${isPlayerAttacker ? 'Enemy' : 'Player'}`,
            timestamp: Date.now()
          }
        ]
      }));
    }

    await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));

    // OnAttack triggers
    const attackerState = get();
    const currentAttacker = isPlayerAttacker
      ? attackerState.player.board.find((u: UnitInstance) => u.uid === attackerUid)
      : attackerState.enemy.board.find((u: UnitInstance) => u.uid === attackerUid);

    if (currentAttacker) {
      for (const m of currentAttacker.mechanics) {
        if ((m as any).trigger === 'onAttack') {
          const { stateUpdates, animations, notifications } = MechanicHandler.resolve(
            m,
            currentAttacker,
            attackerState,
            () => {},
            targetId
          );

          for (const anim of animations) {
            set({ effectVector: { from: anim.from, to: anim.to, color: anim.color } });
            await new Promise(r => setTimeout(r, DELAYS.ANIMATION_QUICK));
          }

          if (animations.length > 0) set({ effectVector: null });
          set(stateUpdates);

          if (notifications && notifications.length > 0) {
            set((state: any) => ({
              abilityNotifications: [...state.abilityNotifications, ...notifications]
            }));
          }

          const cardDef = ALL_CARDS.find((c: any) => c.id === currentAttacker.cardId);
          const abilityText = getMechanicDescription(m, cardDef);
          if (abilityText && cardDef) {
            (get() as any).addAbilityNotification(cardDef.name, abilityText);
          }
        }
      }
    }

    // Damage resolution - delegated to main attackTarget in gameStore
    // This slice handles orchestration, main store handles damage logic
    // (keeping existing logic in gameStore to avoid breaking changes)

    set({ attackingUnitId: null, attackVector: null, isProcessingQueue: false });
  }
});
