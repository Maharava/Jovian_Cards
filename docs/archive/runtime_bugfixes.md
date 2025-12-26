# AI Runtime Bug Fixes

## Date: 2025-12-24

### Critical Fix: DataCloneError in Simulator ✅

**Error:**
```
DataCloneError: Failed to execute 'structuredClone' on 'Window':
(playerDeck) => { ... } could not be cloned.
```

**Root Cause:**
AIController was passing the full Zustand store (including all action functions) to the BehaviorTree/Simulator. `structuredClone()` cannot clone functions, causing the simulation system to crash.

**Stack Trace:**
```
deepCloneState (utils.ts:9)
→ Simulator.simulate (Simulator.ts:14)
→ BehaviorTree.checkLethal (BehaviorTree.ts:60)
→ BehaviorTree.execute (BehaviorTree.ts:22)
→ AIController.runTurn (AIController.ts:55)
```

---

### Solution

**File:** `src/logic/ai/AIController.ts`

Added `extractPureState()` method to filter out action functions:

```typescript
private static extractPureState(fullState: GameState & GameActions): GameState {
  return {
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
  };
}
```

**Updated runTurn():**
```typescript
const fullState = get();
const pureState = this.extractPureState(fullState);
const move = this.behaviorTree.execute(pureState, aiLevel, 'enemy');
```

Now only pure state data (no functions) is passed to the simulation system.

---

### UI Fix: Threat Level Flavor Text ✅

**File:** `src/components/FactionSelect.tsx:141-145`

**Before:**
```tsx
Enemy forces in this sector are comprised of Tier {difficulty} units.
```
❌ Incorrect - Implies Tier 4 and Tier 5 units exist

**After:**
```tsx
{difficulty === 1 && 'Enemy forces will deploy basic units with minimal tactical coordination.'}
{difficulty === 2 && 'Enemy forces will field T1-T2 units with basic strategic planning.'}
{difficulty === 3 && 'Enemy forces will deploy T1-T3 units with coordinated tactics and synergies.'}
{difficulty === 4 && 'Enemy forces will field optimized T1-T3 decks with advanced combo strategies.'}
{difficulty === 5 && 'Enemy forces will deploy elite T3-heavy decks with perfect tactical execution.'}
```
✅ Accurate - Clarifies difficulty affects AI intelligence and deck composition, not unit tiers

---

## Testing

### Before Fix
- ❌ AI turn crashed with DataCloneError
- ❌ Game unplayable against AI
- ❌ Misleading flavor text about T4/T5 units

### After Fix
- ✅ AI turn executes successfully
- ✅ Simulation system works correctly
- ✅ structuredClone handles pure state
- ✅ Accurate difficulty descriptions

---

## Technical Details

**Why This Happened:**
Zustand stores combine state and actions in a single object. When `get()` is called, it returns `GameState & GameActions`. The AI simulation system needs to clone state multiple times to evaluate different moves, but JavaScript's `structuredClone()` cannot clone functions.

**Prevention:**
Always extract pure state before passing to simulation/evaluation systems. Keep action functions separate from state data.
