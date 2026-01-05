# Mechanics Glossary

Complete reference for all card abilities and keywords in Jovian Cards.

---

## Triggers

These are conditions that cause a card's ability to activate.

### **OnPlay**
Activates when the card is played from hand.

### **OnAttack**
Activates when this unit declares an attack.

### **OnDamageTaken**
Activates when this unit takes damage from any source.

### **OnDeath**
Activates when this unit is destroyed and sent to the graveyard.

### **OnTurnEnd**
Activates at the end of your turn.

### **OnTurnStart**
Activates at the start of your turn.

### **OnDraw**
Activates when this card is drawn from your deck.

### **OnKill**
Activates when this unit kills an enemy unit (reduces enemy HP to 0 or below).

### **Passive**
An effect that is always active and typically affects other cards being played or on the board.

### **Constant**
A persistent keyword ability that is always active while the unit is on the board.

---

## Keywords

These are the specific abilities and effects found on cards.

### **Add Random Tactic**
**Effect:** Add a random Tactic card to your hand.

### **Assassinate**
**Effect:** If this unit deals damage to another unit, the target is destroyed instantly. Blocked by Shield.

### **Banish**
**Effect:** Return an enemy unit to its owner's hand.

### **Bio-Optimize**
**Effect:** An adaptive biological enhancement that varies by card.

### **Breach**
**Effect:** Remove all Shield from target unit.

### **Buff X/Y**
**Effect:** Give a target unit +X Attack and +Y Health.

### **Cost Reduction**
**Effect:** Reduce the energy cost of this card. Typically scales with board state (e.g., number of Megacorp units).

### **Damage X**
**Effect:** Deal X damage to a target.

### **Debuff X**
**Effect:** Reduce a target's Attack by X for a limited duration.

### **Decoy**
**Effect:** Summon a Hologram token with Guard. Stats vary by tier (0/3, 1/3, or 1/4 with Shield).

### **Disarm X**
**Effect:** Set a target's Attack to 0 for X turns. The value specifies duration.

### **Double Attack**
**Effect:** This unit can attack twice per turn.

### **Draw X**
**Effect:** Draw X cards from your deck. Can be conditional (e.g., "if you control a Cybernetic unit").

### **Encourage**
**Effect:** Give a friendly unit a permanent stat buff (e.g., +X/+Y).

### **Fade**
**Effect:** This card is removed from hand at end of turn. Currently used on Madness token.

### **Feast X**
**Effect:** When this unit kills another unit, permanently gain +X/+X. This stacks infinitely - each kill makes the unit stronger.

### **First Strike**
**Effect:** This unit deals its combat damage before the unit it is fighting. If the defending unit is destroyed, it does not deal counter-attack damage.

### **Gain Energy X**
**Effect:** Add X temporary energy for the current turn.

### **Guard**
**Effect:** Enemy units must attack units with Guard before other targets without Guard. Bypassed by Snipe.

### **Hack X**
**Effect:** Reduce a target's Attack by X for two turns.

### **Heal X**
**Effect:** Restore X Health to a target Biological unit.

### **Lifesteal**
**Effect:** When this unit deals damage, your commander is healed for the same amount.

### **Loot X**
**Effect:** When this unit kills another unit, draw X cards. (Note: Loot triggers during combat resolution, not via the standard OnKill trigger system.)

### **Mind Control X**
**Effect:** Take control of an enemy unit with Attack less than or equal to X.

### **Pollute**
**Effect:** A negative keyword associated with the Voidborn faction that spreads corruption or debuffs.

### **Rage X**
**Effect:** This unit permanently gains +X Attack whenever it attacks. Stacks infinitely.

### **Rally X**
**Effect:** Permanently increase a target unit's maximum Health and current Health by X. Does not stack - each unit can only be rallied once.

### **Recycle X**
**Effect:** When this unit dies, gain X energy.

### **Redeploy**
**Effect:** Return a friendly unit to your hand. Can trigger OnPlay (return another unit) or OnKill (return this unit).

### **Regenerate X**
**Effect:** At the end of your turn, this unit heals for X Health.

### **Repair X**
**Effect:** Restore X Health to target Cybernetic unit. Targets damaged allies when used with random_ally targeting.

### **Rush**
**Effect:** This unit can attack on the turn it is played.

### **Sacrifice**
**Effect:** Destroy a friendly unit to trigger an effect. Typically combined with damage equal to sacrificed unit's attack.

### **Scout X**
**Effect:** Look at X random cards from opponent's hand.

### **Shield**
**Effect:** Prevents the first instance of damage this unit would take each turn. Shield regenerates at the start of your next turn.

### **Silence**
**Effect:** Remove all card text and abilities from a target unit. Its stats remain unchanged.

### **Slow**
**Effect:** This unit can only attack every other turn.

### **Snipe**
**Effect:** This unit can ignore the Guard keyword and attack any valid target.

### **Spark X**
**Effect:** Deal X psychic damage to target. Functions identically to Damage but with distinct visual effects.

### **Stun X**
**Effect:** A target unit cannot attack for X turns.

### **Summon**
**Effect:** Create one or more token units on your side of the board.

### **Thorns X**
**Effect:** When this unit is attacked, it deals X damage back to the attacker.

### **Support**
**Effect:** Buff allies. Functions as a variant of Buff with specific targeting conditions.

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
- **Weak:** Lasts 1 turn, attack restored when duration expires
- **Disarm:** Lasts for specified turns (value determines duration), attack restored when duration expires
- **Hack:** Lasts 2 turns, attack reduction restored when duration expires
- **Shield:** Prevents the first damage instance each turn, regenerates at start of your next turn
- **Buffs/Rally/Encourage:** Permanent stat increases
- **Fade:** Card removed from hand at end of turn

---

## Mechanic Interactions

### First Strike + Counter-attack
- Attacker with First Strike deals damage first
- If defender dies, no counter-attack
- If defender survives, they counter-attack normally

### Shield + Damage
- Shield prevents ALL damage from the first instance each turn
- Shield regenerates at the start of your next turn
- Only the first damage source each turn is blocked

### Assassinate + Shield
- If Shield blocks the damage → Assassinate doesn't trigger
- If damage is dealt (Shield already used this turn) → Target dies instantly

### Hack vs Disarm
- **Hack:** ATK reduced by value for 2 turns
- **Disarm:** ATK set to 0 for X turns (duration based on value)
- Both can coexist (separate status effects)

### Rally/Encourage Stacking
- Rally and Encourage each do NOT stack from multiple sources
- First application applies, subsequent ones are ignored
- Both are permanent buffs (don't expire)
- Tracked via unit status flags (rallied/encouraged)

### Feast + Regenerate Synergy
- Feast gains permanent stats when killing enemies
- Combined with Regenerate, creates a snowballing unit that grows stronger and self-heals
- No cap on Feast stacking - each kill increases stats permanently

### OnKill Trigger Order
1. Combat damage is dealt
2. Loot checks (if attacker has Loot and target dies)
3. OnKill mechanics resolve (Feast, Redeploy, etc.)
4. OnDamageTaken triggers
5. Dead units are removed (OnDeath triggers)

### Conditional Mechanics
- Some mechanics require conditions to activate (e.g., Draw if you control a Cybernetic unit)
- Conditions are checked when the mechanic would resolve
- If the condition isn't met, the mechanic doesn't activate and a notification is shown
- Examples: "subtype:Cybernetic", "faction:Megacorp"

---

