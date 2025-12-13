# Codebase Structural Review & Improvement Plan

This document outlines the current state of the codebase and recommendations for structural improvements, refactoring, and better practices.

## 1. Architectural Overview
*   **State Management:** `zustand` is used effectively (`gameStore`, `metaStore`).
    *   *Issue:* `gameStore.ts` is becoming monolithic (handling AI, Turn Logic, Battle Logic, State).
    *   *Recommendation:* Split into slices:
        *   `createPlayerSlice` (Hand, Deck, Resources).
        *   `createBattleSlice` (Board, Combat, Mechanics).
        *   `createAISlice` (Enemy logic).
*   **Components:**
    *   `GameBoard.tsx` is very large (~400 lines logic + render).
    *   *Recommendation:* Extract sub-components:
        *   `Hand.tsx` (Player hand rendering).
        *   `Battlefield.tsx` (Grid of units).
        *   `EnemyZone.tsx` (Commander + Hand).
        *   `TargetingOverlay.tsx` (The arrow/selection UI).
*   **Logic:**
    *   `mechanics.ts` (Logic) vs `data/mechanics.ts` (Definitions) is a good split.
    *   `MechanicHandler` is robust but growing. Consider Strategy pattern if mechanics become very complex.

## 2. Code Quality & Cleanup
*   **Types:**
    *   `UnitInstance` lacked `faction` until recently. Now fixed.
    *   `Card` interface is well-defined.
*   **Hardcoded Values:**
    *   Many magic numbers in `gameStore` (e.g., `1500` delays, `10` max hand size).
    *   *Recommendation:* Move to `src/config/constants.ts`.
*   **AI Logic:**
    *   Currently nested inside `gameStore` `enemyAction`.
    *   *Recommendation:* Extract to `src/logic/AI.ts` with a function `computeNextMove(state): Action`.

## 3. Deprecation & Unused Code
*   **Animation Fields:** `attackingUnitId`, `attackVector`, etc. were marked deprecated but are now core to the animation system. Comments have been updated.
*   **Legacy Assets:** Check `public/assets` for unused images regularly.

## 4. Documentation
*   **Complex Functions:** `startBattle` and `attackTarget` need JSDoc comments explaining the flow (State update -> Animations -> Cleanup).
*   **Mechanics:** `mechanics.ts` is the rule engine. Keeping it documented is critical.

## 5. Next Steps
1.  **Refactor `GameBoard.tsx`**: Break it down.
2.  **Constants**: Extract magic numbers.
3.  **Tests**: Add unit tests for `MechanicHandler` (critical logic).
