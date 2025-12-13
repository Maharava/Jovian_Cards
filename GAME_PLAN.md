# **Jovian Cards — Master Game Design Document**
*(Version 2.0 — Comprehensive Spec for Implementation)*

---

# 1. **Game Overview**
**Title:** Jovian Cards  
**Genre:** Turn-Based Sci-Fi Roguelite Deckbuilder  
**Setting:** The Jovian System (Moons of Jupiter)  
**Target Platform:** Web (React/TypeScript) & Desktop (Linux)  
**Visual Style:** Hard Sci-Fi, clean UI, neon accents, distinct character portraits.  
**Scope:** Single-player, offline, persistent progression via browser storage.

**The "Elevator Pitch":**  
*Hearthstone meets FTL.* Assemble a crew of specialists from the Jovian moons to fight off rogue AI and cosmic horrors. Upgrade your crew (cards) from recruits to legends as you push deeper into the Jovian Expanse.

---

# 2. **Universe & Lore**
## 2.1 The Setting
Humanity has colonized the Jovian system, establishing mining colonies and research stations on the major moons. A mysterious "Signal" has caused the local automaton workforce to go rogue and has attracted "Void-Born" entities from deep space.

## 2.2 The Factions
*   **The Vanguard (Player):** An elite task force assembled to re-establish comms and neutralize threats.
*   **Rogue Automata (Enemy):** Mining droids, security bots, and corrupted drones. High armor, predictable patterns.
*   **The Void-Born (Enemy):** Biological cosmic horrors. High health, health regeneration, sanity-draining effects.

---

# 3. **Core Gameplay Loop**
1.  **Main Menu:** Player selects "New Run" or "Continue".
2.  **Deck Selection:** Choose a starting deck (default "Vanguard Standard") or a Custom Deck built in the Library.
3.  **The Run (Roguelite Structure):**
    *   **Battle Node:** Defeat enemies to earn Credits and Tech Parts.
    *   **Reward Screen:** Choose 1 of 3 random cards to add to the deck.
    *   **Workshop Node:** Spend Tech Parts to upgrade cards (Tier 1 -> 2 -> 3).
    *   **Boss Node:** Final test of the run.
4.  **Victory/Defeat:**
    *   **Victory:** Boss defeated. Unlocks new starter cards/difficulties.
    *   **Defeat:** Commander HP reaches 0. Run ends. Collection persists (in "Constructed" mode) or resets (in "Roguelite" mode - *current scope focuses on Roguelite progression within a run, but Collection persists globally for deck building*).

---

# 4. **Card System**
## 4.1 Card Types
*   **Unit (Crew):** Placed on the board. Has ATK and HP. Can attack enemies.
*   **Tactic (Operation):** One-time effect. Goes to discard pile immediately after use.

## 4.2 Card Anatomy
*   **ID:** Unique identifier (e.g., `hero_elara_t1`).
*   **Name:** Display name (e.g., "Elara, Scanner").
*   **Cost:** Energy required to play (0-10).
*   **Tier:** 1 (Recruit), 2 (Veteran), 3 (Legend). Determines power level.
*   **Stats:** Attack / Health (Units only).
*   **Text:** Ability description.
*   **Tags:** Scientist, Psychic, Pilot, etc.

## 4.3 Keywords Glossary
*   **Guard:** Enemies must attack this unit before attacking non-Guard units or the Commander.
*   **Rush:** Can attack immediately after being played.
*   **Snipe:** Can ignore Guard to target any enemy.
*   **Shield:** Absorbs the next X damage. Stackable.
*   **Stun:** Unit cannot attack or use abilities next turn.
*   **Repair X:** Restore X Health at the start of your turn.
*   **Glitch:** 50% chance to attack a random target (friend or foe).
*   **Scout:** Look at the top X cards of a deck.

---

# 5. **Hero Roster & Tier Progression**
*Note: Tier upgrades represent character development. Art changes reflecting veteran status.*

### **1. Elara (Scientist)**
*Theme: Information warfare, cost reduction.*
*   **Tier 1 (Scanner):** 2 Cost | 2/3 | **OnPlay:** Scout 1 enemy card.
*   **Tier 2 (Analyst):** 2 Cost | 3/4 | **OnPlay:** Scout 1 enemy card. If it's a Tactic, draw a card.
*   **Tier 3 (Omniscient):** 2 Cost | 4/5 | **Passive:** Enemy cards are revealed. **OnPlay:** Enemy Tactics cost +2 next turn.

### **2. Europa (Psychic)**
*Theme: Crowd control, locking down threats.*
*   **Tier 1 (Adept):** 3 Cost | 2/2 | **OnPlay:** Stun an enemy unit.
*   **Tier 2 (Mentalist):** 3 Cost | 3/3 | **OnPlay:** Stun an enemy unit. Deal 2 damage to it.
*   **Tier 3 (Oracle):** 4 Cost | 4/5 | **OnPlay:** Stun ALL enemy units.

