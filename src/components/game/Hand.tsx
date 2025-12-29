import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../Card';
import type { PlayerState, Card as CardType } from '../../types';
import { getCardCost } from '../../lib/cardHelpers';

interface HandProps {
    player: PlayerState;
    phase: string;
    onPlayCard: (card: CardType) => void;
    onInspectUnit: (card: CardType) => void;
}

export const Hand: React.FC<HandProps> = ({ player, phase, onPlayCard, onInspectUnit }) => {
    return (
        <div className="flex-grow flex justify-center items-end px-4 pb-4 h-full relative perspective-1000 ml-48">
            <motion.div className="flex -space-x-24 hover:-space-x-4 transition-all duration-300 ease-out items-end min-h-[280px]">
                <AnimatePresence mode='popLayout'>
                    {player.hand.map((card, index) => {
                        // Calculate actual cost with reductions
                        const actualCost = getCardCost(card, player.board);

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
