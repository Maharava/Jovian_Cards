import type { GameState } from '../../types';

export type MoveType = 'PLAY_UNIT' | 'PLAY_TACTIC' | 'ATTACK' | 'END_TURN';

export interface AIMove {
  type: MoveType;
  cardId?: string;        // For PLAY_* moves
  attackerUid?: string;   // For ATTACK moves
  targetType?: 'unit' | 'enemy' | 'enemy_commander' | 'player_commander';
  targetUid?: string;     // Unit UID if targeting a unit
  cost?: number;          // Energy cost (for sorting/filtering)
}

export interface SimulationResult {
  state: GameState;
  valid: boolean;  // false if move was illegal or failed
  lethal: boolean; // true if enemy commander HP <= 0
}

export interface EvaluationWeights {
  material: number;      // Default: 10.0
  health: number;        // Default: 2.0
  board: number;         // Default: 5.0
  tempo: number;         // Default: 1.0
  mechanics: number;     // Default: 3.0
}

export interface EvaluationContext {
  bias: 'aggressive' | 'defensive' | 'balanced';
  weights: EvaluationWeights;
}

export interface BehaviorNode {
  name: string;
  minLevel: number;  // Minimum difficulty level to execute this node
  evaluate: (state: GameState, context: AIContext) => BehaviorResult;
}

export interface BehaviorResult {
  priority: number;  // 0-100, higher = more important
  move?: AIMove;     // Specific move if found
  context?: Partial<EvaluationContext>;  // Modify evaluation bias
}

export interface AIContext extends Partial<EvaluationContext> {
  level: number;
  owner: 'player' | 'enemy';
  lookahead: number;  // How many moves to simulate ahead
}
