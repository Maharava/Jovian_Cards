import type { Card, UnitInstance } from '../types';

/**
 * Calculate actual card cost accounting for cost_reduction mechanics
 * Centralizes cost calculation logic used across the app
 */
export function getCardCost(card: Card, board: UnitInstance[]): number {
  let cost = card.cost;

  // Check for cost_reduction mechanics
  const hasCostReduction = card.mechanics?.some(m => m.type === 'cost_reduction');
  if (hasCostReduction) {
    const costReductionMechanic = card.mechanics?.find(m => m.type === 'cost_reduction');
    if (costReductionMechanic?.payload === 'count_megacorp') {
      const megacorpCount = board.filter(u => u.faction === 'Megacorp').length;
      const reduction = (costReductionMechanic.value || 1) * megacorpCount;
      cost = Math.max(0, cost - reduction);
    }
  }

  return cost;
}
