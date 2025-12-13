import React from 'react';
import { motion } from 'framer-motion';
import type { UnitInstance } from '../types';
import { cn } from '../lib/utils';
import { useGameStore } from '../store/gameStore';

const FACTION_FOLDERS: Record<string, string> = {
  'Jovian': 'jovian',
  'Megacorp': 'megacorp',
  'Voidborn': 'voidborn',
  'Bio-horror': 'biohorror',
  'Republic': 'republic',
  'Confederate': 'neutral',
  'Neutral': 'neutral',
};

interface UnitProps {
  unit: UnitInstance;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isTarget?: boolean; // If being targeted
  canAttack?: boolean; // Green glow if ready
  className?: string;
  layoutId?: string;
}

export const Unit: React.FC<UnitProps> = ({ unit, onClick, onContextMenu, isTarget, canAttack, className, layoutId }) => {
  const isTaunt = unit.mechanics.some(m => m.type === 'guard');
  
  const isAttacking = useGameStore(state => state.attackingUnitId === unit.uid);
  
  const folder = FACTION_FOLDERS[unit.faction] || 'neutral';
  const imagePath = `/assets/cards/${folder}/${unit.baseAsset}_original.png`;

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
          scale: isTarget ? 1.1 : (isAttacking ? 1.1 : 1), 
          opacity: 1,
          x: isAttacking ? (unit.owner === 'player' ? 0 : 0) : 0, // X movement handled by parent logic if needed, or simple shake
          y: isAttacking ? (unit.owner === 'enemy' ? 20 : -20) : 0
      }}
      exit={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        "relative w-24 h-32 bg-slate-900 border-2 rounded-lg cursor-pointer shadow-md group",
        unit.owner === 'player' ? "border-cyan-600" : "border-red-600",
        isTaunt && "border-4 border-slate-300 shadow-[0_0_10px_white]",
        canAttack && "shadow-[0_0_15px_#00ffff] ring-2 ring-cyan-400",
        isTarget && "ring-4 ring-red-500",
        isAttacking && "z-50 shadow-2xl",
        className
      )}
    >
        {/* Name Tag (Floating Above) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[140%] text-center pointer-events-none z-10">
            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded shadow-sm whitespace-nowrap border border-white/10">
                {unit.name.split(',')[0]}
            </span>
        </div>

        {/* Full Art */}
        <img 
            src={imagePath}
            alt={unit.name}
            className="absolute inset-0 w-full h-full object-cover rounded-[4px]"
            onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
            }}
        />
        
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent rounded-b-[4px]" />

        {/* Stats */}
        <div className="absolute bottom-1 left-1.5 text-xl font-mono font-bold text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] leading-none">
            {unit.atk}
        </div>
         <div className="absolute bottom-1 right-1.5 text-xl font-mono font-bold text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] leading-none">
            {unit.hp}
        </div>
        
        {/* Status Icons */}
        <div className="absolute -top-2 -right-2 flex gap-1 flex-wrap justify-end max-w-[40px] z-20">
            {isTaunt && <span className="bg-slate-200 text-black text-[10px] px-1 rounded font-bold shadow-sm border border-slate-400" title="Guard">🛡</span>}
            {(unit.status?.stun || 0) > 0 && <span className="bg-blue-500 text-white text-[10px] px-1 rounded font-bold shadow-sm animate-pulse border border-blue-400" title="Stunned">💫</span>}
            {(unit.status?.weak || 0) > 0 && <span className="bg-orange-500 text-black text-[10px] px-1 rounded font-bold shadow-sm border border-orange-400" title="Weakened">📉</span>}
        </div>
    </motion.div>
  );
};