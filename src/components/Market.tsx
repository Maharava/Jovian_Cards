import React, { useState, useMemo } from 'react';
import { useMetaStore } from '../store/metaStore';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';
import { Card } from './Card';
import { FACTION_FOLDERS } from '../lib/assetUtils';
import { cn } from '../lib/utils';
import { PACKS } from '../data/market';
import { processPackOpening, type OpenPackResult } from '../logic/market';

export const Market: React.FC = () => {
    const { credits, spendCredits, collection, unlockCard, addResource, parts, bioSamples, psiCrystals, marketRotationFaction } = useMetaStore();
    const goToMainMenu = useGameStore(state => state.goToMainMenu);
    
    const [openedCards, setOpenedCards] = useState<OpenPackResult[] | null>(null);
    const [isOpening, setIsOpening] = useState(false);

    // Resolve Faction Pack Image safely
    const factionImage = useMemo(() => {
        const pool = ALL_CARDS.filter(c => c.faction === marketRotationFaction && c.tier === 1 && c.type === 'unit');
        if (pool.length > 0) {
            const card = pool[Math.floor(Math.random() * pool.length)];
             const folder = FACTION_FOLDERS[card.faction] || 'neutral';
             return `/assets/cards/${folder}/${card.baseAsset}_tier1.png`;
        }
        return '/assets/ui/requisition.png';
    }, [marketRotationFaction]);

    const handleBuy = (pack: typeof PACKS[0]) => {
        if (!spendCredits(pack.cost)) return; 

        setIsOpening(true);
        setTimeout(() => {
            const results = processPackOpening(
                pack, 
                collection, 
                unlockCard, 
                addResource,
                marketRotationFaction
            );
            
            setOpenedCards(results);
            setIsOpening(false);
        }, 1000); 
    };

    return (
        <div className="absolute inset-0 bg-slate-950 text-white flex flex-col overflow-hidden">
            {/* Vendor Background */}
            <div className="absolute inset-0 opacity-30 bg-[url('/assets/ui/market_bg.jpg')] bg-cover bg-center pointer-events-none" />
            <img 
                src="/assets/ui/merchant.png" 
                className="absolute bottom-0 left-0 h-[80%] opacity-80 pointer-events-none z-0" 
                alt="Merchant"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
            />
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-8 border-b border-white/10 bg-black/40 backdrop-blur-sm">
                <div>
                    <h2 className="text-4xl font-mono font-bold text-yellow-500 flex items-center gap-4">
                        <span className="text-5xl">❖</span> BLACK MARKET
                    </h2>
                    <p className="text-slate-400 mt-1">"I have what you need... for a price."</p>
                </div>
                
                <div className="flex gap-8 text-right font-mono">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Credits</span>
                        <span className="text-2xl text-yellow-400 font-bold">{credits} ₡</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Scrap / Bio / Psi</span>
                        <span className="text-sm text-slate-300">
                            {parts} ⚙  {bioSamples} 🧬  {psiCrystals} 🔮
                        </span>
                    </div>
                    <button 
                        onClick={goToMainMenu}
                        className="px-6 py-2 border border-slate-600 rounded hover:bg-slate-800 transition-colors"
                    >
                        EXIT
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center gap-8 p-8">
                {PACKS.map(pack => {
                    const isFaction = pack.isFaction;
                    const displayName = isFaction ? `${marketRotationFaction} Shipment` : pack.name;
                    const displayDesc = isFaction ? `Supplies from the ${marketRotationFaction} sector. 50% chance of faction cards.` : pack.desc;
                    const displayImg = isFaction ? factionImage : `/assets/ui/${pack.img}`;

                    return (
                        <div key={pack.id} className={cn(
                            "w-80 bg-slate-900/90 border rounded-xl p-6 flex flex-col items-center gap-6 transition-transform hover:scale-105 group relative overflow-hidden backdrop-blur-md",
                            pack.isExotic ? "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "border-slate-700",
                            isFaction && "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        )}>
                            {pack.isExotic && <div className="absolute top-0 right-0 bg-purple-600 text-black font-bold text-xs px-2 py-1 z-20">VOID CHANCE</div>}
                            {isFaction && <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-xs px-2 py-1 z-20">{marketRotationFaction.toUpperCase()}</div>}

                            {isFaction ? (
                                // Faction pack: Image scaled to fit with text below
                                <>
                                    <div className="w-full h-48 bg-black/50 rounded flex items-center justify-center relative overflow-hidden">
                                        <img
                                            src={displayImg}
                                            alt={displayName}
                                            className="object-contain h-full w-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-2xl font-mono font-bold text-blue-400">
                                            {displayName}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-2 min-h-[3em]">{displayDesc}</p>
                                    </div>
                                </>
                            ) : (
                                // Standard pack: Separate image and text sections
                                <>
                                    <div className="w-full h-48 bg-black/50 rounded flex items-center justify-center relative overflow-hidden">
                                        <img
                                            src={displayImg}
                                            alt={displayName}
                                            className="object-cover h-full w-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <h3 className={cn("text-2xl font-mono font-bold", pack.isExotic ? "text-purple-400" : "text-white")}>
                                            {displayName}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-2 min-h-[3em]">{displayDesc}</p>
                                    </div>
                                </>
                            )}

                            <ul className="w-full text-xs text-slate-500 space-y-1 font-mono bg-black/20 p-2 rounded">
                                <li className="flex justify-between"><span>Cards:</span> <span className="text-white">{pack.count}</span></li>
                                <li className="flex justify-between"><span>Common:</span> <span>{pack.chances.Common * 100}%</span></li>
                                <li className="flex justify-between"><span>Uncommon:</span> <span className="text-blue-400">{Math.round(pack.chances.Uncommon * 100)}%</span></li>
                                <li className="flex justify-between"><span>Rare:</span> <span className="text-yellow-400">{Math.round(pack.chances.Rare * 100)}%</span></li>
                                <li className="flex justify-between"><span>Legendary:</span> <span className="text-orange-500">{Math.round(pack.chances.Legendary * 100)}%</span></li>
                            </ul>

                            <button 
                                onClick={() => handleBuy(pack)}
                                disabled={credits < pack.cost}
                                className={cn(
                                    "w-full py-3 font-bold text-lg rounded transition-all",
                                    credits >= pack.cost 
                                        ? "bg-yellow-600 hover:bg-yellow-500 text-black shadow-lg" 
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {pack.cost} ₡
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Opening Overlay */}
            {(isOpening || openedCards) && (
                <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
                    {isOpening ? (
                        <div className="text-6xl animate-bounce">📦</div>
                    ) : (
                        <div className="flex flex-col items-center gap-8 w-full h-full p-8 overflow-y-auto">
                            <h2 className="text-3xl font-mono font-bold text-white mb-4">ACQUISITION COMPLETE</h2>
                            
                            <div className="flex gap-6 justify-center flex-wrap max-w-7xl pb-8">
                                {openedCards?.map((item, i) => {
                                    // Rarity glow colors
                                    const rarityGlow = {
                                        'Common': 'drop-shadow-[0_0_8px_rgba(148,163,184,0.6)]',
                                        'Uncommon': 'drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]',
                                        'Rare': 'drop-shadow-[0_0_16px_rgba(250,204,21,0.9)]',
                                        'Legendary': 'drop-shadow-[0_0_20px_rgba(249,115,22,1.0)]',
                                        'NA': ''
                                    }[item.card.rarity] || '';

                                    return (
                                    <div key={i} className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-12 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="relative group">

                                            {/* Card Display - Greyed if Duplicate, Glow if New */}
                                            <div className={cn(
                                                "transition-all",
                                                item.isNew ? `hover:scale-110 hover:z-10 ${rarityGlow}` : "grayscale brightness-50 opacity-60"
                                            )}>
                                                <Card card={item.card} />
                                            </div>
                                            
                                            {/* New Badge */}
                                            {item.isNew && (
                                                <div className="absolute -top-4 -right-4 bg-cyan-500 text-black font-black text-xs px-3 py-1 rounded-full shadow-[0_0_15px_#00ffff] animate-bounce z-[100] border-2 border-white">
                                                    NEW!
                                                </div>
                                            )}

                                            {/* Duplicate Overlay Info */}
                                            {item.partsGained && (
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-50 drop-shadow-md">
                                                    <div className="text-4xl mb-2">
                                                        {item.partsGained.type === 'bio' ? '🧬' : (item.partsGained.type === 'psi' ? '🔮' : '⚙')}
                                                    </div>
                                                    <div className="text-yellow-400 font-black text-3xl stroke-black text-shadow">+{item.partsGained.amount}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>

                            <button 
                                onClick={() => setOpenedCards(null)}
                                className="mt-4 px-12 py-4 bg-white text-black font-bold text-xl rounded hover:scale-105 transition-transform shadow-[0_0_20px_white]"
                            >
                                CONFIRM
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};