import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const MainMenu: React.FC = () => {
  const enterFactionSelect = useGameStore(state => state.enterFactionSelect);
  const enterHangar = useGameStore(state => state.enterHangar);
  const enterMarket = () => useGameStore.setState({ phase: 'market' });
  const enterWorkshop = () => useGameStore.setState({ phase: 'workshop' });

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center bg-[url('/assets/ui/main_menu_bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] mb-8">
          JOVIAN CARDS
        </h1>
        
        <div className="flex flex-col gap-4 w-96">
            <button 
              onClick={enterFactionSelect}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-2xl rounded clip-path-polygon transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
            >
              COMMAND HUB
            </button>

            <button 
              onClick={enterHangar}
              className="w-full py-3 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300 font-mono tracking-widest text-lg rounded transition-all hover:border-cyan-500 hover:text-cyan-400"
            >
              ARMOURY
            </button>

            <div className="flex gap-4">
                <button 
                  onClick={enterMarket}
                  className="flex-1 py-3 bg-slate-900/80 border border-slate-700 hover:bg-yellow-900/20 hover:border-yellow-600 text-yellow-500 font-mono tracking-wider text-sm rounded transition-all"
                >
                  MARKET
                </button>
                <button 
                  onClick={enterWorkshop}
                  className="flex-1 py-3 bg-slate-900/80 border border-slate-700 hover:bg-emerald-900/20 hover:border-emerald-600 text-emerald-500 font-mono tracking-wider text-sm rounded transition-all"
                >
                  WORKSHOP
                </button>
            </div>
        </div>

        <p className="mt-8 text-xs text-slate-500 font-mono">SYSTEM VERSION 0.4.2 // EARLY ACCESS</p>
      </div>
    </div>
  );
};