# Mechanics Glossary

Complete reference for all card abilities and keywords in Jovian Cards.

---

## Keyword Abilities (Constant)

These abilities are always active while the unit is on the board.

### **Guard**
**Effect:** Enemies must attack this unit before other targets (unless attacker has Snipe).
**Example:** Himalia - "Guard. 0/7 wall protector"

### **Rush**
**Effect:** Unit can attack the turn it's played (ignores summoning sickness).
**Example:** Ganymede - "Rush. 3/1 aggressive brawler"

### **Snipe**
**Effect:** Can attack any target, ignoring Guard units.
**Example:** Taygete - "Snipe. Bypass enemy frontline"

### **Lifesteal**
**Effect:** Heal your commander for damage dealt by this unit.
**Example:** Void Leech - "Lifesteal. Drain enemy life"

### **Thorns X**
**Effect:** Deal X damage to any unit that attacks this.
**Example:** Gazing Horror - "Thorns 1. Guard."

### **Regenerate X**
**Effect:** Heal X HP at the end of your turn.
**Example:** Metis - "Regenerate 2. Self-healing psychic"

### **Shield**
**Effect:** Absorbs the next instance of damage (consumed when used).
**Example:** Energy Barrier - "Give unit Shield"

### **First Strike**
**Effect:** Deals damage before opponent counter-attacks. If opponent dies, no counter-attack.
**Example:** Amalthea - "First Strike. 4/3 duelist"

### **Double Attack**
**Effect:** This unit can attack twice per turn.
**Example:** Lysithea - "Double Attack. Strike twice"

### **Slow**
**Effect:** Can only attack every other turn.
**Example:** Heavy Mech - "Slow. Powerful but ponderous"

---

## OnPlay Triggers

These abilities activate when the card is played.

### **Damage X**
**Effect:** Deal X damage to target.
**Targeting:** Varies (enemy unit, all enemies, random enemy, etc.)
**Example:** Power Shot - "Deal 5 damage to target enemy"

### **Heal X**
**Effect:** Restore X HP to target.
**Example:** Nano Repair - "Heal target unit 3 HP"

### **Buff X/Y**
**Effect:** Give target unit +X ATK and +Y HP.
**Example:** Reinforce - "Give unit +2/+2"

### **Debuff X**
**Effect:** Reduce target's ATK by X temporarily.
**Example:** Tactical Hack - "Reduce enemy ATK by 2"

### **Stun X**
**Effect:** Target cannot attack for X turns.
**Example:** EMP Burst - "Stun enemy unit for 1 turn"

### **Summon X**
**Effect:** Create X token units on your board.
**Example:** Reality Tear - "OnDeath: Summon 2 Voidlings"

### **Scout X**
**Effect:** Draw X cards.
**Example:** Kore - "OnPlay: Scout 1 (draw 1)"

### **Draw X**
**Effect:** Same as Scout - draw X cards.
**Example:** Europa - "OnPlay: Draw 1"

