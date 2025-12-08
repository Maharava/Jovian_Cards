export const MECHANICS_DEFINITIONS: Record<string, { title: string; desc: string; icon: string; color: string }> = {
  support: {
    title: 'Support',
    desc: 'At Turn End, grant buffs to allies.',
    icon: '🤝',
    color: 'bg-green-600 text-white'
  },
  guard: {
    title: 'Guard',
    desc: 'Enemies must attack this unit before others.',
    icon: '🛡️',
    color: 'bg-slate-300 text-black'
  },
  rush: {
    title: 'Rush',
    desc: 'Can attack immediately after being played.',
    icon: '⚡',
    color: 'bg-yellow-400 text-black'
  },
  snipe: {
    title: 'Snipe',
    desc: 'Can ignore Guard to target any enemy.',
    icon: '🎯',
    color: 'bg-red-400 text-black'
  },
  stun: {
    title: 'Stun',
    desc: 'Unit cannot attack or use abilities next turn.',
    icon: '💫',
    color: 'bg-blue-400 text-black'
  },
  repair: {
    title: 'Repair',
    desc: 'Restores Health at the start of your turn.',
    icon: '🔧',
    color: 'bg-green-400 text-black'
  },
  glitch: {
    title: 'Glitch',
    desc: '50% chance to attack a random target.',
    icon: '👾',
    color: 'bg-purple-400 text-white'
  },
  windfury: {
    title: 'Windfury',
    desc: 'Can attack twice per turn.',
    icon: '🌪️',
    color: 'bg-cyan-400 text-black'
  },
  scout: {
    title: 'Scout',
    desc: 'Look at the top cards of a deck.',
    icon: '👁️',
    color: 'bg-indigo-400 text-white'
  },
  lifesteal: {
    title: 'Lifesteal',
    desc: 'Damage dealt heals your Commander.',
    icon: '🩸',
    color: 'bg-red-700 text-white'
  },
  slow: {
    title: 'Slow',
    desc: 'Attacks every other turn.',
    icon: '🐢',
    color: 'bg-stone-500 text-white'
  }
};
