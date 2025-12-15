export const MECHANICS_DEFINITIONS: Record<string, { title: string; desc: string; icon: string; color: string }> = {
  scout: {
    title: 'Scout',
    desc: 'Look at the top X card(s) of the opponents deck.',
    icon: '👁️',
    color: 'bg-indigo-400 text-white'
  },
  swap: {
    title: 'Swap',
    desc: 'Return a hero to your hand.',
    icon: '↩️',
    color: 'bg-cyan-500 text-black'
  },
  bounce: {
    title: 'Bounce',
    desc: 'Return a unit to its owner\'s hand.',
    icon: '↩️',
    color: 'bg-cyan-500 text-black'
  },
  disarm: {
    title: 'Disarm',
    desc: 'Reduce a random enemy\'s attack by X for 1 turn.',
    icon: '📉',
    color: 'bg-orange-500 text-black'
  },
  decoy: {
    title: 'Decoy',
    desc: 'Summon a 0/2 Hologram with Guard.',
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
    desc: 'Give target +X/+X (doesn\'t stack).',
    icon: '➕',
    color: 'bg-green-500 text-white'
  },
  encourage: {
    title: 'Encourage',
    desc: 'Give target +X Attack.',
    icon: '📣',
    color: 'bg-amber-500 text-black'
  },
  stun: {
    title: 'Stun',
    desc: 'Target unit cannot attack next turn.',
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
    desc: 'Reduce random enemy Attack by X for 1 turn.',
    icon: '💻',
    color: 'bg-emerald-400 text-black'
  },
  rage: {
    title: 'Rage',
    desc: 'Gain +X Attack permanently.',
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
    desc: 'Give target +X/+Y.',
    icon: '⬆️',
    color: 'bg-green-400 text-black'
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
    desc: 'Restore X HP to target mech.',
    icon: '🔧',
    color: 'bg-slate-400 text-black'
  },
  regenerate: {
    title: 'Regenerate',
    desc: 'Restore X HP.',
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
  double_damage_undamaged: {
    title: 'Ambush',
    desc: 'Deal double damage to undamaged enemies.',
    icon: '🗡️',
    color: 'bg-orange-600 text-white'
  },
  lifesteal: {
    title: 'Lifesteal',
    desc: 'Heal your commander for damage dealt.',
    icon: '🩸',
    color: 'bg-red-800 text-white'
  },
  shield: {
    title: 'Shield',
    desc: 'Prevent the next instance of damage.',
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
    desc: 'Take control of enemy with ATK ≤ X.',
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
    desc: 'Deals damage before taking damage in combat.',
    icon: '⚡',
    color: 'bg-yellow-600 text-white'
  },
  assassinate: {
    title: 'Assassinate',
    desc: 'Destroys any unit damaged by this unit.',
    icon: '💀',
    color: 'bg-slate-950 text-red-500'
  }
};
