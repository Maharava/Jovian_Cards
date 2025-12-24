import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
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
  layoutId?: string;
  artOnly?: boolean; // Hide all text overlays, show only art
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

export const FACTION_FOLDERS: Record<string, string> = {
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
  'Legendary': 'text-orange-500',
  'NA': 'text-transparent'
};

export const Card: React.FC<CardProps> = ({ card, onClick, onContextMenu, className, disabled, showTooltip = true, layoutId, artOnly = false }) => {
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number } | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Asset resolution logic
  const assetSuffix = (card.type === 'tactic' || card.rarity === 'NA') ? '' : (card.tier === 1 ? '_tier1' : `_tier${card.tier}`);
  const folder = FACTION_FOLDERS[card.faction] || 'neutral';
  const imagePath = `/assets/cards/${folder}/${card.baseAsset}${assetSuffix}.png`;

  // Mechanics Tooltips
  const activeMechanics = (card.mechanics || []).map(m => m.type).filter(m => MECHANICS_DEFINITIONS[m]);

  // Generate tier dots with spacing - 4x larger
  const tierDots = Array(card.tier).fill('●').join(' ');

  const handleMouseEnter = () => {
    if (cardRef.current && showTooltip && activeMechanics.length > 0) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipPos({ x: rect.right, y: rect.top });
    }
  };

  const handleMouseLeave = () => {
    setTooltipPos(null);
  };

  return (
    <>
    <motion.div
      ref={cardRef}
      layoutId={layoutId}
      onClick={!disabled ? onClick : undefined}
      onContextMenu={onContextMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={!disabled ? { scale: 1.05, y: -10, zIndex: 50 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative w-48 h-64 flex flex-col select-none cursor-pointer shadow-lg group bg-black rounded-xl",
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
                // Fallback: try tier1 only if card should have tier suffixes
                const fallbackSuffix = (card.type === 'tactic' || card.rarity === 'NA') ? '' : '_tier1';
                (e.target as HTMLImageElement).src = `/assets/cards/${folder}/${card.baseAsset}${fallbackSuffix}.png`;
            }}
          />

          {/* Overlay Gradient for readability */}
          {!artOnly && <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />}

          {!artOnly && (
            <>
              {/* Header: Cost & Name (Absolute Top) */}
              <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black border border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                  {card.cost}
                </div>
                <div className="text-right">
                  <div className={cn("text-xs font-mono uppercase tracking-wider font-bold drop-shadow-md", TIER_TEXT_COLORS[card.tier])}>
                    {card.name}
                  </div>
                  {card.title && (
                    <div className="text-[9px] text-slate-300 drop-shadow-md mt-0.5">
                      {card.title}
                    </div>
                  )}
                </div>
              </div>

              {/* Subtype Badge (New) */}
              {card.subtype && (
                  <div className="absolute top-10 right-2 z-20 bg-black/60 backdrop-blur rounded-full w-6 h-6 flex items-center justify-center border border-white/20 shadow-md" title={card.subtype}>
                      <span className="text-xs">{SUBTYPE_ICONS[card.subtype]}</span>
                  </div>
              )}
            </>
          )}

          {/* Description Box (Relative Bottom) */}
          {!artOnly && <div className="relative z-20 m-2 flex flex-col">
              {/* Ability Text - only show if card has text */}
              {card.text && card.text.trim() !== '' && (
                <div className="bg-black/80 backdrop-blur-sm p-2 rounded-t border border-white/10 border-b-0 text-[10px] leading-tight text-center text-gray-200 min-h-[2.5em] flex items-center justify-center">
                  {card.text}
                </div>
              )}

              {/* Footer: Stats (if Unit) - with Faction/Rarity inline */}
              {card.type === 'unit' && card.stats && (
                <div className={cn(
                  "bg-black/90 backdrop-blur-md border border-white/10 flex justify-between items-center px-2 py-1 font-bold text-lg font-mono",
                  card.text && card.text.trim() !== '' ? "rounded-b border-t-0" : "rounded border-t"
                )}>
                  <div className="text-yellow-400 flex items-center gap-1 drop-shadow-md">
                    <span className="text-sm">⚔</span> {card.stats.atk}
                  </div>
                  <div className="text-white text-[9px] flex items-center gap-1.5">
                    <span className="text-white">{tierDots}</span>
                    <span className={cn("uppercase font-bold tracking-wide", FACTION_COLORS[card.faction] || 'text-white')}>
                      {card.faction}
                    </span>
                    {card.rarity !== 'NA' && (
                      <span className={cn("text-[10px]", RARITY_COLORS[card.rarity])}>
                        ♦
                      </span>
                    )}
                  </div>
                  <div className="text-red-500 flex items-center gap-1 drop-shadow-md">
                    <span className="text-sm">♥</span> {card.stats.hp}
                  </div>
                </div>
              )}

              {/* Tactic Footer - with Faction/Rarity inline */}
              {card.type === 'tactic' && (
                  <div className={cn(
                    "bg-black/90 backdrop-blur-md border border-white/10 flex justify-center items-center py-1 px-2",
                    card.text && card.text.trim() !== '' ? "rounded-b border-t-0" : "rounded border-t"
                  )}>
                    <div className="text-white text-[9px] flex items-center gap-1.5">
                      <span className={cn("uppercase font-bold tracking-wide", FACTION_COLORS[card.faction] || 'text-white')}>
                        {card.faction}
                      </span>
                      <span className="text-slate-400">TACTIC</span>
                      {card.rarity !== 'NA' && (
                        <span className={cn("text-[10px]", RARITY_COLORS[card.rarity])}>
                          ♦
                        </span>
                      )}
                    </div>
                  </div>
              )}
          </div>}
      </div>

    </motion.div>

    {/* Tooltips Container - Portal to body to escape overflow/stacking contexts */}
    {tooltipPos && showTooltip && activeMechanics.length > 0 && createPortal(
      <div
        className="fixed z-[10005] pointer-events-none flex gap-2 flex-col"
        style={{
          left: `${tooltipPos.x + 16}px`,
          top: `${tooltipPos.y}px`
        }}
      >
        {activeMechanics.map((m, i) => {
            const def = MECHANICS_DEFINITIONS[m];
            if (!def) return null;
            return (
                <div key={`${m}-${i}`} className="flex items-center gap-2 bg-black/90 text-white p-2 rounded border border-slate-600 shadow-xl min-w-[12rem]">
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
      </div>,
      document.body
    )}
    </>
  );
};