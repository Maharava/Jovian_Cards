# AI Deck Builder Implementation

## Status: ✅ COMPLETE

AI-powered deck generation now replaces random card selection for enemy decks.

## What Was Implemented

### Core File
- **`src/logic/ai/DeckBuilder.ts`** (311 lines)
  - Card pool filtering with tier restrictions
  - Archetype-based deck construction
  - Synergy scoring system
  - Weighted random selection

### Integration
- **`src/store/gameStore.ts`** - Uses DeckBuilder.generateDeck()
- **`src/logic/ai/index.ts`** - Exports DeckBuilder

## Level Breakdown

| Level | Strategy | Tier Caps | Archetype |
|-------|----------|-----------|-----------|
| **L1** | Pure random | T1 only | Random (Aggro bias) |
| **L2** | Pure random | Max 4×T2 | Random (Aggro bias) |
| **L3** | Smart draft | Max 5×T3 | Archetype-based |
| **L4** | Optimized | Max 10×T3 | Archetype-based |
| **L5** | Constructed-quality | Unlimited | Archetype-based |

## Archetypes (Megacorp)

### Aggro (L3: 70%, L4: 50%, L5: 40%)
- **Curve:** 7 early / 6 mid / 2 late
- **Mechanics:** Rush, Double Attack, First Strike

### Swarm (L3: 30%, L4: 30%, L5: 30%)
- **Curve:** 8 early / 5 mid / 2 late
- **Mechanics:** Summon, Rally, Buff, Cost Reduction

### Control (L4+: 20%, L5: 30%)
- **Curve:** 4 early / 7 mid / 4 late
- **Mechanics:** Guard, Heal, Stun, Lifesteal

## Synergy Detection

### Implemented Bonuses
- **Cost Reduction** - Scores higher with more Megacorp units
- **Rally/Buff** - Scores higher with more allies
- **Archetype Fit** - +2-4 score for preferred mechanics
- **Curve Balance** - Penalty for too many same-cost cards
- **Duplicate Limit** - Max 3 copies per card (L3+)

## Usage

Automatically active in `startBattle()`:
```typescript
const enemyDeck = DeckBuilder.generateDeck(faction, difficulty);
```

Enemy decks now:
- Have proper mana curves
- Include synergistic combos
- Scale in power with difficulty
- Feel intentionally constructed (L3+)

## Testing

Build passes with no DeckBuilder-related errors.
Ready for playtesting to tune weights and validate difficulty curve.
