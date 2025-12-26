import type { GameState, UnitInstance, Card } from '../../types';

/**
 * Deep clone a GameState object for simulation
 * Uses JSON serialization to avoid issues with function references
 */
export function deepCloneState(state: GameState): GameState {
  // Always use JSON serialization - safer and avoids function cloning issues
  return JSON.parse(JSON.stringify(state));
}

/**
 * Silent logger for use in simulations
 * Prevents notifications and event logging during AI evaluation
 */
export function silentLogger(): (type: string, data: unknown) => void {
  return () => {
    // No-op: Do nothing
  };
}

/**
 * Clone a unit instance
 */
export function cloneUnit(unit: UnitInstance): UnitInstance {
  return {
    ...unit,
    mechanics: [...unit.mechanics],
    status: unit.status ? { ...unit.status } : undefined
  };
}

/**
 * Clone a card
 */
export function cloneCard(card: Card): Card {
  return {
    ...card,
    mechanics: [...card.mechanics],
    stats: card.stats ? { ...card.stats } : undefined
  };
}
