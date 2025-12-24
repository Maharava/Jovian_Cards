# Jovian Cards - Advanced AI Master Plan (Hybrid Architecture)

## 1. Executive Summary

We will move from a random-action script to a **Hybrid Decision Engine**. This combines:
1.  **Behavior Trees (The "Why"):** A structured flowchart to determine the AI's current *priority* (e.g., "Seek Lethal", "Defend", "Develop Board").
2.  **Utility Scoring (The "How"):** A mathematical evaluation to pick the best specific *action* to fulfill that priority (e.g., "Which unit do I attack to defend best?").

**The Goal:** An AI that plays fairly (no cheating) but scales from a "clumsy rookie" (T1) to a "ruthless tactician" (T5) by unlocking deeper layers of logic and reducing its error rate.

**Current State (v0.4.2):** Simple random AI that plays 3 random affordable units per turn and attacks with 70% unit / 30% commander targeting.

---

## 2. Core Architecture

The code will be modularized into `src/logic/ai/`:

### Directory Structure
```
src/logic/ai/
├── types.ts              // AI-specific type definitions
├── Simulator.ts          // State simulation engine
├── MoveGenerator.ts      // Legal move generation
├── Evaluator.ts          // State scoring system
├── BehaviorTree.ts       // Decision tree logic
├── AIController.ts       // Main AI orchestrator
└── utils.ts              // Helper functions
```

### A. The Simulator (`Simulator.ts`)
A stateless engine that clones the current `GameState` and applies a specific Action to return a `FutureGameState`.

**Key Implementation Details:**
```typescript
interface SimulationResult {
  state: GameState;
  valid: boolean;  // false if move was illegal or failed
  lethal: boolean; // true if enemy commander HP <= 0
}

class Simulator {
  // Deep clone state using structuredClone or manual cloning
  static cloneState(state: GameState): GameState;

  // Simulate a move and return resulting state
  static simulate(state: GameState, move: AIMove): SimulationResult;

  // Apply card play (unit or tactic)
  private static simulateCardPlay(state: GameState, cardId: string, targetUid?: string): GameState;

  // Apply attack action
  private static simulateAttack(state: GameState, attackerUid: string, targetType: 'unit' | 'enemy', targetUid?: string): GameState;
}
```

**Critical Notes:**
- Reuses existing `MechanicHandler.resolve()` but with a **silent logger** (no notifications)
- Deep clones state before modification to avoid mutations
- Only sees visible information (enemy hand is hidden, assumes average card values)
- Returns `valid: false` if move fails (e.g., insufficient energy, invalid target)

### B. The Move Generator (`MoveGenerator.ts`)
Identifies all **Legal Actions** available in a given state.

**Move Types:**
```typescript
type MoveType = 'PLAY_UNIT' | 'PLAY_TACTIC' | 'ATTACK' | 'END_TURN';

interface AIMove {
  type: MoveType;
  cardId?: string;        // For PLAY_* moves
  attackerUid?: string;   // For ATTACK moves
  targetType?: 'unit' | 'enemy' | 'enemy_commander' | 'player_commander';
  targetUid?: string;     // Unit UID if targeting a unit
  cost?: number;          // Energy cost (for sorting/filtering)
}
```

**Generation Logic:**
```typescript
class MoveGenerator {
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
          // Tactics always need targets (or random)
          const targets = this.getValidTargets(state, card, owner);
          if (targets.length > 0) {
            targets.forEach(targetUid => {
              moves.push({ type: 'PLAY_TACTIC', cardId: card.id, targetUid, cost: card.cost });
            });
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

  private static getValidTargets(state: GameState, card: Card, owner: 'player' | 'enemy'): string[] {
    // Implementation handles target_unit, target_enemy, target_ally, etc.
  }

  private static getValidAttackTargets(state: GameState, unit: UnitInstance, owner: 'player' | 'enemy'): Array<{type: 'unit' | 'enemy', uid?: string}> {
    // Implementation handles guard mechanics, snipe, etc.
  }
}
```

### C. The Evaluator (`Evaluator.ts`)
Assigns a numerical **Score** to a game state based on weighted factors.

