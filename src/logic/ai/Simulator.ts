import type { GameState, UnitInstance } from '../../types';
import type { AIMove, SimulationResult } from './types';
import { deepCloneState } from './utils';
import { MechanicHandler } from '../mechanics';
import { MAX_BOARD_SLOTS } from '../../config/constants';

const generateId = () => Math.random().toString(36).substr(2, 9);

export class Simulator {
  /**
   * Simulate a move and return the resulting state
   */
  static simulate(state: GameState, move: AIMove, owner: 'player' | 'enemy' = 'enemy'): SimulationResult {
    const clonedState = deepCloneState(state);

    try {
      let resultState: GameState;

      switch (move.type) {
        case 'PLAY_UNIT':
        case 'PLAY_TACTIC':
          resultState = this.simulateCardPlay(clonedState, move, owner);
          break;
        case 'ATTACK':
          resultState = this.simulateAttack(clonedState, move, owner);
          break;
        case 'END_TURN':
          resultState = clonedState;
          break;
        default:
          return { state: clonedState, valid: false, lethal: false };
      }

      // Check if move resulted in lethal
      const enemyHP = owner === 'player' ? resultState.enemy.hp : resultState.player.hp;
      const lethal = enemyHP <= 0;

      return { state: resultState, valid: true, lethal };
    } catch (error) {
      // Invalid move (e.g., insufficient energy, invalid target)
      return { state: clonedState, valid: false, lethal: false };
    }
  }

  /**
   * Simulate playing a card (unit or tactic)
   */
  private static simulateCardPlay(state: GameState, move: AIMove, owner: 'player' | 'enemy'): GameState {
    const side = owner === 'player' ? state.player : state.enemy;
    const card = side.hand.find(c => c.id === move.cardId || c.uid === move.cardId);

    if (!card) throw new Error('Card not found in hand');
    if (card.cost > side.energy) throw new Error('Insufficient energy');

    // Clone sides
    const newState = { ...state };
    if (owner === 'player') {
      newState.player = { ...state.player };
    } else {
      newState.enemy = { ...state.enemy };
    }

    const targetSide = owner === 'player' ? newState.player : newState.enemy;

    // Remove card from hand
    const handCopy = [...targetSide.hand];
    const cardIndex = handCopy.findIndex(c => c.id === card.id || c.uid === card.id);
    if (cardIndex !== -1) handCopy.splice(cardIndex, 1);

    // Deduct energy
    targetSide.energy -= card.cost;
    targetSide.hand = handCopy;

    if (card.type === 'unit') {
      // Check board space
      if (targetSide.board.length >= MAX_BOARD_SLOTS) {
        throw new Error('Board is full');
      }

      // Create unit instance
      const newUnit: UnitInstance = {
        uid: generateId(),
        cardId: card.id,
        name: card.name,
        baseAsset: card.baseAsset,
        faction: card.faction,
        subtype: card.subtype,
        atk: card.stats?.atk || 0,
        hp: card.stats?.hp || 0,
        maxHp: card.stats?.hp || 0,
        owner,
        ready: card.mechanics.some(m => m.type === 'rush'),
        attacksLeft: 1,
        mechanics: [...card.mechanics],
        shield: 0
      };

      targetSide.board = [...targetSide.board, newUnit];

      // Resolve onPlay mechanics
      let currentState = newState;
      for (const mechanic of card.mechanics) {
        if (mechanic.trigger === 'onPlay') {
          const { stateUpdates } = MechanicHandler.resolve(
            mechanic,
            newUnit,
            currentState,
            undefined, // Silent logger (default)
            move.targetUid
          );
          currentState = { ...currentState, ...stateUpdates };
        }
      }

      return currentState;
    } else {
      // Tactic card
      // Create temporary unit for mechanic resolution
      const tempUnit: UnitInstance = {
        uid: generateId(),
        cardId: card.id,
        name: card.name,
        baseAsset: card.baseAsset,
        faction: card.faction,
        atk: 0,
        hp: 0,
        maxHp: 0,
        owner,
        ready: false,
        attacksLeft: 0,
        mechanics: [...card.mechanics],
        shield: 0
      };

      let currentState = newState;
      for (const mechanic of card.mechanics) {
        const { stateUpdates } = MechanicHandler.resolve(
          mechanic,
          tempUnit,
          currentState,
          undefined,
          move.targetUid
        );
        currentState = { ...currentState, ...stateUpdates };
      }

      // Add card to graveyard
      if (owner === 'player') {
        currentState.player.graveyard = [...currentState.player.graveyard, card];
      } else {
        currentState.enemy.graveyard = [...currentState.enemy.graveyard, card];
      }

      return currentState;
    }
  }

