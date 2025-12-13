# The Void-Born (Faction Design)

**Theme:** Cosmic Horror, Biological Corruption, Attrition, Deck Pollution.
**Origin:** They are not aliens in the traditional sense, but entities bleeding into reality from "That-between-gravity" (see `LORE.md`). They are attracted to strong psychic resonances—specifically the Jovian Sisters.
**Visuals:** Shifting flesh, eyes where there shouldn't be eyes, non-Euclidean geometry, purples/blacks/sickly greens.

---

# 1. Core Mechanics

### **1.1 Pollution (Madness)**
The Void-Born do not just attack your body; they attack your mind and your logistics.
*   **Mechanic:** **Pollute X.** (Add X "Madness" cards to the player's Discard Pile).
*   **The Token Card:**
    *   **Name:** Madness
    *   **Type:** Tactic (Status)
    *   **Cost:** Unplayable.
    *   **Effect:** **OnDraw:** Deal 2 Damage to your Commander. **Fade** (Removes itself from hand at end of turn).
    *   **Goal:** Dilute the player's deck. As the fight drags on, the player draws fewer useful cards and takes increasing chip damage.

### **1.2 Evolution (Mutation)**
The Void-Born adapt to trauma.
*   **Mechanic:** **Evolve.** (When this unit survives damage / kills a unit / etc., it transforms into a stronger version).
*   *Implementation Note: For MVP, we might stick to simple "OnDamage: Gain +2 ATK" style effects before full transformation logic.*

---

# 2. Unit Roster

| Unit Name | Tier | Stats | Traits | Ability | Lore Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Voidling** | 1 | 1/1 | **Rush** | *Swarm.* | Small, scuttling horrors. Dangerous in packs. |
| **Whispering Polyp** | 1 | 0/4 | - | **TurnEnd:** Pollute 1. | Stationary, fleshy growths that chant maddening verses. |
| **Gazing Horror** | 1 | 2/6 | **Guard** | **Thorns 1** (Deal 1 dmg to attacker). | A mass of eyes and teeth acting as a shield. |
| **Void Leech** | 1 | 3/2 | **Lifesteal** | - | Feeds on vital energy to sustain the hive. |
| **Reality Tear** | 2 | 4/3 | - | **Deathrattle:** Summon two 1/1 Voidlings. | A living rift in space-time that spills lesser horrors when closed. |
| **Mind Flayer** | 2 | 3/5 | - | **OnAttack:** Pollute 1. | A hunter that targets the sanity of its prey. |
| **Abyssal Titan** | 3 | 8/8 | **Trample** | - | A massive siege-beast of flesh and bone. |

*(Note: "Trample" deals excess damage to the Commander. Future mechanic.)*

---

# 3. Boss: The Void Mother
*The source of the infestation. A massive, immobile hive-queen.*

**Stats:** 60 HP.
**Passive:** **Regenerator** (Heals 2 HP at start of turn).

### **Behavior Pattern (Loop)**
1.  **Gestation:** Summon a **Whispering Polyp**. Pollute 1.
2.  **Swarm:** Fill empty board slots with **Voidlings** (1/1 Rush).
3.  **Consumption:** Destroy ALL friendly Voidlings. Deal 3 damage to Player for each consumed.

**Strategy:**
*   The Player **MUST** clear the Voidlings on Turn 2/3.
*   If the player ignores the board to rush the boss, the "Consumption" turn will likely one-shot them (5 Voidlings = 15 Damage).
*   The Polyp ensures that the longer the fight goes, the more Madness clogs the player's deck.

---

# 4. Integration with Lore
*   **"That-between-gravity":** The Void-Born are the manifestation of the whispers heard by Europa and Metis.
*   **Psychic Attraction:** They hunt the Jovians specifically. The "Signal" mentioned in the Game Plan is likely a psychic beacon inadvertently lit by Jupiter's research or one of the sisters.
*   **Humanity's Response:** The Republic and Corps are terrified of these things (the "Cosmic Horror" element). Ira Corp might even be trying to capture/weaponize them (similar to the Aliens franchise), while the Jovians are the only ones equipped to fight them due to their psychic resistance/abilities.

---

# 5. Technical Needs
1.  **Card Definition:** Add `Madness` token.
2.  **Mechanic `pollute`:** Logic to insert card into discard.
3.  **Mechanic `thorns`:** Logic in combat resolution.
4.  **Mechanic `onDraw`:** Logic in `drawCard` store action.
5.  **Boss AI:** Scripted sequence for Void Mother.
