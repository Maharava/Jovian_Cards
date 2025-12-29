import React, { useState, useMemo } from 'react';
import { useMetaStore } from '../store/metaStore';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';
import { Card } from './Card';
import { cn } from '../lib/utils';
import type { Card as CardType } from '../types';

/**
 * Workshop Component (Phase 2: Placeholder)
 *
 * In Phase 4, this will become the Cosmetic Studio where players can:
 * - View unlockable cosmetic variants for their cards
 * - Spend Platinum to unlock standard cosmetics
 * - Spend Mossan to unlock Voidborn-themed cosmetics
 * - Select which cosmetic variant to display in-game
 */
export const Workshop: React.FC = () => {
    const {
        collection,
        platinum,
        mossan,
        unlockedCosmetics,
        activeCosmetics,
        unlockCosmetic,
        setActiveCosmetic,
        spendPlatinum
    } = useMetaStore();
    const goToMainMenu = useGameStore(state => state.goToMainMenu);

    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [rarityFilter, setRarityFilter] = useState<string>('All');

    const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary'];

    // Filter collection for owned cards
    const ownedCards = useMemo(() => {
        const cards: { cardId: string, def: CardType, count: number }[] = [];

        Object.entries(collection).forEach(([id, count]) => {
            const def = ALL_CARDS.find(c => c.id === id);
            if (def && def.type === 'unit') {
                if (rarityFilter !== 'All' && def.rarity !== rarityFilter) return;
                cards.push({ cardId: id, def, count });
            }
        });
        return cards.sort((a, b) => a.def.cost - b.def.cost);
    }, [collection, rarityFilter]);

    const selectedCard = useMemo(() => {
        if (!selectedCardId) return null;
        return ALL_CARDS.find(c => c.id === selectedCardId);
    }, [selectedCardId]);

    return (
        <div className="absolute inset-0 bg-slate-950 text-white flex flex-col p-8 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl font-mono font-bold text-slate-300">WORKSHOP // COSMETIC STUDIO</h2>
                    <p className="text-slate-500 mt-1">Customize unit appearances with unlockable artwork.</p>
                </div>

                <div className="flex gap-8 text-right font-mono items-center">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Platinum</span>
                        <span className="text-xl text-blue-400 font-bold">{platinum} 💎</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Mossan</span>
                        <span className="text-xl text-purple-400 font-bold">{mossan} ⚛️</span>
                    </div>
                    <button
                        onClick={goToMainMenu}
                        className="px-6 py-2 border border-slate-600 rounded hover:bg-slate-800 ml-4"
                    >
                        EXIT
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 gap-8 overflow-hidden">

                {/* Collection (Left) */}
                <div className="flex-1 flex flex-col bg-slate-900/30 rounded-xl border border-white/5 p-6">
                    {/* Filters */}
                    <div className="flex gap-2 mb-4">
                        {rarities.map(r => (
                            <button
                                key={r}
                                onClick={() => setRarityFilter(r)}
                                className={cn(
                                    "px-3 py-1 rounded text-xs font-bold uppercase border transition-colors",
                                    rarityFilter === r
                                        ? "bg-slate-700 border-white text-white"
                                        : "bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-6 content-start">
                        {ownedCards.map((item) => (
                            <div
                                key={item.cardId}
                                onClick={() => setSelectedCardId(item.cardId)}
                                className={cn(
                                    "relative group cursor-pointer transition-transform hover:scale-105",
                                    selectedCardId === item.cardId ? "ring-2 ring-yellow-500 rounded-xl scale-105 z-10" : ""
                                )}
                            >
                                <div className="scale-90 origin-top-left w-[111%] h-[111%]">
                                    <Card card={item.def} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-slate-800 border border-slate-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                    x{item.count}
                                </div>
                            </div>
                        ))}
                        {ownedCards.length === 0 && (
                            <div className="col-span-4 text-center text-slate-600 mt-20">
                                No units in collection.
                            </div>
                        )}
                    </div>
                </div>

                {/* Cosmetic Preview (Right) */}
                <div className="w-1/3 bg-slate-900/50 rounded-xl border border-white/10 p-6 flex flex-col relative overflow-hidden">
                    {selectedCard ? (
                        <div className="flex flex-col gap-4 w-full h-full">
                            {/* Card Info Header */}
                            <div className="border-b border-white/10 pb-3">
                                <h3 className="text-xl font-mono font-bold text-slate-200">{selectedCard.name}</h3>
                                <p className="text-xs text-slate-500">{selectedCard.title || 'Unit'}</p>
                            </div>

                            {/* Cosmetic Variants */}
                            <div className="flex-1 overflow-y-auto space-y-3">
                                {/* Base Version */}
                                <div className={cn(
                                    "border rounded-lg p-3 flex items-center gap-4 transition-all",
                                    !activeCosmetics[selectedCard.id]
                                        ? "border-yellow-500 bg-yellow-500/10"
                                        : "border-white/10 bg-slate-900/50 hover:bg-slate-800/50"
                                )}>
                                    <div className="scale-[0.4] origin-left -my-16 -ml-8">
                                        <Card card={selectedCard} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-slate-200">Base Version</div>
                                        <div className="text-[10px] text-slate-500">Default artwork</div>
                                    </div>
                                    {activeCosmetics[selectedCard.id] ? (
                                        <button
                                            onClick={() => setActiveCosmetic(selectedCard.id, '')}
                                            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded border border-slate-500 transition-colors"
                                        >
                                            EQUIP
                                        </button>
                                    ) : (
                                        <div className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded border border-yellow-500/50 font-bold">
                                            EQUIPPED
                                        </div>
                                    )}
                                </div>

                                {/* Cosmetic Variants */}
                                {selectedCard.cosmetics && selectedCard.cosmetics.length > 0 ? (
                                    selectedCard.cosmetics.map((cosmetic) => {
                                        const isUnlocked = unlockedCosmetics[selectedCard.id]?.includes(cosmetic.id);
                                        const isActive = activeCosmetics[selectedCard.id] === cosmetic.id;
                                        const cost = cosmetic.unlockCost?.amount || 0;
                                        const canAfford = platinum >= cost;

                                        return (
                                            <div
                                                key={cosmetic.id}
                                                className={cn(
                                                    "border rounded-lg p-3 flex items-center gap-4 transition-all",
                                                    isActive
                                                        ? "border-yellow-500 bg-yellow-500/10"
                                                        : isUnlocked
                                                        ? "border-white/10 bg-slate-900/50 hover:bg-slate-800/50"
                                                        : "border-slate-700 bg-slate-900/30"
                                                )}
                                            >
                                                <div className={cn(
                                                    "scale-[0.4] origin-left -my-16 -ml-8",
                                                    !isUnlocked && "opacity-50 grayscale"
                                                )}>
                                                    <Card card={selectedCard} previewAsset={cosmetic.asset} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-slate-200">{cosmetic.name}</div>
                                                    {!isUnlocked && (
                                                        <div className="text-[10px] text-blue-400 font-mono mt-1">
                                                            {cost} 💎 Platinum
                                                        </div>
                                                    )}
                                                    {isUnlocked && !isActive && (
                                                        <div className="text-[10px] text-green-500 font-mono mt-1">
                                                            ✓ Unlocked
                                                        </div>
                                                    )}
                                                </div>
                                                {isUnlocked ? (
                                                    isActive ? (
                                                        <div className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded border border-yellow-500/50 font-bold">
                                                            EQUIPPED
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setActiveCosmetic(selectedCard.id, cosmetic.id)}
                                                            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded border border-slate-500 transition-colors"
                                                        >
                                                            EQUIP
                                                        </button>
                                                    )
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (canAfford && spendPlatinum(cost)) {
                                                                unlockCosmetic(selectedCard.id, cosmetic.id);
                                                            }
                                                        }}
                                                        disabled={!canAfford}
                                                        className={cn(
                                                            "px-3 py-1 text-xs rounded border transition-colors font-bold",
                                                            canAfford
                                                                ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-400"
                                                                : "bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed"
                                                        )}
                                                    >
                                                        UNLOCK
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center text-slate-600 text-sm py-8">
                                        No cosmetics available for this unit.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-slate-600 font-mono text-center">
                                <div className="text-6xl mb-4 opacity-20">🎨</div>
                                <div className="text-sm">SELECT A UNIT</div>
                                <div className="text-xs text-slate-700 mt-2">View cosmetic variants</div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
