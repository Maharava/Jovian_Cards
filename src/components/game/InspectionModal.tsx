import React from 'react';
import { Card } from '../Card';
import type { UnitInstance, Card as CardType } from '../../types';
import { ALL_CARDS } from '../../data/cards';

interface InspectionModalProps {
    unit: UnitInstance;
    onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ unit, onClose }) => {
    const original = ALL_CARDS.find(c => c.id === unit.cardId);

    // Reconstruct card data for inspection
    const cardDef: CardType = {
        id: unit.cardId,
        name: unit.name,
        type: 'unit',
        tier: original?.tier || 1, 
        cost: original?.cost || 0,
        stats: { atk: unit.atk, hp: unit.hp, maxHp: unit.maxHp },
        text: original?.text || (unit.mechanics.map(m => m.type).join(', ') || 'No special abilities'),
        baseAsset: unit.baseAsset,
        mechanics: unit.mechanics,
        faction: unit.faction,
        rarity: original?.rarity || 'NA' 
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Card 
                  card={cardDef} 
                  className="w-80 h-[500px] hover:scale-100" 
                  disabled={false} 
                />
                <button 
                  onClick={onClose}
                  className="absolute -top-12 -right-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg border border-red-400"
                >
                    CLOSE
                </button>
                <div className="mt-8 text-center text-slate-400 text-sm">
                    (Current Status: {unit.hp}/{unit.maxHp} HP)
                </div>
            </div>
        </div>
    );
};
