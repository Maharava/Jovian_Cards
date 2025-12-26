# AI Bug Fixes Applied

## Date: 2025-12-24

### Bug 1: Infinite Loop Protection ✅
**File:** `src/logic/ai/DeckBuilder.ts:131-158`

**Issue:** `randomDeck()` could infinite loop if card pool had no valid cards within tier caps.

**Fix:** Added `maxAttempts` counter (DECK_SIZE * 100) and warning if deck incomplete.

```typescript
let attempts = 0;
const maxAttempts = DECK_SIZE * 100;

while (deck.length < DECK_SIZE && attempts < maxAttempts) {
  attempts++;
  // ... existing logic
}

if (deck.length < DECK_SIZE) {
  console.warn(`DeckBuilder: Could only generate ${deck.length}/${DECK_SIZE} cards for level ${level}`);
}
```

---

### Bug 2: Wrong maxHp Property Access ✅
**File:** `src/logic/ai/Simulator.ts:90`

**Issue:** `Card.stats.maxHp` doesn't exist - should use `hp` for both fields.

**Before:**
```typescript
hp: card.stats?.hp || 0,
maxHp: card.stats?.maxHp || 0, // ❌ maxHp doesn't exist on Card.stats
```

**After:**
```typescript
hp: card.stats?.hp || 0,
maxHp: card.stats?.hp || 0, // ✅ Correct
```

---

### Bug 3: Incorrect Shield Property ✅
**File:** `src/logic/ai/Simulator.ts:95`

**Issue:** Shield is a mechanic, not a stat property on UnitInstance.

**Before:**
```typescript
shield: card.mechanics.some(m => m.type === 'shield') ? 1 : 0 // ❌
```

**After:**
```typescript
shield: 0 // ✅ Shield handled via mechanics array
```

---

### Bug 4: Pool Exhaustion Warning ✅
**File:** `src/logic/ai/DeckBuilder.ts:195-197`

**Issue:** `smartDraft()` could silently return incomplete deck if pool exhausted.

**Fix:** Added warning log when candidates run out:

```typescript
if (candidates.length === 0) {
  console.warn(`DeckBuilder: Could only generate ${deck.length}/${DECK_SIZE} cards - pool exhausted`);
  break;
}
```

---

## Build Status

✅ All AI-related TypeScript errors resolved
✅ No new errors introduced
⚠️ Remaining errors are pre-existing (unrelated to AI system)

## Testing Notes

- Infinite loop protection triggers after 1500 attempts (15 cards * 100)
- Warnings logged to console for debugging incomplete decks
- Simulator now correctly handles unit creation with proper HP values
- Shield mechanic remains in mechanics array as intended
