import type { GameState } from '../../types';
import type { EvaluationContext, EvaluationWeights } from './types';

export class Evaluator {
  static readonly DEFAULT_WEIGHTS: EvaluationWeights = {
    material: 10.0,
    health: 2.0,
    board: 5.0,
    tempo: 1.0,
    mechanics: 3.0
  };

  /**
   * Evaluate a game state and return a numerical score
   * Higher scores = better for the owner
   */
  static evaluate(state: GameState, owner: 'player' | 'enemy', context: EvaluationContext): number {
    let score = 0;
    const weights = context.weights;

    // 1. Material Advantage: Sum of ATK + HP on board
    const friendlyMaterial = this.calculateMaterial(state, owner);
    const enemyMaterial = this.calculateMaterial(state, owner === 'player' ? 'enemy' : 'player');
    score += (friendlyMaterial - enemyMaterial) * weights.material;

    // 2. Health Differential
    const friendlyHP = owner === 'player' ? state.player.hp : state.enemy.hp;
    const enemyHP = owner === 'player' ? state.enemy.hp : state.player.hp;
    score += (friendlyHP - enemyHP) * weights.health;

    // 3. Board Presence (number of units)
    const friendlyBoardSize = (owner === 'player' ? state.player : state.enemy).board.length;
    const enemyBoardSize = (owner === 'player' ? state.enemy : state.player).board.length;
    score += (friendlyBoardSize - enemyBoardSize) * weights.board;

    // 4. Tempo (remaining energy efficiency)
    const side = owner === 'player' ? state.player : state.enemy;
    const energyEfficiency = side.maxEnergy > 0 ? side.energy / side.maxEnergy : 0;
    score -= energyEfficiency * weights.tempo; // Penalty for wasted energy

    // 5. Mechanic Bonuses
    score += this.evaluateMechanics(state, owner) * weights.mechanics;

    return score;
  }

  /**
   * Calculate total material value (ATK + HP) on board
   */
  private static calculateMaterial(state: GameState, owner: 'player' | 'enemy'): number {
    const board = (owner === 'player' ? state.player : state.enemy).board;
    return board.reduce((sum, unit) => sum + unit.atk + unit.hp, 0);
  }

  /**
   * Evaluate mechanic bonuses based on game state
   */
  private static evaluateMechanics(state: GameState, owner: 'player' | 'enemy'): number {
    let bonus = 0;
    const board = (owner === 'player' ? state.player : state.enemy).board;
    const hp = owner === 'player' ? state.player.hp : state.enemy.hp;

    // Guard units are valuable defensively
    bonus += board.filter(u => u.mechanics.some(m => m.type === 'guard')).length * 2;

    // Rush units add tempo
    bonus += board.filter(u => u.ready && u.attacksLeft > 0).length * 1;

    // Lifesteal is valuable when HP is low
    if (hp < 15) {
      bonus += board.filter(u => u.mechanics.some(m => m.type === 'lifesteal')).length * 3;
    }

    // Double attack units are valuable
    bonus += board.filter(u => u.mechanics.some(m => m.type === 'double_attack')).length * 2;

    // Snipe units can bypass guards
    bonus += board.filter(u => u.mechanics.some(m => m.type === 'snipe')).length * 1.5;

    // Shield units are valuable
    bonus += board.filter(u => u.mechanics.some(m => m.type === 'shield')).length * 2;

    return bonus;
  }

  /**
   * Get evaluation context based on bias
   */
  static getContextForBias(bias: 'aggressive' | 'defensive' | 'balanced'): EvaluationContext {
    switch (bias) {
      case 'aggressive':
        return {
          bias: 'aggressive',
          weights: {
            material: 12.0,   // Higher emphasis on damage
            health: 1.0,      // Lower concern for HP
            board: 6.0,
            tempo: 0.5,
            mechanics: 2.0
          }
        };
      case 'defensive':
        return {
          bias: 'defensive',
          weights: {
            material: 5.0,    // Reduced offense
            health: 5.0,      // High emphasis on HP
            board: 3.0,
            tempo: 0.5,
            mechanics: 8.0    // Guards/heals are key
          }
        };
      case 'balanced':
      default:
        return {
          bias: 'balanced',
          weights: { ...this.DEFAULT_WEIGHTS }
        };
    }
  }
}