  /**
   * Simulate an attack
   */
  private static simulateAttack(state: GameState, move: AIMove, owner: 'player' | 'enemy'): GameState {
    if (!move.attackerUid) throw new Error('No attacker specified');

    const attackerSide = owner === 'player' ? state.player : state.enemy;
    const defenderSide = owner === 'player' ? state.enemy : state.player;

    const attacker = attackerSide.board.find(u => u.uid === move.attackerUid);
    if (!attacker) throw new Error('Attacker not found');
    if (!attacker.ready || attacker.attacksLeft <= 0) throw new Error('Unit cannot attack');
    if (attacker.atk <= 0) throw new Error('Unit has 0 attack');
    if (attacker.status?.stun && attacker.status.stun > 0) throw new Error('Unit is stunned');

    const newState = { ...state };

    const attackerBoard = [...attackerSide.board];
    const defenderBoard = [...defenderSide.board];

    const attackerIndex = attackerBoard.findIndex(u => u.uid === move.attackerUid);
    const attackerCopy = { ...attackerBoard[attackerIndex] };

    let attackerHP = attackerSide.hp;
    let defenderHP = defenderSide.hp;

    if (move.targetType === 'unit' && move.targetUid) {
      // Attack enemy unit
      const targetIndex = defenderBoard.findIndex(u => u.uid === move.targetUid);
      if (targetIndex === -1) throw new Error('Target not found');

      const target = { ...defenderBoard[targetIndex] };

      // Check shield
      const hasShield = target.mechanics.some(m => m.type === 'shield');
      if (hasShield) {
        target.mechanics = target.mechanics.filter(m => m.type !== 'shield');
        const counterDamage = target.atk;
        if (!attackerCopy.mechanics.some(m => m.type === 'first_strike')) {
          attackerCopy.hp -= counterDamage;
        }
      } else {
        // Normal combat
        const attackerDamage = attackerCopy.atk;
        const defenderDamage = target.atk;
        target.hp -= attackerDamage;

        if (!attackerCopy.mechanics.some(m => m.type === 'first_strike')) {
          attackerCopy.hp -= defenderDamage;
        }
      }

      // Thorns damage
      const thorns = target.mechanics.find(m => m.type === 'thorns');
      if (thorns && thorns.value) {
        attackerCopy.hp -= thorns.value;
      }

      // Mark dying units
      if (target.hp <= 0) target.dying = true;
      if (attackerCopy.hp <= 0) attackerCopy.dying = true;

      defenderBoard[targetIndex] = target;
    } else {
      // Attack commander
      const damage = attackerCopy.atk;
      defenderHP -= damage;

      // Lifesteal
      if (attackerCopy.mechanics.some(m => m.type === 'lifesteal')) {
        attackerHP = Math.min(attackerSide.maxHp, attackerHP + damage);
      }
    }

    // Decrement attacks
    attackerCopy.attacksLeft--;
    if (attackerCopy.attacksLeft <= 0) attackerCopy.ready = false;
    attackerBoard[attackerIndex] = attackerCopy;

    if (owner === 'player') {
      newState.player = { ...state.player, board: attackerBoard, hp: attackerHP };
      newState.enemy = { ...state.enemy, board: defenderBoard, hp: defenderHP };
    } else {
      newState.enemy = { ...state.enemy, board: attackerBoard, hp: attackerHP };
      newState.player = { ...state.player, board: defenderBoard, hp: defenderHP };
    }

    return newState;
  }
}
