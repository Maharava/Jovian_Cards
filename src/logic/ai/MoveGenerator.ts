import type { GameState, UnitInstance, Card } from '../../types';
import type { AIMove } from './types';
import { MAX_BOARD_SLOTS } from '../../config/constants';

export class MoveGenerator {
  /**
   * Generate all legal moves for the given owner
   */
  static getAllMoves(state: GameState, owner: 'player' | 'enemy'): AIMove[] {
    const moves: AIMove[] = [];
    const side = owner === 'player' ? state.player : state.enemy;

    // 1. Generate card plays (units + tactics)
    side.hand.forEach(card => {
      if (card.cost <= side.energy) {
        if (card.type === 'unit' && side.board.length < MAX_BOARD_SLOTS) {
          // Check if card needs targeting
          const needsTarget = card.mechanics.some(m =>
            m.trigger === 'onPlay' && ['target_unit', 'target_enemy', 'target_ally'].includes(m.target || '')
          );

          if (needsTarget) {
            // Generate moves for each valid target
            this.getValidTargets(state, card, owner).forEach(targetUid => {
              moves.push({ type: 'PLAY_UNIT', cardId: card.id, targetUid, cost: card.cost });
            });
          } else {
            moves.push({ type: 'PLAY_UNIT', cardId: card.id, cost: card.cost });
          }
        } else if (card.type === 'tactic') {
          // Tactics may need targets
          const needsTarget = card.mechanics.some(m =>
            ['target_unit', 'target_enemy', 'target_ally', 'target_enemy_commander'].includes(m.target || '')
          );

          if (needsTarget) {
            const targets = this.getValidTargets(state, card, owner);
            if (targets.length > 0) {
              targets.forEach(targetUid => {
                moves.push({ type: 'PLAY_TACTIC', cardId: card.id, targetUid, cost: card.cost });
              });
            }
          } else {
            // Tactic with random/all target or no target requirement
            moves.push({ type: 'PLAY_TACTIC', cardId: card.id, cost: card.cost });
          }
        }
      }
    });

    // 2. Generate attacks
    side.board.forEach(unit => {
      if (unit.ready && unit.attacksLeft > 0 && unit.atk > 0 && (!unit.status?.stun || unit.status.stun <= 0)) {
        const validTargets = this.getValidAttackTargets(state, unit, owner);
        validTargets.forEach(target => {
          moves.push({
            type: 'ATTACK',
            attackerUid: unit.uid,
            targetType: target.type,
            targetUid: target.uid
          });
        });
      }
    });

    // 3. Always include END_TURN
    moves.push({ type: 'END_TURN' });

    return moves;
  }

  /**
   * Get valid targets for a card's onPlay mechanics
   */
  private static getValidTargets(state: GameState, card: Card, owner: 'player' | 'enemy'): string[] {
    const targets: string[] = [];
    const allies = owner === 'player' ? state.player.board : state.enemy.board;
    const enemies = owner === 'player' ? state.enemy.board : state.player.board;

    for (const mechanic of card.mechanics) {
      if (mechanic.trigger !== 'onPlay') continue;

      switch (mechanic.target) {
        case 'target_unit':
          // Can target any unit
          enemies.forEach(u => targets.push(u.uid));
          allies.forEach(u => targets.push(u.uid));
          break;
        case 'target_enemy':
          enemies.forEach(u => targets.push(u.uid));
          break;
        case 'target_ally':
          allies.forEach(u => targets.push(u.uid));
          break;
        case 'target_enemy_commander':
          targets.push('enemy_commander');
          break;
      }
    }

    // Remove duplicates
    return [...new Set(targets)];
  }

  /**
   * Get valid attack targets for a unit
   */
  private static getValidAttackTargets(
    state: GameState,
    unit: UnitInstance,
    owner: 'player' | 'enemy'
  ): Array<{ type: 'unit' | 'enemy', uid?: string }> {
    const targets: Array<{ type: 'unit' | 'enemy', uid?: string }> = [];
    const enemyBoard = owner === 'player' ? state.enemy.board : state.player.board;

    // Check for guard units
    const guards = enemyBoard.filter(u =>
      u.mechanics.some(m => m.type === 'guard') && u.hp > 0
    );

    // Snipe units can bypass guards
    const hasSnipe = unit.mechanics.some(m => m.type === 'snipe');

    if (guards.length > 0 && !hasSnipe) {
      // Must attack guards
      guards.forEach(guard => {
        targets.push({ type: 'unit', uid: guard.uid });
      });
    } else {
      // Can attack any unit or commander
      enemyBoard.forEach(enemy => {
        targets.push({ type: 'unit', uid: enemy.uid });
      });

      // Can attack enemy commander
      targets.push({ type: 'enemy' });
    }

    return targets;
  }
}
