import React from 'react';
import { cn } from '../lib/utils';

interface CommanderProps {
  name: string;
  hp: number;
  maxHp: number;
  energy?: number;
  maxEnergy?: number;
  isPlayer?: boolean;
  className?: string;
  onClick?: () => void;
  isTarget?: boolean;
}

export const Commander: React.FC<CommanderProps> = ({ 
    name, hp, maxHp, energy, maxEnergy, isPlayer, className, onClick, isTarget 
}) => {
  return (
    <div 
        onClick={onClick}
        className={cn(
            "flex flex-col items-center gap-2 p-2 rounded-xl bg-slate-900/80 border transition-all cursor-pointer",
            isTarget ? "border-red-500 shadow-[0_0_15px_red] scale-105" : "border-slate-700",
            className
        )}
    >
      <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-500 overflow-hidden relative">
         {/* Avatar placeholder */}
         <div className="absolute inset-0 flex items-center justify-center text-xs text-center font-bold">
            {name}
         </div>
      </div>
      
      {/* HP Bar */}
      <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-600 relative">
        <div 
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${Math.max(0, (hp / maxHp) * 100)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
            {hp} / {maxHp}
        </div>
      </div>

      {/* Energy (Player only) */}
      {isPlayer && energy !== undefined && maxEnergy !== undefined && (
        <div className="flex gap-1">
            {Array.from({ length: maxEnergy }).map((_, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "w-3 h-3 rounded-full border border-cyan-700",
                        i < energy ? "bg-cyan-400 shadow-[0_0_5px_#00ffff]" : "bg-slate-800"
                    )}
                />
            ))}
        </div>
      )}
    </div>
  );
};