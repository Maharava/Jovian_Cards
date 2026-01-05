# Rarity Power Budget System

A framework for balancing cards across rarity tiers to ensure Legendaries are **impactful and unique** without being overpowered.

---

## Philosophy

**Rarity ≠ Raw Power**

Instead, rarity represents:
- **Common:** Simple, straightforward effects
- **Uncommon:** 1-2 synergistic abilities
- **Rare:** Complex mechanics, skill-testing gameplay
- **Legendary:** Unique build-around effects that change how you play

---

## Power Budget Formula

Each card has a total "power budget" calculated from:
1. **Stat Efficiency** (ATK + HP) / Cost
2. **Keyword Points** (Each keyword/ability has a value)
3. **Trigger Count** (How many effects activate)

### Keyword Point Values

| Keyword | Points | Notes |
|---------|--------|-------|
| **Guard** | 0.5 | Basic defensive keyword |
| **Rush** | 1.0 | Immediate value |
| **First Strike** | 1.0 | Combat advantage |
| **Shield** | 2.0 | Powerful damage negation |
| **Snipe** | 1.0 | Bypasses Guard |
| **Slow** | -0.5 | Drawback |
| **Double Attack** | 2.5 | Rare, very strong |
| **Lifesteal** | 1.5 | Sustain |
| **Thorns X** | 0.5 per X | Reactive damage |
| **Regenerate X** | 1.0 per X | Sustain over time |
| **Rage X** | 1.0 per X | Scaling threat |
| **Assassinate** | 3.0 | Instant kill (blocked by Shield) |
| **Stun X** | 1.0 per turn | Control |
| **Hack X** | 0.75 per X | -ATK for 2 turns |
| **Disarm X** | 1.0 per turn | Sets ATK to 0 |
| **Draw X** | 2.0 per card | Card advantage |
| **Scout X** | 1.5 per card | Information |
| **Loot X** | 1.5 per card | Conditional draw |
| **Heal X** | 0.5 per X | Restore HP (Biological) |
| **Repair X** | 0.5 per X | Restore HP (Cybernetic) |
| **Buff X/Y** | 0.5 per point | Temporary stats |
| **Rally X** | 1.0 per X | Permanent +HP (no stack) |
| **Encourage X** | 1.0 per X | Permanent +ATK (no stack) |
| **Bio-Optimize X/Y** | 0.75 per point | Permanent buff |
| **Summon** | 2.0 | Creates board presence |
| **Redeploy** | 1.0 | Bounce ally |
| **Banish** | 1.5 | Bounce enemy |
| **Decoy** | 1.5 | Summon Guard token |
| **Spark X** | 0.5 per X | Direct damage |
| **Damage X** | 0.5 per X | Direct damage |
| **Mind Control X** | 4.0 | Steal enemy (ATK ≤ X) |
| **Silence** | 2.0 | Remove abilities |
| **Breach** | 1.0 | Remove Shield |
| **Recycle X** | 0.5 per X | Energy on death |
| **Pollute X** | 1.0 per X | Add Madness |
| **Gain Energy X** | 1.5 per X | Ramp |

### Stat Efficiency Targets

| Rarity | Max Stat Efficiency | Notes |
|--------|---------------------|-------|
| **Common** | 2.0 stats/cost | Vanilla units (no abilities) |
| **Uncommon** | 1.5 stats/cost | Budget for 1-2 abilities |
| **Rare** | 2.0 stats/cost | Premium stats + keywords |
| **Legendary** | 1.8 stats/cost | Unique effects over raw stats |

---

## Rarity Budget Caps

### **COMMON (Max 4 points)**

**Allowed:**
- 0-1 simple keyword (Guard, Rush)
- Max 1 trigger effect
- **Disallowed:** First Strike, Double Attack, Disarm, Bio-Optimize, Assassinate, Lifesteal, Mind Control, Silence

**Example:**
- **Free State Defender:** 2/4 Guard for 3 cost
  - Stats: 6/3 = 2.0 ✓
  - Keywords: Guard (0.5) = **0.5 points** ✓
  - **Total: 0.5 points** (Well under cap)

- **Lysithea:** 2/2 Hack 1 for 2 cost
  - Stats: 4/2 = 2.0 ✓
  - OnPlay: Hack 1 (0.75) = **0.75 points** ✓
  - **Total: 0.75 points** (Well under cap)

---

### **UNCOMMON (Max 6 points)**

**Allowed:**
- 0-2 keyword abilities
- Max 2 trigger effects
- Max value: 3 per effect
- **Disallowed:** Double Attack, Bio-Optimize, Assassinate, Mind Control

**Example:**
- **Callisto:** 1/2 Summon Thug for 3 cost
  - Stats: 3/3 = 1.0 ✓
  - OnPlay: Summon (2.0) = **2.0 points** ✓
  - **Total: 2.0 points** (Under cap)

- **Sinope:** 1/4 Disarm 2 for 2 cost
  - Stats: 5/2 = 2.5 (High efficiency but acceptable)
  - OnPlay: Disarm 2 (2.0) = **2.0 points** ✓
  - **Total: 2.0 points** (Under cap)

---

### **RARE (Max 10 points)**

**Allowed:**
- 1-2 keyword abilities
- Max 2 trigger effects
- Max value: 4 per effect
- **No restrictions** on mechanics

