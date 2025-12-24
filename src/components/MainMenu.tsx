import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const MainMenu: React.FC = () => {
  const enterFactionSelect = useGameStore(state => state.enterFactionSelect);
  const enterHangar = useGameStore(state => state.enterHangar);
  const enterMarket = () => useGameStore.setState({ phase: 'market' });
  const enterWorkshop = () => useGameStore.setState({ phase: 'workshop' });
  const enterSettings = () => useGameStore.setState({ phase: 'settings' });

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center bg-[url('/assets/ui/main_menu_bg.jpg')] bg-cover bg-center overflow-hidden">
      <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/70" 
      />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] mb-8"
        >
          JOVIAN CARDS
        </motion.h1>
        
        <div className="flex flex-col gap-4 w-96">
            <motion.button 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(255,255,255)" }}
              whileTap={{ scale: 0.95 }}
              onClick={enterFactionSelect}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-2xl rounded clip-path-polygon shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
            >
              COMMAND HUB
            </motion.button>

            <motion.button 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: '#06b6d4', color: '#22d3ee' }}
              whileTap={{ scale: 0.95 }}
              onClick={enterHangar}
              className="w-full py-3 bg-slate-800 border border-slate-600 text-slate-300 font-mono tracking-widest text-lg rounded"
            >
              ARMOURY
            </motion.button>

            <div className="flex gap-4">
                <motion.button 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, borderColor: '#ca8a04', color: '#eab308' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={enterMarket}
                  className="flex-1 py-3 bg-slate-900/80 border border-slate-700 text-yellow-500 font-mono tracking-wider text-sm rounded"
                >
                  MARKET
                </motion.button>
                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, borderColor: '#059669', color: '#10b981' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={enterWorkshop}
                  className="flex-1 py-3 bg-slate-900/80 border border-slate-700 text-emerald-500 font-mono tracking-wider text-sm rounded"
                >
                  WORKSHOP
                </motion.button>
            </div>

            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, borderColor: '#64748b', color: '#94a3b8' }}
              whileTap={{ scale: 0.95 }}
              onClick={enterSettings}
              className="w-full py-2 bg-slate-900/60 border border-slate-700 text-slate-400 font-mono tracking-wider text-xs rounded"
            >
              SETTINGS
            </motion.button>
        </div>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-8 text-xs text-slate-500 font-mono"
        >
            SYSTEM VERSION 0.4.2 // EARLY ACCESS
        </motion.p>
      </div>
    </div>
  );
};