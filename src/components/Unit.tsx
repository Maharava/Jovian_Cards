import React from 'react';
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
}

export const Unit: React.FC<UnitProps> = ({ unit, onClick, onContextMenu, isTarget, canAttack, className }) => {
  const isTaunt = unit.mechanics.some(m => m.type === 'guard');
  
  const isAttacking = useGameStore(state => state.attackingUnitId === unit.uid);
  
  const folder = FACTION_FOLDERS[unit.faction] || 'neutral';
  // Note: We assume on-board units use the "original" (Tier 1 visual) or we could map tier if UnitInstance had it.
  // Currently UnitInstance doesn't track tier, but baseAsset is usually the tier 1 name (e.g. 'elara').
  // Some assets are explicitly '..._tier2' if baseAsset was set that way, but standard is baseAsset + suffix.
  // Card.tsx appends suffix. We'll assume '_original' for board units for consistency/simplicity unless baseAsset includes it?
  // Card.tsx: const assetSuffix = card.tier === 1 ? '_original' : `_tier${card.tier}`;
  // UnitInstance copies baseAsset from card.
  // So we default to '_original' here.
  const imagePath = `/assets/cards/${folder}/${unit.baseAsset}_original.png`;

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        "relative w-24 h-32 bg-slate-900 border-2 rounded-lg cursor-pointer transition-all duration-500 shadow-md group",
        unit.owner === 'player' ? "border-cyan-600 animate-in slide-in-from-bottom-8 fade-in duration-500" : "border-red-600 animate-in slide-in-from-top-8 fade-in duration-700",
        isTaunt && "border-4 border-slate-300 shadow-[0_0_10px_white]",
        canAttack && "shadow-[0_0_15px_#00ffff] ring-2 ring-cyan-400",
        isTarget && "ring-4 ring-red-500 scale-110",
        isAttacking && (unit.owner === 'enemy' ? "translate-y-20 scale-110 z-50 shadow-2xl shadow-red-500" : "-translate-y-20 scale-110 z-50 shadow-2xl shadow-cyan-500"),
        unit.dying && "opacity-0 translate-x-24 rotate-45 scale-50 blur-sm",
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
    </div>
  );
};