### **3. Io (Engineer)**
*Theme: Buffs, robotic synergy, repair.*
*   **Tier 1 (Mechanic):** 2 Cost | 1/4 | **TurnEnd:** Give a random friendly unit +1 ATK.
*   **Tier 2 (Technomancer):** 2 Cost | 2/5 | **TurnEnd:** Give a random friendly unit +1/+1.
*   **Tier 3 (Architect):** 3 Cost | 3/6 | **TurnStart:** Give ALL other friendly units +1/+1 and Repair 1.

### **4. Lysithea (Anomaly)**
*Theme: Chaos, high risk/high reward.*
*   **Tier 1 (Glitch):** 1 Cost | 3/3 | **Passive:** **Glitch** (50% chance to attack random target).
*   **Tier 2 (Unstable):** 1 Cost | 5/4 | **Passive:** **Glitch**. **OnDeath:** Deal 3 damage to all characters.
*   **Tier 3 (Singularity):** 4 Cost | 8/8 | **Passive:** **Glitch**. **TurnEnd:** Transform a random enemy into a 1/1 "Broken Bot".

### **5. Pasiphae (Pilot)**
*Theme: Evasion, movement, tempo.*
*   **Tier 1 (Ace):** 2 Cost | 3/2 | **Rush**.
*   **Tier 2 (Wingman):** 3 Cost | 4/3 | **Rush**. **OnPlay:** Return a friendly unit to hand (to heal/replay it).
*   **Tier 3 (Legend Pilot):** 4 Cost | 6/4 | **Rush**. **Windfury** (Attacks twice per turn).

### **6. Praxidike (Trickster)**
*Theme: Decoys, evasion.*
*   **Tier 1 (Decoy):** 2 Cost | 1/1 | **OnPlay:** Summon a 0/2 Hologram with Guard.
*   **Tier 2 (Illusionist):** 3 Cost | 2/2 | **OnPlay:** Summon two 0/2 Holograms with Guard.
*   **Tier 3 (Mastermind):** 4 Cost | 4/4 | **OnPlay:** Fill your board with 1/1 Holograms with Guard.

### **7. Sinope (Diplomat)**
*Theme: Pacifism, debuffs.*
*   **Tier 1 (Envoy):** 2 Cost | 1/4 | **OnPlay:** Give an enemy unit -2 ATK this turn.
*   **Tier 2 (Ambassador):** 3 Cost | 1/6 | **OnPlay:** Set an enemy unit's ATK to 0 this turn.
*   **Tier 3 (Peacemaker):** 5 Cost | 2/8 | **Passive:** Enemy units have -1 ATK.

### **8. Thebe (Ranger)**
*Theme: Sniping, high single-target damage.*
*   **Tier 1 (Scout):** 2 Cost | 2/2 | **Snipe** (Can bypass Guard).
*   **Tier 2 (Sniper):** 3 Cost | 4/2 | **Snipe**. **OnPlay:** Deal 2 damage to target.
*   **Tier 3 (Deadeye):** 4 Cost | 6/3 | **Snipe**. **Passive:** Double damage against undamaged targets.

---

# 6. **Enemy Roster**
### **Common Enemies**
1.  **Mining Drone:** 1 Cost | 1/2 | No text.
2.  **Security Bot:** 2 Cost | 2/3 | **Guard**.
3.  **Void Leech:** 2 Cost | 3/1 | **OnAttack:** Heal self for damage dealt.
4.  **Corrupted Uplink:** 3 Cost | 0/5 | **TurnEnd:** Summon a 1/1 Drone.
5.  **Heavy Loader:** 4 Cost | 4/6 | Slow attacker (attacks every other turn).

### **Bosses**
1.  **The Core Overseer (Automaton Boss):**
    *   HP: 60
    *   Ability: **Factory Reset:** Every 3 turns, summons two 2/3 Security Bots with Guard.
    *   Strategy: Swarms the board. Needs AoE or Sniping.
2.  **The Void Mother (Void-Born Boss):**
    *   HP: 50
    *   Ability: **Consume:** Destroys her own lowest HP minion to heal 10 HP.
    *   Strategy: Keeping her board clear prevents her from healing.

---

# 7. **Battle Mechanics (Detailed)**
## 7.1 Field Layout
*(Coordinate system: 0,0 is top-left)*
*   **Enemy Commander:** Top Center. Avatar + HP Bar.
*   **Enemy Board:** Row of 5 slots below Enemy Commander.
*   **Center Field:** Visual gap.
*   **Player Board:** Row of 5 slots.
*   **Player Hand:** Bottom Center. Cards fan out. Max 10 cards.
*   **Player Commander:** Bottom Left (or overlay). Avatar + HP Bar + Energy Crystals.
*   **Deck/Discard:** Bottom Right.
*   **End Turn Button:** Right side, vertically centered.

