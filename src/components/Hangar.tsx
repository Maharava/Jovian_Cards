import React, { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';
import { ALL_CARDS } from '../data/cards';
import { Card } from './Card';
import { cn } from '../lib/utils';
import type { Card as CardType } from '../types';

interface StackProps {
    cardId: string;
    def: CardType;
    owned: number;
    inDeck: number;
    onAdd: (id: string) => void;
    onContextMenu: (def: CardType) => void;
}

const CardStack: React.FC<StackProps> = ({ cardId, def, owned, inDeck, onAdd, onContextMenu }) => {
    const indices = Array.from({ length: owned }).map((_, i) => i);
    const [tooltipPosition, setTooltipPosition] = React.useState<{ x: number; y: number } | null>(null);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onContextMenu(def);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({ x: rect.left, y: rect.bottom });
    };

    const handleMouseLeave = () => {
        setTooltipPosition(null);
    };

    return (
        <>
        <div
            className="relative w-48 h-64 group cursor-pointer transition-transform hover:scale-105"
            onClick={() => onAdd(cardId)}
            onContextMenu={handleRightClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {indices.reverse().map((stackIndex, _arrayIndex) => {
                const isUsed = stackIndex >= (owned - inDeck);
                const offset = stackIndex * 5;
                const isFront = stackIndex === 0;

                return (
                    <div
                        key={`${cardId}-stack-${stackIndex}`}
                        className={cn(
                            "absolute transition-all duration-300 origin-bottom-left",
                            isUsed ? "grayscale brightness-50" : "hover:brightness-110 shadow-lg"
                        )}
                        style={{
                            zIndex: 100 - stackIndex,
                            top: -offset,
                            left: offset,
                        }}
                    >
                         <div className="scale-90 origin-top-left w-[111%] h-[111%]">
                            <Card card={def} showTooltip={isFront} />
                         </div>
                    </div>
                );
            })}

            <div className="absolute bottom-[26px] -right-14 z-[200] bg-cyan-900 border border-cyan-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-xs">
                {owned - inDeck} / {owned}
            </div>
        </div>

        {/* Lore Tooltip - Fixed positioning to escape overflow */}
        {def.lore && tooltipPosition && (
            <div
                className="fixed w-64 bg-black/95 border border-slate-700 p-3 rounded text-center z-[10002] pointer-events-none"
                style={{
                    left: `${tooltipPosition.x + 96}px`, // Center under card (192px / 2)
                    top: `${tooltipPosition.y}px`,
                    transform: 'translateX(-50%)'
                }}
            >
                <p className="text-xs text-slate-400 italic font-serif">"{def.lore}"</p>
            </div>
        )}
        </>
    );
};

export const Hangar: React.FC = () => {
  const { savedDecks, activeDeckId, saveDeck, setActiveDeck, collection } = useMetaStore();
  const goToMainMenu = useGameStore(state => state.goToMainMenu);

  const [currentDeckId, setCurrentDeckId] = useState<string>(activeDeckId || 'new');
  const [deckName, setDeckName] = useState(savedDecks.find(d => d.id === activeDeckId)?.name || 'New Loadout');
  const [selectedCards, setSelectedCards] = useState<string[]>(
      savedDecks.find(d => d.id === activeDeckId)?.cardIds || []
  );

  const [typeFilter, setTypeFilter] = useState<'unit' | 'tactic'>('unit');
  const [factionFilter, setFactionFilter] = useState<string>('All');
  const [rarityFilter, setRarityFilter] = useState<string>('All');
  const [energyFilter, setEnergyFilter] = useState<string>('All');

  const [inspectingCard, setInspectingCard] = useState<CardType | null>(null);
  const [hoveredDeckCard, setHoveredDeckCard] = useState<CardType | null>(null);

  const factions = ['All', 'Jovian', 'Megacorp', 'Republic', 'Confederate', 'Voidborn', 'Bio-horror', 'Neutral'];
  const rarities = ['All', 'Common', 'Uncommon', 'Rare', 'Legendary'];
  const energyCosts = ['All', '0', '1', '2', '3', '4', '5', '6', '7', '8+'];

  const displayStacks = useMemo(() => {
      const stacks: { cardId: string, def: CardType, owned: number }[] = [];

      Object.entries(collection).forEach(([cardId, count]) => {
          const def = ALL_CARDS.find(c => c.id === cardId);
          if (!def) return;

          if (def.type !== typeFilter) return;
          if (factionFilter !== 'All' && def.faction !== factionFilter) return;
          if (rarityFilter !== 'All' && def.rarity !== rarityFilter) return;
          if (energyFilter !== 'All') {
              if (energyFilter === '8+') {
                  if (def.cost < 8) return;
              } else {
                  if (def.cost !== parseInt(energyFilter)) return;
              }
          }

          stacks.push({
              cardId,
              def,
              owned: count
          });
      });

      // Sort alphabetically by base name, then by tier
      return stacks.sort((a, b) => {
          const aBase = a.def.name.split(',')[0].trim();
          const bBase = b.def.name.split(',')[0].trim();
          if (aBase === bBase) return a.def.tier - b.def.tier;
          return aBase.localeCompare(bBase);
      });
  }, [typeFilter, factionFilter, rarityFilter, energyFilter, collection]);

  const deckStats = useMemo(() => {
      const units = selectedCards.filter(id => ALL_CARDS.find(c => c.id === id)?.type === 'unit').length;
      const tactics = selectedCards.filter(id => ALL_CARDS.find(c => c.id === id)?.type === 'tactic').length;
      return { units, tactics, total: selectedCards.length };
  }, [selectedCards]);

  const manaCurve = useMemo(() => {
      const distribution: Record<number, number> = {};
      let totalCost = 0;

      selectedCards.forEach(id => {
          const card = ALL_CARDS.find(c => c.id === id);
          if (card) {
              const cost = card.cost;
              distribution[cost] = (distribution[cost] || 0) + 1;
              totalCost += cost;
          }
      });

      const avgCost = selectedCards.length > 0
          ? (totalCost / selectedCards.length).toFixed(1)
          : '0.0';

      return { distribution, avgCost };
  }, [selectedCards]);

  const sortedDeckCards = useMemo(() => {
      return [...selectedCards].sort((a, b) => {
          const cardA = ALL_CARDS.find(c => c.id === a);
          const cardB = ALL_CARDS.find(c => c.id === b);
          if (!cardA || !cardB) return 0;
          return cardA.cost - cardB.cost;
      });
  }, [selectedCards]);

  const handleSave = () => {
      if (selectedCards.length < 20) {
          alert(`Deck must contain exactly 20 cards. Current: ${selectedCards.length}`);
          return;
      }
      if (selectedCards.length > 20) {
          alert(`Deck cannot exceed 20 cards. Current: ${selectedCards.length}`);
          return;
      }

      const id = currentDeckId === 'new' ? `deck_${Date.now()}` : currentDeckId;
      saveDeck({ id, name: deckName, cardIds: selectedCards });
      setActiveDeck(id);
      goToMainMenu();
  };

  const handleAddCard = (id: string) => {
      if (selectedCards.length >= 20) return;
      
      const inDeck = selectedCards.filter(c => c === id).length;
      const owned = collection[id] || 0;

      if (inDeck >= 3) return; 
      if (inDeck >= owned) return;

      setSelectedCards([...selectedCards, id]);
  };

  const handleRemoveCard = (idToRemove: string) => {
      // Find index of first occurrence to remove
      const index = selectedCards.findIndex(id => id === idToRemove);
      if (index > -1) {
        const newCards = [...selectedCards];
        newCards.splice(index, 1);
        setSelectedCards(newCards);
      }
  };

  return (
    <div className="absolute inset-0 bg-slate-950 text-white flex flex-col p-8 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <div>
                <h2 className="text-4xl font-mono font-bold text-cyan-400">ARMOURY // LOADOUT</h2>
                <div className="flex gap-4 mt-2 items-center">
                    <input 
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-white font-mono w-64 focus:border-cyan-500 outline-none"
                        placeholder="Deck Name"
                    />
                    <select 
                        value={currentDeckId}
                        onChange={(e) => {
                            const id = e.target.value;
                            setCurrentDeckId(id);
                            if (id === 'new') {
                                setDeckName('New Loadout');
                                setSelectedCards([]);
                            } else {
                                const d = savedDecks.find(deck => deck.id === id);
                                if (d) {
                                    setDeckName(d.name);
                                    setSelectedCards(d.cardIds);
                                }
                            }
                        }}
                        className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-slate-300 text-sm"
                    >
                        <option value="new">+ New Deck</option>
                        {savedDecks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="flex gap-4">
                <div className="flex gap-6 mr-4">
                    {/* Composition Stats */}
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase">Composition</div>
                        <div className={cn("text-xl font-mono font-bold", deckStats.total !== 20 ? "text-red-500" : "text-white")}>
                            {deckStats.total} / 20 Cards
                        </div>
                        <div className="text-xs text-slate-400">
                            {deckStats.units} Units · {deckStats.tactics} Tactics
                        </div>
                    </div>

                    {/* Energy Curve */}
                    <div className="text-left border-l border-white/10 pl-6">
                        <div className="text-xs text-slate-500 uppercase">Energy Curve</div>
                        {Object.keys(manaCurve.distribution).length > 0 ? (
                            <>
                                <div className="flex items-end gap-1 mt-1 h-10">
                                    {Object.entries(manaCurve.distribution)
                                        .sort(([a], [b]) => Number(a) - Number(b))
                                        .map(([cost, count]) => {
                                            const maxCount = Math.max(...Object.values(manaCurve.distribution));
                                            const heightPercent = (count / maxCount) * 100;
                                            return (
                                                <div
                                                    key={cost}
                                                    className="w-4 bg-cyan-500 rounded-t transition-all hover:bg-cyan-400 cursor-help"
                                                    style={{ height: `${heightPercent}%` }}
                                                    title={`${count} card${count > 1 ? 's' : ''} at cost ${cost}`}
                                                />
                                            );
                                        })}
                                </div>
                                <div className="flex gap-1 mt-1">
                                    {Object.entries(manaCurve.distribution)
                                        .sort(([a], [b]) => Number(a) - Number(b))
                                        .map(([cost, count]) => (
                                            <div key={cost} className="w-4 flex flex-col items-center">
                                                <div className="text-[9px] text-slate-400 font-mono">{cost}</div>
                                                <div className="text-[8px] text-slate-500 font-bold">{count}</div>
                                            </div>
                                        ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-xs text-slate-600 italic mt-2">No cards</div>
                        )}
                        <div className="text-xs text-slate-400 mt-2">
                            Avg: <span className="text-white font-bold">{manaCurve.avgCost}</span>
                        </div>
                    </div>
                </div>

                <button onClick={goToMainMenu} className="px-6 py-2 border border-slate-600 rounded hover:bg-slate-800">
                    CANCEL
                </button>
                <button onClick={handleSave} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded">
                    SAVE & EXIT
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 gap-8 overflow-hidden">
            
            {/* Collection (Left) */}
            <div className="flex-1 flex flex-col bg-slate-900/30 rounded-xl border border-white/5 p-4">
                {/* Filters */}
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex gap-2">
                        <button onClick={() => setTypeFilter('unit')} className={cn("flex-1 py-2 rounded text-sm font-bold uppercase", typeFilter === 'unit' ? "bg-cyan-900/50 text-cyan-400 border border-cyan-700" : "bg-slate-800 text-slate-500")}>Units</button>
                        <button onClick={() => setTypeFilter('tactic')} className={cn("flex-1 py-2 rounded text-sm font-bold uppercase", typeFilter === 'tactic' ? "bg-blue-900/50 text-blue-400 border border-blue-700" : "bg-slate-800 text-slate-500")}>Tactics</button>
                    </div>
                    
                    {/* Faction Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
                        {factions.map(f => (
                            <button 
                                key={f} 
                                onClick={() => setFactionFilter(f)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-mono whitespace-nowrap border transition-colors",
                                    factionFilter === f 
                                        ? "bg-slate-700 border-white text-white" 
                                        : "bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between gap-4">
                        {/* Energy Filter */}
                         <div className="flex gap-1 overflow-x-auto no-scrollbar">
                            <span className="text-[10px] text-slate-500 self-center mr-1">COST:</span>
                             {energyCosts.map(e => (
                                <button 
                                    key={e} 
                                    onClick={() => setEnergyFilter(e)}
                                    className={cn(
                                        "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-colors",
                                        energyFilter === e 
                                            ? "bg-cyan-600 text-white" 
                                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                                    )}
                                >
                                    {e}
                                </button>
                            ))}
                        </div>

                        {/* Rarity Filter */}
                        <div className="flex gap-1">
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
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-8 pr-4 content-start pt-4 pl-4">
                    {displayStacks.map((stack) => {
                        const inDeck = selectedCards.filter(id => id === stack.cardId).length;
                        return (
                            <CardStack
                                key={stack.cardId}
                                cardId={stack.cardId}
                                def={stack.def}
                                owned={stack.owned}
                                inDeck={inDeck}
                                onAdd={handleAddCard}
                                onContextMenu={setInspectingCard}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Deck List (Right) */}
            <div className="w-1/3 flex flex-col bg-slate-900/80 rounded-xl border border-white/10 p-4 relative">
                <h3 className="text-slate-400 font-mono uppercase text-sm mb-4 border-b border-white/10 pb-2">Current Loadout</h3>
                <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                    {sortedDeckCards.map((id, index) => {
                        const card = ALL_CARDS.find(c => c.id === id);
                        if (!card) return null;
                        return (
                            <div
                                key={`${id}-${index}`}
                                onClick={() => handleRemoveCard(id)}
                                onMouseEnter={() => setHoveredDeckCard(card)}
                                onMouseLeave={() => setHoveredDeckCard(null)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setInspectingCard(card);
                                }}
                                className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700 hover:bg-red-900/30 cursor-pointer group"
                            >
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black", card.type === 'unit' ? "bg-yellow-500" : "bg-blue-500")}>
                                        {card.cost}
                                    </div>
                                    <span className="text-sm font-mono">
                                        {card.name} 
                                        {card.type === 'unit' && <span className="text-slate-500 text-xs ml-1">(T{card.tier})</span>}
                                    </span>
                                </div>
                                <span className="text-xs text-red-500 opacity-0 group-hover:opacity-100">REMOVE</span>
                            </div>
                        );
                    })}
                    {selectedCards.length === 0 && (
                        <div className="text-center text-slate-600 mt-10 italic">No cards selected</div>
                    )}
                </div>

                {/* Hover Preview */}
                {hoveredDeckCard && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-4 pointer-events-none z-[9997]">
                        <Card card={hoveredDeckCard} className="w-48 h-64" disabled={false} showTooltip={false} />
                    </div>
                )}
            </div>

        </div>

        {/* Inspection Modal */}
        {inspectingCard && (
            <div className="absolute inset-0 z-[10004] bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm" onClick={() => setInspectingCard(null)}>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <Card
                        card={inspectingCard}
                        className="w-80 h-[500px] hover:scale-100"
                        disabled={false}
                        showTooltip={true}
                    />
                    <button
                        onClick={() => setInspectingCard(null)}
                        className="absolute -top-12 -right-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg border border-red-400"
                    >
                        CLOSE
                    </button>
                    {inspectingCard.lore && (
                        <div className="mt-8 max-w-xs mx-auto text-center italic text-slate-500 font-serif text-sm px-4">
                            "{inspectingCard.lore}"
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};