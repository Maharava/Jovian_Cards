import React from 'react';
import type { Card as CardType } from '../types';
import { cn } from '../lib/utils';

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
  // Assuming all heroes are in 'hero' folder for now. Enemies might be elsewhere.
  // We can refine this path logic.
  const imagePath = `/assets/cards/hero/${card.baseAsset}${assetSuffix}.png`;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative w-48 h-64 border-2 rounded-xl flex flex-col p-2 select-none transition-transform hover:scale-105 cursor-pointer shadow-lg",
        TIER_COLORS[card.tier],
        disabled && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
    >
      {/* Header: Cost & Name */}
      <div className="flex justify-between items-start mb-2">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          {card.cost}
        </div>
        <div className={cn("text-xs font-mono uppercase tracking-wider mt-1 font-bold", TIER_TEXT_COLORS[card.tier])}>
          {card.name.split(',')[0]} {/* Show first part of name only for space */}
        </div>
      </div>

      {/* Art */}
      <div className="flex-grow bg-black/50 rounded-md overflow-hidden border border-white/10 relative">
         <img 
            src={imagePath} 
            alt={card.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
                // Fallback to original if tier art missing
                (e.target as HTMLImageElement).src = `/assets/cards/hero/${card.baseAsset}_original.png`;
            }}
         />
      </div>

      {/* Description */}
      <div className="mt-2 text-[10px] leading-tight text-center text-gray-300 min-h-[2.5em] flex items-center justify-center">
        {card.text}
      </div>

      {/* Footer: Stats (if Unit) */}
      {card.type === 'unit' && card.stats && (
        <div className="flex justify-between items-center mt-2 px-1 font-bold text-lg font-mono">
          <div className="text-yellow-400 flex items-center gap-1">
            <span className="text-sm">⚔</span> {card.stats.atk}
          </div>
          <div className="text-red-500 flex items-center gap-1">
            <span className="text-sm">♥</span> {card.stats.hp}
          </div>
        </div>
      )}
      
      {/* Tactic Label */}
      {card.type === 'tactic' && (
        <div className="mt-2 text-center text-xs font-mono text-cyan-400 uppercase tracking-widest">
          TACTIC
        </div>
      )}
    </div>
  );
};
