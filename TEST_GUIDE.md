# Jovian Cards - Mechanics & Triggers Test Guide

**Version:** 5.0 - CONSOLIDATED
**Last Updated:** 2025-12-23
**Focus:** Deduplicated, organized by trigger type, with failed test analysis

---

## Testing Legend

- **[P]** Passed - Test completed successfully
- **[F]** Failed - Test completed but behavior incorrect
- **[?]** Unclear - Test completed but needs clarification
- **[!]** Critical - Retest after recent fix
- **[NA]** Not Applicable - Feature not implemented yet

---

## Phase 1 Fixes - COMPLETE

- ✅ bio_optimize: Now implemented
- ✅ scout: Now supports multiple cards
- ✅ regenerate: Fixed stale board reference
- ✅ onDamageTaken: Now triggers before death
- ✅ Corp Slaver T3: Text updated to match behavior
- ✅ spark + stun targeting: Fixed - random mechanics ignore targetUid
- ✅ Ability notifications: Implemented - message feed in bottom-left corner

---

## Phase 2 Fixes - COMPLETE

- ✅ loot: Draw cards when killing units
- ✅ first_strike: Attack before counter-attack
- ✅ assassinate: Instakill damaged units
- ✅ recycle: Gain energy on death
- ✅ passive: Ongoing buffs to newly played units
- ✅ slow: Attack every other turn
- ✅ double_attack (Fury): Now works correctly

---

## Phase 3 Fixes - COMPLETE

- ✅ Thebe: Replaced Ambush with Loot 1 (all tiers)
- ✅ R0-VR: Renamed to "R0-VR" with "Iteration One/Two/Three" titles
- ✅ Director Vance: Fixed confusing textbox (now says "Played Megacorp units")
- ✅ First Strike: Updated tooltip to "When attacking..."
- ✅ Token cards (Drone/Thug): Fixed image loading fallback
- ✅ Encourage: Now gives +ATK only (not +HP), targets random ally (T1/T2), all allies (T3)
- ✅ Rally tooltip: Updated to "Give target +X HP permanently. Each unit can only be rallied once."
- ✅ Bio-optimize: No longer forces targeting on empty board
- ✅ Elara T3: Changed to onPlay with targeting (was onTurnStart with random)
- ✅ Breach: Now targets attacked unit correctly (Carpo)
- ✅ Slow: Fixed timing - can attack turn 2, 4, 6 (was 3, 5, 7)
- ✅ Solarin Control: Energy can exceed max (e.g., 5/4 energy)
- ✅ Amalthea T3: Regenerate now has 'self' target
- ✅ Stun onAttack: No longer prompts for target on play
- ✅ Better logging: Failed abilities now log reason to console

---

## 1. Trigger Type Tests

### 1.1 onPlay Triggers

**Damage/Control:**
- [P] **Metis T3** - Destroy target enemy (100 damage)
- [P] **Lysithea (all tiers)** - Hack enemy
- [P] **Europa T1/T2/T3** - Stun all enemies
- [P] **Cyllene T3 "The Analyst"** - Spark 3 random, Stun target
- [P] **Disarm** (Sinope, Corp Slaver) - Set ATK to 0 for turn
- [P] **Silence** (Forced Arbitration) - Remove all abilities
- [ ] **Mind Control** (Corp Slaver, Hostile Takeover) - Steal enemy unit (threshold check)

**Buffs/Summons:**
- [!] **Elara T1** - Bio-Optimize target ally +1/+1 (FIXED: No longer forces targeting on empty board)
- [!] **Elara T2** - Bio-Optimize target ally +2/+2
- [!] **Elara T3** - Bio-Optimize target ally +1/+1 (FIXED: Changed to onPlay with targeting)
- [P] **Sinope T3 "The Seducer"** - Disarm 3, Scout 2
- [P] **Decoy** (Praxidike) - Summon Hologram with Guard
- [ ] **Support** (Reinforce) - Give target +1/+1
- [P] **Io T1/T2/T3** - Summon Drone

**Movement/Generation:**
- [ ] **Bounce** (Scramble) - Return unit to hand
- [ ] **Swap** (Pasiphae) - Return hero to hand
- [ ] **Add Random Tactic** (Leda) - Add Tactic to hand

