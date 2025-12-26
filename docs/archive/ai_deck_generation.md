# AI Deck Generation Strategy: "The Smart Drafter"

## 1. Overview

**Goal:** Move from purely random card selection to a **Procedural Deck Builder** that constructs coherent, playable decks based on specific **Archetypes** and **Difficulty Levels**.

**Current State:**
- The game selects 15 random cards from the entire pool of valid faction cards.
- **Problem:** Resulting decks often have terrible mana curves (all high cost), no synergy (Megacorp payloads without Megacorp units), or lack win conditions.

**New Approach:**
- **Archetypes:** Templates that define card ratios (Units vs Tactics) and Mana Curves (Aggro vs Control).
- **Synergy Weights:** Cards are scored based on how well they fit the current deck state (e.g., if I have 3 Megacorp units, `Solarin Control` becomes high value).
- **Procedural Assembly:** The AI builds the deck card-by-card or bucket-by-bucket to ensure playability.

---

## 2. Core Concepts

### A. Archetypes
An Archetype defines the "shape" of the deck.

| Archetype | Description | Mana Curve Bias | Unit/Tactic Ratio | Mechanics Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Aggro** | Rush down the player early. | Low (1-3 Cost) | 80% / 20% | Rush, Double Attack, Spark |
| **Control** | Survive early, win late with big units. | High (4+ Cost) | 60% / 40% | Guard, Heal, Removal, Stun |
| **Midrange** | Balanced play, value trading. | Balanced | 70% / 30% | Stat efficiency, Rally, Buffs |
| **Synergy** | Focuses on specific mechanic interactions. | Variable | 70% / 30% | Faction-specific (e.g., "Count Megacorp") |

### B. Difficulty Levels
The deck generation gets "smarter" and more optimized as difficulty increases, with strict limits on high-tier card counts.

| Level | Name | Deck Logic | Card Pool Restrictions |
| :--- | :--- | :--- | :--- |
| **L1** | **Rookie** | **Purely Random.** No curve or synergy checks. | **Tier 1 cards only.** |
| **L2** | **Soldier** | **Purely Random.** No curve or synergy checks. | All T1 + **Max 4 Tier 2 cards.** |
| **L3** | **Veteran** | **Smarter Drafting.** Picks an Archetype. Basic synergy. | All T1/T2 + **Max 5 Tier 3 cards.** |
| **L4** | **Elite** | **Optimized Drafting.** Strict curve and combo focus. | All T1/T2 + **Max 10 Tier 3 cards.** |
| **L5** | **Tactical** | **Constructed-quality.** High synergy and power. | All T1/T2 + **Unlimited Tier 3 cards.** |

---

## 3. The Algorithm

### Phase 1: Setup
1.  **Select Faction:** (Passed from `startBattle`).
2.  **Select Level:** (Passed from `startBattle`).
3.  **Determine Archetype:**
    *   L1-L2: Randomly biased towards 'Aggro' or 'Midrange'.
    *   L3+: Pick based on Faction strengths (e.g., Megacorp -> Synergy/Swarm).

### Phase 2: Bucket Allocation (The "Draft")
Instead of picking 15 random cards, L3+ decks fill specific "Buckets" to ensure balance. **L1 and L2 skip this phase and select cards purely at random from their allowed pool.**

**Example: Balanced Deck (15 cards - L3+)**
1.  **Early Game (Cost 1-2):** 5 cards
2.  **Mid Game (Cost 3-4):** 6 cards
3.  **Late Game (Cost 5+):** 2 cards
4.  **Tactics/Removal:** 2 cards

### Phase 3: Card Selection Logic
For L3+, we score available cards. **For L1/L2, selection is random (1.0 weight for all candidates).**

**Tier Enforcement:**
- **L2:** Up to 4 cards can be Tier 2, remaining must be Tier 1.
- **L3:** Up to 5 cards can be Tier 3, remaining Tier 1/2.
- **L4:** Up to 10 cards can be Tier 3, remaining Tier 1/2.
- **L5:** No restrictions on card Tiers (full access to T1-T3).

**Scoring (L3+):**
$$Score = BaseScore + SynergyBonus + CurvePenalty$$

*   **BaseScore:** Derived from Rarity (Legendary > Rare > Common) and Tier.
*   **SynergyBonus:**
    *   If Deck has many `Megacorp` units -> Boost `Cost Reduction` and `Megacorp Count` cards.
    *   If Archetype is `Aggro` -> Boost `Rush` units.
    *   If Archetype is `Control` -> Boost `Guard` units.
*   **CurvePenalty:** If we already have too many high-cost cards, penalize expensive ones.

---

## 4. Implementation Plan

### File Structure
We will add `DeckBuilder.ts` to `src/logic/ai/`.

```typescript
// src/logic/ai/DeckBuilder.ts

interface DeckProfile {
  name: string;
  costDistribution: { [cost: number]: number }; // e.g. { 1: 0.2, 2: 0.3... } target percentages
  unitRatio: number; // 0.0 to 1.0
  preferredMechanics: string[];
}

class DeckBuilder {
  static generateDeck(faction: string, level: number): Card[] {
    // 1. Get Archetype
    const profile = this.getProfile(faction, level);
    
    // 2. Filter Collection (based on difficulty/level)
    const pool = this.getCardPool(faction, level);
    
    // 3. Draft Loop
    const deck: Card[] = [];
    while (deck.length < DECK_SIZE) {
      const candidates = this.scoreCandidates(pool, deck, profile);
      deck.push(this.pickWeighted(candidates));
    }
    
    return deck;
  }
}
```

### Key Functions

1.  **`getCardPool`**: Filters `ALL_CARDS` based on Faction and the specific Level constraints (e.g., L1 only sees Tier 1).
2.  **`scoreCandidates`**: The brain. Returns a list of cards with associated "weights" for the random picker.
    *   *L1/L2:* Weights are flat (Random).
    *   *L5:* Weights are heavily skewed towards "Best Fit".

---

## 5. Faction Specific Profiles

### Megacorp (The Swarm / The Machine)
*   **Archetype:** Synergy / Token Swarm.
*   **Key Cards:** `corp_technician` (Scaling), `solarin_control` (Energy), `director_kiz` (Buffs).
*   **Strategy:** Fill the board with low-cost drones/guards, then play payloads that scale off unit count.

### Jovian (The Elite / The Specialists)
*   **Archetype:** Midrange / Combo.
*   **Key Cards:** `elara` (Draw), `europa` (Stun/Control), `thebe` (Snipe).
*   **Strategy:** Individual high-quality units that sustain themselves.

---

## 6. Integration

1.  Update `src/store/gameStore.ts` inside `startBattle`:
    ```typescript
    // Old
    const enemyDeck = ... // random map

    // New
    const enemyDeck = DeckBuilder.generateDeck(faction, level);
    ```

2.  This allows us to instantly improve the "Intelligence" of the enemy just by giving them better tools (cards), without changing the AI logic itself.