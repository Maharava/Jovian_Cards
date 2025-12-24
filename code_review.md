# Code Review & Robustness Recommendations

**Date:** December 2025
**Focus:** Scalability, AI Readiness, and Maintainability

## 1. AI Readiness (Critical for AI Upgrade)

**Issue:** Logic and Side Effects are coupled.
The `MechanicHandler.resolve` function in `src/logic/mechanics.ts` performs state calculations (e.g., modifying HP) *and* triggers side effects (e.g., logging events, pushing notifications, queuing animations) in the same block.

**Why it matters:**
The proposed "Monte Carlo" or "Utility" AI needs to simulate thousands of potential future states. If the current handler is used, simulating a move would trigger thousands of animations and log entries in the background, likely crashing the browser or creating a chaotic UI state.

**Recommendation:**
Refactor `MechanicHandler` to return a "Result Object" instead of mutating external systems.
*   **Current:** Modifies state, calls `logEvent()`, pushes to `notifications` array.
*   **Proposed:** Return `{ newState: GameState, effects: GameEvent[], animations: AnimationDef[] }`.
*   The GameStore then applies the state and plays the animations. The AI Simulator applies the state and ignores the animations.

## 2. Maintainability & DRY (Don't Repeat Yourself)

**Issue:** Asset Resolution is duplicated.
The logic to determine which image to show for a card (checking Faction folder, checking Tier suffix, handling fallbacks) is copy-pasted across:
1.  `src/components/Card.tsx`
2.  `src/components/Unit.tsx`
3.  `src/components/Market.tsx`

**Why it matters:**
If you change your folder structure or asset naming convention (e.g., moving to `.webp`), you have to update it in three places. It creates inconsistent behavior (e.g., one component might handle a missing image differently than another).

**Recommendation:**
Create `src/lib/assetUtils.ts`:
```typescript
export const getCardAssetPath = (card: Card) => { ... }
```

## 3. Type Safety

**Issue:** "Stringly Typed" Logic.
Complex mechanics use parsing of string payloads (e.g., `payload: 'count_megacorp:max_4'`).

**Why it matters:**
This is brittle. A typo like `count_megacorp:max4` (missing underscore) causes silent failures that are hard to debug. TypeScript cannot validate these strings.

**Recommendation:**
Define a strict `Logic` interface in `src/types/index.ts`:
```typescript
interface MechanicLogic {
  scaling?: 'count_megacorp' | 'count_allies';
  cap?: number;
  condition?: 'if_megacorp';
}
```

## 4. Architecture

**Issue:** The "God Store".
`src/store/gameStore.ts` handles *everything*: UI state, phase management, combat math, animation sequencing, and dev tools.

**Why it matters:**
It makes the code hard to read and test. The `attackTarget` function is particularly complex, mixing animation delays with critical game rules.

**Recommendation:**
*   **Extract Combat Logic:** Move `resolveCombat(attacker, defender)` to `src/logic/combat.ts`. It should be a pure function that returns the result of the fight.
*   **Slice the Store:** If migrating to Redux isn't an option, use Zustand slices to separate `AnimationState` from `GameState`.

## 5. Magic Strings

**Issue:** Hardcoded literals.
Strings like `'Megacorp'`, `'Jovian'`, `'onPlay'`, and `'stun'` are scattered throughout the codebase.

**Recommendation:**
Use constants or enums:
```typescript
export const FACTIONS = { MEGACORP: 'Megacorp', ... } as const;
export const TRIGGERS = { ON_PLAY: 'onPlay', ... } as const;
```

---

## Executive Summary

If we proceed with the **AI Upgrade**, **Priority #1 (Decoupling)** is mandatory. The AI cannot function efficiently without it.

The other recommendations (Asset Utils, Typing, Store Refactor) are high-value "Technical Debt" payments that will make future development faster and less bug-prone, but they are not strictly blocking the AI features.