**Card Advantage:**
- [P] **Kore T1** - Scout 1
- [P] **R0-VR T1** - Scout 2 (conditional on Megacorp)
- [P] **R0-VR T2/T3** - Scout X (where X = Megacorp units)

---

### 1.2 onDeath Triggers

- [P] **Mining Drone T3 "Explosive Miner"** (Megacorp Token) - Deal 1 damage to random enemy
- [NA] **Reality Tear T2** (Voidborn) - Summon 2 Voidlings - Not testing Void yet

**Expected Behavior:**
- onDeath triggers fire when unit dies
- Chained deaths resolve (max 20 iterations)

---

### 1.3 onTurnStart Triggers

**Draw:**
- [P] **Elara T1 "Researcher"** - Draw 1
- [P] **Elara T2 "Geneticist"** - Draw 1
- [P] **Elara T3 "The Biologist"** - Draw 2
- [P] **Europa T3 "The Mind Ocean"** - Draw 1

**Summons:**
- [P] **Io T3 "The Storm"** - Summon Drone

**Scout:**
- [P] **Kore T2 "Informant"** - Scout 1
- [P] **Kore T3 "The Maiden"** - Scout 2

**Energy:**
- [P] **Solarin Control (all tiers)** - Gain Energy 

**Debuffs:**
- [P] **Hacking Uplink (all tiers)** - Hack enemy

**Expected Behavior:**
- Triggers fire AFTER unit refresh (ready = true)
- Ability notifications appear in bottom-left feed

**UI REQUEST:** Show enemy hand size so we can verify Scout X behavior

---

### 1.4 onTurnEnd Triggers

**Healing/Repair:**
- [P] **Europa T1 "The Ice Sheet"** - Heal random ally 2
- [P] **Europa T3 "The Mind Ocean"** - Heal all allies 3
- [ ] **Repair** (Solarin Control) - Heal 1 Cybernetic ally

**Rally (Permanent +HP, once per unit):**
- [P] **Pasiphae T3 "The Ace"** - Rally random ally +1 HP
- [P] **Corp Guard T3 "Site Warden"** - Rally all allies
- ✅ **Rally tooltip FIXED** - Now says "Permanent +HP, once per unit"

**Encourage (Permanent +ATK only, once per unit):**
- [!] **Corp Manager T1 "Supervisor"** - Encourage 1 random ally +1 ATK (FIXED: Now ATK only, targets ONE random ally)
- [!] **Corp Manager T2 "Manager"** - Encourage 1 random ally +2 ATK (or +3 with 3+ Megacorp) (FIXED: Now ATK only, targets ONE random ally)
- [!] **Corp Manager T3 "Executive"** - Encourage all allies +X ATK, Rally all allies +X HP (FIXED: Now ATK only for encourage)

**Regenerate/Special:**
- [P] **Enforcer Lee T1/T2/T3** - Regenerate 2 HP
- [P] **Thebe T3** - Regenerate 2 HP
- [!] **Amalthea T3** - Regenerate 1 HP (FIXED: Added 'self' target)
- [ ] **Fade** (Madness) - Card removed from hand at end of turn

**Expected Behavior:**
- Triggers fire BEFORE status decay
- Stun/Weak decrement AFTER triggers resolve

---

### 1.5 onAttack Triggers

**Rage (Gain +ATK permanently):**
- [P] **Ganymede T2 "Brawler"** - Rage +1 ATK
- [P] **Ganymede T3 "The Berserker"** - Rage +1 ATK
- [P] **Callisto T3 "The Underboss"** - Rage +1 ATK
- [P] **Enforcer Lee T1/T2/T3** - Rage +1 ATK
- [P] **Taygete T2 "Huntress"** - Rage +1 ATK

**Breach (Remove shield before damage):**
- [!] **Carpo T2 "Engineer"** - Breach (FIXED: Now targets attacked unit correctly)
- [!] **Carpo T3 "The Mechanic"** - Breach (FIXED: Now targets attacked unit correctly)

**Stun:**
- [!] **Security Bot T3** - Stun target (FIXED: No longer prompts for target on play)
- [!] **The Auditor T1/T2** - Stun target (FIXED: No longer prompts for target on play)

