export const MECHANICS_DEFINITIONS: Record<string, { title: string; desc: string; icon: string; color: string }> = {
  scout: {
    title: 'Scout',
    desc: 'Reveal X random cards from opponent\'s hand.',
    icon: '👁️',
    color: 'bg-indigo-400 text-white'
  },
  redeploy: {
    title: 'Redeploy',
    desc: 'Return a friendly unit to your hand.',
    icon: '↩️',
    color: 'bg-cyan-500 text-black'
  },
  banish: {
    title: 'Banish',
    desc: 'Return an enemy unit to its owner\'s hand.',
    icon: '🚫',
    color: 'bg-orange-500 text-black'
  },
  // Legacy support
  swap: {
    title: 'Redeploy',
    desc: 'Return a friendly unit to your hand.',
    icon: '↩️',
    color: 'bg-cyan-500 text-black'
  },
  bounce: {
    title: 'Banish',
    desc: 'Return an enemy unit to its owner\'s hand.',
    icon: '🚫',
    color: 'bg-orange-500 text-black'
  },
  disarm: {
    title: 'Disarm',
    desc: 'Set target\'s attack to 0 for X turns.',
    icon: '📉',
    color: 'bg-orange-500 text-black'
  },
  decoy: {
    title: 'Decoy',
    desc: 'Summon a Hologram token with Guard. Stats vary by variant.',
    icon: '🤖',
    color: 'bg-zinc-500 text-white'
  },
  spark: {
    title: 'Spark',
    desc: 'Deal X psychic damage to target.',
    icon: '⚡',
    color: 'bg-yellow-400 text-black'
  },
  rally: {
    title: 'Rally',
    desc: 'Permanently increase target\'s max HP and current HP by X. Does not stack.',
    icon: '➕',
    color: 'bg-green-500 text-white'
  },
  encourage: {
    title: 'Encourage',
    desc: 'Permanently increase target\'s ATK by X. Does not stack.',
    icon: '📣',
    color: 'bg-amber-500 text-black'
  },
  stun: {
    title: 'Stun',
    desc: 'Target unit cannot attack for X turns.',
    icon: '💫',
    color: 'bg-blue-400 text-black'
  },
  rush: {
    title: 'Rush',
    desc: 'Can attack immediately after being played.',
    icon: '⏩',
    color: 'bg-red-500 text-white'
  },
  guard: {
    title: 'Guard',
    desc: 'Enemies must attack units with Guard before other targets. Bypassed by Snipe.',
    icon: '🛡️',
    color: 'bg-slate-300 text-black'
  },
  hack: {
    title: 'Hack',
    desc: 'Reduce target\'s Attack by X for 2 turns.',
    icon: '💻',
    color: 'bg-emerald-400 text-black'
  },
  rage: {
    title: 'Rage',
    desc: 'Permanently gain +X Attack when attacking.',
    icon: '😡',
    color: 'bg-red-700 text-white'
  },
  pollute: {
    title: 'Pollute',
    desc: 'Shuffle X Madness cards into opponent\'s discard.',
    icon: '☣️',
    color: 'bg-purple-500 text-white'
  },
  draw: {
    title: 'Draw',
    desc: 'Draw X cards.',
    icon: '📇',
    color: 'bg-blue-500 text-white'
  },
  buff: {
    title: 'Buff',
    desc: 'Give target +X/+X.',
    icon: '⬆️',
    color: 'bg-green-400 text-black'
  },
  bio_optimize: {
    title: 'Bio-Optimize',
    desc: 'An adaptive biological enhancement. Give target +X/+X.',
    icon: '🌱',
    color: 'bg-lime-500 text-black'
  },
  damage: {
    title: 'Damage',
    desc: 'Deal X damage to target.',
    icon: '💥',
    color: 'bg-red-500 text-white'
  },
  heal: {
    title: 'Heal',
    desc: 'Restore X HP to target Biological unit.',
    icon: '❤️',
    color: 'bg-pink-400 text-white'
  },
  repair: {
    title: 'Repair',
    desc: 'Restore X HP to target Cybernetic unit.',
    icon: '🔧',
    color: 'bg-slate-400 text-black'
  },
  regenerate: {
    title: 'Regenerate',
    desc: 'At end of turn, heal this unit for X HP.',
    icon: '💚',
    color: 'bg-green-600 text-white'
  },
  summon: {
    title: 'Summon',
    desc: 'Create one or more token units on your side of the board.',
    icon: '✨',
    color: 'bg-purple-400 text-white'
  },
  snipe: {
    title: 'Snipe',
    desc: 'Can ignore Guard keyword and attack any valid target.',
    icon: '🎯',
    color: 'bg-yellow-600 text-white'
  },
  double_attack: {
    title: 'Double Attack',
    desc: 'Can attack twice per turn.',
    icon: '⚔️⚔️',
    color: 'bg-red-600 text-white'
  },
  lifesteal: {
    title: 'Lifesteal',
    desc: 'Heal your commander for damage dealt.',
    icon: '🩸',
    color: 'bg-red-800 text-white'
  },
  shield: {
    title: 'Shield',
    desc: 'Prevents the first instance of damage each turn. Regenerates at start of your next turn.',
    icon: '🛡️',
    color: 'bg-blue-300 text-black'
  },
  thorns: {
    title: 'Thorns',
    desc: 'When attacked, deal X damage back to the attacker.',
    icon: '🌵',
    color: 'bg-green-700 text-white'
  },
  breach: {
    title: 'Breach',
    desc: 'Remove all Shield from target unit.',
    icon: '💢',
    color: 'bg-red-400 text-black'
  },
  silence: {
    title: 'Silence',
    desc: 'Remove all card text and abilities from target. Stats remain unchanged.',
    icon: '🔇',
    color: 'bg-slate-500 text-white'
  },
  mind_control: {
    title: 'Mind Control',
    desc: 'Take control of enemy unit with ATK ≤ X.',
    icon: '🧠',
    color: 'bg-purple-600 text-white'
  },
  recycle: {
    title: 'Recycle',
    desc: 'When this unit dies, gain X energy.',
    icon: '♻️',
    color: 'bg-green-500 text-black'
  },
  slow: {
    title: 'Slow',
    desc: 'This unit can only attack every other turn.',
    icon: '🐢',
    color: 'bg-stone-500 text-white'
  },
  first_strike: {
    title: 'First Strike',
    desc: 'Deals combat damage before the unit it is fighting. If defender dies, no counter-attack.',
    icon: '⚡',
    color: 'bg-yellow-600 text-white'
  },
  assassinate: {
    title: 'Assassinate',
    desc: 'If this unit deals damage to another unit, target is destroyed instantly. Blocked by Shield.',
    icon: '💀',
    color: 'bg-slate-950 text-red-500'
  },
  loot: {
    title: 'Loot',
    desc: 'When this unit destroys another unit, draw X cards.',
    icon: '💰',
    color: 'bg-yellow-500 text-black'
  },
  feast: {
    title: 'Feast',
    desc: 'When this unit kills another unit, gain +X/+X permanently.',
    icon: '🍖',
    color: 'bg-red-600 text-white'
  },
  feast_thebe: {
    title: 'Apex Predator',
    desc: 'When Thebe kills an enemy, she permanently gains +1/+1. The apex predator grows stronger with each kill.',
    icon: '🦅',
    color: 'bg-amber-600 text-white'
  },
  mind_ocean: {
    title: 'Mind Ocean',
    desc: 'Europa\'s psychic presence empowers other Psionic units, granting them +1/+1.',
    icon: '🌊',
    color: 'bg-cyan-500 text-white'
  }
};
