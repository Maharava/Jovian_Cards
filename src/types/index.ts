export type CardType = 'unit' | 'tactic';
export type CardTier = 1 | 2 | 3;
export type CardSubtype = 'Cybernetic' | 'Biological' | 'Psionic';

export type MechanicType = 
  | 'summon' 
  | 'scout' 
  | 'stun' 
  | 'buff' 
  | 'bio_optimize'
  | 'debuff' 
  | 'damage' 
  | 'heal' 
  | 'draw' 
  | 'guard'
  | 'rush'
  | 'double_attack'
  | 'snipe'
  | 'lifesteal'
  | 'slow'
  | 'repair'
  | 'support'
  | 'redeploy' // Return friendly unit to hand
  | 'banish' // Return enemy unit to its owner's hand
  | 'disarm'
  | 'spark'
  | 'decoy'
  | 'rally'
  | 'thorns'
  | 'pollute'
  | 'fade'
  | 'hack' // New mechanic
  | 'rage' // New mechanic
  | 'encourage'
  | 'recycle'
  | 'loot'
  | 'first_strike'
  | 'assassinate'
  | 'regenerate'
  | 'shield'
  | 'add_random_tactic' // Leda T1 ability // Return to hand
  | 'breach'
  | 'mind_control'
  | 'gain_energy'
  | 'silence'
  | 'cost_reduction';

export type TriggerType = 'onPlay' | 'onDeath' | 'onTurnEnd' | 'onTurnStart' | 'passive' | 'constant' | 'onDraw' | 'onAttack' | 'onDamageTaken';

export type Faction = 'Jovian' | 'Republic' | 'Megacorp' | 'Confederate' | 'Voidborn' | 'Bio-horror' | 'Neutral';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'NA';

// Typed payload structures for type safety
export interface MechanicPayload {
  // Card ID for summons
  cardId?: string;

  // Filters
  faction?: Faction;
  excludeFaction?: Faction;
  subtype?: CardSubtype;

  // Scaling
  scaling?: 'count_megacorp' | 'count_allies';
  cap?: number;

  // Conditional bonuses
  megacorpBonus?: number;
  megacorpRally?: number;
  threshold?: { count: number; value: number };

  // Keywords and flags
  keyword?: 'rush';
  once?: boolean;
}

export interface Mechanic {
  type: MechanicType;
  trigger: TriggerType;
  target?: 'self' | 'enemy_unit' | 'enemy_hero' | 'ally_unit' | 'all_enemies' | 'random_enemy' | 'random_ally' | 'all_allies' | 'enemy_board_random' | 'all_units' | 'target_unit' | 'target_enemy' | 'target_ally' | 'player_commander' | 'target_enemy_commander';
  value?: number; // Damage amount, buff amount, duration, etc.
  secondaryValue?: number; // e.g. for +X/+Y buff
  payload?: string | MechanicPayload; // Backwards compatible: string for cardId, object for typed logic
  chance?: number; // 0-1 probability
}

export interface ResolutionResult {
    stateUpdates: Partial<GameState>;
    animations: Array<{ from: string; to: string; color: string; duration?: number }>;
    damagedUnits?: string[]; // UIDs of units that took damage (for onDamageTaken triggers)
    notifications?: Array<{ id: string; unitName: string; text: string; timestamp: number }>;
}

export interface Card {
  id: string;
  name: string;
  title?: string; // Title for this tier (e.g., "Researcher", "The Biologist")
  type: CardType;
  tier: CardTier;
  rarity: Rarity;
  subtype?: CardSubtype;
  cost: number;
  // Units only
  stats?: {
    atk: number;
    hp: number;
    maxHp: number;
  };
  // Text description of ability
  text: string;
  // Flavour text / Lore
  lore?: string;
  // Faction
  faction: Faction;
  // Mechanics for logic
  mechanics: Mechanic[];
  // Asset path (e.g. 'elara') - we will append _tierX.png
  baseAsset: string;
  // Unique Instance ID (runtime only, for hand management)
  uid?: string;
}

export interface UnitInstance {
  uid: string; // Unique ID for this instance on board
  cardId: string;
  name: string;
  baseAsset: string; // Visual asset path
  faction: Faction;
  subtype?: CardSubtype;
  atk: number;
  hp: number;
  maxHp: number;
  owner: 'player' | 'enemy';
  ready: boolean; // Summon sickness check
  attacksLeft: number; // For Windfury (can attack multiple times)
  mechanics: Mechanic[]; // copy of card mechanics
  shield: number;
  dying?: boolean; // For death animation
  status?: {
      stun?: number; // Duration in turns
      weak?: number; // Duration in turns (or value if -ATK)
      originalAtk?: number; // To revert debuffs
      rallied?: boolean; // Track if unit has been rallied
      encouraged?: boolean; // Track if unit has been encouraged
      turnsSincePlay?: number; // Track turns for slow mechanic
  };
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  deck: Card[];
  hand: Card[];
  board: UnitInstance[];
  graveyard: Card[];
}

export interface EnemyState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  faction?: string; // Track which faction we are fighting
  deck: Card[]; // Abstracted usually, but good for tracking
  hand: Card[]; // Explicitly track hand for AI logic
  board: UnitInstance[];
  graveyard: Card[]; // Added for symmetry
  nextMoveDescription: string;
}

export interface GameEvent {
  type: 'attack' | 'damage' | 'heal' | 'death' | 'summon' | 'buff' | 'debuff';
  sourceUid?: string;
  targetUid?: string;
  value?: number;
  timestamp: number;
}

export interface GameState {
  player: PlayerState;
  enemy: EnemyState;
  turn: number;
  phase: 'main_menu' | 'faction_select' | 'player_turn' | 'enemy_turn' | 'game_over' | 'victory' | 'hangar' | 'market' | 'workshop' | 'settings';
  winner?: 'player' | 'enemy';
  scoutedCards?: Card[] | null; // For scout abilities (can show multiple cards)
  lastLoot?: { credits: number, parts: number, bio: number, psi: number } | null; // For Victory Screen
  
  // Animation State
  eventQueue: GameEvent[];
  isProcessingQueue: boolean;
  
  // Animation System
  attackingUnitId?: string | null;
  attackVector?: { from: string; to: string } | null;
  effectVector?: { from: string; to: string; color: string } | null;
  abilityNotification?: { unitUid: string; text: string; timestamp: number } | null;
  abilityNotifications: Array<{ id: string; unitName: string; text: string; timestamp: number }>;

  // Roguelite run state
  run: {
    node: number;
    difficulty: number;
  };
}