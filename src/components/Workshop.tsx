import React, { useState, useMemo } from 'react';
import { useMetaStore } from '../store/metaStore';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';
import { Card } from './Card';
import { cn } from '../lib/utils';
import type { Card as CardType } from '../types';

export const Workshop: React.FC = () => {
    const { collection, parts, bioSamples, psiCrystals, upgradeCard } = useMetaStore();
    const goToMainMenu = useGameStore(state => state.goToMainMenu);
    
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [rarityFilter, setRarityFilter] = useState<string>('All');
    const [isUpgrading, setIsUpgrading] = useState(false);

    const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary'];

    // Filter Collection for Upgradable Cards (Standard Faction Units, Tier < 3)
    const upgradableCards = useMemo(() => {
        const cards: { cardId: string, def: CardType, count: number }[] = [];
        const upgradableFactions = ['Jovian', 'Megacorp', 'Republic', 'Confederate', 'Neutral'];

        Object.entries(collection).forEach(([id, count]) => {
            const def = ALL_CARDS.find(c => c.id === id);
            // Logic: Must be Unit, from upgradable faction (excludes exotic factions), Tier < 3
            if (def && upgradableFactions.includes(def.faction) && def.type === 'unit' && def.tier < 3) {
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

    const getUpgradeInfo = (card: CardType) => {
        const nextTier = card.tier + 1;
        const baseId = card.id.split('_t')[0];
        const nextId = `${baseId}_t${nextTier}`;
        const nextCard = ALL_CARDS.find(c => c.id === nextId);

        let cost = 0;
        let resourceType: 'parts' | 'bio' | 'psi' = 'parts';
        let color = 'bg-slate-500';

        if (card.subtype === 'Cybernetic') { resourceType = 'parts'; color = 'bg-slate-400 border-slate-200 text-black'; } 
        if (card.subtype === 'Biological') { resourceType = 'bio'; color = 'bg-green-600 border-green-400 text-white'; } 
        if (card.subtype === 'Psionic') { resourceType = 'psi'; color = 'bg-pink-500 border-pink-300 text-white'; } 

        if (card.rarity === 'Common') cost = card.tier === 1 ? 3 : 8;
        if (card.rarity === 'Uncommon') cost = card.tier === 1 ? 5 : 12;
        if (card.rarity === 'Rare') cost = card.tier === 1 ? 8 : 20;
        if (card.rarity === 'Legendary') cost = card.tier === 1 ? 15 : 40;

        return { nextId, nextCard, cost, resourceType, color };
    };

    const handleUpgrade = async () => {
        if (!selectedCard) return;
        const { nextId, cost, resourceType } = getUpgradeInfo(selectedCard);
        
        setIsUpgrading(true);
        await new Promise(r => setTimeout(r, 800)); // Animation duration

        const success = upgradeCard(selectedCard.id, nextId, cost, resourceType);
        if (success) {
            // If we still have copies of the old card, we might keep it selected?
            // Actually user wants "have the upgraded one be the 'selected' card".
            // If we have copies, we show the stack.
            // If we converted the LAST copy, we MUST select the new one.
            // If we converted 1 of 2, we have 1 old and 1 new.
            // The UX request: "Then have the upgraded one be the 'selected' card."
            // So we ALWAYS switch selection to the new card type.
            setSelectedCardId(nextId); 
        }
        setIsUpgrading(false);
    };

    return (
        <div className="absolute inset-0 bg-slate-950 text-white flex flex-col p-8 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl font-mono font-bold text-slate-300">WORKSHOP // UPGRADES</h2>
                    <p className="text-slate-500 mt-1">Enhance unit capabilities.</p>
                </div>
                
                <div className="flex gap-8 text-right font-mono items-center">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tech Parts</span>
                        <span className="text-xl text-slate-300 font-bold">{parts} ⚙</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Bio-Samples</span>
                        <span className="text-xl text-green-400 font-bold">{bioSamples} 🧬</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Psi-Crystals</span>
                        <span className="text-xl text-pink-400 font-bold">{psiCrystals} 🔮</span>
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
                        {upgradableCards.map((item) => (
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
                        {upgradableCards.length === 0 && (
                            <div className="col-span-4 text-center text-slate-600 mt-20">
                                No upgradable units available.
                            </div>
                        )}
                    </div>
                </div>

                {/* Workbench (Right) */}
                <div className="w-1/3 bg-slate-900/50 rounded-xl border border-white/10 p-8 flex flex-col items-center justify-between relative overflow-hidden">
                    {selectedCard ? (
                        <>
                            {(() => {
                                const { nextCard, cost, resourceType, color } = getUpgradeInfo(selectedCard);
                                const canAfford = (resourceType === 'parts' && parts >= cost) ||
                                                  (resourceType === 'bio' && bioSamples >= cost) ||
                                                  (resourceType === 'psi' && psiCrystals >= cost);

                                return (
                                    <>
                                        {/* Preview Stack */}
                                        <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full py-4 overflow-y-auto no-scrollbar">
                                            {/* Current Card */}
                                            <div className={cn("transition-all duration-500 shrink-0", isUpgrading ? "opacity-30 scale-75 blur-sm" : "scale-90")}>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 text-center font-mono">Current Version</div>
                                                <Card card={selectedCard} />
                                            </div>

                                            {nextCard && (
                                                <>
                                                    {/* Faint Arrow */}
                                                    <div className="text-slate-800 text-3xl animate-pulse py-1">↓</div>

                                                    {/* Next Version */}
                                                    <div className={cn(
                                                        "transition-all duration-700 shrink-0", 
                                                        isUpgrading ? "scale-110 brightness-[150%] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" : "scale-90 opacity-80 grayscale-[20%]"
                                                    )}>
                                                        <div className="text-[10px] text-yellow-500/50 uppercase tracking-widest mb-1 text-center font-mono">Next Tier Preview</div>
                                                        <Card card={nextCard} />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Action Area */}
                                        <div className="w-full flex flex-col items-center gap-4 pt-6 border-t border-white/5 animate-in slide-in-from-bottom-4 fade-in">
                                            <div className="text-center font-mono text-xs text-slate-400">
                                                CONVERTING TO <span className="text-white font-bold uppercase">Tier {selectedCard.tier + 1}</span>
                                            </div>
                                            
                                            {nextCard ? (
                                                <button 
                                                    onClick={handleUpgrade}
                                                    disabled={!canAfford || isUpgrading}
                                                    className={cn(
                                                        "w-full py-4 rounded-lg font-black text-xl tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 border-2",
                                                        color,
                                                        (!canAfford || isUpgrading) && "opacity-50 grayscale cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500"
                                                    )}
                                                >
                                                    <span>{isUpgrading ? "UPGRADING..." : "UPGRADE UNIT"}</span>
                                                    {!isUpgrading && (
                                                        <span className="bg-black/20 px-2 rounded text-sm">
                                                            {cost} {resourceType === 'parts' ? '⚙' : (resourceType === 'bio' ? '🧬' : '🔮')}
                                                        </span>
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="text-red-500 font-bold font-mono py-2">MAX TIER REACHED</div>
                                            )}

                                            {!canAfford && nextCard && !isUpgrading && (
                                                <div className="text-red-500 text-[10px] font-mono tracking-tighter">INSUFFICIENT RESOURCES FOR UPGRADE</div>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </>
                    ) : (
                        <div className="text-slate-600 font-mono text-center">
                            <div className="text-6xl mb-4 opacity-20">🔧</div>
                            SELECT A UNIT TO UPGRADE
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};