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

## Additional Ideas

### Architecture & Code Quality

1. **Extract Shared UI Components**
   - Create `<ResourceHeader>` component (used in Market, Workshop, Hangar)
   - Create `<ScreenLayout>` wrapper for consistent screen structure
   - Saves ~150 lines, improves consistency

2. **State Management Improvements**
   - Consider extracting complex mechanics resolution to middleware
   - Add state validation in dev mode (check for invalid unit states)
   - Create action logger for easier debugging

3. **Mechanic System Enhancements**
   - Create `MechanicBuilder` class for fluent API:
     ```typescript
     new MechanicBuilder()
       .damage(3)
       .target('random_enemy')
       .onPlay()
       .build()
     ```
   - Add mechanic validation (check targets exist, values are valid)
   - Support compound mechanics (damage + stun in one)

4. **Better Status Effect System**
   - Replace individual status flags with array-based system:
     ```typescript
     status: [
       { type: 'hacked', duration: 2, value: 3 },
       { type: 'stunned', duration: 1 }
     ]
     ```
   - Allows multiple debuffs to coexist cleanly
   - Easier to track, display, and manage

### Testing & Quality Assurance

1. **Add Unit Tests**
   - Test `MechanicHandler.resolve()` for all mechanic types
   - Test `calculateCombat()` edge cases
   - Test `DeckBuilder` with various constraints
   - Test status effect interactions

2. **Add Integration Tests**
   - Full combat scenarios (first strike, thorns, shield)
   - AI turn execution
   - Card draw with deck recycling
   - Passive buff application

3. **Add Visual Regression Tests**
   - Screenshot tests for card rendering
   - UI state consistency tests

### Performance Optimizations

1. **Memoization Strategy**
   - Memoize `getCardCost()` with LRU cache
   - Memoize faction filtering results
   - Use `React.memo()` for Card and Unit components

2. **Lazy Loading**
   - Code-split faction card data
   - Lazy load Market/Workshop/Hangar screens
   - Load card images on demand

3. **Virtual Scrolling**
   - Add virtual scrolling to Workshop card list (100+ cards)
   - Add virtual scrolling to Hangar cosmetics list

### Developer Experience

1. **Better DevPanel**
   - Add "spawn random deck" button
   - Add "simulate N turns" for AI testing
   - Add mechanic tester (select mechanic, test resolution)
   - Add state snapshot/restore for bug reproduction

2. **Development Tools**
   - Add ESLint rules for common mistakes
   - Add pre-commit hooks (format, type-check, lint)
   - Create card template generator script
   - Add mechanic documentation generator

3. **Debug Logging**
   - Add conditional logging system:
     ```typescript
     debug.combat('Attacker dealt %d damage', damage);
     debug.mechanics('Resolving %s on %s', mechanic.type, target.name);
     ```
   - Toggle categories in DevPanel

### Game Design & Balance

1. **Card Balance Tools**
   - Track win rates by deck composition
   - Track mechanic usage statistics
   - Generate balance reports (over/under-powered cards)

2. **AI Improvements**
   - Add difficulty-based mistake rate (AI intentionally makes suboptimal plays)
   - Personality-based AI (aggressive, defensive, combo-focused)
   - Learn from player strategies (basic ML)

3. **Tutorial System**
   - Interactive tutorial for new players
   - Mechanic showcase mode
   - Practice battles with hints

### Content & Features

1. **Deck Builder Enhancements**
   - Deck validation (min/max cards, faction requirements)
   - Deck stats (average cost, curve visualization)
   - Import/export deck codes
   - Deck archetypes and suggestions

2. **Collection Management**
   - Card filtering/sorting improvements
   - Dust/crafting system for missing cards
   - Card upgrade system (golden/foil variants)
   - Collection completion tracking

3. **Progression System**
   - Achievement system
   - Daily challenges
   - Leaderboards
   - Season pass / battle pass

4. **Multiplayer Foundation**
   - Abstract player actions into serializable format
   - Add game state validation
   - Create replay system (store action log)
   - Design sync protocol

### Documentation

1. **Code Documentation**
   - Add JSDoc to all public functions
   - Document mechanic payloads and targeting rules
   - Create architecture decision records (ADRs)

2. **Player Documentation**
   - Mechanic glossary
   - Faction strategy guides
   - Card database with search

3. **Developer Documentation**
   - "How to add a new card" guide
   - "How to add a new mechanic" guide
   - State flow diagrams
   - Contribution guidelines

### Accessibility & UX

1. **Accessibility Improvements**
   - Add keyboard navigation
   - Screen reader support
   - Colorblind-friendly mode
   - Larger text option

2. **UX Enhancements**
   - Add undo button (last action)
   - Add combat prediction (show damage before attacking)
   - Add card hover previews (enlarge card on hover)
   - Add animation speed control
   - Add "auto-end turn" option

3. **Mobile Support**
   - Responsive layouts for all screens
   - Touch-friendly hit boxes
   - Swipe gestures
   - Simplified mobile UI

### Infrastructure

1. **Build & Deployment**
   - Add CI/CD pipeline (GitHub Actions)
   - Add automated testing on PR
   - Add bundle size tracking
   - Add performance budgets

2. **Monitoring**
   - Add error tracking (Sentry)
   - Add analytics (game sessions, popular cards)
   - Add performance monitoring

3. **Asset Management**
   - Optimize images (WebP, proper sizing)
   - Add asset CDN
   - Add asset versioning/cache busting
   - Generate sprite sheets for cards

## Build & Deploy

1. Run type check: `npm run type-check`
2. Run build: `npm run build`
3. Test in development
4. Deploy when stable



Disallowed Abilities: First Strike, Double Attack, Disarm, Bio-Optimize, Assassinate, Lifesteal, Mind Control, Silence
Uncommon:
Should have 0-2 keyword abilities. Abilities using a value (like Heal X) are never more than 3. 
Disallowed Abilities: Double Attack, Bio-Optimize, Assassinate, Mind Control
Rare: Should have 1-2 abilities. Abilities using a value (like Heal X) cap at 4. No disallowed abilities. May have a unique ability.
Legendary: Should have 2-3 keyword abilities and 1 unique ability. Abilities using a value cap at 5.