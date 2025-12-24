import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';

export const Settings: React.FC = () => {
  const returnToMainMenu = () => useGameStore.setState({ phase: 'main_menu' });
  const resetProgress = useMetaStore(state => state.resetProgress);

  const handleExportSave = () => {
    const saveData = localStorage.getItem('jovian_meta_storage_v4');
    if (saveData) {
      const blob = new Blob([saveData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jovian_cards_save_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleLoadSave = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const saveData = event.target?.result as string;
            localStorage.setItem('jovian_meta_storage_v4', saveData);
            window.location.reload();
          } catch (error) {
            alert('Failed to load save file. Invalid format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleWipeSave = () => {
    if (confirm('Are you sure you want to wipe all save data? This cannot be undone.')) {
      resetProgress();
      localStorage.removeItem('jovian_meta_storage_v4');
      window.location.reload();
    }
  };

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
          className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(100,116,139,0.5)] mb-8"
        >
          SETTINGS
        </motion.h1>

        <div className="flex flex-col gap-4 w-96">
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, borderColor: '#06b6d4' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportSave}
            className="w-full py-3 bg-slate-800 border border-slate-600 text-slate-300 font-mono tracking-widest text-lg rounded"
          >
            EXPORT SAVE
          </motion.button>

          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, borderColor: '#10b981' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadSave}
            className="w-full py-3 bg-slate-800 border border-slate-600 text-slate-300 font-mono tracking-widest text-lg rounded"
          >
            LOAD SAVE
          </motion.button>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWipeSave}
            className="w-full py-3 bg-red-900/30 border border-red-800 text-red-400 font-mono tracking-widest text-lg rounded"
          >
            WIPE SAVE
          </motion.button>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(255,255,255)" }}
            whileTap={{ scale: 0.95 }}
            onClick={returnToMainMenu}
            className="w-full py-4 mt-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-2xl rounded clip-path-polygon shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}
          >
            RETURN
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="mt-8 text-xs text-slate-500 font-mono"
        >
          SAVE MANAGEMENT // HANDLE WITH CARE
        </motion.p>
      </div>
    </div>
  );
};
