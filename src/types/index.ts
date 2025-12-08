export type CardType = 'unit' | 'tactic';
export type CardTier = 1 | 2 | 3;

export interface Card {
  id: string;
  name: string;
  type: CardType;
  tier: CardTier;
  cost: number;
  // Units only
  stats?: {
    atk: number;
    hp: number;
    maxHp: number;
  };
  // Text description of ability
  text: string;
  // Mechanics for logic
  mechanics?: string[];
  // Asset path (e.g. 'elara') - we will append _tierX.png
  baseAsset: string;
  // Specific implementation hooks (optional for now, can be ID based)
  abilityId?: string;
}

export interface UnitInstance {
  uid: string; // Unique ID for this instance on board
  cardId: string;
  name: string;
  baseAsset: string; // Visual asset path
  atk: number;
  hp: number;
  maxHp: number;
  owner: 'player' | 'enemy';
  ready: boolean; // Summon sickness check
  attacksLeft: number; // For Windfury (can attack multiple times)
  mechanics: string[]; // copy of card mechanics
  shield: number;
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
  credits: number;
  parts: number;
}

export interface EnemyState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  deck: Card[]; // Abstracted usually, but good for tracking
  board: UnitInstance[];
  nextMoveDescription: string;
}

export interface GameState {
  player: PlayerState;
  enemy: EnemyState;
  turn: number;
  phase: 'player_turn' | 'enemy_turn' | 'game_over';
  winner?: 'player' | 'enemy';
  scoutedCard?: Card | null; // For Elara's ability
  // Roguelite run state
  run: {
    node: number;
    difficulty: number;
  };
}
