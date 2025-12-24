# Enemy AI Mechanics Review

## 1. Architecture & Location

The Enemy AI in **Jovian Cards** is a server-authoritative style logic controller that runs client-side. It is designed to be **stateless** between turns but **state-aware** during execution.

*   **Core Brain:** `src/logic/AI.ts`
    *   Contains the `AI` object and its primary method `runTurn`.
    *   This is the entry point called by the GameStore when the player ends their turn.
*   **Interface:** `src/store/gameStore.ts`
    *   The `enemyAction` function delegates control to `AI.runTurn`.
    *   The AI consumes `GetState` (to read the board) and `SetState` (to mutate the board) directly from the Zustand store.
*   **Execution Engine:** `src/logic/mechanics.ts`
    *   The AI uses the **exact same** `MechanicHandler` as the player. This ensures rules consistency (e.g., if a mechanic changes, the AI automatically "learns" the new rule).

## 2. How It Works (The Logic Loop)

The `runTurn` function executes a procedural state machine with 6 distinct phases. It uses `await delay(...)` calls to pace actions for the human player to follow.

### Phase 1: Refresh
*   **Action:** Resets `ready` status and `attacksLeft` for all enemy units.
*   **Logic:**
    *   Sets `ready = true`.
    *   Checks for **Double Attack** (sets attacks to 2).
    *   Checks for **Stun** (sets attacks to 0 if stunned).

### Phase 2: Play Cards (The "Hand" Phase)
*   **Action:** Plays up to **3** cards from hand.
*   **Constraint:** Must have Energy and Board Space (< 5 units).
*   **Heuristic:**
    *   Filters hand for "affordable units".
    *   **Selection:** Purely **RANDOM** selection from playable cards.
    *   **Targeting:** Relies on `MechanicHandler`'s auto-targeting (usually random enemy/ally).
*   **UX:** Adds a "played [Card Name]" notification and handles OnPlay visual effects.

### Phase 3: Combat (The "Attack" Phase)
*   **Action:** Iterates through all ready units on the board.
*   **Logic:**
    1.  **Check Eligibility:** Unit must have ATK > 0 and not be Stunned.
    2.  **Target Selection:**
        *   **Priority 1:** **Guards** (If player has guards, MUST attack one).
        *   **Priority 2:** **Random Unit** (70% chance if no guards).
        *   **Priority 3:** **Player Commander** (30% chance if no guards).
    3.  **Execution:**
        *   Calculates damage (including Shield, Thorns, First Strike).
        *   Applies damage to both attacker and defender (simultaneous combat).
        *   Triggers `onDamageTaken` and `onDeath` events.
*   **Loop:** Runs until no units can attack or a sanity limit (10 attacks) is reached.

### Phase 4: End-of-Turn Mechanics
*   **Action:** Scans board for units with `onTurnEnd` triggers (e.g., Repair, Pollute).
*   **Logic:** Executes them sequentially, updating state after each one.

### Phase 5: Status Cleanup
*   **Action:** Decrements `stun` and `weak` counters.
*   **Logic:** Mirrors player logic—stun/weak wear off at the end of the turn.

### Phase 6: Handoff
*   **Action:** Calls `startPlayerTurn()` to pass control back to the human.

## 3. Strengths

1.  **Rule Consistency:** By sharing `MechanicHandler`, the AI never "cheats" or plays by different rules. If you fix a bug in `MechanicHandler`, the AI gets the fix for free.
2.  **Visual Clarity:** The heavy use of `abilityNotifications` and `effectVector` (colored lines for attacks/spells) makes the AI's actions easy to understand.
3.  **Robustness:** It handles edge cases like "Board Full" or "Zero Energy" gracefully without crashing.
4.  **Extensibility (Mechanics):** Adding a new keyword (like "Lifesteal") only requires updating `MechanicHandler`; the AI will automatically use it if a card has it.

## 4. Limitations & Weaknesses

1.  **Zero Strategy (Card Play):** The AI picks random playable cards. It does not:
    *   Prioritize spending efficient mana (e.g., playing a 4-cost over two 1-costs).
    *   Save combo pieces (e.g., playing a "Buff Megacorp" unit *before* playing the Megacorp units it would buff).
    *   Hold removal for high-value threats.
2.  **Inefficient Trading:** Combat logic is rudimentary.
    *   It might attack a 1/1 into a 5/5 (suicide).
    *   It might ignore a 10/1 threat to hit face for 2 damage.
3.  **Blind Targeting:** Complex abilities (like `Mind Control` or `Hack`) often default to random targets. The AI doesn't know to "Hack the unit with the highest Attack" or "Mind Control the strongest unit under the threshold."
4.  **No Lookahead:** The AI has no concept of "next turn." It plays for the immediate moment only.

## 5. Scalability & Future Improvements

The current system is a solid **Foundation**, but for a deeper tactical challenge, it needs a **Decision Engine**.

### Recommended Architecture Upgrades:

1.  **Scoring System (Heuristic Evaluation):**
    *   Instead of `Math.random()`, implement a `evaluateBoardState(state)` function.
    *   Simulate playing Card A vs Card B. Pick the one that results in a higher board score (e.g., Score = Own Stats - Enemy Stats + Hand Size).

2.  **Archetypes (Personalities):**
    *   Refactor `AI.ts` to accept a `Strategy` parameter.
    *   **Aggro Bot:** Priority = Face (90%), ignores efficient trades.
    *   **Control Bot:** Priority = Clear Board, save removal for high ATK units.

3.  **Targeting Heuristics:**
    *   Update `MechanicHandler` to accept an optional `targetingStrategy` callback.
    *   AI passes a function: `(targets) => targets.sort((a,b) => b.atk - a.atk)[0]` (Select strongest enemy).

4.  **Tactics Usage:**
    *   Currently, the AI handles units well but `playTactic` logic is implicit in `MechanicHandler`. It needs specific logic for *when* to play a Tactic (e.g., "Only play 'Heal' if a unit is damaged").

### Code Quality Note
The `runTurn` function is becoming a "God Function."
*   **Refactor:** Extract Phase 2 (Card Play) and Phase 3 (Combat) into separate helper functions (`AI.playCards`, `AI.resolveCombat`).
*   **Config:** Move constants like `70% attack unit chance` to `src/config/aiConfig.ts` for easier balancing.
