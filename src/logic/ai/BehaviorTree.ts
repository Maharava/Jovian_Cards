import type { GameState } from '../../types';
import type { AIMove, AIContext, BehaviorResult, EvaluationContext } from './types';
import { Simulator } from './Simulator';
import { MoveGenerator } from './MoveGenerator';
import { Evaluator } from './Evaluator';

export class BehaviorTree {
  /**
   * Execute the behavior tree and return the best move
   */
  execute(state: GameState, level: number, owner: 'player' | 'enemy' = 'enemy'): AIMove {
    const context: AIContext = {
      level,
      owner,
      lookahead: this.getLookahead(level),
      bias: 'balanced',
      weights: Evaluator.DEFAULT_WEIGHTS
    };

    // Check lethal (L2+)
    if (level >= 2) {
      const lethalResult = this.checkLethal(state, context);
      if (lethalResult.priority >= 90 && lethalResult.move) {
        return lethalResult.move;
      }
    }

    // Check crisis (L3+)
    if (level >= 3) {
      const crisisResult = this.checkCrisis(state, context);
      if (crisisResult.priority >= 80 && crisisResult.context) {
        Object.assign(context, crisisResult.context);
      }
    }

    // Check value trade (L2+)
    if (level >= 2) {
      const tradeResult = this.checkValueTrade(state, context);
      if (tradeResult.priority >= 70 && tradeResult.move) {
        return tradeResult.move;
      }
    }

    // Default: select best move
    return this.selectBestMove(state, context);
  }

  /**
   * Check for lethal opportunities
   */
  private checkLethal(state: GameState, context: AIContext): BehaviorResult {
    const allMoves = MoveGenerator.getAllMoves(state, context.owner);
    let simCount = 0;
    const maxSims = context.level >= 4 ? 100 : 50;

    // Single-move lethal check
    for (const move of allMoves) {
      if (move.type === 'END_TURN' || simCount++ > maxSims) continue;

      const simResult = Simulator.simulate(state, move, context.owner);
      if (simResult.valid && simResult.lethal) {
        return { priority: 100, move };
      }

      // Two-move lethal (L4+)
      if (context.level >= 4 && simResult.valid && !simResult.lethal) {
        const followUps = MoveGenerator.getAllMoves(simResult.state, context.owner);
        for (const followUp of followUps) {
          if (followUp.type === 'END_TURN' || simCount++ > maxSims) continue;

          const finalResult = Simulator.simulate(simResult.state, followUp, context.owner);
          if (finalResult.valid && finalResult.lethal) {
            return { priority: 95, move };
          }
        }
      }
    }

    return { priority: 0 };
  }

  /**
   * Check for crisis situations (low HP)
   */
  private checkCrisis(state: GameState, context: AIContext): BehaviorResult {
    const hp = context.owner === 'player' ? state.player.hp : state.enemy.hp;
    const enemyBoard = context.owner === 'player' ? state.enemy.board : state.player.board;

    const enemyThreat = enemyBoard
      .filter(u => u.ready || u.attacksLeft > 0)
      .reduce((sum, u) => sum + u.atk, 0);

    const inCrisis = hp <= 10 || hp <= enemyThreat;

    if (inCrisis) {
      return {
        priority: 80,
        context: Evaluator.getContextForBias('defensive')
      };
    }

    return { priority: 0 };
  }

  /**
   * Check for favorable value trades
   */
  private checkValueTrade(state: GameState, context: AIContext): BehaviorResult {
    const myBoard = context.owner === 'player' ? state.player.board : state.enemy.board;
    const enemyBoard = context.owner === 'player' ? state.enemy.board : state.player.board;

    for (const attacker of myBoard) {
      if (!attacker.ready || attacker.attacksLeft <= 0) continue;

      for (const target of enemyBoard) {
        const targetDies = target.hp <= attacker.atk;
        const attackerDies = attacker.hp <= target.atk;

        // Good trade: they die, we don't
        if (targetDies && !attackerDies) {
          return {
            priority: 70,
            move: {
              type: 'ATTACK',
              attackerUid: attacker.uid,
              targetType: 'unit',
              targetUid: target.uid
            }
          };
        }
      }
    }

    return { priority: 0 };
  }

  /**
   * Select the best move using utility scoring
   */
  private selectBestMove(state: GameState, context: AIContext): AIMove {
    const allMoves = MoveGenerator.getAllMoves(state, context.owner);
    const scoredMoves: Array<{ move: AIMove, score: number }> = [];

    const evalContext: EvaluationContext = {
      bias: context.bias || 'balanced',
      weights: context.weights || Evaluator.DEFAULT_WEIGHTS
    };

    const budget = this.getSimulationBudget(context.level);
    let simCount = 0;

    for (const move of allMoves) {
      if (simCount++ > budget) break;

      if (move.type === 'END_TURN') {
        scoredMoves.push({ move, score: -1000 }); // FIX: Give END_TURN low score so it's only chosen if no other moves
        continue;
      }

      const simResult = Simulator.simulate(state, move, context.owner);
      if (!simResult.valid) continue;

      const score = Evaluator.evaluate(simResult.state, context.owner, evalContext);
      scoredMoves.push({ move, score });
    }

    if (scoredMoves.length === 0) {
      return { type: 'END_TURN' };
    }

    // Sort by score descending
    scoredMoves.sort((a, b) => b.score - a.score);

    // Apply error rate
    const errorRate = this.getErrorRate(context.level);
    const topN = Math.min(3, scoredMoves.length);

    if (Math.random() < errorRate && topN > 1) {
      const randomIndex = Math.floor(Math.random() * topN);
      return scoredMoves[randomIndex].move;
    }

    return scoredMoves[0].move;
  }

  private getLookahead(level: number): number {
    switch (level) {
      case 1: return 0;
      case 2: return 0;
      case 3: return 1;
      case 4: return 2;
      case 5: return 3;
      default: return 0;
    }
  }

  private getErrorRate(level: number): number {
    switch (level) {
      case 1: return 0.30;
      case 2: return 0.15;
      case 3: return 0.05;
      case 4: return 0.02;
      case 5: return 0.00;
      default: return 0.30;
    }
  }

  private getSimulationBudget(level: number): number {
    switch (level) {
      case 1: return 20;
      case 2: return 50;
      case 3: return 100;
      case 4: return 200;
      case 5: return 500;
      default: return 20;
    }
  }
}
