import React from 'react';
import type { UnitInstance } from '../types';
import { cn } from '../lib/utils';

interface UnitProps {
  unit: UnitInstance;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  isTarget?: boolean; // If being targeted
  canAttack?: boolean; // Green glow if ready
  className?: string;
}

export const Unit: React.FC<UnitProps> = ({ unit, onClick, onContextMenu, isTarget, canAttack, className }) => {
  // We need to resolve the base asset from the ID or store extra metadata. 
  // Currently UnitInstance doesn't store baseAsset.
  // We might need to look it up or pass it. 
  // For now, let's assume we can derive it or it's passed.
  // Hack: we'll parse the name or store baseAsset in UnitInstance. 
  // I should update UnitInstance to have 'baseAsset'. 
  // But for now, I'll just use a placeholder or try to match name.
  
  // Actually, let's check the store logic. playUnit copies name.
  // I should add baseAsset to UnitInstance in types/index.ts.
  
  // For this step, I'll rely on a prop or just show Name.
  // To keep it simple, I'll just use a colored div with the name.
  
  const isTaunt = unit.mechanics.includes('guard');
  // const isStunned = false; // TODO: Check status effects

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        "relative w-24 h-32 bg-slate-800 border-2 rounded-lg flex flex-col items-center p-1 cursor-pointer transition-all",
        unit.owner === 'player' ? "border-cyan-600" : "border-red-600",
        isTaunt && "border-4 border-slate-300 shadow-[0_0_10px_white]",
        canAttack && "shadow-[0_0_15px_#00ffff] ring-2 ring-cyan-400",
        isTarget && "ring-4 ring-red-500 scale-110",
        className
      )}
    >
        {/* HP Bar Overlay? No, simple numbers first */}
        
        {/* Art Area */}
        <div className="w-full h-16 bg-black/40 rounded overflow-hidden mb-1 relative">
             <img 
                src={`/assets/cards/hero/${unit.baseAsset}_original.png`}
                alt={unit.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                    // Fallback
                     (e.target as HTMLImageElement).style.display = 'none';
                }}
             />
             <div className="absolute bottom-0 w-full bg-black/60 text-[8px] text-center text-white truncate px-1">
                {unit.name.split(',')[0]}
            </div>
        </div>

        {/* Stats */}
        <div className="w-full flex justify-between px-1 mt-auto font-mono font-bold text-xl">
            <div className={cn("text-yellow-400", unit.atk > 0 && "text-yellow-300")}>
                {unit.atk}
            </div>
             <div className={cn("text-red-500", unit.hp < unit.maxHp && "text-red-400")}>
                {unit.hp}
            </div>
        </div>
        
        {/* Status Icons */}
        <div className="absolute -top-2 -right-2 flex gap-1">
            {isTaunt && <span className="bg-slate-200 text-black text-[10px] px-1 rounded font-bold">🛡</span>}
        </div>
    </div>
  );
};
