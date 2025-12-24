import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../Card';
import type { PlayerState, Card as CardType } from '../../types';

interface HandProps {
    player: PlayerState;
    phase: string;
    onPlayCard: (card: CardType) => void;
    onInspectUnit: (card: CardType) => void;
}

/**
 * Calculate actual card cost accounting for cost_reduction mechanics
 * Matches logic in gameStore.ts:getCardCost()
 */
function getActualCost(card: CardType, board: PlayerState['board']): number {
    let cost = card.cost;

    // Check for cost_reduction mechanics (e.g., Corp Technician T2/T3)
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

export const Hand: React.FC<HandProps> = ({ player, phase, onPlayCard, onInspectUnit }) => {
    return (
        <div className="flex-grow flex justify-center items-end px-4 pb-4 h-full relative perspective-1000 ml-48">
            <motion.div className="flex -space-x-24 hover:-space-x-4 transition-all duration-300 ease-out items-end min-h-[280px]">
                <AnimatePresence mode='popLayout'>
                    {player.hand.map((card, index) => {
                        // Calculate actual cost with reductions
                        const actualCost = getActualCost(card, player.board);

                        // Create modified card with actual cost for display
                        const displayCard = actualCost !== card.cost
                            ? { ...card, cost: actualCost }
                            : card;

                        return (
                            <motion.div
                                layout
                                key={card.uid}
                                initial={{ opacity: 0, y: 100, scale: 0.5, rotate: 10 }}
                                animate={{ opacity: 1, y: 0, scale: 1, rotate: (index - player.hand.length / 2) * 2 }}
                                exit={{ opacity: 0, y: -100, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="relative hover:z-50"
                                style={{ zIndex: index }}
                            >
                                <Card
                                    card={displayCard}
                                    layoutId={`card-${card.uid}`}
                                    onClick={() => onPlayCard(card)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        onInspectUnit(card);
                                    }}
                                    disabled={phase !== 'player_turn' || player.energy < actualCost}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
