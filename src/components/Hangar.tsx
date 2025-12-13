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
}

const CardStack: React.FC<StackProps> = ({ cardId, def, owned, inDeck, onAdd }) => {
    const indices = Array.from({ length: owned }).map((_, i) => i);

    return (
        <div 
            className="relative w-48 h-64 group cursor-pointer transition-transform hover:scale-105"
            onClick={() => onAdd(cardId)}
        >
            {indices.reverse().map(i => { 
                const isUsed = i >= (owned - inDeck);
                const offset = i * 5; 
                const isFront = i === 0;

                return (
                    <div 
                        key={i}
                        className={cn(
                            "absolute transition-all duration-300 origin-bottom-left",
                            isUsed ? "grayscale brightness-50" : "hover:brightness-110 shadow-lg"
                        )}
                        style={{
                            zIndex: 100 - i, 
                            top: -offset,
                            left: offset,
                        }}
                    >
                         <div className="scale-90 origin-top-left w-[111%] h-[111%] pointer-events-none">
                            <Card card={def} showTooltip={isFront} />
                         </div>
                    </div>
                );
            })}
            
            <div className="absolute -bottom-4 -right-4 z-[200] bg-cyan-900 border border-cyan-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-xs">
                {owned - inDeck} / {owned}
            </div>
        </div>
    );
};

export const Hangar: React.FC = () => {
  const { savedDecks, activeDeckId, saveDeck, setActiveDeck, collection } = useMetaStore();
  
  const [currentDeckId, setCurrentDeckId] = useState<string>(activeDeckId || 'new');
  const [deckName, setDeckName] = useState(savedDecks.find(d => d.id === activeDeckId)?.name || 'New Loadout');
  const [selectedCards, setSelectedCards] = useState<string[]>(
      savedDecks.find(d => d.id === activeDeckId)?.cardIds || []
  );
  
  const [typeFilter, setTypeFilter] = useState<'unit' | 'tactic'>('unit');
  const [factionFilter, setFactionFilter] = useState<string>('All');
  const [rarityFilter, setRarityFilter] = useState<string>('All');

  const factions = ['All', 'Jovian', 'Megacorp', 'Republic', 'Confederate', 'Voidborn', 'Bio-horror', 'Neutral'];
  const rarities = ['All', 'Common', 'Uncommon', 'Rare'];

  const displayStacks = useMemo(() => {
      const stacks: { cardId: string, def: CardType, owned: number }[] = [];
      
      Object.entries(collection).forEach(([cardId, count]) => {
          const def = ALL_CARDS.find(c => c.id === cardId);
          if (!def) return;
          
          if (def.type !== typeFilter) return;
          if (factionFilter !== 'All' && def.faction !== factionFilter) return;
          if (rarityFilter !== 'All' && def.rarity !== rarityFilter) return;

          stacks.push({ 
              cardId, 
              def, 
              owned: count
          });
      });
      
      return stacks.sort((a, b) => a.def.cost - b.def.cost);
  }, [typeFilter, factionFilter, rarityFilter, collection]);

  const deckStats = useMemo(() => {
      const units = selectedCards.filter(id => ALL_CARDS.find(c => c.id === id)?.type === 'unit').length;
      const tactics = selectedCards.filter(id => ALL_CARDS.find(c => c.id === id)?.type === 'tactic').length;
      return { units, tactics, total: selectedCards.length };
  }, [selectedCards]);

  const handleSave = () => {
      const id = currentDeckId === 'new' ? `deck_${Date.now()}` : currentDeckId;
      saveDeck({ id, name: deckName, cardIds: selectedCards });
      setActiveDeck(id);
      useGameStore.getState().goToMainMenu(); 
  };

  const handleAddCard = (id: string) => {
      if (selectedCards.length >= 20) return;
      
      const inDeck = selectedCards.filter(c => c === id).length;
      const owned = collection[id] || 0;

      if (inDeck >= 3) return; 
      if (inDeck >= owned) return;

      setSelectedCards([...selectedCards, id]);
  };

  const handleRemoveCard = (index: number) => {
      const newCards = [...selectedCards];
      newCards.splice(index, 1);
      setSelectedCards(newCards);
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
                <div className="text-right mr-4">
                    <div className="text-xs text-slate-500 uppercase">Composition</div>
                    <div className={cn("text-xl font-mono font-bold", deckStats.total > 20 ? "text-red-500" : "text-white")}>
                        {deckStats.total} / 20 Cards
                    </div>
                    <div className="text-xs text-slate-400">
                        {deckStats.units} Units · {deckStats.tactics} Tactics
                    </div>
                </div>
                <button onClick={() => useGameStore.getState().goToMainMenu()} className="px-6 py-2 border border-slate-600 rounded hover:bg-slate-800">
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
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar flex-1">
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
                            />
                        );
                    })}
                </div>
            </div>

            {/* Deck List (Right) */}
            <div className="w-1/3 flex flex-col bg-slate-900/80 rounded-xl border border-white/10 p-4">
                <h3 className="text-slate-400 font-mono uppercase text-sm mb-4 border-b border-white/10 pb-2">Current Loadout</h3>
                <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                    {selectedCards.map((id, index) => {
                        const card = ALL_CARDS.find(c => c.id === id);
                        if (!card) return null;
                        return (
                            <div key={`${id}-${index}`} onClick={() => handleRemoveCard(index)} className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700 hover:bg-red-900/30 cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black", card.type === 'unit' ? "bg-yellow-500" : "bg-blue-500")}>
                                        {card.cost}
                                    </div>
                                    <span className="text-sm font-mono">{card.name}</span>
                                </div>
                                <span className="text-xs text-red-500 opacity-0 group-hover:opacity-100">REMOVE</span>
                            </div>
                        );
                    })}
                    {selectedCards.length === 0 && (
                        <div className="text-center text-slate-600 mt-10 italic">No cards selected</div>
                    )}
                </div>
            </div>

        </div>
    </div>
  );
};
