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

                {/* Collection (Left) - Squished */}
                <div className="w-1/4 flex flex-col bg-slate-900/30 rounded-xl border border-white/5 p-4 min-w-[250px]">
                    {/* Filters */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {rarities.map(r => (
                            <button
                                key={r}
                                onClick={() => setRarityFilter(r)}
                                className={cn(
                                    "px-2 py-1 rounded text-[10px] font-bold uppercase border transition-colors",
                                    rarityFilter === r
                                        ? "bg-slate-700 border-white text-white"
                                        : "bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4 content-start">
                        {ownedCards.map((item) => (
                            <div
                                key={item.cardId}
                                onClick={() => setSelectedCardId(item.cardId)}
                                className={cn(
                                    "relative group cursor-pointer transition-transform hover:scale-105 aspect-[3/4]",
                                    selectedCardId === item.cardId ? "ring-2 ring-yellow-500 rounded-xl scale-105 z-10" : ""
                                )}
                            >
                                <div className="scale-[0.85] origin-top-left w-[118%] h-[118%]">
                                    <Card card={item.def} />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-slate-800 border border-slate-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    x{item.count}
                                </div>
                            </div>
                        ))}
                        {ownedCards.length === 0 && (
                            <div className="col-span-2 text-center text-slate-600 mt-20 text-xs">
                                No units in collection.
                            </div>
                        )}
                    </div>
                </div>

                {/* Cosmetic Preview (Right) - Maximized */}
                <div className="flex-1 bg-slate-900/50 rounded-xl border border-white/10 p-6 flex flex-col relative overflow-hidden items-center">
                    {selectedCard ? (
                        <div className="flex flex-col w-full h-full gap-8">
                            {/* Card Display - Large & Centered */}
                            <div className="flex-1 flex items-center justify-center relative">
                                <div className="scale-[2.0] origin-center z-10 drop-shadow-2xl">
                                     <Card card={selectedCard} previewAsset={activeCosmetics[selectedCard.id] ? selectedCard.cosmetics?.find(c => c.id === activeCosmetics[selectedCard.id])?.asset : undefined} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-0 opacity-50 pointer-events-none" />
                            </div>

                            {/* Cosmetic Options - Grid */}
                            <div className="h-1/3 w-full overflow-y-auto">
                                <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest text-center border-t border-white/10 pt-4">Available Styles</h3>
                                
                                <div className="grid grid-cols-3 gap-4 px-8 pb-8">
                                    {/* Base Version Option */}
                                    <div className={cn(
                                        "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer hover:bg-white/5",
                                        !activeCosmetics[selectedCard.id]
                                            ? "border-yellow-500 bg-yellow-500/10"
                                            : "border-slate-700 bg-slate-900/50"
                                    )} onClick={() => setActiveCosmetic(selectedCard.id, '')}>
                                        <div className="text-sm font-bold text-slate-200">Standard Issue</div>
                                        <div className="text-[10px] text-slate-500">Default</div>
                                        {!activeCosmetics[selectedCard.id] && <div className="text-[10px] text-yellow-500 font-bold">EQUIPPED</div>}
                                    </div>

                                    {/* Unlockable Cosmetics */}
                                    {selectedCard.cosmetics?.map((cosmetic) => {
                                        const isUnlocked = unlockedCosmetics[selectedCard.id]?.includes(cosmetic.id);
                                        const isActive = activeCosmetics[selectedCard.id] === cosmetic.id;
                                        const cost = cosmetic.unlockCost?.amount || 0;
                                        const canAfford = platinum >= cost;

                                        return (
                                            <div
                                                key={cosmetic.id}
                                                onClick={() => {
                                                    if (isUnlocked) {
                                                        setActiveCosmetic(selectedCard.id, cosmetic.id);
                                                    } else if (canAfford) {
                                                        if (spendPlatinum(cost)) unlockCosmetic(selectedCard.id, cosmetic.id);
                                                    }
                                                }}
                                                className={cn(
                                                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer hover:bg-white/5 relative overflow-hidden",
                                                    isActive
                                                        ? "border-yellow-500 bg-yellow-500/10"
                                                        : isUnlocked
                                                        ? "border-slate-600 bg-slate-900/50"
                                                        : "border-slate-800 bg-black/40 opacity-80"
                                                )}
                                            >
                                                <div className="text-sm font-bold text-slate-200 text-center">{cosmetic.name}</div>
                                                
                                                {!isUnlocked ? (
                                                    <div className={cn("text-xs font-mono font-bold px-3 py-1 rounded bg-black/50 border", canAfford ? "text-blue-400 border-blue-500/30" : "text-red-500 border-red-500/30")}>
                                                        {cost} 💎
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] text-green-500 font-mono">UNLOCKED</div>
                                                )}

                                                {isActive && <div className="text-[10px] text-yellow-500 font-bold">EQUIPPED</div>}
                                            </div>
                                        );
                                    })}
                                </div>
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
