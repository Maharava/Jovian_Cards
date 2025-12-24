/**
 * Game Rules and Balance Constants
 * Centralized location for all game balance values
 */

export const COMBAT = {
  /** Maximum number of attacks per turn for a unit */
  MAX_ATTACKS_PER_TURN: 2,

  /** Base number of attacks a unit gets */
  BASE_ATTACKS: 1,

  /** Multiplier for counter-attack damage */
  COUNTER_DAMAGE_MULTIPLIER: 1.0,

  /** Maximum iterations for death trigger loops */
  MAX_DEATH_ITERATIONS: 50,
} as const;

export const MECHANICS = {
  /** Base duration for temporary status effects (turns) */
  DEFAULT_STATUS_DURATION: 1,

  /** Weak status attack reduction */
  WEAK_ATTACK_REDUCTION: 1,

  /** Mind control maximum attack threshold */
  MIND_CONTROL_MAX_ATTACK: 3,
} as const;

export const BOARD = {
  /** Number of unit slots per side */
  MAX_SLOTS: 7,

  /** Maximum hand size before discard */
  MAX_HAND_SIZE: 10,
} as const;

export const RESOURCE = {
  /** Starting HP for both players */
  STARTING_HP: 20,

  /** Starting energy per turn */
  STARTING_ENERGY: 1,

  /** Maximum energy cap */
  MAX_ENERGY: 10,

  /** Energy gain per turn */
  ENERGY_PER_TURN: 1,
} as const;

export const CARDS = {
  /** Cards drawn at game start */
  STARTING_HAND_SIZE: 5,

  /** Cards drawn per turn */
  CARDS_PER_TURN: 1,

  /** Required deck size */
  DECK_SIZE: 20,
} as const;
