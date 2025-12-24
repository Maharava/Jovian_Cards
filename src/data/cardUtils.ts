
import type { Mechanic, MechanicType, TriggerType } from '../types';

// Helper to keep definitions clean
export const m = (
  type: MechanicType, 
  trigger: TriggerType = 'onPlay', 
  value?: number,
  target?: Mechanic['target'], 
  payload?: string,
  secondaryValue?: number
): Mechanic => ({
  type, trigger, value, target, payload, secondaryValue
});
