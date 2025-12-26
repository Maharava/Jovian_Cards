import type { UnitInstance } from '../types';
import { MECHANICS } from '../constants';

export interface CombatResult {
  attackerDamage: number;
  defenderDamage: number;
  attackerHp: number;
  defenderHp: number;
  shieldBlocked: boolean;
  defenderCounters: boolean;
}

/**
 * Pure combat calculation - no side effects
 * Returns damage values and final HP for both units
 */
export const calculateCombat = (
  attacker: UnitInstance,
  defender: UnitInstance
): CombatResult => {
  const hasShield = defender.mechanics.some(m => m.type === MECHANICS.SHIELD);
  const hasFirstStrike = attacker.mechanics.some(m => m.type === MECHANICS.FIRST_STRIKE);
  const isDefenderStunned = (defender.status?.stun || 0) > 0;
  const thornsValue = defender.mechanics.find(m => m.type === MECHANICS.THORNS)?.value || 0;

  let attackerDamage = attacker.atk;
  let defenderDamage = defender.atk;
  let shieldBlocked = false;

  // Shield blocks damage
  if (hasShield && attackerDamage > 0) {
    attackerDamage = 0;
    shieldBlocked = true;
  }

  // Calculate HP after attacker damage
  let defenderHp = defender.hp - attackerDamage;
  let attackerHp = attacker.hp;

  // Counter-attack logic
  const defenderDies = defenderHp <= 0;
  const defenderCounters = !isDefenderStunned && (!defenderDies || !hasFirstStrike);

  if (defenderCounters && defenderDamage > 0) {
    attackerHp -= defenderDamage;
  }

  // Thorns damage
  if (thornsValue > 0) {
    attackerHp -= thornsValue;
  }

  return {
    attackerDamage,
    defenderDamage: defenderCounters ? defenderDamage : 0,
    attackerHp: Math.max(0, attackerHp),
    defenderHp: Math.max(0, defenderHp),
    shieldBlocked,
    defenderCounters,
  };
};