**Example:**
- **Ganymede:** 4/4 Rush + Rage 1 for 4 cost
  - Stats: 8/4 = 2.0 ✓
  - Rush (1.0) + Rage 1 (1.0) = **2.0 points** ✓
  - **Total: 2.0 points** (Well under cap)

- **Elara:** 2/3 Draw 2 + Bio-Optimize 2 for 4 cost
  - Stats: 5/4 = 1.25 ✓
  - OnPlay: Draw 2 (4.0) + Bio-Optimize 2 (1.5) = **5.5 points** ✓
  - **Total: 5.5 points** (Under cap)

- **R0-VR:** 4/2 Rush + Shield + Scout X for 3 cost
  - Stats: 6/3 = 2.0 ✓
  - Rush (1.0) + Shield (2.0) + Scout X (variable) = **~3.5 points** ✓
  - **Total: 3.5 points** (Under cap)

---

### **LEGENDARY (Max 12 points)**

**Allowed:**
- 2-3 keyword abilities OR 1 unique ability
- Max 3 trigger effects
- Max value: 5 per effect
- Should have **1 defining unique mechanic**

**Example (BALANCED):**
- **Metis:** 6/6 OnPlay: Assassinate + WhenAttacked: Spark 3 for 6 cost
  - Stats: 12/6 = 2.0 ✓
  - OnPlay: Assassinate (3.0) + WhenAttacked: Spark 3 (1.5) = **4.5 points** ✓
  - **Total: 4.5 points** (Well under cap, unique defensive threat)

- **Unit 736:** 6/6 OnPlay: 4 Damage AoE + Shield for 7 cost
  - Stats: 12/7 = 1.71 ✓
  - OnPlay: Damage 4 AoE (2.0) + Shield (2.0) = **4.0 points** ✓
  - **Total: 4.0 points** (Under cap)

**Example (OVERPOWERED):**
- **Europa (CURRENT):** 4/7 Stun All + Draw 1 + Heal 3 AoE for 6 cost
  - Stats: 11/6 = 1.83 ✓
  - OnPlay: Stun All (~4.0) + Turn Start: Draw 1 (2.0) + Turn End: Heal 3 AoE (1.5) = **7.5 points** ✓
  - **Total: 7.5 points** (Under cap BUT has 3 separate engines - too much utility)
  - **Fix:** Remove one ability (Draw or Heal)

- **Thebe (CURRENT):** 7/7 Snipe + Loot 1 + Regenerate 2 for 6 cost
  - Stats: 14/6 = 2.33 (TOO HIGH) ✗
  - Snipe (1.0) + Loot 1 (1.5) + Regenerate 2 (2.0) = **4.5 points** ✓
  - **Total: 4.5 points** (Keywords OK, but stats exceed budget)
  - **Fix:** Reduce to 6/6 OR remove Regenerate

---

## Design Guidelines

### **When to Add Drawbacks**

If a card exceeds its budget, add a drawback:
- **Slow** (-0.5 points) - Can only attack every other turn
- **Sacrifice** requirement - Destroy ally to trigger effect
- **Conditional** triggers - "If you control 3+ units"
- **Self-damage** - Deal X damage to self

**Example:**
- **Powerful Effect:** "OnPlay: Draw 3 cards"
  - Base cost: 3 × 2.0 = 6.0 points
  - Add: "Deal 3 damage to self" (-1.5)
  - Adjusted: 4.5 points (Rare-level)

---

### **When to Increase Cost**

If a card's abilities are too strong for its cost tier:
- Increase mana cost by 1-2
- OR reduce stats proportionally
- OR split effect across multiple cards

**Example:**
- **The Auditor (CURRENT):** 5/4 Snipe + Assassinate for 5 cost
  - Snipe (1.0) + Assassinate (3.0) = 4.0 points
  - Stats: 9/5 = 1.8 ✓
  - **Issue:** Unconditional removal too cheap
  - **Fix:** Increase cost to 6 OR condition Assassinate

---

## Testing Checklist

When designing a new card, verify:

1. ✅ **Stat Efficiency** within rarity target?
2. ✅ **Total Power Budget** under rarity cap?
3. ✅ **Keyword restrictions** respected (Common/Uncommon)?
4. ✅ **Trigger count** within limit (max 3 for Legendary)?
5. ✅ **Unique identity** clear (especially Legendaries)?
6. ✅ **Counterplay exists** (can opponent answer this)?
7. ✅ **Fits faction theme** (swarm vs quality, etc.)?

---

## Common Mistakes

### ❌ **Overloading Legendaries**
**Bad:** Europa with Stun + Draw + Heal (3 separate value engines)
**Good:** Metis with Assassinate + Spark 3 (1 offensive theme)

### ❌ **Vanilla Commons**
**Bad:** 3/4 for 3 with no text
**Good:** 2/4 Guard for 3 (simple but functional)

### ❌ **Stat Creep**
**Bad:** 7/7 Legendary for 6 (2.33 efficiency)
**Good:** 6/6 Legendary for 6 (2.0 efficiency)

### ❌ **Keyword Spam**
**Bad:** Rush + Snipe + Shield + Lifesteal on one card
**Good:** Rush + Shield (2 synergistic keywords)

---

## Conclusion

The Power Budget System ensures:
- **Commons** are simple and accessible
- **Uncommons** reward synergy
- **Rares** offer skill expression
- **Legendaries** enable unique strategies without being oppressive

When in doubt: **Less is more.** A focused, unique ability beats a pile of keywords.
