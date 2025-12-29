# How to Play Jovian Cards

## Objective

Reduce your opponent's **HP to 0** while defending your own Commander.

---

## Game Setup

### Starting Resources
- **HP:** 20 (both players)
- **Energy:** 1 (increases by +1 each turn, max 10)
- **Deck:** 20 cards (shuffled at start)
- **Starting Hand:** 5 cards
- **Board Slots:** 7 maximum per side

### Victory Condition
- Reduce enemy HP to 0
- OR opponent runs out of cards (deck fatigue)

---

## Turn Structure

### 1. **Turn Start**
- Energy refills to maximum and increases by 1 (up to max 10)
- Draw 1 card
- Units gain "ready" status (can attack this turn)
- "OnTurnStart" abilities trigger

### 2. **Action Phase** (Your Turn)
You can perform actions in any order:

#### Play Cards
- **Units:** Pay energy cost → Unit enters board
  - Cannot attack the turn they're played (unless they have **Rush**)
  - Trigger "onPlay" abilities

- **Tactics:** Pay energy cost → Effect resolves → Card discarded
  - One-time effects (damage, draw, buffs, etc.)

#### Attack with Units
- Select a ready unit → Choose target
- **Valid Targets:**
  - Enemy units
  - Enemy commander (if no **Guard** units block)
- **Guard Rule:** If enemy has Guard units, you must attack them first (unless attacker has **Snipe**)
- Combat resolves (see Combat section)

### 3. **End Turn**
- Click "End Turn" button
- "OnTurnEnd" abilities trigger
- Status effects countdown (stun, weak, etc.)
- Turn passes to enemy

### 4. **Enemy Turn**
- AI takes their turn automatically
- Watch for enemy plays and attacks
- Turn returns to you

---

## Combat System

### Attack Resolution

**When a unit attacks:**

1. **Attacker deals damage** to target equal to its ATK
2. **Defender counter-attacks** (if alive and not stunned)
   - Exception: Attacker has **First Strike** → defender dies → no counter-attack
3. **Special effects resolve:**
   - **Thorns:** Defender deals fixed damage to attacker
   - **Lifesteal:** Attacker heals for damage dealt
   - **Shield:** Absorbs first instance of damage (consumed)
   - **Assassinate:** If damage > 0, target dies instantly
4. **OnAttack** and **OnDamageTaken** abilities trigger
5. **OnDeath** abilities trigger if units die

### Key Mechanics
- **First Strike:** Attack before opponent can counter-attack. If defender dies, no counter-attack.
- **Double Attack:** Unit can attack twice per turn
- **Counter-attack:** Units retaliate when attacked (unless stunned or killed by first strike)
- **Thorns:** Passive damage to attackers

---

## Card Types

### Units
- Stay on the battlefield
- Have ATK (attack) and HP (health)
- Can attack each turn after being played
- Trigger abilities based on conditions

**Example:**
```
Kore - 2 Energy
Confederate Unit (Common)
1 ATK / 2 HP
"OnPlay: Scout 1 (draw 1 card)"
```

### Tactics
- One-time effects
- Resolve immediately and go to graveyard
- Cannot attack or block

**Example:**
```
Nano Repair - 1 Energy
Confederate Tactic (Common)
"Heal target unit 3 HP"
```

---

## Resources & Zones

### Energy
- Starts at 1, increases by 1 each turn (max 10)
- Used to play cards
- Fully refills at start of your turn
- Some cards reduce costs or generate extra energy

### HP (Hit Points)
- Commander HP: Starts at 20
- Unit HP: Varies per card
- Game ends when HP reaches 0

### Zones
- **Deck:** Undrawn cards (shuffled)
- **Hand:** Cards you can play (max 10)
  - If hand is full when drawing, excess cards go to graveyard
- **Board:** Active units (max 7 per side)
- **Graveyard:** Discarded/destroyed cards
  - When deck is empty, graveyard shuffles back into deck

---

## Status Effects

### Buffs (Positive)
- **Shield:** Absorbs next damage instance (consumed)
- **Regenerate:** Heal X HP at end of turn
- **Rally:** +X max HP and current HP (permanent)

### Debuffs (Negative)
- **Stun:** Cannot attack for X turns
- **Weak:** ATK reduced for X turns (restored after)
- **Hack:** ATK reduced by X for 2 turns
- **Disarm:** ATK set to 0 for 1 turn
- **Silence:** Remove all abilities from unit

### Special Keywords
- **Guard:** Enemies must attack this unit first
- **Rush:** Can attack the turn it's played
- **Snipe:** Ignore Guard units when attacking
- **Lifesteal:** Heal for damage dealt
- **Thorns X:** Deal X damage to attackers
- **First Strike:** Attack before counter-attack
- **Double Attack:** Attack twice per turn
- **Slow:** Can only attack every other turn

---

## Deck Building (Between Battles)

### Workshop
- Build and save custom decks
- Deck must contain exactly 20 cards
- View your collection and available cards

### Market
- Purchase card packs with credits
- Unlock new cards for your collection

### Hangar
- Customize card cosmetics (alternate art)
- Unlock cosmetics with platinum

---

## Progression

### Currencies
- **Credits (₡):** Buy card packs, common purchases
- **Platinum:** Unlock cosmetics, premium items
- **Mossan:** Special currency (future use)

### Unlocking Cards
- Open packs to add cards to collection
- Cards have rarities: Common, Uncommon, Rare, Legendary
- Collection persists between battles

---

## Strategy Tips

1. **Mana Curve:** Include a mix of low, medium, and high-cost cards
2. **Synergy:** Build decks around themes (psychic sisters, swarm tactics, etc.)
3. **Guard Units:** Protect your valuable units and commander
4. **Card Draw:** Scout and other draw effects keep your hand full
5. **Removal:** Tactics that destroy/debuff enemy threats are valuable
6. **Board Control:** Don't overextend - losing all units leaves you vulnerable

---

## Interface Guide

### Main Screen
- **HP Bars:** Your HP (bottom) vs Enemy HP (top)
- **Energy:** Current/Max displayed at bottom
- **Hand:** Your cards at bottom (drag to play or click to select)
- **Board:** Units displayed in center
  - Blue outline = Your units
  - Red outline = Enemy units
  - Green highlight = Can attack
- **Graveyard/Deck:** Click to view contents

### Combat Indicators
- **Green glow:** Unit can attack
- **Red targeting:** Click enemy to attack
- **Yellow card:** Targeting mode active (select target for tactic)

### Notifications
- Ability triggers show in top-right
- Damage numbers appear on units
- Animation lines show attacks and effects

---

## Keyboard Shortcuts

- **End Turn:** Spacebar or "End Turn" button
- **Inspect Card:** Right-click or hover
- **Dev Panel:** Press `D` (development mode only)

---

## FAQ

**Q: Can I attack on the turn I play a unit?**
A: No, unless the unit has **Rush**.

**Q: What happens if my hand is full?**
A: Excess cards go to graveyard. You'll see a notification.

**Q: How does First Strike work?**
A: You attack first. If defender dies, they don't counter-attack.

**Q: Can I target my own units?**
A: Some abilities allow this (e.g., heal, buff). Others only target enemies.

**Q: What happens when my deck is empty?**
A: Your graveyard shuffles back into your deck automatically.

**Q: Can Guard units be ignored?**
A: Only by units with **Snipe** ability.

---

**Ready to play? Launch the game and select your deck!**
