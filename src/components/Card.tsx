import React from 'react';
import type { Card as CardType } from '../types';
import { cn } from '../lib/utils';
import { MECHANICS_DEFINITIONS } from '../data/mechanics';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const TIER_COLORS = {
  1: 'border-slate-400 bg-slate-900/90',
  2: 'border-blue-400 bg-blue-950/90',
  3: 'border-yellow-400 bg-yellow-950/90',
};

const TIER_TEXT_COLORS = {
  1: 'text-slate-200',
  2: 'text-blue-200',
  3: 'text-yellow-200',
};

export const Card: React.FC<CardProps> = ({ card, onClick, className, disabled }) => {
  // Asset resolution logic
  const assetSuffix = card.tier === 1 ? '_original' : `_tier${card.tier}`;
  const imagePath = `/assets/cards/hero/${card.baseAsset}${assetSuffix}.png`;

  // Mechanics Tooltips
  const activeMechanics = (card.mechanics || []).filter(m => MECHANICS_DEFINITIONS[m]);

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative w-48 h-64 border-2 rounded-xl flex flex-col select-none transition-transform hover:scale-105 cursor-pointer shadow-lg group overflow-hidden bg-black",
        TIER_COLORS[card.tier],
        disabled && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
    >
      {/* Background Image - Full Size */}
      <img 
        src={imagePath} 
        alt={card.name} 
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
            (e.target as HTMLImageElement).src = `/assets/cards/hero/${card.baseAsset}_original.png`;
        }}
      />

      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none" />

      {/* Tooltips Container - Right Side */}
      <div className="absolute -right-44 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
        {activeMechanics.map(m => {
            const def = MECHANICS_DEFINITIONS[m];
            return (
                <div key={m} className="flex items-center gap-2">
                     <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-md border border-white/20", def.color)}>
                        {def.icon}
                     </div>
                     <div className="bg-black/90 text-white text-[10px] p-2 rounded w-32 border border-slate-600 shadow-xl">
                        <strong className="block text-xs mb-1 text-cyan-300 uppercase">{def.title}</strong>
                        {def.desc}
                     </div>
                </div>
            );
        })}
      </div>

      {/* Header: Cost & Name */}
      <div className="relative z-20 flex justify-between items-start p-2">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          {card.cost}
        </div>
        <div className={cn("text-xs font-mono uppercase tracking-wider mt-1 font-bold text-right drop-shadow-md", TIER_TEXT_COLORS[card.tier])}>
          {card.name.split(',')[0]}
        </div>
      </div>

      {/* Description Box */}
      <div className="relative z-20 mt-auto bg-black/80 backdrop-blur-sm m-2 p-2 rounded border border-white/10">
          <div className="text-[10px] leading-tight text-center text-gray-200 min-h-[2.5em] flex items-center justify-center">
            {card.text}
          </div>
          
          {/* Footer: Stats (if Unit) */}
          {card.type === 'unit' && card.stats && (
            <div className="flex justify-between items-center mt-2 px-1 font-bold text-lg font-mono">
              <div className="text-yellow-400 flex items-center gap-1 drop-shadow-md">
                <span className="text-sm">⚔</span> {card.stats.atk}
              </div>
              <div className="text-red-500 flex items-center gap-1 drop-shadow-md">
                <span className="text-sm">♥</span> {card.stats.hp}
              </div>
            </div>
          )}
          
          {/* Tactic Label */}
          {card.type === 'tactic' && (
            <div className="mt-1 text-center text-xs font-mono text-cyan-400 uppercase tracking-widest">
              TACTIC
            </div>
          )}
      </div>
      
    </div>
  );
};
