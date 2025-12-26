# AI Bug Fix - L1 AI Passing Turns

**Date:** December 24, 2024
**Status:** ✅ Fixed

---

## Problem

L1 AI would play cards on turn 1, then pass every subsequent turn despite having:
- 4-5 energy
- 6+ cards in hand
- 0-2 units on board
- Valid affordable cards to play

---

## Root Cause

In `BehaviorTree.selectBestMove()`, the `END_TURN` move was given a score of `0`:

```typescript
// BEFORE (BROKEN)
if (move.type === 'END_TURN') {
  scoredMoves.push({ move, score: 0 }); // ❌ Often higher than negative scores
  continue;
}
```

**Why this broke:**
1. AI simulates playing each card
2. Evaluator scores the resulting game state
3. Many moves result in **negative scores** (especially L1 with poor evaluation)
4. `END_TURN` with score `0` would be sorted as the **best move**
5. AI passes instead of playing cards

**Example from logs:**
```
[BehaviorTree] Move: PLAY_UNIT corp_hound Score: -33.5
[BehaviorTree] Move: PLAY_UNIT corp_drone Score: -46.75
[BehaviorTree] Move: PLAY_UNIT corp_manager Score: -46.25
END_TURN gets score: 0  ← Wins!
[AI] Selected move: END_TURN
```

---

## Solution

Changed `END_TURN` to have the **lowest possible score**, making it only chosen when no other valid moves exist:

```typescript
// AFTER (FIXED)
if (move.type === 'END_TURN') {
  scoredMoves.push({ move, score: -1000 }); // ✅ Only chosen as last resort
  continue;
}
```

**File:** `src/logic/ai/BehaviorTree.ts:156`

---

## Verification

**Before Fix:**
```
Turn 1: AI plays 1 card, attacks
Turn 2+: AI immediately passes (END_TURN selected every time)
```

**After Fix:**
```
Turn 1: AI plays R0-VR (3 cost), Mining Drone (1 cost), attacks
Turn 2: AI plays Sub-Routine (3 cost), K9X Unit (2 cost), attacks multiple times
Turn 3+: AI continues playing cards and attacking normally
```

---

## Impact

**Affects:** All AI difficulty levels (L1-L5)
**Severity:** Critical - made AI completely non-functional after turn 1
**Risk:** Low - simple scoring change, no behavior logic altered

---

## Testing Checklist

- [x] L1 AI plays cards on turn 2+
- [x] AI attacks with units
- [x] Enemy board persists between turns
- [x] AI energy refreshes correctly
- [x] AI doesn't pass with valid affordable cards
- [x] Build passes with 0 errors

---

## Related Changes

None - this was a single-line fix. Debug logging was added during investigation but removed after fix verification.

---

## Why This Wasn't Caught Earlier

The new AI system (BehaviorTree + Simulator + Evaluator) was recently integrated. The old AI system had explicit logic for "play cards until out of energy", while the new system uses utility-based scoring. The bug manifested because:

1. Simulator correctly evaluates moves
2. Evaluator correctly scores states
3. But `END_TURN` scoring was an oversight in selectBestMove()

The system is working correctly now - the AI evaluates all moves and picks the highest-scoring one, with `END_TURN` as the fallback.