**Scoring Formula:**
```typescript
interface EvaluationWeights {
  material: number;      // Default: 10.0
  health: number;        // Default: 2.0
  board: number;         // Default: 5.0
  tempo: number;         // Default: 1.0
  mechanics: number;     // Default: 3.0
}

interface EvaluationContext {
  bias: 'aggressive' | 'defensive' | 'balanced';
  weights: EvaluationWeights;
}

class Evaluator {
  static evaluate(state: GameState, owner: 'player' | 'enemy', context: EvaluationContext): number {
    let score = 0;

    // 1. Material Advantage: Sum of ATK + HP on board
    const friendlyMaterial = this.calculateMaterial(state, owner);
    const enemyMaterial = this.calculateMaterial(state, owner === 'player' ? 'enemy' : 'player');
    score += (friendlyMaterial - enemyMaterial) * context.weights.material;

    // 2. Health Differential
    const friendlyHP = owner === 'player' ? state.player.hp : state.enemy.hp;
    const enemyHP = owner === 'player' ? state.enemy.hp : state.player.hp;
    score += (friendlyHP - enemyHP) * context.weights.health;

    // 3. Board Presence (number of units)
    const friendlyBoardSize = (owner === 'player' ? state.player : state.enemy).board.length;
    const enemyBoardSize = (owner === 'player' ? state.enemy : state.player).board.length;
    score += (friendlyBoardSize - enemyBoardSize) * context.weights.board;

    // 4. Tempo (remaining energy efficiency)
    const side = owner === 'player' ? state.player : state.enemy;
    const energyEfficiency = side.energy / side.maxEnergy;
    score -= energyEfficiency * context.weights.tempo; // Penalty for wasted energy

    // 5. Mechanic Bonuses
    score += this.evaluateMechanics(state, owner) * context.weights.mechanics;

    return score;
  }

  private static calculateMaterial(state: GameState, owner: 'player' | 'enemy'): number {
    const board = (owner === 'player' ? state.player : state.enemy).board;
    return board.reduce((sum, unit) => sum + unit.atk + unit.hp, 0);
  }

  private static evaluateMechanics(state: GameState, owner: 'player' | 'enemy'): number {
    let bonus = 0;
    const board = (owner === 'player' ? state.player : state.enemy).board;

    // Guard units are valuable defensively
    bonus += board.filter(u => u.mechanics.some(m => m.type === 'guard')).length * 2;

    // Rush units add tempo
    bonus += board.filter(u => u.ready && u.attacksLeft > 0).length * 1;

    // Lifesteal is valuable when HP is low
    const hp = owner === 'player' ? state.player.hp : state.enemy.hp;
    if (hp < 15) {
      bonus += board.filter(u => u.mechanics.some(m => m.type === 'lifesteal')).length * 3;
    }

    return bonus;
  }
}
```

---

## 3. The Logic Flow (The Behavior Tree)

The AI thinks in a hierarchy. Lower tiers stop at earlier, simpler branches. Higher tiers traverse the full tree.

