# Jovian Cards - Advanced AI Master Plan (Hybrid Architecture)

## 1. Executive Summary

We will move from a random-action script to a **Hybrid Decision Engine**. This combines:
1.  **Behavior Trees (The "Why"):** A structured flowchart to determine the AI's current *priority* (e.g., "Seek Lethal", "Defend", "Develop Board").
2.  **Utility Scoring (The "How"):** A mathematical evaluation to pick the best specific *action* to fulfill that priority (e.g., "Which unit do I attack to defend best?").

**The Goal:** An AI that plays fairly (no cheating) but scales from a "clumsy rookie" (T1) to a "ruthless tactician" (T5) by unlocking deeper layers of logic and reducing its error rate.

---

## 2. Core Architecture

The code will be modularized into `src/logic/ai/`:

### A. The Simulator (`Simulator.ts`)
A stateless engine that clones the current `GameState` and applies a specific Action (Play Card, Attack) to return a `FutureGameState`.
*   **Crucial:** It reuses `MechanicHandler.resolve()` to ensure the AI plays by the exact same rules as the player.
*   **No Cheating:** The Simulator only sees "Visible" information (Board, Own Hand, Enemy Board, Scouted Cards). It assumes unknown enemy cards are generic "Average Value" cards.

### B. The Move Generator (`MoveGenerator.ts`)
Identifies all **Legal Actions** available in a given state:
*   `PLAY_CARD`: For every playable card in hand -> distinct targets.
*   `ATTACK`: For every ready unit -> distinct valid targets.
*   `END_TURN`: Always an option.

### C. The Evaluator (`Evaluator.ts`)
Assigns a numerical **Score** to a game state based on weighted factors:
*   **Material:** `Sum(Friendly Stats) - Sum(Enemy Stats)`.
*   **Health Pressure:** `(Friendly HP - Enemy HP)`.
*   **Tempo:** `(Mana Spent / Total Mana)`.
*   **Synergy:** Bonus points for having specific mechanic combos active (e.g., Megacorp unit count).

---

## 3. The Logic Flow (The Behavior Tree)

The AI thinks in a hierarchy. Lower tiers stop at earlier, simpler branches. Higher tiers traverse the full tree.

### Priority 1: The "Lethal" Check
*   **Logic:** "Can I reduce Enemy HP to 0 this turn?"
*   **Action:** If yes -> **EXECUTE IMMEDIATELY**.
*   **Availability:** Tiers 2-5. (T1 misses lethal often).

### Priority 2: The "Crisis" Check
*   **Logic:** "Am I dying? (HP < 10 or Enemy showing Lethal on board)"
*   **Action:** Switch to **DEFENSIVE** scoring.
    *   Prioritize playing `Guard` units.
    *   Prioritize `Heal` / `Repair`.
    *   Attack enemy units instead of Face.
*   **Availability:** Tiers 3-5.

### Priority 3: The "Value" Check (Trading)
*   **Logic:** "Can I kill an enemy unit for 'free' or efficiently?"
    *   *Example:* My 5/5 attacks their 5/1. (Good Trade).
    *   *Example:* My 2/1 attacks their 1/5. (Bad Trade).
*   **Action:** Execute favorable trades.
*   **Availability:** Tiers 2-5.

### Priority 4: The "Development" Phase
*   **Logic:** "How do I maximize my board strength?"
*   **Action:** Play units efficiently (Mana Curve). Use Buffs.
*   **Availability:** All Tiers.

---

## 4. Difficulty Tiers (Archetypes)

We differentiate tiers by **Depth** (how much of the tree they use) and **Error Rate** (probability of picking a sub-optimal move).

| Tier | Name | Tree Depth | Lookahead | Error Rate | Behavior Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T1** | **Rookie** | Basic Only | None | **30%** | **Impulsive.** Skips "Lethal" and "Crisis" checks. Randomly chooses between attacking Face or Units. Wastes removal on weak units. |
| **T2** | **Soldier** | Up to "Value" | None | **15%** | **Efficient.** Recognizes free kills. Plays on curve. Occasionally misses lethal or over-commits to the board. |
| **T3** | **Veteran** | Full Tree | Half-Turn | **5%** | **Smart.** Prioritizes killing Healers/Engines. Uses tactics logically (Heal only if hurt). Respects threats. |
| **T4** | **Elite** | Full Tree | 1 Turn | **2%** | **Predictive.** Simulates the Player's next likely attack phase to position Guards optimally. Holds removal for high-value targets. |
| **T5** | **Tactical** | Full Tree | 2 Turns | **0%** | **Optimal.** Calculates perfect sequencing. "Cheats" slightly by assuming the player *always* has the optimal counter-play (Minimax), forcing a stalemate or win. |

---

## 5. Implementation Roadmap

### Step 1: Foundation (Refactoring)
*   Create `src/logic/ai/` directory.
*   Move `MechanicHandler` logic that interacts with UI (like notifications) into a callback system so the **Simulator** can run silently.

### Step 2: The Simulator & Generator
*   Implement `getLegalMoves(state)`: Returns an array of objects `{ type: 'PLAY', cardId: '...', target: '...' }`.
*   Implement `simulate(state, move)`: Returns `newState`.

### Step 3: The Evaluator (Scoring)
*   Implement `evaluateState(state, context)`:
    *   `context` includes factors like "Aggro Bias" or "Defensive Bias".
    *   Returns a `number`.

### Step 4: The Controller (Brain)
*   Implement the **Behavior Tree** loop in `AI.ts`.
*   Connect the "Error Rate" logic:
    *   *Calculation:* `topMoves = getBestMoves(3)`.
    *   *Selection:* `Math.random() < ErrorRate ? pickRandom(topMoves) : topMoves[0]`.

### Step 5: Testing
*   Create a "Dev vs AI" mode where we can see the AI's "Thought Process" (console logs of its candidate moves and scores).

---

## 6. Technical Limitations & Risks

1.  **Performance:** Simulating deep trees (T5) in JavaScript can be slow.
    *   *Mitigation:* Limit T5 search depth. Prune "obviously bad" moves (like attacking a 10/10 with a 1/1) early.
2.  **Complexity:** `MechanicHandler` is complex. Duplicating it is bad.
    *   *Mitigation:* The Simulator MUST use the *actual* `MechanicHandler`. We need to refactor `MechanicHandler` to take a generic `logger` or `notifier` so we can pass a "silent" logger during simulation.