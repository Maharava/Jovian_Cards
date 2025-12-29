import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const VictoryScreen: React.FC = () => {
  const enterFactionSelect = useGameStore(state => state.enterFactionSelect);
  const lastLoot = useGameStore(state => state.lastLoot);

  const loot = lastLoot || { credits: 0, platinum: 0, mossan: 0 };
  const hasMossan = loot.mossan > 0;

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

            <div className="grid grid-cols-2 gap-6 mb-8 bg-black/50 p-8 rounded-xl border border-white/10">
                 <div className="flex flex-col items-center border-r border-white/10">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Credits</span>
                    <span className="text-4xl text-yellow-400 font-bold font-mono">+{loot.credits} ₡</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Platinum</span>
                    <span className="text-4xl text-blue-400 font-bold font-mono">+{loot.platinum} 💎</span>
                 </div>
            </div>

            {/* Mossan Drop (Special - 5% chance) */}
            {hasMossan && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
                    className="mb-8 bg-gradient-to-br from-purple-900/50 to-black/50 p-6 rounded-xl border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="text-6xl mb-2"
                        >
                            ⚛️
                        </motion.div>
                        <span className="text-xs text-purple-400 uppercase tracking-widest mb-1">RARE DROP</span>
                        <span className="text-3xl text-purple-300 font-bold font-mono">+{loot.mossan} MOSSAN</span>
                        <p className="text-[10px] text-purple-500/70 mt-2">Mysterious void essence...</p>
                    </div>
                </motion.div>
            )}
            
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