## 7.2 The Turn Sequence
1.  **Start Phase:**
    *   "Start of Turn" triggers fire.
    *   Player Energy refills to Max.
    *   Max Energy +1 (capped at 10).
    *   Draw 1 Card.
2.  **Action Phase (Player Control):**
    *   **Play Card:** Drag from hand to board (Unit) or target (Tactic). Check Energy cost.
    *   **Attack:** Drag from Friendly Unit -> Enemy Unit/Commander.
        *   Validation: Is target valid? (Guard check). Is attacker ready? (Summon sickness check).
        *   Execution: Deal damage to both (if enemy is Unit). Trigger "OnAttack"/"OnDamage".
3.  **End Phase:**
    *   Player clicks "End Turn".
    *   "End of Turn" triggers fire.
    *   Discard down to Max Hand Size (if implemented, default 7).
4.  **Enemy Turn:**
    *   AI executes moves.
    *   AI attacks.
    *   Pass turn back to Player.

## 7.3 Damage Formula
`FinalDamage = (BaseATK + Buffs) * Multipliers - FlatReduction`
*   **Shields** take priority over Health.

---

# 8. **Economy & Upgrades**
*   **Credits:**
    *   Win Battle: +50 Credits.
    *   Boss Win: +200 Credits.
    *   Use: Buying new cards (Shop).
*   **Tech Parts:**
    *   Win Battle: +1 Part.
    *   Elite Win: +3 Parts.
    *   Use: Upgrading Cards.
*   **Upgrade Costs:**
    *   Tier 1 -> Tier 2: 2 Tech Parts + 100 Credits.
    *   Tier 2 -> Tier 3: 5 Tech Parts + 300 Credits.

---

# 9. **UI/UX Design Specifications**
*   **Font:** 'Orbitron' or similar monospaced/tech font for headers. Sans-serif for readability.
*   **Colors:**
    *   Player: Cyan/Blue (#00FFFF).
    *   Enemy: Red/Orange (#FF4500).
    *   Neutral/System: Dark Slate (#1e293b).
    *   Highlights: Neon Green (#39FF14).
*   **Card Frame:**
    *   Top: Name + Energy Cost bubble.
    *   Center: Rectangular art crop.
    *   Bottom: Description box.
    *   Bottom Corners: ATK (Yellow sword icon), HP (Red heart icon).
    *   Border: Changes color based on Tier (Bronze, Silver, Gold/Holographic).

---

# 10. **Technical Implementation Details**
*   **State Management:** `Zustand` store.
*   **Persistence:** `localStorage.setItem('jovian_save', JSON.stringify(state))`. Save on every node completion.
*   **Routing:** Simple view switching (Menu -> Map -> Battle -> Reward).
*   **Asset Management:** Images stored in `/assets/cards/`. Dynamic loader based on Card ID.

## 10.1 Data Structures (JSON)
```typescript
type Card = {
  id: string;
  name: string;
  type: 'unit' | 'tactic';
  cost: number;
  tier: 1 | 2 | 3;
  stats?: { atk: number; hp: number; maxHp: number };
  text: string;
  mechanics: string[]; // ['guard', 'rush']
  img: string; // 'elara_original.png'
};

type GameState = {
  player: {
    hp: number;
    maxHp: number;
    energy: number;
    deck: Card[];
    hand: Card[];
    board: Unit[];
    graveyard: Card[];
    credits: number;
    parts: number;
  };
  enemy: {
    hp: number;
    deck: Card[];
    board: Unit[];
    intent: string; // Description of next move
  };
  run: {
    node: number;
    difficulty: number;
    seed: string;
  };
};
```

# 11. **Tactics System Design (Proposed)**
**Concept:** Single-use "Operation" cards representing command ship support.
**Mechanics:**
*   **Play:** Drag to target (Unit or Area).
*   **Resolution:** Effect applies immediately, card goes to Graveyard.
*   **Visuals:** Card dissolves/explodes at target location.

**Core Tactics:**
1.  **Orbital Strike (Damage):**
    *   T1: Deal 2 damage to a unit.
    *   T2: Deal 4 damage to a unit.
    *   T3: Deal 5 damage to a unit and 2 to adjacent.
2.  **Nano-Repair (Heal):**
    *   T1: Restore 3 Health to a unit.
    *   T2: Restore 5 Health. Draw 1.
    *   T3: Fully heal a unit and give it Shield.
3.  **EMP Blast (Control):**
    *   T1: Stun an enemy.
    *   T2: Stun an enemy and deal 1 damage.
    *   T3: Stun ALL enemies.
4.  **Supply Drop (Economy):**
    *   T1: Draw 2 cards.
    *   T2: Draw 3 cards.
    *   T3: Restore 2 Energy and Draw 3.

**Implementation:**
*   **Type:** `Card.type = 'tactic'`.
*   **Targeting:** Needs specific `targetType` in definition (e.g., `target: 'any_unit' | 'area'`).
*   **Handler:** `playTactic` function in store similar to `playUnit` but skips board placement.