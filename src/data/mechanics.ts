export const MECHANICS_DEFINITIONS: Record<string, { title: string; desc: string; icon: string; color: string }> = {
  scout: {
    title: 'Scout',
    desc: 'Look at X random card(s) from opponent\'s hand.',
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
    desc: 'Set target enemy\'s attack to 0 until end of current turn.',
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
    desc: 'Deal X damage to a random enemy.',
    icon: '⚡',
    color: 'bg-yellow-400 text-black'
  },
  rally: {
    title: 'Rally',
    desc: 'Give target +X HP. Each unit can only be rallied once.',
    icon: '➕',
    color: 'bg-green-500 text-white'
  },
  encourage: {
    title: 'Encourage',
    desc: 'Give target +X Attack. Each unit can only be encouraged once.',
    icon: '📣',
    color: 'bg-amber-500 text-black'
  },
  stun: {
    title: 'Stun',
    desc: 'Target unit cannot attack until the end of their next turn.',
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
    desc: 'Enemies must attack this unit before others.',
    icon: '🛡️',
    color: 'bg-slate-300 text-black'
  },
  hack: {
    title: 'Hack',
    desc: 'Reduce random enemy Attack by X until the end of their next turn.',
    icon: '💻',
    color: 'bg-emerald-400 text-black'
  },
  rage: {
    title: 'Rage',
    desc: 'When you attack, gain +X Attack permanently.',
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
    desc: 'Give target +X/+X.',
    icon: '🌱', // New icon
    color: 'bg-lime-500 text-black' // New color
  },
  damage: {
    title: 'Damage',
    desc: 'Deal X damage to target.',
    icon: '💥',
    color: 'bg-red-500 text-white'
  },
  heal: {
    title: 'Heal',
    desc: 'Restore X HP to target.',
    icon: '❤️',
    color: 'bg-pink-400 text-white'
  },
  repair: {
    title: 'Repair',
    desc: 'Restore X HP to target cybernetic.',
    icon: '🔧',
    color: 'bg-slate-400 text-black'
  },
  regenerate: {
    title: 'Regenerate',
    desc: 'Restore X HP to self.',
    icon: '💚',
    color: 'bg-green-600 text-white'
  },
  summon: {
    title: 'Summon',
    desc: 'Summon X units.',
    icon: '✨',
    color: 'bg-purple-400 text-white'
  },
  snipe: {
    title: 'Snipe',
    desc: 'Can attack any enemy, ignoring Guard.',
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
    desc: 'Prevent the first instance of damage each turn.',
    icon: '🛡️',
    color: 'bg-blue-300 text-black'
  },
  thorns: {
    title: 'Thorns',
    desc: 'Deal X damage to attackers.',
    icon: '🌵',
    color: 'bg-green-700 text-white'
  },
  breach: {
    title: 'Breach',
    desc: 'Remove target\'s shield.',
    icon: '💢',
    color: 'bg-red-400 text-black'
  },
  silence: {
    title: 'Silence',
    desc: 'Remove all abilities from target.',
    icon: '🔇',
    color: 'bg-slate-500 text-white'
  },
  mind_control: {
    title: 'Mind Control',
    desc: 'Take control of enemy with ATK < X.',
    icon: '🧠',
    color: 'bg-purple-600 text-white'
  },
  recycle: {
    title: 'Recycle',
    desc: 'Gain X energy when this dies.',
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
    desc: 'When attacking, deals damage before taking damage in combat.',
    icon: '⚡',
    color: 'bg-yellow-600 text-white'
  },
  assassinate: {
    title: 'Assassinate',
    desc: 'Destroys any unit damaged by this unit.',
    icon: '💀',
    color: 'bg-slate-950 text-red-500'
  },
  loot: {
    title: 'Loot',
    desc: 'Draw X cards when this unit kills an enemy.',
    icon: '💰',
    color: 'bg-yellow-500 text-black'
  }
};
