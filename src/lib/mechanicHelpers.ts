import type { Mechanic, Card } from '../types';

/**
 * Get a human-readable description for a mechanic from the card's text
 * Extracts the specific ability from card text that matches the trigger
 */
export function getMechanicDescription(mechanic: Mechanic, cardDef: Card | undefined): string {
  if (!cardDef?.text) return '';

  // Extract the specific ability from card text that matches this trigger
  const lines = cardDef.text.split('.');
  for (const line of lines) {
    if (mechanic.trigger === 'onTurnStart' && line.includes('Turn Start')) return line.trim();
    if (mechanic.trigger === 'onTurnEnd' && line.includes('Turn End')) return line.trim();
    if (mechanic.trigger === 'onPlay' && line.includes('OnPlay')) return line.trim();
  }

  // Return first sentence as fallback
  return cardDef.text.split('.')[0];
}
