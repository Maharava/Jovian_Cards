import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';
import { cn } from '../lib/utils';

export const FactionSelect: React.FC = () => {
  const startBattle = useGameStore(state => state.startBattle);
  const goToMainMenu = useGameStore(state => state.goToMainMenu);
  
  const { credits, parts, bioSamples, psiCrystals } = useMetaStore();

  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(1);

  const FACTIONS = [
    { id: 'Megacorp', name: 'Megacorp', desc: 'Drone Swarms & Automation', active: true, color: 'bg-slate-800 border-slate-500', drop: 'High: Tech Parts' },
    { id: 'Voidborn', name: 'Voidborn', desc: 'Cosmic Horror & Madness', active: false, color: 'bg-purple-900/50 border-purple-800', drop: 'High: Psi-Crystals' },
    { id: 'Biohorror', name: 'Bio-Horror', desc: 'Evolution & Mutation', active: false, color: 'bg-red-900/50 border-red-800', drop: 'High: Bio-Samples' },
    { id: 'Republic', name: 'Republic', desc: 'Order & Tactics', active: false, color: 'bg-blue-900/50 border-blue-800', drop: 'Balanced' },
  ];

  const handleLaunch = () => {
      if (selectedFaction) {
          startBattle(selectedFaction, difficulty);
      }
  };

  return (
    <div className="absolute inset-0 bg-slate-950 text-white flex flex-col p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
        <div>
           <div className="flex items-center gap-4">
               <button onClick={goToMainMenu} className="text-slate-500 hover:text-white transition-colors text-2xl">
                   ←
               </button>
               <div>
                   <h2 className="text-4xl font-mono font-bold text-cyan-400">COMMAND HUB</h2>
                   <p className="text-slate-400 mt-2">Select mission parameters.</p>
               </div>
           </div>
        </div>
        
        {/* Resources Panel */}
        <div className="flex gap-6 text-right font-mono bg-black/40 p-4 rounded-lg border border-white/10">
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Credits</span>
                <span className="text-xl text-yellow-400 font-bold">{credits} ₡</span>
            </div>
            <div className="w-px bg-white/20 h-full mx-2" />
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tech Parts</span>
                <span className="text-xl text-emerald-400 font-bold">{parts} ⚙</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Bio-Samples</span>
                <span className="text-xl text-red-400 font-bold">{bioSamples} 🧬</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Psi-Crystals</span>
                <span className="text-xl text-purple-400 font-bold">{psiCrystals} 🔮</span>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-8 overflow-hidden">
          
          {/* Mission Select (Left) */}
          <div className="w-1/2 flex flex-col overflow-y-auto pr-2">
              <h3 className="text-lg font-mono text-cyan-500 mb-4 border-l-4 border-cyan-500 pl-2">ACTIVE WARZONES</h3>
              <div className="grid grid-cols-1 gap-4">
                {FACTIONS.map(f => (
                    <button
                      key={f.id}
                      disabled={!f.active}
                      onClick={() => f.active && setSelectedFaction(f.id)}
                      className={cn(
                          "relative group flex flex-col items-start p-6 rounded-lg border-2 transition-all text-left",
                          selectedFaction === f.id ? "border-cyan-400 bg-slate-800 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "border-transparent " + f.color,
                          f.active 
                            ? "hover:border-slate-400 cursor-pointer" 
                            : "opacity-40 cursor-not-allowed grayscale"
                      )}
                    >
                        <div className="flex justify-between w-full">
                            <div className="text-2xl font-black uppercase mb-1 font-mono">{f.name}</div>
                            {selectedFaction === f.id && <div className="text-cyan-500 font-bold text-sm bg-black/50 px-2 py-1 rounded animate-pulse">SELECTED</div>}
                        </div>
                        <div className="text-slate-300 text-sm font-sans mb-2">{f.desc}</div>
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-wide">
                            Loot Intel: <span className="text-slate-300">{f.drop}</span>
                        </div>
                    </button>
                ))}
              </div>
          </div>

          {/* Mission Config (Right) */}
          <div className="w-1/2 flex flex-col bg-slate-900/40 rounded-xl border border-white/5 p-8 relative">
                
                {selectedFaction ? (
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
                        <h3 className="text-3xl font-mono text-white mb-8 border-b border-white/10 pb-4">
                            MISSION PARAMETERS
                        </h3>

                        {/* Difficulty Selector */}
                        <div className="mb-10">
                            <label className="text-sm text-cyan-500 font-mono uppercase tracking-widest mb-4 block">Threat Level</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(lvl => (
                                    <button
                                        key={lvl}
                                        disabled={lvl !== 1} // Only Tier 1 active for now
                                        onClick={() => setDifficulty(lvl)}
                                        className={cn(
                                            "flex-1 py-4 text-xl font-bold border rounded transition-all clip-path-polygon relative overflow-hidden",
                                            difficulty === lvl 
                                                ? "bg-red-900/80 border-red-500 text-red-100 shadow-[0_0_10px_red]" 
                                                : "bg-slate-800 border-slate-600 text-slate-500 hover:bg-slate-700",
                                            lvl !== 1 && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        {lvl}
                                        {lvl !== 1 && <span className="block text-[8px] uppercase">LOCKED</span>}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-slate-400 italic">
                                {difficulty === 1 ? "Standard patrol forces. Basic units only." : "High threat level detected."}
                            </p>
                        </div>

                        {/* Intel */}
                        <div className="flex-1">
                            <label className="text-sm text-cyan-500 font-mono uppercase tracking-widest mb-2 block">Intel</label>
                            <div className="bg-black/50 p-4 rounded text-sm text-slate-300 font-mono leading-relaxed border border-white/5">
                                Enemy forces in this sector are comprised of Tier {difficulty} units. 
                                <br/><br/>
                                <span className="text-red-400">WARNING:</span> Expect resistance from {FACTIONS.find(f => f.id === selectedFaction)?.name} automated systems.
                            </div>
                        </div>

                        {/* Launch Button */}
                        <button 
                            onClick={handleLaunch}
                            className="w-full py-6 mt-8 bg-red-600 hover:bg-red-500 text-white font-black text-2xl tracking-widest uppercase rounded shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all transform hover:scale-[1.02]"
                        >
                            LAUNCH MISSION
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-600 font-mono">
                        <div className="text-6xl mb-4 opacity-20">⚠</div>
                        <p>SELECT A WARZONE TO CONFIGURE MISSION</p>
                    </div>
                )}
          </div>
      </div>
    </div>
  );
};