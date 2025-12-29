# Next Steps

## Immediate Testing Required

1. **Test Combat System**
   - Verify first strike prevents counter-attacks correctly
   - Test hack vs disarm (should work independently now)
   - Confirm sacrifice mechanic works as expected

2. **Test AI Behavior**
   - Ensure AI doesn't hang or timeout
   - Verify deck generation works at all difficulty levels
   - Check consecutive failure recovery

3. **Test UI/Memory**
   - Verify no memory leaks in DevPanel search
   - Check GameBoard component cleanup
   - Test hand overflow notifications appear

## Code Cleanup (High Value)

1. **Apply Cosmetic Generator** (~400 lines saved)
   ```typescript
   // In confederateCards.ts, megacorpCards.ts, etc:
   import { generateCosmetics } from './cardUtils';

   // Replace all cosmetics arrays with:
   cosmetics: generateCosmetics('card_id', 'Rarity')
   ```

2. **Resolve Combat Logic Duplication**
   - Either: Refactor `gameStore.ts` to use `combat.ts`
   - Or: Delete `src/logic/combat.ts` (currently unused)

3. **Add Type Definitions**
   - Add `hacked?: number` to UnitStatus interface
   - Add `originalAtkBeforeHack?: number` to UnitStatus interface

## Optional Improvements

1. **Centralize Asset Path Logic**
   - Create helper in `assetUtils.ts`
   - Replace 5+ duplicate patterns

2. **Create Filter Utilities**
   - `filterByFaction(items, faction)` in `cardHelpers.ts`
   - Replace 10+ duplicate filter calls

3. **Component Optimizations**
   - Add `useMemo` to Hand.tsx cost calculations
   - Use CARD_MAP in Workshop.tsx (O(1) vs O(n))
   - Fix Market.tsx Math.random() in useMemo

## Known Limitations

- Rally doesn't stack (by design)
- Loot mechanic only works for player (intentional)
- Assassinate blocked by shield (needs design decision)
- Disarm/debuff still share `weak` status (acceptable tradeoff)

## Build & Deploy

1. Run type check: `npm run type-check`
2. Run build: `npm run build`
3. Test in development
4. Deploy when stable