**Implementation:**
```typescript
interface BehaviorNode {
  name: string;
  minTier: number;  // Minimum difficulty tier to execute this node
  evaluate: (state: GameState, context: AIContext) => BehaviorResult;
}

interface BehaviorResult {
  priority: number;  // 0-100, higher = more important
  move?: AIMove;     // Specific move if found
  context?: Partial<EvaluationContext>;  // Modify evaluation bias
}

interface AIContext {
  tier: number;
  owner: 'player' | 'enemy';
  lookahead: number;  // How many moves to simulate ahead
}

class BehaviorTree {
  private nodes: BehaviorNode[] = [
    { name: 'Lethal', minTier: 2, evaluate: this.checkLethal },
    { name: 'Crisis', minTier: 3, evaluate: this.checkCrisis },
    { name: 'ValueTrade', minTier: 2, evaluate: this.checkValueTrade },
    { name: 'Development', minTier: 1, evaluate: this.checkDevelopment }
  ];

  execute(state: GameState, context: AIContext): AIMove {
    // Traverse nodes in order of priority
    for (const node of this.nodes) {
      if (context.tier >= node.minTier) {
        const result = node.evaluate(state, context);

        // High priority nodes immediately return their move
        if (result.priority >= 90 && result.move) {
          return result.move;
        }

        // Update evaluation context based on node result
        if (result.context) {
          Object.assign(context, result.context);
        }
      }
    }

    // If no high-priority move found, evaluate all moves and pick best
    return this.selectBestMove(state, context);
  }

  private checkLethal(state: GameState, context: AIContext): BehaviorResult {
    // Generate all possible move sequences this turn
    const allMoves = MoveGenerator.getAllMoves(state, context.owner);

    // Check if any sequence of moves leads to enemy HP <= 0
    // For T2-T3: Only check single moves
    // For T4-T5: Check move combinations (expensive!)

    for (const move of allMoves) {
      if (move.type === 'END_TURN') continue;

      const simResult = Simulator.simulate(state, move);
      if (simResult.lethal) {
        return { priority: 100, move };  // IMMEDIATE EXECUTE
      }

      // For T4+: Check if we can lethal with follow-up moves
      if (context.tier >= 4 && context.lookahead > 0) {
        const followUpMoves = MoveGenerator.getAllMoves(simResult.state, context.owner);
        for (const followUp of followUpMoves) {
          const finalResult = Simulator.simulate(simResult.state, followUp);
          if (finalResult.lethal) {
            // Return first move of the sequence
            return { priority: 95, move };
          }
        }
      }
    }

    return { priority: 0 };
  }

  private checkCrisis(state: GameState, context: AIContext): BehaviorResult {
    const hp = context.owner === 'player' ? state.player.hp : state.enemy.hp;
    const enemyBoard = context.owner === 'player' ? state.enemy.board : state.player.board;

    // Calculate enemy's potential damage this turn
    const enemyThreat = enemyBoard
      .filter(u => u.ready || u.attacksLeft > 0)
      .reduce((sum, u) => sum + u.atk, 0);

    const inCrisis = hp <= 10 || hp <= enemyThreat;

    if (inCrisis) {
      // Switch to defensive mode: prioritize guards, heals, removing threats
      return {
        priority: 80,
        context: {
          bias: 'defensive',
          weights: {
            material: 5.0,   // Reduced - focus less on our offense
            health: 5.0,     // Increased - HP is critical
            board: 3.0,
            tempo: 0.5,
            mechanics: 8.0   // Increased - guards/heals are key
          }
        }
      };
    }

    return { priority: 0 };
  }

  private checkValueTrade(state: GameState, context: AIContext): BehaviorResult {
    // Look for "free kills" - attacks where we kill enemy unit and survive
    const myBoard = context.owner === 'player' ? state.player.board : state.enemy.board;
    const enemyBoard = context.owner === 'player' ? state.enemy.board : state.player.board;

    for (const attacker of myBoard) {
      if (!attacker.ready || attacker.attacksLeft <= 0) continue;

      for (const target of enemyBoard) {
        // Calculate trade outcome
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

  private checkDevelopment(state: GameState, context: AIContext): BehaviorResult {
    // Default mode: play units on curve, maximize board presence
    return {
      priority: 50,
      context: {
        bias: 'balanced',
        weights: {
          material: 10.0,
          health: 2.0,
          board: 5.0,
          tempo: 1.0,
          mechanics: 3.0
        }
      }
    };
  }

  private selectBestMove(state: GameState, context: AIContext): AIMove {
    const allMoves = MoveGenerator.getAllMoves(state, context.owner);
    const scoredMoves: Array<{move: AIMove, score: number}> = [];

    // Evaluate each move
    for (const move of allMoves) {
      if (move.type === 'END_TURN') {
        scoredMoves.push({ move, score: 0 });  // Fallback option
        continue;
      }

      const simResult = Simulator.simulate(state, move);
      if (!simResult.valid) continue;

      const score = Evaluator.evaluate(simResult.state, context.owner, {
        bias: context.bias || 'balanced',
        weights: context.weights || {
          material: 10.0, health: 2.0, board: 5.0, tempo: 1.0, mechanics: 3.0
        }
      });

      scoredMoves.push({ move, score });
    }

    // Sort by score descending
    scoredMoves.sort((a, b) => b.score - a.score);

    // Apply error rate for difficulty
    const errorRate = this.getErrorRate(context.tier);
    const topN = Math.min(3, scoredMoves.length);

    if (Math.random() < errorRate && topN > 1) {
      // Pick a random move from top N
      const randomIndex = Math.floor(Math.random() * topN);
      return scoredMoves[randomIndex].move;
    }

    // Return best move
    return scoredMoves[0]?.move || { type: 'END_TURN' };
  }

  private getErrorRate(tier: number): number {
    switch(tier) {
      case 1: return 0.30;
      case 2: return 0.15;
      case 3: return 0.05;
      case 4: return 0.02;
      case 5: return 0.00;
      default: return 0.30;
    }
  }
}
```

