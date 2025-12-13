import React from 'react';
import type { Card as CardType } from '../../types';

interface TargetingOverlayProps {
    card: CardType;
    onCancel: () => void;
}

export const TargetingOverlay: React.FC<TargetingOverlayProps> = ({ card, onCancel }) => {
    return (
        <div className="absolute top-24 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <div className="bg-black/80 text-cyan-400 border border-cyan-500 px-6 py-2 rounded-full font-mono font-bold animate-pulse pointer-events-auto flex items-center gap-4">
                <span>SELECT TARGET FOR: {card.name.toUpperCase()}</span>
                <button 
                  onClick={onCancel}
                  className="text-xs bg-red-900/50 hover:bg-red-800 text-white px-2 py-1 rounded border border-red-500"
                >
                    CANCEL
                </button>
            </div>
        </div>
    );
};
