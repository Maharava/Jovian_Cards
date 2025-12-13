import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';

export const VictoryScreen: React.FC = () => {
  const enterFactionSelect = useGameStore(state => state.enterFactionSelect);
  const { credits, parts, bioSamples, psiCrystals } = useMetaStore();

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
        <div className="bg-slate-900 border-2 border-cyan-500/50 p-12 rounded-2xl max-w-3xl w-full text-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <h2 className="text-6xl font-black text-cyan-400 mb-2 font-mono tracking-tighter uppercase drop-shadow-lg">
                Victory
            </h2>
            <div className="h-1 w-32 bg-cyan-500 mx-auto mb-8 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
            
            <p className="text-xl text-slate-300 mb-12">
                Hostiles neutralized. Salvage operations complete.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-12 bg-black/50 p-8 rounded-xl border border-white/10">
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Credits</span>
                    <span className="text-3xl text-yellow-400 font-bold font-mono">{credits} </span> 
                 </div>
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Tech Parts</span>
                    <span className="text-3xl text-emerald-400 font-bold font-mono">{parts}</span>
                 </div>
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Bio-Samples</span>
                    <span className="text-3xl text-red-400 font-bold font-mono">{bioSamples}</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Psi-Crystals</span>
                    <span className="text-3xl text-purple-400 font-bold font-mono">{psiCrystals}</span>
                 </div>
            </div>
            
            <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest">
                * Values represent current total stockpile
            </div>

            <div className="flex gap-4 justify-center">
                <button 
                  onClick={enterFactionSelect}
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-lg rounded shadow-lg transition-transform hover:scale-105 uppercase tracking-wider"
                >
                  Return to Command
                </button>
            </div>
        </div>
    </div>
  );
};