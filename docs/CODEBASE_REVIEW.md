# Codebase Review - December 2024

**Total Lines:** ~7,900 TypeScript/TSX
**Build Status:** 26 pre-existing errors (settings phase, unused imports)
**Architecture:** React + Zustand + TypeScript

---

## Executive Summary

**Overall Grade: B+**

Well-structured card game with sophisticated AI (1,300 LOC), clean separation of concerns, and recent quality improvements. Game logic is solid, types are comprehensive, and the codebase demonstrates good architectural patterns. Main weakness is the 1,300-line gameStore requiring further decomposition.

---

## Architecture Strengths

### 1. **Clean Separation**
```
src/
├── components/     UI layer (11 files, ~950 LOC)
├── logic/          Game mechanics (4 files, ~1,600 LOC)
│   └── ai/         Sophisticated AI system (9 files, 1,300 LOC)
├── store/          State management (2 files, 1,500 LOC)
├── types/          TypeScript definitions (182 LOC)
├── data/           Card definitions (144KB)
├── lib/            Utilities (centralized helpers)
└── constants/      Typed constants
```

**Good:**
- Logic completely separated from UI
- AI system modular (DeckBuilder, Simulator, Evaluator, BehaviorTree)
- Data-driven card design (no hardcoded mechanics)

### 2. **Type Safety**
```typescript
// 46 mechanic types, 9 trigger types, 7 factions
export type MechanicType = 'summon' | 'scout' | 'stun' | ...

// NEW: Typed payloads (backwards compatible)
export interface MechanicPayload {
  faction?: Faction;
  scaling?: 'count_megacorp' | 'count_allies';
  cap?: number;
  // ...
}

// Union type preserves flexibility
payload?: string | MechanicPayload;
```

**Good:**
- Comprehensive type definitions
- Recent addition of `MechanicPayload` improves safety
- Type guards (`isStringPayload`) prevent runtime errors

### 3. **State Management**
- Zustand for global state (lightweight, no boilerplate)
- 2 stores: `gameStore` (game state), `metaStore` (progression)
- Proper separation of concerns

---

## Recent Improvements ✅

### 1. **Asset Resolution** (Eliminated Duplication)
**Before:** 3× identical logic in Card.tsx, Unit.tsx, Market.tsx
**After:** Centralized in `lib/assetUtils.ts`

```typescript
// Single source of truth
export const getCardAssetPath = (card: Card): string => {
  const assetSuffix = (card.type === 'tactic' || card.rarity === 'NA')
    ? '' : `_tier${card.tier}`;
  const folder = FACTION_FOLDERS[card.faction];
  return `/assets/cards/${folder}/${card.baseAsset}${assetSuffix}.png`;
};
```

**Impact:** DRY principle, easier maintenance

### 2. **Typed Payloads** (Type Safety)
**Before:** String parsing everywhere: `payload.startsWith('faction:')`
**After:** Type-safe interface with guards

```typescript
// Before (brittle)
if (mechanic.payload?.startsWith('count_megacorp:max_')) {
  const maxValue = parseInt(mechanic.payload.split('max_')[1]);
}

// After (safe)
if (isStringPayload(mechanic.payload) && mechanic.payload.startsWith(...)) {
  // TypeScript knows it's a string here
}
```

**Impact:** Prevents typos, enables IDE autocomplete

### 3. **Constants Extraction**
```typescript
// constants/index.ts
export const MECHANICS = {
  GUARD: 'guard',
  RUSH: 'rush',
  // ... 46 total
} as const satisfies Record<string, MechanicType>;
```

**Impact:** Single source of truth, easier refactoring

### 4. **Combat Logic Extraction**
Pure function for combat calculations:
```typescript
// logic/combat.ts - 60 LOC, zero side effects
export const calculateCombat = (
  attacker: UnitInstance,
  defender: UnitInstance
): CombatResult => {
  // Pure calculation logic
};
```

**Impact:** Testable, reusable (currently unused in main code)

---

## Code Quality Metrics

### Complexity Analysis
| File | LOC | Complexity | Status |
|------|-----|------------|--------|
| `gameStore.ts` | 1,323 | **HIGH** | ⚠️ Needs decomposition |
| `mechanics.ts` | 821 | **MEDIUM** | ✅ Acceptable (game logic) |
| `AI.ts` | 688 | **MEDIUM** | ✅ Legacy wrapper |
| `ai/` (9 files) | 1,302 | **LOW-MED** | ✅ Well modularized |

### Best Practices
- ✅ Functional components (no classes except `MechanicHandler`)
- ✅ React hooks (11 files use hooks appropriately)
- ✅ Proper TypeScript (no `any`, minimal `@ts-ignore`)
- ✅ Constants in config files
- ✅ Card lookup optimization: `Map<string, Card>` for O(1) access

### Code Hygiene
- **TODOs/FIXMEs:** 2 total (excellent)
- **Unused imports:** ~4 (minor, caught by linter)
- **Comments:** Good documentation in complex logic

---

## Technical Debt