### **Gain Energy X**
**Effect:** Add X energy this turn (doesn't increase max).
**Example:** Thebe - "OnPlay: Gain Energy 1"

### **Silence**
**Effect:** Remove all abilities from target unit (stats remain).
**Example:** Disruptor - "Silence target enemy"

### **Banish**
**Effect:** Remove target from the game (doesn't go to graveyard).
**Example:** Void Exile - "Banish target unit"

### **Mind Control X**
**Effect:** Take control of enemy unit with ATK ≤ X.
**Example:** Europa - "Mind Control enemy with ATK ≤ 3"

### **Hack X**
**Effect:** Reduce target's ATK by X for 2 turns.
**Example:** Corp Uplink - "Hack: Reduce ATK by 1"

### **Disarm**
**Effect:** Set target's ATK to 0 for 1 turn.
**Example:** Security Protocol - "Disarm enemy unit"

### **Add Random Tactic**
**Effect:** Add a random tactic card to your hand.
**Example:** Sinope - "OnPlay: Add random tactic"

---

## OnAttack Triggers

Activate when this unit attacks.

### **OnAttack: Damage X**
**Effect:** Deal extra damage when attacking.
**Example:** Callisto - "OnAttack: Deal 1 damage to random enemy"

### **OnAttack: Pollute X**
**Effect:** Add corruption/debuff when attacking (enemy mechanic).
**Example:** Mind Flayer - "OnAttack: Pollute 1"

---

## OnDamageTaken Triggers

Activate when this unit takes damage.

### **OnDamageTaken: Heal**
**Effect:** Heal when damaged.
**Example:** Metis - "OnDamageTaken: Heal 1 HP"

### **OnDamageTaken: Buff Self**
**Effect:** Get stronger when hit.
**Example:** Callisto - "OnDamageTaken: +1/+0 permanently"

---

## OnDeath Triggers

Activate when this unit dies.

### **OnDeath: Summon**
**Effect:** Spawn units when destroyed.
**Example:** Reality Tear - "OnDeath: Summon 2 Voidlings"

### **OnDeath: Damage**
**Effect:** Deal damage to enemies when dying.
**Example:** Volatile Drone - "OnDeath: Deal 2 damage to all enemies"

### **OnDeath: Heal**
**Effect:** Heal allies when destroyed.
**Example:** Medic Unit - "OnDeath: Heal all allies 1 HP"

---

## OnTurnEnd Triggers

Activate at the end of your turn.

### **OnTurnEnd: Damage**
**Effect:** Deal damage at end of turn.
**Example:** Delayed Bomb - "OnTurnEnd: Deal 1 damage to enemy"

### **OnTurnEnd: Pollute**
**Effect:** Apply corruption at turn end (enemy mechanic).
**Example:** Whispering Polyp - "OnTurnEnd: Pollute 1"

---

## OnTurnStart Triggers

Activate at the start of your turn.

### **OnTurnStart: Buff Allies**
**Effect:** Buff friendly units each turn.
**Example:** Commander Aura - "OnTurnStart: All allies +1/+0"

---

## OnDraw Triggers

Activate when this card is drawn.

### **OnDraw: Gain Energy**
**Effect:** Add energy when drawn.
**Example:** Energy Cache - "OnDraw: Gain 1 energy"

### **OnDraw: Scout**
**Effect:** Draw another card when drawn.
**Example:** Chain Scout - "OnDraw: Scout 1"

---

## Passive Triggers

Always active, affect other cards.

### **Passive: Buff Faction**
**Effect:** Give permanent buff to units of specific faction when they're played.
**Format:** `faction:FactionName`
**Example:** Europa - "Passive: Confederate units gain +1/+1 when played"

### **Passive: Cost Reduction**
**Effect:** Reduce cost of specific cards.
**Example:** Europa - "Confederate units cost 1 less"

---

## Special Mechanics

### **Sacrifice**
**Effect:** Destroy a friendly unit to gain a benefit.
**Targeting:** `target_ally`
**Example:** Liquidate Assets - "Destroy ally, deal its ATK to random enemy"

### **Rally X**
**Effect:** Permanently increase target's max HP and current HP by X.
**Note:** Only applies once per unit (doesn't stack).
**Example:** Battle Cry - "Rally: +2 max HP"

### **Loot X**
**Effect:** Draw X cards when this unit kills an enemy.
**Example:** Scavenger - "Loot 1: Draw when killing enemy"

### **Recycle X**
**Effect:** Gain X energy when this unit dies.
**Example:** Efficient Drone - "Recycle 1: Gain 1 energy on death"

### **Assassinate**
**Effect:** If this deals damage, target dies instantly.
**Note:** Blocked by Shield.
**Example:** Elite Sniper - "Assassinate: Kill damaged targets"

### **Breach X**
**Effect:** Deal X damage to enemy commander directly.
**Example:** Artillery - "Breach 3: 3 damage to enemy commander"

### **Rage X**
**Effect:** Gain +X ATK permanently when damaged.
**Example:** Berserker - "Rage 1: +1 ATK when hit"

### **Encourage**
**Effect:** Give ally permanent stat buffs.
**Example:** Rally Cry - "Encourage ally: +1/+1"

### **Fade X**
**Effect:** Unit is destroyed after X turns.
**Example:** Temporal Echo - "Fade 2: Dies after 2 turns"

### **Bio-Optimize**
**Effect:** Adaptive biological enhancement (varies by card).
**Example:** Evolution - "Bio-Optimize: Adapt to threats"

### **Spark**
**Effect:** Special psychic ability (varies by card).
**Example:** Psychic Burst - "Spark: Deal random damage"

### **Decoy**
**Effect:** Redirect attacks or create illusions.
**Example:** Hologram - "Decoy: Confuse enemies"

### **Pollute** (Enemy Mechanic)
**Effect:** Corruption that spreads or debuffs (Voidborn mechanic).
**Example:** Void Corruption - "Pollute spreads to adjacent units"

---

## Targeting Types

These determine what a mechanic can target:

- **target_enemy** - Select one enemy unit
- **target_ally** - Select one friendly unit
- **target_unit** - Select any unit (yours or enemy)
- **random_enemy** - Random enemy unit
- **all_enemies** - All enemy units
- **all_allies** - All friendly units
- **enemy_commander** - Enemy HP directly
- **self** - The unit itself

---

## Status Effect Durations

- **Stun:** Lasts for specified turns, decreases at end of turn
- **Weak/Hack/Disarm:** Temporary ATK reduction, restored when duration expires
- **Shield:** Lasts until consumed by damage
- **Buffs:** Usually permanent unless stated otherwise
- **Fade:** Countdown, unit dies when reaches 0

---

## Mechanic Interactions

### First Strike + Counter-attack
- Attacker with First Strike deals damage first
- If defender dies, no counter-attack
- If defender survives, they counter-attack normally

### Shield + Damage
- Shield absorbs ALL damage from one source
- Shield is consumed even if it prevents more damage than was dealt
- Multiple instances of damage consume multiple shields

### Assassinate + Shield
- Shield blocks damage → Assassinate doesn't trigger
- If damage is dealt → Target dies instantly

### Hack vs Disarm
- **Hack:** ATK reduced by value for 2 turns
- **Disarm:** ATK set to 0 for 1 turn
- Both can coexist (separate status effects)

### Rally Stacking
- Rally does NOT stack from multiple sources
- First Rally applies, subsequent ones are ignored
- Permanent buff (doesn't expire)

---

## Tips

- **Guard** is essential for protecting valuable units
- **Rush** enables aggressive tempo plays
- **Lifesteal** helps you stabilize against aggressive decks
- **First Strike** is excellent on high-ATK units
- **Scout** effects thin your deck and find answers
- **Summon** on death creates value trades
- **Stun** can delay dangerous threats for a turn

---

**For more details, see [GAMEPLAY.md](GAMEPLAY.md)**
