import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UnitInstance } from '../types';
import { cn } from '../lib/utils';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';

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

/**
 * Unit Component - Renders a unit on the battlefield
 *
 * Visual Features:
 * - Displays unit art from assets based on tier and faction
 * - Shows ATK (bottom-left) and HP (bottom-right)
 * - Border color indicates owner (cyan=player, red=enemy)
 * - Status icons for Guard, Stun, Weak
 * - Visual effects for attacking, being targeted, and ready to attack
 * - Legendary Guards have gold glow, regular Guards have white glow
 *
 * Asset Loading:
 * - Uses tier-specific images for regular units (e.g., europa_tier2.png)
 * - Uses base images without suffix for tokens/tactics (e.g., drone.png)
 * - Fallback chain: tierN.png -> tier1.png -> placeholder.png
 */
export const Unit: React.FC<UnitProps> = ({ unit, onClick, onContextMenu, isTarget, canAttack, className, layoutId }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isTaunt = unit.mechanics.some(m => m.type === 'guard');
  const cardDef = ALL_CARDS.find(c => c.id === unit.cardId);
  const isLegendary = cardDef?.rarity === 'Legendary';

  const isAttacking = useGameStore(state => state.attackingUnitId === unit.uid);

  const folder = FACTION_FOLDERS[unit.faction] || 'neutral';

  // Asset resolution logic - match Card.tsx behavior
  // Tactic cards and tokens (rarity='NA') don't have tier suffixes
  // Regular units use _tierN suffix to load the correct tier art
  const assetSuffix = (cardDef?.type === 'tactic' || cardDef?.rarity === 'NA') ? '' : (cardDef?.tier === 1 ? '_tier1' : `_tier${cardDef?.tier || 1}`);
  const imagePath = `/assets/cards/${folder}/${unit.baseAsset}${assetSuffix}.png`;

  return (
    <div className="relative">
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
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
        "relative w-24 h-32 bg-slate-900 border-2 rounded-lg cursor-pointer shadow-md group",
        unit.owner === 'player' ? "border-cyan-600" : "border-red-600",
        isTaunt && !isLegendary && "border-4 border-slate-300 shadow-[0_0_10px_white]",
        isTaunt && isLegendary && "border-4 border-amber-400 shadow-[0_0_15px_#fbbf24]", // Gold glow for Legendary Guard
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
                    // Fallback: Try tier1 if tiered image fails, then placeholder
                    const img = e.target as HTMLImageElement;
                    const currentSrc = img.src;
                    const tier1Path = `/assets/cards/${folder}/${unit.baseAsset}_tier1.png`;
                    const placeholderPath = '/assets/cards/placeholder.png';

                    if (!currentSrc.includes('_tier1') && !currentSrc.includes('placeholder')) {
                        // First fallback: try tier1
                        img.src = tier1Path;
                    } else if (!currentSrc.includes('placeholder')) {
                        // Second fallback: use placeholder
                        img.src = placeholderPath;
                    }
            }}
        />
        
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent rounded-b-[4px]" />

        {/* Stats */}
        <div className="absolute bottom-1 left-1.5 flex flex-col items-center gap-0">
            <div className="text-xl font-mono font-bold text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] leading-none">
                {unit.atk}
            </div>
            {/* Encourage buff icon (under ATK) */}
            {unit.status?.encouraged && (
                <span className="text-[8px] leading-none mt-0.5" title="Encouraged">📣</span>
            )}
        </div>
        <div className="absolute bottom-1 right-1.5 flex flex-col items-center gap-0">
            <div className="text-xl font-mono font-bold text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] leading-none">
                {unit.hp}
            </div>
            {/* Rally buff icon (under HP) */}
            {unit.status?.rallied && (
                <span className="text-[8px] leading-none mt-0.5" title="Rallied">➕</span>
            )}
        </div>
        
        {/* Status Icons */}
        <div className="absolute -top-2 -right-2 flex gap-1 flex-wrap justify-end max-w-[40px] z-20">
            {isTaunt && <span className="bg-slate-200 text-black text-[10px] px-1 rounded font-bold shadow-sm border border-slate-400" title="Guard">🛡</span>}
            {(unit.status?.stun || 0) > 0 && <span className="bg-blue-500 text-white text-[10px] px-1 rounded font-bold shadow-sm animate-pulse border border-blue-400" title="Stunned">💫</span>}
            {(unit.status?.weak || 0) > 0 && <span className="bg-orange-500 text-black text-[10px] px-1 rounded font-bold shadow-sm border border-orange-400" title="Weakened">📉</span>}
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && cardDef && cardDef.text && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-slate-900 border-2 border-cyan-400 rounded-lg p-3 shadow-2xl pointer-events-none"
          >
            <div className="text-sm font-bold text-cyan-300 mb-1">{unit.name}</div>
            {cardDef.text && (
              <div className="text-xs text-slate-200 leading-tight">{cardDef.text}</div>
            )}
            <div className="mt-2 flex gap-2 text-xs">
              <span className="text-yellow-400">ATK: {unit.atk}</span>
              <span className="text-red-400">HP: {unit.hp}/{unit.maxHp}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};