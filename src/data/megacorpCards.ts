import type { Card } from '../types';
import { m } from './cardUtils';

export const MEGACORP_CARDS: Card[] = [
  // Mining Drone (Common)
  {
    id: 'corp_drone', name: 'Mining Drone', title: 'Automated Miner', type: 'unit', tier: 1, cost: 1,
    stats: { atk: 1, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: '', faction: 'Megacorp', baseAsset: 'corp_drone', 
    lore: "Mass-produced automated labor.",
    mechanics: []
  },
  {
    id: 'corp_drone_t2', name: 'Mining Drone', title: 'Rapid Extraction Drone', type: 'unit', tier: 2, cost: 1,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_drone', 
    lore: "Upgraded servos allow for faster ore extraction.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_drone_t3', name: 'Mining Drone', title: 'Explosive Miner', type: 'unit', tier: 3, cost: 1,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. OnDeath: Deal 1 dmg to random enemy.', faction: 'Megacorp', baseAsset: 'corp_drone',
    lore: "Rigged to detonate upon catastrophic failure.",
    mechanics: [m('rush', 'constant'), m('damage', 'onDeath', 1, 'random_enemy')]
  },

  // Security Bot (Common)
  {
    id: 'enemy_security', name: 'Security Bot', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Standard perimeter defense unit.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t2', name: 'Riot Control Bot', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Equipped with tear gas.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'enemy_security_t3', name: 'Pacifier Unit', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Guard. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'corp_bot', 
    lore: "Compliance is mandatory.",
    mechanics: [m('guard', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },

  // Corp Guard (Common)
  {
    id: 'corp_guard', name: 'Security Enforcer', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Minimum wage, maximum risk.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t2', name: 'Tactical Response Unit', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Veterans who have survived more than three shifts.",
    mechanics: [m('guard', 'constant')]
  },
  {
    id: 'corp_guard_t3', name: 'Site Warden', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Common',
    text: 'Guard. Turn End: Rally.', faction: 'Megacorp', baseAsset: 'corp_guard', 
    lore: "Oversees facility security.",
    mechanics: [m('guard', 'constant'), m('rally', 'onTurnEnd', 1, 'all_allies')] 
  },

  // Cyber-Hound (Common)
  {
    id: 'corp_hound', name: 'K9X Unit', title: 'Cyber-Hound', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 2, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Canine bio-frame.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t2', name: 'K9X Unit', title: 'Hunter-Killer', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Tracks thermal signatures.",
    mechanics: [m('rush', 'constant')]
  },
  {
    id: 'corp_hound_t3', name: 'K9X Unit', title: 'Alpha', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 5, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Rush. Double Attack.', faction: 'Megacorp', baseAsset: 'corp_hound', 
    lore: "Pack leader algorithm installed.",
    mechanics: [m('rush', 'constant'), m('double_attack', 'constant')]
  },

  // Heavy Loader (Common)
  {
    id: 'corp_loader', name: 'Loader', title: 'Cargo Loader', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'corp_loader', 
    lore: "Industrial mech repurposed.",
    mechanics: [m('slow', 'constant')]
  },
  {
    id: 'corp_loader_t2', name: 'Loader', title: 'Industrial Mech', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow.', faction: 'Megacorp', baseAsset: 'corp_loader', 
    lore: "Reinforced plating.",
    mechanics: [m('slow', 'constant')]
  },
  {
    id: 'corp_loader_t3', name: 'Loader', title: 'Payload Hauler', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 3, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Common',
    text: 'Slow. Guard.', faction: 'Megacorp', baseAsset: 'corp_loader',
    lore: "A mountain of moving metal.",
    mechanics: [m('slow', 'constant'), m('guard', 'constant')]
  },

  // Field Medic (Common)
  {
    id: 'corp_medic', name: 'Doc Ash', title: 'Field Medic', type: 'unit', tier: 1, cost: 2,
    stats: { atk: 1, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 1.', faction: 'Megacorp', baseAsset: 'corp_medic', 
    lore: "Company policy requires keeping assets functional.",
    mechanics: [m('heal', 'onTurnEnd', 1, 'random_ally')]
  },
  {
    id: 'corp_medic_t2', name: 'Doc Ash', title: 'Paramedic', type: 'unit', tier: 2, cost: 2,
    stats: { atk: 1, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 2. If Megacorp, heal 3 instead.', faction: 'Megacorp', baseAsset: 'corp_medic',
    lore: "Triage protocols initiated.",
    mechanics: [m('heal', 'onTurnEnd', 2, 'random_ally', 'megacorp_bonus:3')]
  },
  {
    id: 'corp_medic_t3', name: 'Doc Ash', title: 'Biotech Surgeon', type: 'unit', tier: 3, cost: 2,
    stats: { atk: 2, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Common',
    text: 'Turn End: Heal 3. If Megacorp, also grant +0/+1.', faction: 'Megacorp', baseAsset: 'corp_medic',
    lore: "Can replace a limb in under three minutes.",
    mechanics: [m('heal', 'onTurnEnd', 3, 'random_ally', 'megacorp_rally:1')]
  },

  // Manager (Uncommon)
  {
    id: 'corp_manager', name: 'Alexandrea', title: 'Supervisor', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage 1.', faction: 'Megacorp', baseAsset: 'corp_manager',
    lore: "Get back to work!",
    mechanics: [m('encourage', 'onTurnEnd', 1, 'random_ally')]
  },
  {
    id: 'corp_manager_t2', name: 'Alexandrea', title: 'Manager', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage 2. If you have 3+ Megacorp units, Encourage 3.', faction: 'Megacorp', baseAsset: 'corp_manager',
    lore: "Productivity is down 0.4%.",
    mechanics: [m('encourage', 'onTurnEnd', 2, 'random_ally', 'threshold_3:3')]
  },
  {
    id: 'corp_manager_t3', name: 'Alexandrea', title: 'Executive', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Turn End: Encourage X, Rally X, where X = OTHER Megacorp units you control (once per unit).', faction: 'Megacorp', baseAsset: 'corp_manager',
    lore: "You are all replaceable.",
    mechanics: [m('encourage', 'onTurnEnd', 0, 'all_allies', 'count_other_megacorp:once'), m('rally', 'onTurnEnd', 0, 'all_allies', 'count_other_megacorp:once')]
  },

  // Liquidator (Uncommon)
  {
    id: 'corp_liquidator', name: 'Ximena', title: 'Asset Liquidator', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Sent when a branch is closing down.",
    mechanics: []
  },
  {
    id: 'corp_liquidator_t2', name: 'Ximena', title: 'Clean-Up Crew', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 5, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1.', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Leaves no witnesses.",
    mechanics: [m('loot', 'constant', 1)]
  },
  {
    id: 'corp_liquidator_t3', name: 'Ximena', title: 'Black Ops Agent', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 6, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Loot 1. First Strike.', faction: 'Megacorp', baseAsset: 'corp_liquidator', 
    lore: "Doesn't exist on any payroll.",
    mechanics: [m('loot', 'constant', 1), m('first_strike', 'constant')]
  },

  // Uplink (Uncommon)
  {
    id: 'enemy_uplink', name: 'Hacking Uplink', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 1.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Broadcasting malware.",
    mechanics: [m('hack', 'onTurnEnd', 1, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t2', name: 'AI Jammer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 3.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Disrupting enemy communications.",
    mechanics: [m('hack', 'onTurnEnd', 3, 'random_enemy')]
  },
  {
    id: 'enemy_uplink_t3', name: 'Network Crasher', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Uncommon',
    text: 'Turn End: Hack 5.', faction: 'Megacorp', baseAsset: 'corp_uplink', 
    lore: "Central node for local drone control.",
    mechanics: [m('hack', 'onTurnEnd', 5, 'random_enemy')]
  },

  // Technician (Uncommon)
  {
    id: 'corp_technician', name: 'T4M3K0', title: 'Drone Mechanic', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 2, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Summon Drone.', faction: 'Megacorp', baseAsset: 'corp_technician', 
    lore: "Keeps the swarm operational.",
    mechanics: [m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'corp_technician_t2', name: 'T4M3K0', title: 'Line Engineer', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 3, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Costs (1) less for each Megacorp unit. OnPlay: Summon Drone.', faction: 'Megacorp', baseAsset: 'corp_technician',
    lore: "Efficiency is paramount.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('summon', 'onPlay', 1, 'self', 'neutral_drone')]
  },
  {
    id: 'corp_technician_t3', name: 'T4M3K0', title: 'Master Architect', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'Costs (1) less for each Megacorp unit. OnPlay: Summon X Drones, where X = Megacorp units.', faction: 'Megacorp', baseAsset: 'corp_technician',
    lore: "Can build a fortress from scrap.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('summon', 'onPlay', 0, 'self', 'neutral_drone:count_megacorp')]
  },

  // Slaver (Uncommon)
  {
    id: 'corp_slaver', name: 'Mr. Harrison, Debt Collector', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Uncommon',
    text: '', faction: 'Megacorp', baseAsset: 'corp_slaver', 
    lore: "You're late on your payments.",
    mechanics: []
  },
  {
    id: 'corp_slaver_t2', name: 'Mr. Harrison, Indentured Enforcer', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm 2.', faction: 'Megacorp', baseAsset: 'corp_slaver', 
    lore: "Confiscating authorized equipment.",
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy')]
  },
  {
    id: 'corp_slaver_t3', name: 'Mr. Harrison, Contract Binder', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Uncommon',
    text: 'OnPlay: Disarm a target with less than 3 ATK, then take control of them permanently.', faction: 'Megacorp', baseAsset: 'corp_slaver',
    lore: "There's a clause in your contract...",
    mechanics: [m('disarm', 'onPlay', 2, 'random_enemy'), m('mind_control', 'onPlay', 2, 'target_enemy')]
  },

  // Solarin Control (Rare)
  {
    id: 'solarin_control', name: 'Sub-Routine', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 0, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Gain 1 Energy.', faction: 'Megacorp', baseAsset: 'solarin_control', 
    lore: "Managing the flow of power.",
    mechanics: [m('gain_energy', 'onTurnStart', 1)] 
  },
  {
    id: 'solarin_control_t2', name: 'Process Manager', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 0, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Turn Start: Gain 1 Energy for each Megacorp unit (max 4). Turn End: Repair 1 Cybernetic.', faction: 'Megacorp', baseAsset: 'solarin_control',
    lore: "Managing the flow of power.",
    mechanics: [m('gain_energy', 'onTurnStart', 0, 'self', 'count_megacorp:max_4'), m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')]
  },
  {
    id: 'solarin_control_t3', name: 'Swarm Manager', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 0, hp: 8, maxHp: 8 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Costs (1) less for each Megacorp unit. Turn Start: Gain 1 Energy. Turn End: Repair 1 Cybernetic.', faction: 'Megacorp', baseAsset: 'solarin_control',
    lore: "Managing the flow of power.",
    mechanics: [m('cost_reduction', 'constant', 1, 'self', 'count_megacorp'), m('gain_energy', 'onTurnStart', 1), m('repair', 'onTurnEnd', 1, 'random_ally', 'subtype:Cybernetic')]
  },

  // Director Kiz (Rare)
  {
    id: 'director_kiz', name: 'Kiz', title: 'Director: Mars', type: 'unit', tier: 1, cost: 4,
    stats: { atk: 2, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +1/+1.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 1, 'all_allies', 'faction:Megacorp', 1)] 
  },
  {
    id: 'director_kiz_t2', name: 'Kiz', title: 'Director: Earth', type: 'unit', tier: 2, cost: 4,
    stats: { atk: 3, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +1/+1 & Rush.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 1, 'all_allies', 'faction:Megacorp', 1), m('buff', 'onPlay', 0, 'all_allies', 'keyword:rush')]
  },
  {
    id: 'director_kiz_t3', name: 'Kiz', title: 'Director: War', type: 'unit', tier: 3, cost: 4,
    stats: { atk: 4, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnPlay: Buff Megacorp +2/+2.', faction: 'Megacorp', baseAsset: 'director_kiz', 
    lore: "Head of Regional Operations.",
    mechanics: [m('buff', 'onPlay', 2, 'all_allies', 'faction:Megacorp', 2)] 
  },

  // Enforcer Lee (Rare)
  {
    id: 'enforcer_lee', name: 'Enforcer Lee', title: 'Enforcer', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2.', faction: 'Megacorp', baseAsset: 'enforcer_lee',
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1, 'self'), m('regenerate', 'onTurnEnd', 2, 'self')]
  },
  {
    id: 'enforcer_lee_t2', name: 'Enforcer Lee', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 5, hp: 5, maxHp: 5 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2.', faction: 'Megacorp', baseAsset: 'enforcer_lee',
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1, 'self'), m('regenerate', 'onTurnEnd', 2, 'self')]
  },
  {
    id: 'enforcer_lee_t3', name: 'Enforcer Lee', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Biological', rarity: 'Rare',
    text: 'OnAttack: Rage. Turn End: Regenerate 2. Double Attack.', faction: 'Megacorp', baseAsset: 'enforcer_lee',
    lore: "A one-man army on the payroll.",
    mechanics: [m('rage', 'onAttack', 1, 'self'), m('regenerate', 'onTurnEnd', 2, 'self'), m('double_attack', 'constant')]
  },

  // R0-VR (Rare)
  {
    id: 'r0vr', name: 'R0-VR', title: 'Iteration One', type: 'unit', tier: 1, cost: 3,
    stats: { atk: 3, hp: 1, maxHp: 1 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. OnPlay: If you control another Megacorp unit, Scout 2.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('scout', 'onPlay', 2, 'self', 'if_megacorp')]
  },
  {
    id: 'r0vr_t2', name: 'R0-VR', title: 'Iteration Two', type: 'unit', tier: 2, cost: 3,
    stats: { atk: 4, hp: 2, maxHp: 2 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. OnPlay: Scout X, where X = Megacorp units you control.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('scout', 'onPlay', 0, 'self', 'count_megacorp')]
  },
  {
    id: 'r0vr_t3', name: 'R0-VR', title: 'Iteration Three', type: 'unit', tier: 3, cost: 3,
    stats: { atk: 6, hp: 3, maxHp: 3 }, subtype: 'Cybernetic', rarity: 'Rare',
    text: 'Rush. Shield. Double Attack. OnPlay: Scout X, where X = Megacorp units.', faction: 'Megacorp', baseAsset: 'r0vr',
    lore: "Experimental rover unit.",
    mechanics: [m('rush', 'constant'), m('shield', 'constant'), m('double_attack', 'constant'), m('scout', 'onPlay', 0, 'self', 'count_megacorp')]
  },

  // Director Vance (Legendary)
  {
    id: 'director_vance', name: 'Vance', title: 'Director: Finance', type: 'unit', tier: 1, cost: 6,
    stats: { atk: 0, hp: 5, maxHp: 5 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Passive: Played Megacorp units +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance',
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('buff', 'passive', 1, 'all_allies', 'faction:Megacorp', 1)]
  },
  {
    id: 'director_vance_t2', name: 'Vance', title: 'Director: Psychic', type: 'unit', tier: 2, cost: 6,
    stats: { atk: 0, hp: 7, maxHp: 7 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 1. Passive: Played Megacorp units +1/+1.', faction: 'Megacorp', baseAsset: 'director_vance',
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('recycle', 'constant', 1), m('buff', 'passive', 1, 'all_allies', 'faction:Megacorp', 1)]
  },
  {
    id: 'director_vance_t3', name: 'Vance', title: 'Director: Acquisitions', type: 'unit', tier: 3, cost: 6,
    stats: { atk: 0, hp: 10, maxHp: 10 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'Shield. Recycle 2. Passive: Played Megacorp units +2/+2.', faction: 'Megacorp', baseAsset: 'director_vance',
    lore: "The CEO. The Board. The Law.",
    mechanics: [m('shield', 'constant'), m('recycle', 'constant', 2), m('buff', 'passive', 2, 'all_allies', 'faction:Megacorp', 2)]
  },

  // The Auditor (Legendary)
  {
    id: 'the_auditor', name: 'Whisper', type: 'unit', tier: 1, cost: 5,
    stats: { atk: 3, hp: 2, maxHp: 2 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t2', name: 'Shadow', type: 'unit', tier: 2, cost: 5,
    stats: { atk: 4, hp: 3, maxHp: 3 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. OnAttack: Stun target.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('stun', 'onAttack', 1, 'target_unit')]
  },
  {
    id: 'the_auditor_t3', name: 'Unknown', type: 'unit', tier: 3, cost: 5,
    stats: { atk: 5, hp: 4, maxHp: 4 }, subtype: 'Biological', rarity: 'Legendary',
    text: 'Snipe. Assassinate.', faction: 'Megacorp', baseAsset: 'the_auditor', 
    lore: "You have been found wanting.",
    mechanics: [m('snipe', 'constant'), m('assassinate', 'constant')]
  },

  // Unit 734 (Legendary)
  {
    id: 'unit_734', name: 'Unit 734', title: 'Unit 734', type: 'unit', tier: 1, cost: 7,
    stats: { atk: 4, hp: 4, maxHp: 4 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 2 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 2, 'all_units', 'exclude_faction:Megacorp')] 
  },
  {
    id: 'unit_734_t2', name: 'Unit 735', title: 'Unit 735', type: 'unit', tier: 2, cost: 7,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 3 Dmg to all non-Megacorp.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 3, 'all_units', 'exclude_faction:Megacorp')] 
  },
  {
    id: 'unit_734_t3', name: 'Unit 736', title: 'Unit 736', type: 'unit', tier: 3, cost: 7,
    stats: { atk: 6, hp: 6, maxHp: 6 }, subtype: 'Cybernetic', rarity: 'Legendary',
    text: 'OnPlay: 4 Dmg to all non-Megacorp. Shield.', faction: 'Megacorp', baseAsset: 'unit_734', 
    lore: "A relic of the old wars, reactivated.",
    mechanics: [m('damage', 'onPlay', 4, 'all_units', 'exclude_faction:Megacorp'), m('shield', 'constant')]
  }
];