import React from 'react';
import { Card } from '../Card';
import type { Card as CardType } from '../../types';

interface ScoutModalProps {
    cards: CardType[];
    onClose: () => void;
}

export const ScoutModal: React.FC<ScoutModalProps> = ({ cards, onClose }) => {
    return (
        <div className="absolute inset-0 z-50 bg-indigo-900/80 flex flex-col items-center justify-center backdrop-blur-sm" onClick={onClose}>
             <h2 className="text-3xl font-mono font-bold text-cyan-300 mb-8 tracking-widest animate-pulse">
                INTEL INTERCEPTED {cards.length > 1 && `(${cards.length} CARDS)`}
             </h2>
            <div className="relative p-8 bg-black/50 rounded-xl border-2 border-cyan-500/50 flex gap-6" onClick={(e) => e.stopPropagation()}>
                {cards.map((card, index) => (
                    <Card
                      key={`scout-${card.id}-${index}`}
                      card={card}
                      className="w-64 h-96 cursor-default"
                      disabled={false}
                    />
                ))}
                <button
                  onClick={onClose}
                  className="absolute -top-6 -right-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_15px_#00ffff]"
                >
                    CLOSE INTEL
                </button>
            </div>
        </div>
    );
};
