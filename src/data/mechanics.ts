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
  disarm: {
    title: 'Disarm',
    desc: 'When played, reduce a random enemies attack by X for 1 turn.',
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
    desc: 'Deal X damage to a random enemy when played.',
    icon: '⚡',
    color: 'bg-yellow-400 text-black'
  },
  rally: {
    title: 'Rally',
    desc: 'At end of turn, restore 1 HP to a random ally.',
    icon: '➕',
    color: 'bg-green-500 text-white'
  },
  stun: {
    title: 'Stun',
    desc: 'Unit cannot attack or use abilities next turn.',
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
    desc: 'Reduce enemy Attack by X until end of turn.',
    icon: '💻',
    color: 'bg-emerald-400 text-black'
  },
  rage: {
    title: 'Rage',
    desc: 'Gain +X Attack whenever this unit attacks.',
    icon: '😡',
    color: 'bg-red-700 text-white'
  },
  pollute: {
    title: 'Pollute',
    desc: 'Shuffle X Madness cards into the opponent\'s discard pile.',
    icon: '☣️',
    color: 'bg-purple-500 text-white'
  }
};