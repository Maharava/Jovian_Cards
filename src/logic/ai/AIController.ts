import type { GameState } from '../../types';
import type { GameActions } from '../../store/gameStore';
import { BehaviorTree } from './BehaviorTree';
import type { AIMove } from './types';
import { playEnemyCard, executeEnemyAttack, endEnemyTurn } from '../AI';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type GetState = () => GameState & GameActions;
type SetState = (partial: Partial<GameState> | ((state: GameState) => Partial<GameState>)) => void;

export class AIController {
  private static behaviorTree = new BehaviorTree();

  /**
   * Extract pure GameState from Zustand store (removes action functions)
   * Uses JSON serialization to ensure no function references remain
   */
  private static extractPureState(fullState: GameState & GameActions): GameState {
    // Use JSON serialization to strip all functions and create a clean copy
    const cleanState = JSON.parse(JSON.stringify({
      player: fullState.player,
      enemy: fullState.enemy,
      turn: fullState.turn,
      phase: fullState.phase,
      winner: fullState.winner,
      scoutedCards: fullState.scoutedCards,
      lastLoot: fullState.lastLoot,
      eventQueue: fullState.eventQueue,
      isProcessingQueue: fullState.isProcessingQueue,
      attackingUnitId: fullState.attackingUnitId,
      attackVector: fullState.attackVector,
      effectVector: fullState.effectVector,
      abilityNotification: fullState.abilityNotification,
      abilityNotifications: fullState.abilityNotifications,
      run: fullState.run
    }));

    return cleanState;
  }

  /**
   * Execute AI turn using the new hybrid decision system
   * This is a drop-in replacement for the old AI.runTurn()
   */
  static async runTurn(
    get: GetState,
    set: SetState,
    level: number = 1
  ): Promise<void> {
    const aiLevel = Math.max(1, Math.min(5, level));

    // Refresh units at start of turn
    set((state) => {
      const enemy = { ...state.enemy };
      enemy.board = enemy.board.map(u => {
        const unit = { ...u };
        unit.ready = true;
        unit.attacksLeft = unit.mechanics.some(m => m.type === 'double_attack') ? 2 : 1;

        if (unit.status?.stun && unit.status.stun > 0) {
          unit.ready = false;
          unit.attacksLeft = 0;
        }

        return unit;
      });

      return { enemy };
    });

    await delay(500);

    // Execute moves until END_TURN
    let maxActions = 50;
    let actionCount = 0;

    while (actionCount++ < maxActions) {
      const fullState = get();
      const pureState = this.extractPureState(fullState);

      // Get next move from behavior tree
      const move = this.behaviorTree.execute(pureState, aiLevel, 'enemy');

      if (move.type === 'END_TURN') {
        break;
      }

      // Execute the move
      const success = await this.executeMove(move, get, set);

      if (!success) {
        continue;
      }

      await delay(300);
    }

    // End turn
    await endEnemyTurn(get, set);
  }

  /**
   * Execute a single AI move
   */
  private static async executeMove(
    move: AIMove,
    get: GetState,
    set: SetState
  ): Promise<boolean> {
    switch (move.type) {
      case 'PLAY_UNIT':
      case 'PLAY_TACTIC':
        return await this.executeCardPlay(move, get, set);
      case 'ATTACK':
        return await this.executeAttack(move, get, set);
      default:
        return false;
    }
  }

  /**
   * Execute card play move
   */
  private static async executeCardPlay(
    move: AIMove,
    get: GetState,
    set: SetState
  ): Promise<boolean> {
    const fullState = get();
    const card = fullState.enemy.hand.find(c => c.id === move.cardId || c.uid === move.cardId);

    if (!card || card.cost > fullState.enemy.energy) {
      return false;
    }

    try {
      await playEnemyCard(card, get, set, move.targetUid);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Execute attack move
   */
  private static async executeAttack(
    move: AIMove,
    get: GetState,
    set: SetState
  ): Promise<boolean> {
    if (!move.attackerUid) return false;

    const targetType = move.targetType === 'unit' ? 'unit' : 'enemy';

    try {
      await executeEnemyAttack(move.attackerUid, targetType, move.targetUid, get, set);
      return true;
    } catch {
      return false;
    }
  }
}
