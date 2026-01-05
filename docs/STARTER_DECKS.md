# Starter Decks System

## Overview

The game now supports starter decks for each faction (Confederate, Megacorp, Republic), with Confederate as the default. This system is designed to make it easy to add faction selection in the future.

## Files

### `src/data/starterDecks.ts`
Central configuration file for all starter decks.

**Key Exports:**
- `STARTER_DECKS` - Object containing all faction starter decks
- `DEFAULT_STARTER_FACTION` - Currently set to 'Confederate'
- `getStarterDeck(faction)` - Get a specific faction's starter deck
- `getDefaultStarterDeck()` - Get the default starter deck

### Starter Deck Composition

Each starter deck contains **20 cards**:
- **12 Commons** (6 unique cards × 2 copies each)
- **8 Uncommons** (4 unique cards × 2 copies each)

This teaches core faction mechanics while maintaining balance.

## Faction Starter Decks

### Confederate - "Vanguard Standard"
**Theme:** Resourcefulness, repair, regenerate, jury-rigging

**Cards:**
- callisto_militia × 2 (1 cost, Scout)
- belt_prospector × 2 (2 cost, Recycle)
- jury_rigged_bot × 2 (2 cost, Regenerate)
- scrapyard_scavenger × 2 (2 cost, Draw synergy)
- amalthea × 2 (3 cost, Vanilla 3/3)
- confederate_mechanic × 2 (3 cost, Repair Cybernetics)
- enceladus_shocktroop × 2 (3 cost, Rush)
- confederate_medic × 2 (3 cost, Heal)
- callisto × 2 (3 cost, Summon Thug)
- titan_breacher × 2 (4 cost, First Strike + Breach)

### Megacorp - "Corporate Efficiency"
**Theme:** Efficiency, Quota mechanics, cybernetic synergies

**Cards:**
- corp_drone (Mining Drone) × 2 (1 cost, Recycle)
- enemy_security (Security Bot) × 2 (2 cost, Guard, Megacorp synergy)
- corp_guard (Corp Guard) × 2 (2 cost, Quota 3: Guard)
- corp_hound (K9X Unit) × 2 (2 cost, Rush, Quota 4: Snipe)
- corp_medic (Doc Ash) × 2 (2 cost, Heal)
- corp_loader (Loader) × 2 (3 cost, 2/6 Slow)
- corp_manager (Alexandrea) × 2 (3 cost, Encourage + Quota Rally)
- enemy_uplink (Black Betty) × 2 (3 cost, Hack + Quota upgrade)
- corp_technician (T4M3K0) × 2 (3 cost, Summon Worker Drone)
- corp_liquidator (Ximena) × 2 (4 cost, Quota 4: +2/+2)

### Republic - "Senate Protocol"
**Theme:** Requisition mechanics, defensive/control, bureaucracy

**Cards:**
- republic_drone × 2 (1 cost, Requisition 3: +1/+1)
- torres × 2 (2 cost, Guard)
- lira_chen × 2 (2 cost, Spark + Heal self)
- protocol_droid × 2 (2 cost, Heal ally)
- advocate_cross × 2 (2 cost, Disarm)
- officer_volkov × 2 (3 cost, Guard)
- marcus_reeves × 2 (3 cost, Rally)
- elvie_webb × 2 (3 cost, Stun target)
- councilor_zhang × 2 (2 cost, Requisition 3: Draw)
- dr_singh × 2 (3 cost, Heal 3 target)

## How to Change the Default Faction

Edit `src/data/starterDecks.ts` and change the `DEFAULT_STARTER_FACTION` constant:

```typescript
// Change this line:
export const DEFAULT_STARTER_FACTION: FactionType = 'Confederate';

// To one of:
export const DEFAULT_STARTER_FACTION: FactionType = 'Megacorp';
export const DEFAULT_STARTER_FACTION: FactionType = 'Republic';
```

This will automatically update:
- Initial player collection
- Default saved deck
- Market rotation faction
- All reset functionality

## Future: Faction Selection

To implement faction selection in the future:

1. Add a faction selection UI (e.g., on main menu or new game screen)
2. Pass the selected faction to `getStarterDeck(faction)`
3. Initialize the player with that faction's cards
4. Update `metaStore` to store the selected faction preference

Example implementation:
```typescript
// In your UI component
const handleFactionSelect = (faction: FactionType) => {
  const starterDeck = getStarterDeck(faction);
  // Initialize game with starterDeck.cardIds
  // Save faction preference to metaStore
};
```

## Testing Different Factions

To test a different faction locally without UI changes:

1. Change `DEFAULT_STARTER_FACTION` in `src/data/starterDecks.ts`
2. Rebuild: `npm run build`
3. Clear browser storage (localStorage) to reset progress
4. Start the game

The new faction's starter deck will be loaded.