### 1. **gameStore.ts - Monolithic** (Priority: Medium)
**Issue:** 1,323 lines handling everything
- Game phase management
- Card playing logic
- Combat resolution (200+ LOC in `attackTarget`)
- Animation orchestration
- Dev tools
- AI integration

**Impact:** Hard to navigate, test individual features

**Fix:**
```typescript
// Proposed structure
src/store/
├── gameStore.ts        (orchestrator, ~300 LOC)
├── slices/
│   ├── combatSlice.ts  (attackTarget, damage logic)
│   ├── deckSlice.ts    (draw, shuffle, hand management)
│   └── animationSlice.ts (visual state)
```

**Effort:** Medium (2-3 hours, careful refactoring)

### 2. **Mechanic Resolution Side Effects** (Priority: Low)
**Issue:** `MechanicHandler.resolve()` mutates state internally
**Current:** Returns `ResolutionResult` but still has mutations

**Better Pattern:**
```typescript
// Pure function approach
resolve(mechanic, sourceUnit, state): {
  newState: GameState,  // Complete new state
  animations: Animation[],
  notifications: Notification[]
}
```

**Impact:** Easier AI simulation, testing
**Status:** AI workaround exists, not blocking

### 3. **String Payloads Still Dominant** (Priority: Low)
**Issue:** Most cards still use string payloads (`'count_megacorp:max_4'`)
**Current:** Type safety layer added, but migration incomplete

**Migration Path:**
```typescript
// Convert gradually
payload: 'count_megacorp:max_4'  →  payload: {
  scaling: 'count_megacorp',
  cap: 4
}
```

**Effort:** Low per card, high total (200+ cards)
**Value:** Medium (safety vs. effort trade-off)

### 4. **Build Errors** (Priority: Low)
26 errors unrelated to core functionality:
- Settings phase not in type union (easy fix)
- Unused imports (cosmetic)
- Legacy type mismatches

---

## Performance

### Strengths
- Card lookup: `Map` instead of array search (O(1) vs O(n))
- Fisher-Yates shuffle (proper uniform distribution)
- React optimizations: `layoutId` for smooth animations

### Potential Issues
- **Animation delays:** Multiple `setTimeout` chains in `attackTarget`
- **Board re-renders:** No memoization on expensive renders

**Not Critical:** Game runs smoothly, premature optimization avoided

---

## AI System (Impressive)

**1,300 LOC** of sophisticated decision-making:

```
ai/
├── DeckBuilder.ts    (312 LOC) - Builds archetype decks
├── Simulator.ts      (247 LOC) - Looks ahead N turns
├── BehaviorTree.ts   (218 LOC) - Decision hierarchy
├── Evaluator.ts      (121 LOC) - Board state scoring
├── MoveGenerator.ts  (141 LOC) - Legal move generation
└── AIController.ts   (164 LOC) - Orchestration
```

**Highlights:**
- L1-L5 difficulty levels
- Archetype-based deck building (Aggro, Control, Midrange, Swarm)
- Monte Carlo-style simulation
- Behavior tree for decision-making

**Well-architected:** Modular, testable, separated from game logic

---

## Recommendations

### Immediate (Low Effort, High Value)
1. ✅ **Asset utils** - Done
2. ✅ **Type constants** - Done
3. ✅ **Typed payloads** - Done
4. **Fix build errors** - 30 minutes
   ```typescript
   // types/index.ts
   export type Phase =
     | 'main_menu' | 'faction_select' | 'player_turn'
     | 'settings'  // Add this
   ```

### Short-term (1-2 Sessions)
5. **Decompose gameStore** - Extract combat, deck, animation slices
6. **Add unit tests** - Combat logic, AI evaluator (pure functions)
7. **Memoize expensive components** - GameBoard, Card list renders

### Long-term (Future Iterations)
8. **Migrate payloads to typed objects** - Gradual card-by-card
9. **Make mechanics resolution pure** - Return full state, no mutations
10. **Add performance monitoring** - Track frame times, re-render counts

---

## Comparison to Original Review

### ✅ Resolved
- [x] Asset resolution duplication → **Centralized**
- [x] String payload type safety → **Type guards added**
- [x] Magic strings → **Constants file**

### ⚠️ Partial
- [~] Store architecture → **Combat utils created, not integrated**

### 🔄 Unchanged
- [ ] Mechanic resolution purity (AI workaround sufficient)
- [ ] gameStore size (largest remaining debt)

---

## Final Assessment

### Strengths
- Clean architecture with proper separation
- Sophisticated AI implementation
- Comprehensive type system
- Recent quality improvements applied
- Data-driven design (flexible, maintainable)

### Weaknesses
- gameStore.ts needs decomposition
- Some legacy patterns (string payloads)
- Limited test coverage

### Verdict
**Production-ready** for a hobby/indie game. Technical debt is manageable and well-documented. The codebase demonstrates solid engineering principles and recent improvements show active quality management.

**Recommended Focus:** Decompose gameStore into slices for long-term maintainability.