---

## 4. Difficulty Tiers (Archetypes)

We differentiate tiers by **Depth** (how much of the tree they use), **Error Rate** (probability of picking a sub-optimal move), and **Lookahead** (simulation depth).

| Tier | Name | Tree Nodes | Lookahead | Error Rate | Simulation Budget | Behavior Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T1** | **Rookie** | Development only | 0 moves | **30%** | 20 moves/turn | **Impulsive.** No strategic planning. Plays units randomly. Attacks randomly (face vs units). |
| **T2** | **Soldier** | +Lethal, +ValueTrade | 0 moves | **15%** | 50 moves/turn | **Efficient.** Recognizes lethal and free kills. Plays on curve. No crisis planning. |
| **T3** | **Veteran** | +Crisis | 1 move | **5%** | 100 moves/turn | **Smart.** Defensive when needed. Simulates immediate outcomes. Uses tactics logically. |
| **T4** | **Elite** | Full Tree | 2 moves | **2%** | 200 moves/turn | **Predictive.** Simulates multi-move sequences. Holds resources for key moments. |
| **T5** | **Tactical** | Full Tree | 3 moves | **0%** | 500 moves/turn | **Optimal.** Perfect play within simulation budget. Maximizes long-term value. |

**Simulation Budget:** Maximum number of moves to evaluate per turn (prevents infinite loops and ensures acceptable performance).

---

## 5. Implementation Roadmap

### Phase 1: Foundation Setup (Week 1)
**Goal:** Set up infrastructure without breaking existing game.

1. Create `src/logic/ai/` directory structure
2. Create `types.ts` with all AI-specific interfaces (AIMove, SimulationResult, etc.)
3. Create `utils.ts` with helper functions:
   - `deepCloneState(state: GameState): GameState` - Deep clone for simulation
   - `silentLogger()` - No-op logger for MechanicHandler during simulation
4. **DO NOT** modify existing `AI.ts` yet - keep it functional

**Deliverable:** New directory with type definitions, no breaking changes.

---

### Phase 2: Simulator (Week 2)
**Goal:** Create working state simulator that reuses game mechanics.

1. Implement `Simulator.ts`:
   - `cloneState()` method
   - `simulate()` method skeleton
   - `simulateCardPlay()` - Handles unit/tactic plays
   - `simulateAttack()` - Handles combat
2. **Critical:** Make `MechanicHandler.resolve()` accept optional `logEvent` parameter
   - Default: `logEvent = (type, data) => {}` (silent)
   - Pass custom logger in real game
3. Write unit tests:
   - Test cloning doesn't mutate original
   - Test simple unit play simulation
   - Test attack simulation
   - Test invalid moves return `valid: false`

**Deliverable:** Working Simulator with tests, MechanicHandler updated for silent mode.

---

### Phase 3: Move Generator (Week 3)
**Goal:** Generate all legal moves from a game state.

1. Implement `MoveGenerator.ts`:
   - `getAllMoves()` main method
   - `getValidTargets()` for card targeting
   - `getValidAttackTargets()` for combat (respects guards, snipe)
