import type { Card } from '../types';
import { m } from './cardUtils';

/**
 * Confederate Faction Cards (Consolidated - Rarity-Based)
 *
 * The Outer Confederacy - A loose alliance of independent settlements including
 * the Jovian Sisters as key members and allies.
 *
 * Card Count: 24 unique cards
 * - Common: 7 cards
 * - Uncommon: 7 cards
 * - Rare: 7 cards
 * - Legendary: 3 cards
 */

export const CONFEDERATE_CARDS: Card[] = [
  // ==================== COMMON CARDS (7) ====================

  // CALLISTO MILITIA - Common
  {
    id: 'callisto_militia',
    name: 'Callisto Militia',
    type: 'unit',
    rarity: 'Common',
    cost: 1,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'OnPlay: Scout 1 (Reveal 1 random card from opponent\'s hand).',
    faction: 'Confederate',
    baseAsset: 'callisto_militia',
    lore: "Local defense forces from the moon Callisto. Every settlement in the Outer System trains its own militia, and Callisto's are among the best-drilled. Quick to mobilize and experts at scouting enemy positions, they form the first line of defense against Corporate incursions.",
    cosmetics: [
      { id: 'callisto_militia_alt1', name: 'Alt Appearance 1', asset: 'callisto_militia_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'callisto_militia_alt2', name: 'Alt Appearance 2', asset: 'callisto_militia_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('scout', 'onPlay', 1, 'random_enemy')]
  },

  // AMALTHEA - Common
  {
    id: 'amalthea',
    name: 'Amalthea',
    title: 'The Soldier',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: '',
    faction: 'Confederate',
    baseAsset: 'amalthea',
    lore: "A proud recruit of the new Confederate Forces, eager to protect the only home she's known. She might lack the raw strength of some sisters, but her heart is unmatched. A veteran of a dozen skirmishes against pirates and Corporate mercs, her boosted reflexes and rapid healing have made her a legend on the front lines, the first in and the last out of every engagement. Now the embarrassed mascot of the Confederacy, The Soldier is a symbol of hope for a free Outer System who fights for her sisters and her nation with a loyalty that cannot be broken.",
    cosmetics: [
      { id: 'amalthea_alt1', name: 'Alt Appearance 1', asset: 'amalthea_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'amalthea_alt2', name: 'Alt Appearance 2', asset: 'amalthea_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: []
  },

  // BELT PROSPECTOR - Common
  {
    id: 'belt_prospector',
    name: 'Belt Prospector',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Recycle 1 (When this dies, gain 1 energy).',
    faction: 'Confederate',
    baseAsset: 'belt_prospector',
    lore: "Asteroid miners who strike it rich... or die trying. Their salvage fuels the Confederacy's war machine. Every prospector carries a beacon—when they fall, their gear gets recycled into the next generation's equipment. In the Belt, nothing goes to waste.",
    cosmetics: [
      { id: 'belt_prospector_alt1', name: 'Alt Appearance 1', asset: 'belt_prospector_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'belt_prospector_alt2', name: 'Alt Appearance 2', asset: 'belt_prospector_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('recycle', 'onDeath', 1, 'self')]
  },

  // LYSITHEA - Common
  {
    id: 'lysithea',
    name: 'Lysithea',
    title: 'The Hacker',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 },
    subtype: 'Psionic',
    text: 'OnPlay: Hack 1 (Reduce random enemy ATK by 1 for 2 turns).',
    faction: 'Confederate',
    baseAsset: 'lysithea',
    lore: "A chaotic psychic whose very presence causes sensors to glitch and screens to flicker, she is still learning to control the static that hums in her brain. By channeling her disruption through a neural jack, she became a \"White Hat\" for the free states, able to bypass Corporate firewalls by simply existing near the server racks. Now, the static has become a scalpel, and the digital world is her playground, with very few places safe from her.",
    cosmetics: [
      { id: 'lysithea_alt1', name: 'Alt Appearance 1', asset: 'lysithea_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'lysithea_alt2', name: 'Alt Appearance 2', asset: 'lysithea_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('hack', 'onPlay', 1, 'random_enemy')]
  },

  // JURY-RIGGED BOT - Common
  {
    id: 'jury_rigged_bot',
    name: 'Jury-Rigged Bot',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 },
    subtype: 'Cybernetic',
    text: 'Turn End: Regenerate 1 (Heal this unit for 1 HP).',
    faction: 'Confederate',
    baseAsset: 'jury_rigged_bot',
    lore: "Cobbled together from scrap metal and surplus parts. Held together with duct tape, solder, and prayers to whatever god watches over machines. It breaks down constantly, but its self-repair protocols—jury-rigged from stolen Corporate code—keep it functional just long enough to matter.",
    cosmetics: [
      { id: 'jury_rigged_bot_alt1', name: 'Alt Appearance 1', asset: 'jury_rigged_bot_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'jury_rigged_bot_alt2', name: 'Alt Appearance 2', asset: 'jury_rigged_bot_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('regenerate', 'onTurnEnd', 1, 'self')]
  },

  // CONFEDERATE MECHANIC - Common
  {
    id: 'confederate_mechanic',
    name: 'Confederate Mechanic',
    type: 'unit',
    rarity: 'Common',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: 'Turn End: Repair 1 (Restore 1 HP to a random damaged Cybernetic ally).',
    faction: 'Confederate',
    baseAsset: 'confederate_mechanic',
    lore: "\"Not one step closer to our home.\" Volunteers who signed up to protect their families when the Corporations came knocking. They're not professional soldiers, but they know every inch of their station, every access tunnel, every hiding spot. The mechanics keep the defenses running, repairing battle damage between skirmishes.",
    cosmetics: [
      { id: 'confederate_mechanic_alt1', name: 'Alt Appearance 1', asset: 'confederate_mechanic_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'confederate_mechanic_alt2', name: 'Alt Appearance 2', asset: 'confederate_mechanic_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('repair', 'onTurnEnd', 1, 'random_ally')]
  },

  // SCRAPYARD SCAVENGER - Common
  {
    id: 'scrapyard_scavenger',
    name: 'Scrapyard Scavenger',
    type: 'unit',
    rarity: 'Common',
    cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 },
    subtype: 'Biological',
    text: 'OnPlay: Draw 1 if you control a Cybernetic unit.',
    faction: 'Confederate',
    baseAsset: 'scrapyard_scavenger',
    lore: "Salvagers who pick through Corporate battlefields for tech to repurpose. They're experts at identifying valuable components among the wreckage. A good scavenger can turn yesterday's debris into tomorrow's advantage—as long as they can dodge the automated cleanup drones.",
    cosmetics: [
      { id: 'scrapyard_scavenger_alt1', name: 'Alt Appearance 1', asset: 'scrapyard_scavenger_alt1', unlockCost: { currency: 'platinum', amount: 50 } },
      { id: 'scrapyard_scavenger_alt2', name: 'Alt Appearance 2', asset: 'scrapyard_scavenger_alt2', unlockCost: { currency: 'platinum', amount: 50 } }
    ],
    mechanics: [m('draw', 'onPlay', 1, 'self', 'subtype:Cybernetic')]
  },

  // ==================== UNCOMMON CARDS (7) ====================

  // ENCELADUS SHOCKTROOP - Uncommon
  {
    id: 'enceladus_shocktroop',
    name: 'Enceladus Shocktroop',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Rush.',
    faction: 'Confederate',
    baseAsset: 'enceladus_shocktroop',
    lore: "Pirates turned freedom fighters. Veterans of a hundred raids against Corporate convoys, they know how to hit fast and disappear into the ice fields of Enceladus. When the Confederacy called, they answered—but they kept their preferred tactics: strike hard, strike fast, and be gone before the enemy knows what hit them.",
    cosmetics: [
      { id: 'enceladus_shocktroop_alt1', name: 'Alt Appearance 1', asset: 'enceladus_shocktroop_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'enceladus_shocktroop_alt2', name: 'Alt Appearance 2', asset: 'enceladus_shocktroop_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('rush', 'constant')]
  },

  // SINOPE - Uncommon
  {
    id: 'sinope',
    name: 'Sinope',
    title: 'The Seducer',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'OnPlay: Disarm 2 (Set random enemy ATK to 0 for 2 turns).',
    faction: 'Confederate',
    baseAsset: 'sinope',
    lore: "Praxi's \"evil twin,\" Sinope used her charm as a weapon from a young age. She is a manipulator who knows exactly which buttons to press to get what she wants. She has refined her art, draining the bank accounts of powerful men before they even realize they've been played, her ability to read people making her a dangerous ghost in high-end clubs. With a bounty in a dozen settlements, Sinope is a legend of the underground who knows where every body is buried—she put some there herself.",
    cosmetics: [
      { id: 'sinope_alt1', name: 'Alt Appearance 1', asset: 'sinope_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'sinope_alt2', name: 'Alt Appearance 2', asset: 'sinope_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },

  // MADWOMAN - Uncommon
  {
    id: 'madwoman',
    name: 'Madwoman',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Psionic',
    text: 'OnPlay: Spark 2 (Deal 2 psychic damage to random enemy). Turn End: Regenerate 2.',
    faction: 'Confederate',
    baseAsset: 'madwoman',
    lore: "Minor psychics awakened by exposure to the Jovian Sisters. Unstable, unpredictable, and incredibly dangerous. The Whispers drove her mad, but they also made her powerful. She hears voices from the void and answers with raw psychic fury. The Confederacy doesn't control her—they just point her at the enemy and get out of the way.",
    cosmetics: [
      { id: 'madwoman_alt1', name: 'Alt Appearance 1', asset: 'madwoman_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'madwoman_alt2', name: 'Alt Appearance 2', asset: 'madwoman_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [
      m('spark', 'onPlay', 2, 'random_enemy'),
      m('regenerate', 'onTurnEnd', 2, 'self')
    ]
  },

  // TITAN BREACHER - Uncommon
  {
    id: 'titan_breacher',
    name: 'Titan Breacher',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 4, hp: 3, maxHp: 3 },
    subtype: 'Cybernetic',
    text: 'First Strike. Breach (When attacking, remove Shield from target before dealing damage).',
    faction: 'Confederate',
    baseAsset: 'titan_breacher',
    lore: "Assault mechs designed to crack Corporate defensive lines. Armed with electromagnetic pulse weapons that short out shields and heavy armor plating to survive the counterattack. They're the first through the breach, the tip of the spear that opens the way for everyone else. Once a Breacher locks on, there's nowhere to hide.",
    cosmetics: [
      { id: 'titan_breacher_alt1', name: 'Alt Appearance 1', asset: 'titan_breacher_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'titan_breacher_alt2', name: 'Alt Appearance 2', asset: 'titan_breacher_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [
      m('first_strike', 'constant'),
      m('breach', 'onAttack', 1, 'target_enemy')
    ]
  },

  // CALLISTO - Uncommon
  {
    id: 'callisto',
    name: 'Callisto',
    title: 'The Gang Queen',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 1, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'OnPlay: Summon a 1/1 Thug.',
    faction: 'Confederate',
    baseAsset: 'callisto',
    lore: "Always the troublesome one, she took to the streets of Encephalus when the family couldn't hold her, a skilled brawler who learned the hard way that life is a fight. Now a gang leader, she manages one of the largest crime rings in the Outer System, keeping the corporate-backed syndicates out, but only for a price. As the Gang Queen of the moon sectors, she sneers at the law but protects her own with a hidden soft spot, a stand-offish ruler who keeps her sisters close.",
    cosmetics: [
      { id: 'callisto_alt1', name: 'Alt Appearance 1', asset: 'callisto_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'callisto_alt2', name: 'Alt Appearance 2', asset: 'callisto_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_thug')]
  },

  // CONFEDERATE MEDIC - Uncommon
  {
    id: 'confederate_medic',
    name: 'Confederate Medic',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 3,
    stats: { atk: 1, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Turn End: Heal 2 (random damaged ally).',
    faction: 'Confederate',
    baseAsset: 'confederate_medic',
    lore: "Field doctors who patch up soldiers between skirmishes. Overworked, underpaid, and running on recycled stims, they're the reason the Confederacy's forces can keep fighting despite being outnumbered. Every medic carries gene-tailored nanites that can stabilize even the worst injuries—at least long enough to get back to a proper clinic.",
    cosmetics: [
      { id: 'confederate_medic_alt1', name: 'Alt Appearance 1', asset: 'confederate_medic_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'confederate_medic_alt2', name: 'Alt Appearance 2', asset: 'confederate_medic_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('heal', 'onTurnEnd', 2, 'random_ally')]
  },

  // TITAN SMUGGLER - Uncommon
  {
    id: 'titan_smuggler',
    name: 'Titan Smuggler',
    type: 'unit',
    rarity: 'Uncommon',
    cost: 4,
    stats: { atk: 3, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'OnPlay: Add Random Tactic to hand.',
    faction: 'Confederate',
    baseAsset: 'titan_smuggler',
    lore: "Smugglers who run blockades to deliver \"goods\" to the Outer System. They know every back route through the asteroid fields, every customs official who can be bribed, and every trick in the book. They always have something useful up their sleeve—whether it's black market weapons, stolen intel, or just a clever escape plan.",
    cosmetics: [
      { id: 'titan_smuggler_alt1', name: 'Alt Appearance 1', asset: 'titan_smuggler_alt1', unlockCost: { currency: 'platinum', amount: 100 } },
      { id: 'titan_smuggler_alt2', name: 'Alt Appearance 2', asset: 'titan_smuggler_alt2', unlockCost: { currency: 'platinum', amount: 100 } }
    ],
    mechanics: [m('add_random_tactic', 'onPlay', 1, 'self')]
  },

  // ==================== RARE CARDS (7) ====================

  // STATION COMMANDER - Rare
  {
    id: 'station_commander',
    name: 'Station Commander',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 3, hp: 5, maxHp: 5 },
    subtype: 'Biological',
    text: 'OnPlay: Rally 2 (Permanently increase target ally\'s max HP and current HP by 2). Guard.',
    faction: 'Confederate',
    baseAsset: 'station_commander',
    lore: "Veteran station defense coordinators who've held the line against impossible odds. They know how to inspire their troops, fortify positions, and make every bullet count. When a Commander takes the field, morale surges—and the enemy learns what it means to fight soldiers who are defending their home.",
    cosmetics: [
      { id: 'station_commander_alt1', name: 'Alt Appearance 1', asset: 'station_commander_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'station_commander_alt2', name: 'Alt Appearance 2', asset: 'station_commander_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rally', 'onPlay', 2, 'target_ally'),
      m('guard', 'constant')
    ]
  },

  // IO - Rare
  {
    id: 'io',
    name: 'Io',
    title: 'The Drone Master',
    type: 'unit',
    rarity: 'Rare',
    cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 },
    subtype: 'Cybernetic',
    text: 'OnPlay: Summon Combat Drone. Turn End: Regenerate 1.',
    faction: 'Confederate',
    baseAsset: 'io',
    lore: "A university dropout who prefers the hum of a soldering iron to the drone of a lecture, Io spends his nights in cluttered workshops, building drones that the Republic would call \"illegal\". His mods are legendary among the outer moon racers and scavengers, as he has a super-human knack for mechanical parts, seeing the \"soul\" in the machines he operates. Now a master, Io commands a swarm of customized drones with the grace of a conductor and can strip an enemy mech to its frame in seconds without ever touching a wrench.",
    cosmetics: [
      { id: 'io_alt1', name: 'Alt Appearance 1', asset: 'io_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'io_alt2', name: 'Alt Appearance 2', asset: 'io_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('summon', 'onPlay', 1, 'self', 'neutral_drone_2'),
      m('regenerate', 'onTurnEnd', 1, 'self')
    ]
  },

  // PASIPHAE - Rare
  {
    id: 'pasiphae',
    name: 'Pasiphae',
    title: 'The Ace',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 4, hp: 3, maxHp: 3 },
    subtype: 'Biological',
    text: 'Rush. OnPlay: Redeploy (Return a friendly unit to hand).',
    faction: 'Confederate',
    baseAsset: 'pasiphae',
    lore: "A shy nerd who found more comfort in virtual cockpits than in the real world, her giggly nature hides the fastest reflexes ever recorded in a simulator. She took her skills to the skies of the Confederacy, flying medical and evacuation mechs into the thick of combat where her gamer instincts make her an unpredictable and daring pilot. Now known as the Ace of the Outer System, she moves her mech with a grace that defies physics, treating every flight as a high-score run where the prize is the people's safety.",
    cosmetics: [
      { id: 'pasiphae_alt1', name: 'Alt Appearance 1', asset: 'pasiphae_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'pasiphae_alt2', name: 'Alt Appearance 2', asset: 'pasiphae_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('redeploy', 'onPlay', 1, 'target_ally')
    ]
  },

  // PRAXIDIKE - Rare
  {
    id: 'praxidike',
    name: 'Praxidike',
    title: 'The Trickster',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 3, hp: 2, maxHp: 2 },
    subtype: 'Cybernetic',
    text: 'OnPlay: Decoy (Summon 0/2 Hologram with Guard).',
    faction: 'Confederate',
    baseAsset: 'praxidike',
    lore: "The youngest Jovian is a storm in a tiny package, always looking for the next prank. Her cat ears twitch at the slightest hint of trouble—or an opportunity for mischief. Her mischief has evolved into complex illusions that play on the emotions of her targets, as she can read a person as easily as she can pick a pocket. A master trickster who defies the older sisters by never growing up, in battle she is a blurring phantom of decoys and misdirection, laughing as her enemies chase shadows.",
    cosmetics: [
      { id: 'praxidike_alt1', name: 'Alt Appearance 1', asset: 'praxidike_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'praxidike_alt2', name: 'Alt Appearance 2', asset: 'praxidike_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [m('decoy', 'onPlay', 1, 'self')]
  },

  // REBEL ENGINEER - Rare
  {
    id: 'rebel_engineer',
    name: 'Rebel Engineer',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 2, hp: 4, maxHp: 4 },
    subtype: 'Cybernetic',
    text: 'Turn End: Repair 2 (random Cybernetic ally). OnPlay: Summon Worker Drone (1/1 Cybernetic token).',
    faction: 'Confederate',
    baseAsset: 'rebel_engineer',
    lore: "Confederate techs who keep the ramshackle fleet operational through sheer ingenuity and spite. They can rebuild a reactor from salvage, hot-wire a weapons system, and deploy repair drones—all while under fire. The Corporations have better equipment, but the Engineers have something money can't buy: the will to make it work.",
    cosmetics: [
      { id: 'rebel_engineer_alt1', name: 'Alt Appearance 1', asset: 'rebel_engineer_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'rebel_engineer_alt2', name: 'Alt Appearance 2', asset: 'rebel_engineer_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('repair', 'onTurnEnd', 2, 'random_ally'),
      m('summon', 'onPlay', 1, 'self', 'neutral_drone')
    ]
  },

  // GUERRILLA FIGHTER - Rare
  {
    id: 'guerrilla_fighter',
    name: 'Guerrilla Fighter',
    type: 'unit',
    rarity: 'Rare',
    cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 },
    subtype: 'Biological',
    text: 'Rush. OnKill: Redeploy (Return this unit to your hand).',
    faction: 'Confederate',
    baseAsset: 'guerrilla_fighter',
    lore: "Hit-and-run specialists who strike hard and vanish into the Belt before reinforcements arrive. They move through the battlefield like ghosts, striking weak points and fading before the enemy can retaliate. Every guerrilla knows: you don't need to win every fight—you just need to make sure the enemy bleeds more than you do.",
    cosmetics: [
      { id: 'guerrilla_fighter_alt1', name: 'Alt Appearance 1', asset: 'guerrilla_fighter_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'guerrilla_fighter_alt2', name: 'Alt Appearance 2', asset: 'guerrilla_fighter_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('redeploy', 'onKill', 1, 'self')
    ]
  },

  // GANYMEDE - Rare
  {
    id: 'ganymede',
    name: 'Ganymede',
    title: 'The Pugilist',
    type: 'unit',
    rarity: 'Rare',
    cost: 4,
    stats: { atk: 4, hp: 4, maxHp: 4 },
    subtype: 'Biological',
    text: 'Rush. Rage 1 (Gain +1 ATK permanently when attacking).',
    faction: 'Confederate',
    baseAsset: 'ganymede',
    lore: "A brawler with a foul mouth and a love for the thrill of the fight, her muscles are genetically tuned to be stronger kg-for-kg than any human bodybuilder. A rising star in the Confederacy's illegal fighting pits, she treats every battle as a game, loving the sport of it, but her strength is a sobering reminder of her Jovian blood. Now known as The Pugilist, she is a slender whirlwind of superhuman power who can put a man in a mech suit on the floor with a single, well-placed strike.",
    cosmetics: [
      { id: 'ganymede_alt1', name: 'Alt Appearance 1', asset: 'ganymede_alt1', unlockCost: { currency: 'platinum', amount: 250 } },
      { id: 'ganymede_alt2', name: 'Alt Appearance 2', asset: 'ganymede_alt2', unlockCost: { currency: 'platinum', amount: 250 } }
    ],
    mechanics: [
      m('rush', 'constant'),
      m('rage', 'onAttack', 1, 'self')
    ]
  },

  // ==================== LEGENDARY CARDS (3) ====================

  // EUROPA - Legendary
  {
    id: 'europa',
    name: 'Europa',
    title: 'The Mind Ocean',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 4, hp: 7, maxHp: 7 },
    subtype: 'Psionic',
    text: 'OnPlay: Stun All Enemies. Constant: Your other Psionic units have +1/+1.',
    faction: 'Confederate',
    baseAsset: 'europa',
    lore: "The eldest sister, Europa uses her psychic gifts to bridge the gap between human fear and Jovian potential, carrying the weight of a dozen worlds on her shoulders while always listening to the Whispers. Diplomacy is often just another form of defense in the treacherous political waters of the Confederacy, and she ensures her family remains a step ahead of corporate interests while maintaining a motherly eye on her kin. When the Whispers grow too loud, Europa's consciousness expands to fill the void between worlds; to face her in this state is to drown in a psychic sea of infinite depth.",
    cosmetics: [
      { id: 'europa_alt1', name: 'Alt Appearance 1', asset: 'europa_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'europa_alt2', name: 'Alt Appearance 2', asset: 'europa_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('stun', 'onPlay', 1, 'all_enemies'),
      m('mind_ocean', 'passive', 1, 'all_allies', 'subtype:Psionic', 1)
    ]
  },

  // METIS - Legendary
  {
    id: 'metis',
    name: 'Metis',
    title: 'The Flare',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 6, hp: 6, maxHp: 6 },
    subtype: 'Psionic',
    text: 'OnPlay: Destroy target enemy. WhenAttacked: Spark 3 (attacker).',
    faction: 'Confederate',
    baseAsset: 'metis',
    lore: "Hunts for clues about the Whispers. Unlike Europa, mercy isn't in Metis' nature. A dangerous psychic with little restraint, she uses her power to obliterate her foes. When threatened, her psychic fury lashes out at anyone who dares attack her, making her a terrifying defensive threat.",
    cosmetics: [
      { id: 'metis_alt1', name: 'Alt Appearance 1', asset: 'metis_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'metis_alt2', name: 'Alt Appearance 2', asset: 'metis_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('assassinate', 'onPlay', 1, 'target_enemy'),
      m('spark', 'onDamageTaken', 3, 'random_enemy')
    ]
  },

  // THEBE - Legendary
  {
    id: 'thebe',
    name: 'Thebe',
    title: 'The Apex',
    type: 'unit',
    rarity: 'Legendary',
    cost: 6,
    stats: { atk: 6, hp: 6, maxHp: 6 },
    subtype: 'Biological',
    text: 'Snipe. Turn End: Regenerate 2. Feast 1 (When this kills an enemy, gain +1/+1 permanently).',
    faction: 'Confederate',
    baseAsset: 'thebe',
    lore: "The wildest of the sisters, Thebe is more comfortable in the fungal caves of Ceres than a city. She is a ranger of the untamed frontiers, a finder of things that don't want to be found. She has bio-hacked her own body to survive the harshest environments the system can offer, a stalker of the wastes who sees prey where others see only dust. Now the apex predator of the solar system, she has achieved a form of biological perfection, an ultimate tracker and a wild force that answers only to her family.",
    cosmetics: [
      { id: 'thebe_alt1', name: 'Alt Appearance 1', asset: 'thebe_alt1', unlockCost: { currency: 'platinum', amount: 500 } },
      { id: 'thebe_alt2', name: 'Alt Appearance 2', asset: 'thebe_alt2', unlockCost: { currency: 'platinum', amount: 500 } }
    ],
    mechanics: [
      m('snipe', 'constant'),
      m('feast_thebe', 'onKill', 1, 'self', undefined, 1),
      m('regenerate', 'onTurnEnd', 2, 'self')
    ]
  },
];
