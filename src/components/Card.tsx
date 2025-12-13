import React from 'react';
import type { Card as CardType } from '../types';
import { cn } from '../lib/utils';
import { MECHANICS_DEFINITIONS } from '../data/mechanics';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  showTooltip?: boolean;
  tooltipPosition?: 'right' | 'top';
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

const FACTION_COLORS: Record<string, string> = {
  'Jovian': 'text-cyan-400',
  'Republic': 'text-blue-500',
  'Megacorp': 'text-slate-400',
  'Confederate': 'text-emerald-400',
  'Voidborn': 'text-purple-500',
  'Bio-horror': 'text-red-600',
  'Neutral': 'text-slate-500',
};

const FACTION_FOLDERS: Record<string, string> = {
  'Jovian': 'jovian',
  'Megacorp': 'megacorp',
  'Voidborn': 'voidborn',
  'Bio-horror': 'biohorror',
  'Republic': 'republic',
  'Confederate': 'neutral',
  'Neutral': 'neutral',
};

const SUBTYPE_ICONS: Record<string, string> = {
    'Cybernetic': '⚙️',
    'Biological': '🧬',
    'Psionic': '🔮'
};

const RARITY_COLORS = {
  'Common': 'text-slate-400',
  'Uncommon': 'text-blue-400',
  'Rare': 'text-yellow-400',
  'NA': 'text-transparent'
};

export const Card: React.FC<CardProps> = ({ card, onClick, onContextMenu, className, disabled, showTooltip = true, tooltipPosition = 'right' }) => {
  // Asset resolution logic
  const assetSuffix = card.tier === 1 ? '_original' : `_tier${card.tier}`;
  const folder = FACTION_FOLDERS[card.faction] || 'neutral';
  const imagePath = `/assets/cards/${folder}/${card.baseAsset}${assetSuffix}.png`;

  // Mechanics Tooltips
  const activeMechanics = (card.mechanics || []).map(m => m.type).filter(m => MECHANICS_DEFINITIONS[m]);

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      onContextMenu={onContextMenu}
      className={cn(
        "relative w-48 h-64 flex flex-col select-none transition-transform hover:scale-105 cursor-pointer shadow-lg group bg-black rounded-xl",
        TIER_COLORS[card.tier],
        disabled && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
    >
      {/* Content Wrapper for Clipping */}
      <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-transparent flex flex-col justify-end pointer-events-none">
          {/* Background Image - Full Size (Absolute) */}
          <img 
            src={imagePath} 
            alt={card.name} 
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => {
                (e.target as HTMLImageElement).src = `/assets/cards/${folder}/${card.baseAsset}_original.png`;
            }}
          />

          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />

          {/* Header: Cost & Name (Absolute Top) */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-2 pointer-events-auto">
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
              {card.cost}
            </div>
            <div className={cn("text-xs font-mono uppercase tracking-wider mt-1 font-bold text-right drop-shadow-md", TIER_TEXT_COLORS[card.tier])}>
              {card.name.split(',')[0]}
            </div>
          </div>
          
          {/* Subtype Badge (New) */}
          {card.subtype && (
              <div className="absolute top-10 right-2 z-20 bg-black/60 backdrop-blur rounded-full w-6 h-6 flex items-center justify-center border border-white/20 shadow-md" title={card.subtype}>
                  <span className="text-xs">{SUBTYPE_ICONS[card.subtype]}</span>
              </div>
          )}

          {/* Description Box (Relative Bottom) */}
          <div className="relative z-20 m-2 flex flex-col pointer-events-auto">
              {/* Ability Text */}
              <div className="bg-black/80 backdrop-blur-sm p-2 rounded-t border border-white/10 border-b-0 text-[10px] leading-tight text-center text-gray-200 min-h-[2.5em] flex items-center justify-center">
                {card.text}
              </div>
              
              {/* Faction Label */}
              <div className={cn("bg-black/90 backdrop-blur-md border border-white/10 border-y-0 text-center text-[9px] font-bold uppercase tracking-widest py-0.5 relative", FACTION_COLORS[card.faction] || 'text-white')}>
                  {card.faction} {card.type === 'tactic' ? 'TACTIC' : ''}
                  {/* Rarity Gem */}
                  {card.rarity !== 'NA' && (
                      <span className={cn("absolute right-2 top-0.5 text-[10px]", RARITY_COLORS[card.rarity])}>
                          ♦
                      </span>
                  )}
              </div>

              {/* Footer: Stats (if Unit) */}
              {card.type === 'unit' && card.stats && (
                <div className="bg-black/90 backdrop-blur-md rounded-b border border-white/10 border-t-0 flex justify-between items-center px-3 py-1 font-bold text-lg font-mono">
                  <div className="text-yellow-400 flex items-center gap-1 drop-shadow-md">
                    <span className="text-sm">⚔</span> {card.stats.atk}
                  </div>
                  <div className="text-red-500 flex items-center gap-1 drop-shadow-md">
                    <span className="text-sm">♥</span> {card.stats.hp}
                  </div>
                </div>
              )}
              
              {/* Tactic Footer (Empty/Rounded if Tactic) */}
              {card.type === 'tactic' && (
                  <div className="bg-black/90 backdrop-blur-md rounded-b border border-white/10 border-t-0 h-1"></div>
              )}
          </div>
      </div>

      {/* Tooltips Container */}
      {showTooltip && activeMechanics.length > 0 && (
        <div className={cn(
            "absolute opacity-0 group-hover:opacity-100 transition-opacity z-[999] pointer-events-none flex gap-2",
            tooltipPosition === 'top' 
                ? "bottom-full left-1/2 -translate-x-1/2 mb-4 flex-row whitespace-nowrap" 
                : "-right-44 top-0 flex-col"
        )}>
          {activeMechanics.map(m => {
              const def = MECHANICS_DEFINITIONS[m];
              return (
                  <div key={m} className="flex items-center gap-2 bg-black/90 text-white p-2 rounded border border-slate-600 shadow-xl min-w-[12rem]">
                       <div className={cn("w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-lg shadow-md border border-white/20", def.color)}>
                          {def.icon}
                       </div>
                       <div className="text-[10px]">
                          <strong className="block text-xs mb-1 text-cyan-300 uppercase">{def.title}</strong>
                          {def.desc}
                       </div>
                  </div>
              );
          })}
        </div>
      )}
      
    </div>
  );
};