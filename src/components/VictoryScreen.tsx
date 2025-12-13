import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const VictoryScreen: React.FC = () => {
  const enterFactionSelect = useGameStore(state => state.enterFactionSelect);
  const lastLoot = useGameStore(state => state.lastLoot);

  const loot = lastLoot || { credits: 0, parts: 0, bio: 0, psi: 0 };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white"
    >
        <motion.div 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-slate-900 border-2 border-cyan-500/50 p-12 rounded-2xl max-w-3xl w-full text-center shadow-[0_0_50px_rgba(6,182,212,0.3)]"
        >
            <motion.h2 
                initial={{ letterSpacing: "0em" }}
                animate={{ letterSpacing: "0.1em" }}
                transition={{ duration: 1 }}
                className="text-6xl font-black text-cyan-400 mb-2 font-mono uppercase drop-shadow-lg"
            >
                Victory
            </motion.h2>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-cyan-500 mx-auto mb-8 shadow-[0_0_10px_rgba(0,255,255,0.8)]" 
            />
            
            <p className="text-xl text-slate-300 mb-12">
                Hostiles neutralized. Resources secured.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-12 bg-black/50 p-8 rounded-xl border border-white/10">
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Credits</span>
                    <span className="text-3xl text-yellow-400 font-bold font-mono">+{loot.credits} </span> 
                 </div>
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Tech Parts</span>
                    <span className="text-3xl text-emerald-400 font-bold font-mono">+{loot.parts}</span>
                 </div>
                 <div className="flex flex-col items-center border-r border-white/10 last:border-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Bio-Samples</span>
                    <span className="text-3xl text-red-400 font-bold font-mono">+{loot.bio}</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Psi-Crystals</span>
                    <span className="text-3xl text-purple-400 font-bold font-mono">+{loot.psi}</span>
                 </div>
            </div>
            
            <div className="text-xs text-slate-500 mb-8 uppercase tracking-widest">
                * Recovered from enemy wreckage
            </div>

            <div className="flex gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={enterFactionSelect}
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-lg rounded shadow-lg uppercase tracking-wider"
                >
                  Return to Command
                </motion.button>
            </div>
        </motion.div>
    </motion.div>
  );
};