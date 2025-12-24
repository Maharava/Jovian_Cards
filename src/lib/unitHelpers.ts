import type { UnitInstance } from '../types';

/**
 * Unit Helper Functions
 * Reduces code duplication for common unit operations
 */

/**
 * Apply status effect to a unit
 */
export function applyStatus(
  unit: UnitInstance,
  status: keyof NonNullable<UnitInstance['status']>,
  duration: number
): UnitInstance {
  return {
    ...unit,
    status: {
      ...(unit.status || {}),
      [status]: ((unit.status?.[status] as number) || 0) + duration
    }
  };
}

/**
 * Buff a unit's stats
 */
export function buffUnit(
  unit: UnitInstance,
  atkBonus: number,
  hpBonus: number
): UnitInstance {
  return {
    ...unit,
    atk: unit.atk + atkBonus,
    hp: unit.hp + hpBonus,
    maxHp: unit.maxHp + hpBonus
  };
}

/**
 * Heal/Repair a unit (cannot exceed max HP)
 */
export function healUnit(unit: UnitInstance, amount: number): UnitInstance {
  return {
    ...unit,
    hp: Math.min(unit.maxHp, unit.hp + amount)
  };
}

/**
 * Damage a unit (cannot go below 0)
 */
export function damageUnit(unit: UnitInstance, amount: number): UnitInstance {
  return {
    ...unit,
    hp: Math.max(0, unit.hp - amount)
  };
}

/**
 * Check if unit is alive
 */
export function isAlive(unit: UnitInstance): boolean {
  return unit.hp > 0;
}

/**
 * Check if unit can attack
 */
export function canAttack(unit: UnitInstance): boolean {
  return (
    unit.attacksLeft > 0 &&
    unit.atk > 0 &&
    (!unit.status?.stun || unit.status.stun <= 0)
  );
}

/**
 * Check if unit has a specific mechanic type
 */
export function hasMechanic(unit: UnitInstance, mechanicType: string): boolean {
  return unit.mechanics.some(m => m.type === mechanicType);
}

/**
 * Count units matching a condition
 */
export function countUnits(
  units: UnitInstance[],
  predicate: (unit: UnitInstance) => boolean
): number {
  return units.filter(predicate).length;
}
