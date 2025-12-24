# Keyword Abilities

This document defines the active keywords and mechanics in **Jovian Cards**.

## Core Combat Keywords

*   **Guard:** Enemies must attack this unit before attacking non-Guard units or the Commander.
*   **Rush:** This unit can attack immediately on the turn it is played.
*   **Double Attack:** This unit can attack twice per turn.
*   **Snipe:** This unit ignores **Guard** when selecting an attack target.
*   **Slow:** This unit can only attack every other turn.
*   **Lifesteal:** Damage dealt by this unit heals your Commander.
*   **First Strike:** When attacking, this unit deals damage *before* the defender. If the target dies, the attacker takes 0 damage.
*   **Shield:** This unit ignores the first instance of damage it takes each turn.
*   **Thorns [X]:** When this unit is attacked, deal [X] damage to the attacker.
*   **Regenerate [X]:** Restores [X] HP to itself at the end of every turn.
*   **Stealth:** Unit cannot be targeted until it attacks or takes damage. (Note: Implementation pending, rarely used).

## Faction Mechanics (Jovian)

*   **Rage [X]:** When this unit attacks, it gains +[X] Attack *before* dealing damage.
*   **Rally [X]:** Grants +[X] HP and +[X] Max HP to a random ally (or all allies if specified) at the end of the turn.
*   **Heal [X]:** Restores [X] HP to a target or ally.
*   **Decoy:** Summons a 0/2 Hologram with Guard.
*   **Swap:** Switches position with another ally. often returning them to hand (Bounce).
*   **Spark [X]:** Deals [X] damage to a target.
*   **Hack [X]:** Reduces an enemy's Attack by [X] (Debuff).
*   **Disarm [X]:** Reduces an enemy's Attack by [X] immediately on play.
*   **Breach:** Removes **Shield** from a target permanently.
*   **Bio-Optimize [X]:** Grants +[X]/+[X] to a target unit (Buff).
*   **Scout [X]:** Look at [X] random cards from the enemy's hand.
*   **Mind Control:** Take control of an enemy unit.

## Faction Mechanics (Megacorp)

*   **Encourage [X]:** Grants +[X] Attack to a random ally at the end of the turn.
*   **Recycle [X]:** When an allied unit dies, draw [X] cards.
*   **Loot [X]:** When this unit kills an enemy unit or hero, draw [X] cards.
*   **Assassinate:** If this unit deals damage to a target while attacking, the target is destroyed.
*   **Repair [X]:** Restores [X] HP to a specific subtype (usually Mech/Cybernetic).
*   **Pollute [X]:** Adds 'Waste' or negative status cards to the enemy deck/hand.

## Status Effects

*   **Stun:** The unit cannot attack or use abilities for its next turn.
*   **Weak:** The unit has reduced Attack.
*   **Silenced:** All keywords, abilities, and buffs are removed.