2. Handle edge cases:
   - Board full (can't play units)
   - No energy (can't play cards)
   - Stunned units (can't attack)
   - Guard mechanics (forced targeting)
3. Write unit tests:
   - Test move generation with full hand
   - Test guard targeting rules
   - Test empty state returns only END_TURN

**Deliverable:** Working MoveGenerator with tests.

---

### Phase 4: Evaluator (Week 4)
**Goal:** Score game states numerically.

1. Implement `Evaluator.ts`:
   - `evaluate()` main method
   - `calculateMaterial()` helper
   - `evaluateMechanics()` helper
2. Tune default weights through playtesting:
   - Material: 10.0
   - Health: 2.0
   - Board: 5.0
   - Tempo: 1.0
   - Mechanics: 3.0
3. Write unit tests:
   - Test obvious winning states score high
   - Test losing states score low
   - Test defensive weights prioritize HP

**Deliverable:** Working Evaluator with tuned weights.

---

### Phase 5: Behavior Tree (Week 5-6)
**Goal:** Implement strategic decision-making.

1. Implement `BehaviorTree.ts`:
   - `execute()` main method
   - `checkLethal()` node (T2+)
   - `checkCrisis()` node (T3+)
   - `checkValueTrade()` node (T2+)
   - `checkDevelopment()` node (T1+)
   - `selectBestMove()` with error rate
2. Optimize lethal detection:
   - T2-T3: Single move lethal only
   - T4-T5: Two-move lethal sequences
   - **Budget:** Max 50 simulations for lethal check
3. Write unit tests:
   - Test lethal detection finds obvious wins
   - Test crisis mode activates at low HP
   - Test value trades prioritize favorable combat
   - Test error rate distribution

**Deliverable:** Complete BehaviorTree with all nodes.

---

### Phase 6: AI Controller (Week 7)
**Goal:** Replace existing AI with new system.

1. Create `AIController.ts`:
   - `runTurn()` method (replaces current AI.runTurn)
   - Integrates BehaviorTree, Simulator, MoveGenerator, Evaluator
   - Converts AIMove to game actions
   - Handles animations/delays like current AI
2. Add difficulty parameter to gameStore:
   - `startBattle(faction: string, difficulty: 1-5)`
   - Pass to AIController
3. **Gradual Migration:**
   - Phase 6a: Controller works alongside old AI (flag to toggle)
   - Phase 6b: Make new AI default
   - Phase 6c: Remove old AI code

**Deliverable:** Working AIController integrated with game, old AI removed.

---

### Phase 7: Optimization & Polish (Week 8)
**Goal:** Performance tuning and UX improvements.

1. **Performance:**
   - Profile simulation speed
   - Add move pruning (skip obviously bad moves)
   - Implement simulation budgets per tier
   - Cache evaluation results if state repeats
2. **Dev Tools:**
   - Add debug mode showing AI's thought process
   - Console log: "Evaluating 47 moves... Best: PLAY Enforcer (score: +12.5)"
   - Add `/ai_debug` command to toggle
3. **Balance:**
   - Playtest all 5 tiers
   - Adjust weights and error rates
   - Ensure T1 is beatable, T5 is challenging

**Deliverable:** Production-ready AI with debug tools.

---

### Phase 8: Advanced Features (Future/Optional)
**Goal:** Enhance AI with advanced techniques.

1. **Opening Book:**
   - Predefined strong opening sequences for T4-T5
   - "If turn 1, always play Scout unit"
2. **Faction-Specific Logic:**
   - Megacorp AI: Prioritize synergy scaling
   - Bio-Horror AI: Aggressive HP trading
3. **Player Modeling:**
   - Track player's past moves
   - Predict player's deck composition
   - Adjust strategy based on observed patterns

**Deliverable:** Advanced AI features (optional enhancements).

---

## 6. Technical Limitations & Risks

### Performance Concerns

**Problem:** Simulating deep trees (T5) with 500+ moves can cause lag.

**Solutions:**
1. **Early Pruning:**
   - Skip moves that reduce our HP without benefit
   - Skip attacks where attacker dies and defender survives (unless forced)
   - Skip playing cards that do nothing (heal when at full HP)
2. **Budget Enforcement:**
   - Stop evaluating after N moves (tier-dependent)
   - Return best move found so far
3. **Async Processing:**
   - Run simulations in micro-batches with `await` breaks
   - Prevents UI freezing during long computations
4. **Web Workers (Future):**
   - Move AI computation to background thread
   - Main thread only handles rendering

**Target Performance:**
- T1-T3: <100ms per turn
- T4: <300ms per turn
- T5: <1000ms per turn

---

### State Cloning Cost

**Problem:** Deep cloning GameState is expensive (large objects).

**Solutions:**
1. **Structural Sharing:**
   - Use `structuredClone()` where supported
   - Manual cloning only copies what's needed
2. **Shallow Clones Where Safe:**
   - Player/Enemy graveyard doesn't need deep clone (rarely modified)
   - Card definitions are immutable (share references)
3. **Clone Pooling:**
   - Reuse cloned state objects between simulations
   - Reset to original state instead of creating new clones

---

### MechanicHandler Integration

**Problem:** MechanicHandler has side effects (notifications, state mutations).

**Solutions:**
1. **Silent Mode:**
   - Make `logEvent` callback optional (default: no-op)
   - Notification generation is optional
   - Simulator passes silent logger
2. **State Isolation:**
   - MechanicHandler never mutates input state directly
   - Always returns new state objects
   - Simulator clones before passing to MechanicHandler
3. **No Refactoring Required:**
   - Current MechanicHandler.resolve() already returns state updates
   - Just need to handle optional callbacks

---

### Edge Cases & Bugs

**Risks:**
1. **Desync:** Simulator produces different results than real game
   - **Mitigation:** Unit tests comparing simulator vs real game mechanics
2. **Infinite Loops:** AI gets stuck evaluating same move repeatedly
   - **Mitigation:** Budget enforcement, move deduplication
3. **Memory Leaks:** Cloned states not garbage collected
   - **Mitigation:** Explicit cleanup after simulation batches
4. **Random Mechanics:** Cards with random targets (random_enemy) produce non-deterministic results
   - **Mitigation:** Simulator uses same RNG seed for deterministic testing
   - In production: Accept randomness as part of evaluation

---

### Complexity Management

**Problem:** AI system adds ~2000 lines of code.

**Solutions:**
1. **Modular Design:**
   - Each component (Simulator, Evaluator, etc.) is independent
   - Can be tested in isolation
   - Easy to debug one piece at a time
2. **Gradual Integration:**
   - Build one phase at a time
   - Keep old AI functional during development
   - Feature flag to toggle between old/new AI
3. **Documentation:**
   - Inline comments explain complex logic
   - This plan document serves as reference
   - Unit tests serve as usage examples

---

### Balance & Tuning

**Problem:** AI difficulty may not feel right immediately.

**Solutions:**
1. **Configurable Weights:**
   - All evaluation weights are constants at top of file
   - Easy to tweak without code changes
2. **Debug Logging:**
   - Log AI's reasoning: "Playing X because score +12 (best of 47 moves)"
   - Shows why AI makes decisions
3. **Playtesting Metrics:**
   - Track win rates: T1 should have ~70% player win rate, T5 should have ~30%
   - Adjust error rates and weights accordingly
4. **Per-Faction Tuning:**
   - Different factions may need different weights
   - Future enhancement: faction-specific evaluators

---

## 7. Integration with Existing Code

### Changes Required to Existing Files

**`src/store/gameStore.ts`:**
```typescript
// Add difficulty parameter to battle start
startBattle: (faction: string, difficulty?: number) => {
  set({ difficulty: difficulty || 1 });
  // ... rest of existing code
}

// Update enemyAction to use new AI
enemyAction: async () => {
  const { difficulty } = get();
  await AIController.runTurn(get, set, difficulty || 1);
}
```

**`src/logic/mechanics.ts`:**
```typescript
// Make logEvent optional
static resolve(
  mechanic: Mechanic,
  sourceUnit: UnitInstance,
  state: GameState,
  logEvent: (type: string, data: unknown) => void = () => {},  // Default: silent
  targetUid?: string
): ResolutionResult {
  // ... existing code unchanged
}
```

**No other files need modification!** The new AI is a drop-in replacement.

---

## 8. Testing Strategy

### Unit Tests (Jest/Vitest)

1. **Simulator Tests:**
   - Clone doesn't mutate original
   - Valid moves produce valid states
   - Invalid moves return `valid: false`
   - Lethal detection works correctly

2. **MoveGenerator Tests:**
   - Generates all legal moves
   - Respects board size limits
   - Handles guard targeting correctly
   - Handles empty states

3. **Evaluator Tests:**
   - Winning states score > losing states
   - Material advantage increases score
   - Defensive weights prioritize HP
   - Mechanic bonuses apply correctly

4. **BehaviorTree Tests:**
   - Lethal detection finds obvious wins
   - Crisis mode activates at low HP
   - Error rate produces expected distribution
   - Tier restrictions work (T1 skips lethal check)

### Integration Tests

1. **Simulator vs Real Game:**
   - Simulate move, then execute move in real game
   - Compare final states (should match)

2. **Full AI Turn:**
   - Run AI turn in test environment
   - Verify it completes without errors
   - Verify it makes valid moves

### Manual Playtesting

1. **Difficulty Curve:**
   - Play 10 games against each tier
   - Track win rate and game length
   - Adjust difficulty parameters

2. **Decision Quality:**
   - Observe AI missing obvious lethal (should be rare for T2+)
   - Observe AI making bad trades (should be common for T1)
   - Observe AI playing defensively when low HP (T3+)

---

## 9. Success Criteria

The AI system is considered complete when:

✅ **Functional:**
- All 5 difficulty tiers implemented and playable
- No crashes or infinite loops
- Makes legal moves 100% of the time

✅ **Performance:**
- T1-T3: <100ms turn time
- T4: <300ms turn time
- T5: <1000ms turn time
- No UI freezing or lag

✅ **Quality:**
- T1 player win rate: 70-80%
- T3 player win rate: 50-60%
- T5 player win rate: 30-40%
- AI finds lethal 95%+ of the time (T2+)
- AI plays defensively when at risk (T3+)

✅ **Maintainability:**
- Code is modular and testable
- Debug tools show AI reasoning
- Weights are configurable
- Unit test coverage >80%

---

## 10. Future Enhancements (Post-Launch)

1. **Machine Learning:**
   - Train neural network on player games
   - Predict optimal moves based on patterns
   - Adaptive difficulty that learns from player skill

2. **Multiplayer AI:**
   - AI opponents in PvP draft mode
   - AI teammates in co-op missions

3. **AI Personalities:**
   - "Aggressive" AI that always goes face
   - "Control" AI that focuses on removal
   - "Combo" AI that sets up synergies

4. **Difficulty Customization:**
   - Sliders for individual traits (aggression, defensive play, etc.)
   - Custom AI opponents with unique playstyles

---

## Appendix: Key Algorithms

### A. Lethal Detection (Optimized)

```typescript
function findLethal(state: GameState, owner: 'enemy', maxSimulations: number): AIMove | null {
  const enemyHP = state.player.hp;
  let simulationCount = 0;

  // Quick check: Can we lethal with just attacks?
  const directDamage = calculateMaxDirectDamage(state, owner);
  if (directDamage >= enemyHP) {
    // Return sequence of all attacks to face
    return getAllAttacksToFace(state, owner)[0];
  }

  // Check single-card plays that enable lethal
  const side = state.enemy;
  for (const card of side.hand) {
    if (card.cost > side.energy) continue;
    if (simulationCount++ > maxSimulations) break;

    const simResult = Simulator.simulate(state, { type: 'PLAY_UNIT', cardId: card.id });
    if (!simResult.valid) continue;

    const damageAfterPlay = calculateMaxDirectDamage(simResult.state, owner);
    if (damageAfterPlay >= enemyHP) {
      return { type: 'PLAY_UNIT', cardId: card.id };
    }
  }

  return null;
}
```

### B. Move Pruning Heuristics

```typescript
function shouldPruneMove(move: AIMove, state: GameState, owner: 'enemy'): boolean {
  // Prune obviously bad attacks
  if (move.type === 'ATTACK' && move.targetType === 'unit') {
    const attacker = findUnit(state, move.attackerUid!);
    const target = findUnit(state, move.targetUid!);

    // Don't attack if we die and they don't
    if (attacker.hp <= target.atk && target.hp > attacker.atk) {
      return true;
    }
  }

  // Prune useless card plays
  if (move.type === 'PLAY_TACTIC') {
    const card = findCard(state, move.cardId!);

    // Don't heal at full HP
    if (card.mechanics.some(m => m.type === 'heal')) {
      const hp = owner === 'player' ? state.player.hp : state.enemy.hp;
      const maxHp = owner === 'player' ? state.player.maxHp : state.enemy.maxHp;
      if (hp >= maxHp) return true;
    }
  }

  return false;
}
```

---

## Summary

This plan provides a complete, implementable roadmap for a strategic AI system that:
- Scales from beginner to expert difficulty
- Reuses existing game mechanics (no code duplication)
- Performs efficiently (budget-constrained simulation)
- Is maintainable and testable (modular design)
- Integrates smoothly with existing codebase (minimal changes)

**Total Estimated Effort:** 8 weeks for core system, additional time for polish and advanced features.