**Pollute:**
- [NA] **Mind Flayer T2** (Voidborn) - Pollute 1 - Not testing Void yet

**Expected Behavior:**
- Rage permanently increases ATK (visible on card)
- Breach should remove Shield BEFORE damage is dealt

---

### 1.6 onDamageTaken Triggers

**Cards to Test:**
- [P] **Metis T2 "Cyber Analyst"** - Spark 3 when damaged (works but animation too fast)
- [P] **Metis T3 "The Hacker"** - Spark 3 when damaged
- [P] **Praxidike T3 "The Trickster"** - Spawn 1/4 Hologram when damaged

**Expected Behavior:**
- ✅ Should trigger from ALL damage sources (combat, spells, abilities)
- ✅ Should trigger EVEN IF UNIT DIES from the damage (FIXED)
- Should NOT trigger if Shield blocks damage (0 damage taken)
- Metis can Spark back when killed
- Praxidike spawns Hologram even if she dies

**ANIMATION REQUEST:** Show Spark yellow line for 0.5 seconds before resolving

---

### 1.7 onDraw Triggers

- [ ] **Damage** (Madness) - Deal 2 damage to commander on draw

---

### 1.8 Constant/Passive Keywords

**Rush - Can attack immediately:**
- [P] **Ganymede (all tiers)**
- [P] **R0-VR (all tiers)**
- [P] **Pasiphae T1/T2**
- [P] **Taygete (all tiers)**
- [P] **Corp Hound (all tiers)**

**Guard - Must be attacked first:**
- [P] **Corp Guard (all tiers)**
- [P] **Hologram Token** (summoned by Praxidike, Decoy tactic)

**Snipe - Ignores Guard:**
- [P] **Thebe (all tiers)**
- [P] **The Auditor (all tiers)**

**Shield - Blocks first damage instance:**
- [P] **R0-VR T1/T2/T3**
- [P] **Director Vance T1/T2/T3**
- [P] **Unit 734 T3**
- [P] **Hologram Token** (has Shield when spawned by Praxidike T3)

**Thorns X - Damages attacker:**
- [NA] **Gazing Horror T1** (Voidborn) - Thorns 1 - Not testing Void yet

**Lifesteal - Heals commander for damage dealt:**
- [NA] **Void Leech T1** (Voidborn) - Not testing Void yet

**Double Attack - Can attack twice per turn:**
- [P] **Taygete T2/T3**
- [P] **Corp Hound T3**
- [P] **R0-VR T3**
- [P] **Enforcer Lee T3**

**First Strike - Attacks without counter-attack if target dies:**
- [P] **Corp Liquidator T3 "Black Ops Agent"**
  - Attack 3/3 unit with Corp Liquidator (3 ATK), takes 0 damage back - PASS

**Slow - Can only attack every other turn:**
- [P] **Corp Loader (all tiers)** (FIXED: Now attacks on turn 2, 4, 6 correctly) 

**Loot - Draw cards when killing enemies:**
- [P] **Thebe (all tiers)** - Loot 1 (NEWLY CHANGED - retest)
- [P] **Corp Liquidator T2/T3** - Loot 1

**Cost Reduction - Scaling cost:**
- [P] **Corp Technician T2/T3**
- [P] **Solarin Control T3**

---

## 2. Complex Interaction Tests

### 2.1 Passive Buffs (Director Vance)

**Test Results:**
- [P] **Director Vance T1** - Passive: Played Megacorp units +1/+1
  - Play Vance, then Megacorp unit → Unit gets +1/+1 ✓
  - Play Megacorp unit, then Vance → Already-played unit NOT buffed ✓
  - Buff persists after Vance dies ✓

- [P] **Director Vance T2** - Passive: +1/+1, Recycle 1
  - Same as T1 + Recycle energy gain on death

- [P] **Director Vance T3** - Passive: Played Megacorp units +2/+2, Recycle 2
  - Corp Guard (2/3) → Should be 4/5 when played with Vance on board
  - Kill Vance T3 → Gain 2 energy

