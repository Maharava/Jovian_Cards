import React, { useState } from 'react';
import { Card } from '../Card';
import type { UnitInstance, Card as CardType } from '../../types';
import { ALL_CARDS } from '../../data/cards';

interface InspectionModalProps {
    unit: UnitInstance;
    onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ unit, onClose }) => {
    const original = ALL_CARDS.find(c => c.id === unit.cardId);
    const [artOnly, setArtOnly] = useState(false);

    // FIXED: Add proper null checks and fallbacks
    if (!unit) {
        console.error('InspectionModal: unit is null or undefined');
        onClose();
        return null;
    }

    // Reconstruct card data for inspection
    // Use original card data when available, fall back to unit instance data
    const cardDef: CardType = {
        id: unit.cardId,
        name: unit.name,
        title: original?.title, // Include title for display (e.g., "The Mind Ocean")
        type: 'unit',
        tier: original?.tier ?? 1,
        cost: original?.cost ?? 0,
        stats: { atk: unit.atk, hp: unit.hp, maxHp: unit.maxHp },
        text: original?.text ?? (unit.mechanics.map(m => m.type).join(', ') || 'No special abilities'),
        baseAsset: unit.baseAsset,
        mechanics: unit.mechanics,
        faction: unit.faction,
        rarity: original?.rarity ?? 'NA',
        subtype: unit.subtype // Also include subtype for proper display
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <Card
                  card={cardDef}
                  className="w-80 h-[500px] hover:scale-100"
                  disabled={false}
                  artOnly={artOnly}
                />
                <div className="absolute -top-12 -right-4 flex gap-2">
                    <button
                      onClick={() => setArtOnly(!artOnly)}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-lg border border-blue-400"
                      title={artOnly ? "Show Details" : "Art Only"}
                    >
                        👁️
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg border border-red-400"
                    >
                        CLOSE
                    </button>
                </div>
                {!artOnly && (
                    <>
                        <div className="mt-8 text-center text-slate-400 text-sm">
                            (Current Status: {unit.hp}/{unit.maxHp} HP)
                        </div>
                        {original?.lore && (
                            <div className="mt-4 max-w-xs mx-auto text-center italic text-slate-500 font-serif text-sm px-4">
                                "{original.lore}"
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
