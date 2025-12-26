# Code Review & Technical Debt

**Date:** December 2024
**Status:** AI System Implemented

## 1. ✅ AI Readiness (Partially Resolved)

**Status:** AI system now functional with workarounds.

**Implemented:**
- `MechanicHandler.resolve` accepts optional `logEvent` parameter (defaults to no-op)
- AI Simulator passes `undefined` to suppress side effects
- Returns `ResolutionResult` with `stateUpdates`, `animations`, `notifications`

**Remaining Issue:**
State mutations still happen inside resolve function. Cleaner approach would be pure function returning full new state, but current implementation works for AI needs.

## 2. Asset Resolution Duplication

**Issue:** Same asset path logic in `Card.tsx`, `Unit.tsx`, `Market.tsx`.

**Impact:** Changes require 3 file updates. Inconsistent fallback handling.

**Fix:** Create `src/lib/assetUtils.ts`:
```typescript
export const getCardAssetPath = (card: Card) => string
```

## 3. Type Safety - String Payloads

**Issue:** Mechanics use string parsing: `payload: 'count_megacorp:max_4'`

**Impact:** Typos cause silent failures. No TypeScript validation.

**Fix:** Structured interface:
```typescript
interface MechanicLogic {
  scaling?: 'count_megacorp' | 'count_allies';
  cap?: number;
}
```

## 4. Store Architecture

**Issue:** `gameStore.ts` handles everything: UI, phase, combat, animations, dev tools.

**Impact:** Hard to read/test. `attackTarget` mixes animations with game logic.

**Fix:**
- Extract `resolveCombat(attacker, defender)` → `src/logic/combat.ts`
- Use Zustand slices to separate `AnimationState` from `GameState`

## 5. Magic Strings

**Issue:** Hardcoded strings: `'Megacorp'`, `'onPlay'`, `'stun'` throughout codebase.

**Fix:** Constants:
```typescript
export const FACTIONS = { MEGACORP: 'Megacorp' } as const;
export const TRIGGERS = { ON_PLAY: 'onPlay' } as const;
```

---

## Priority Assessment

**Completed:** ✅ AI System (1,298 lines, L1-L5 difficulty, deck generation, simulation)

**Remaining Technical Debt:**
1. **Medium:** Asset utils consolidation
2. **Medium:** Typed mechanic payloads
3. **Low:** Store slicing
4. **Low:** Magic string constants

All remaining items are quality-of-life improvements, not blockers.