**Expected Behavior:**
- Passive only affects Megacorp units (faction filter)
- Buff is permanent (doesn't disappear when Vance dies)
- Buff only applies to units played AFTER Vance is on board
- Multiple Vances stack (T1 + T1 = +2/+2)

---

### 2.2 Megacorp Synergy Scaling

**Cards that scale with Megacorp unit count:**
- [P] **Corp Technician T2/T3** - Cost reduction
- [P] **Corp Manager T2** - Encourage threshold (3+ Megacorp = bonus) (FIXED: Now gives +ATK only to ONE random ally)
- [P] **Corp Manager T3** - Encourage X (X = other Megacorp units) (FIXED: Now gives +ATK only, targets all allies correctly)
- [P] **Corp Guard T3** - Rally scales
- [P] **Solarin Control T2/T3** - Energy gain scales (FIXED: Energy can now exceed max)
- [P] **R0-VR T2/T3** - Scout X cards

**Expected Behavior:**
- Count includes both board + card itself where appropriate
- Verify "other Megacorp" excludes the source unit

---

### 2.3 Multi-Mechanic Sequential Resolution

**Test cards with 2+ onPlay mechanics trigger in sequence:**
- [P] **Cyllene T3** - Spark (random), THEN Stun (targeted) - Both work independently
- [P] **Sinope T3** - Disarm (random), THEN Scout 2 cards - Both work
- [P] **Corp Slaver T3** - Disarm, THEN Mind Control - Text updated to reflect sequence

**Expected Behavior:**
- Each mechanic resolves independently
- Targeted mechanics prompt for target separately
- Random mechanics don't require user input

---

### 2.4 Chained Reactions

**Scenarios to Test:**
- [ ] Unit dies → onDeath triggers → causes another death → that onDeath triggers
- [ ] Damage causes onDamageTaken → onDamageTaken deals damage → triggers again
- [P] Rally on ally → that ally already has rally → both stack correctly - Rally does not stack, which is correct
- [ ] Verify no infinite loops (max 20 death iterations)

---

### 2.5 Board State Edge Cases

- [P] **Full board (5/5 units):** Cannot play more units
- [P] **Full board:** Summon mechanics fail gracefully
- [P] **Full board:** Mind control fails if target board full - ensure the log explains that the ability failed and why
- [P] **Empty board:** Random target mechanics handle gracefully (especially bio_optimize)
- [P] **Last unit dies:** Board clears correctly

Ensure when an ability fails, the log explains why
---

### 2.6 Shield Interactions

- [P] Shield blocks first damage instance
- [P] Shield removed after blocking
- [P] **Breach removes shield BEFORE damage**
- [ ] Shield does NOT trigger onDamageTaken (0 damage taken)
- [NA] Multiple shields stack correctly (if implemented)

---

## 3. Specific Card Test Checklists

### Corp Liquidator T3 (Loot + First Strike + Snipe)
- [P] **Loot 1:** Kill an enemy → Draw 1 card (verify hand +1)
- [P] **First Strike:** Attack 3/3 enemy → Enemy dies, Liquidator takes 0 counter damage
- [P] **Snipe:** Can bypass guards
- Expected: All 3 mechanics work together

---

### The Auditor T3 (Assassinate + Snipe + Stun)
- [P] **Assassinate:** Attack 10/10 enemy → Enemy dies instantly
- [P] Attack 1/1 enemy → Enemy dies instantly
- [P] Enemy has Shield → Shield blocks, no assassinate
- [P] Snipe + Assassinate → Can bypass guard and instakill

---

### Thebe (Loot + Snipe + Regenerate)
- [P] **Thebe T1** (6/3) - Snipe, Loot 1
  - Kill enemy unit → Draw 1 card
  - Can bypass guards with Snipe
- [P] **Thebe T2** (7/4) - Snipe, Loot 1
- [P] **Thebe T3** (7/7) - Snipe, Loot 1, Regenerate 2
  - Turn End: Regenerate 2 HP

---

### Corp Loader T3 (Slow + Guard)
- [P] **Play Corp Loader** (FIXED: Can now attack on turn 2, 4, 6 as expected)
- [P] Turn 1 (played): Can't attack
- [P] Turn 2: Can attack (FIXED)
- [P] Turn 3: Can't attack
- [P] Turn 4: Can attack
- Guard works normally (enemies must target)
- Stun overrides slow (stunned = can't attack even on even turns)

---



**End of Consolidated Test Guide - Version 5.0**
