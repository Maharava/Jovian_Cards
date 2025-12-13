import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Unit } from '../Unit';
import { cn } from '../../lib/utils';
import type { PlayerState, EnemyState, UnitInstance, Card as CardType } from '../../types';
import { MAX_BOARD_SLOTS } from '../../config/constants';

interface BattlefieldProps {
    player: PlayerState;
    enemy: EnemyState;
    phase: string;
    selectedUnitId: string | null;
    targetingCard: CardType | null;
    isValidTarget: (unit: UnitInstance) => boolean;
    onUnitClick: (unit: UnitInstance) => void;
    onUnitRightClick: (e: React.MouseEvent, unit: UnitInstance) => void;
    setUnitRef: (uid: string, el: HTMLDivElement | null) => void;
}

export const Battlefield: React.FC<BattlefieldProps> = ({
    player, enemy, phase, selectedUnitId, targetingCard,
    isValidTarget, onUnitClick, onUnitRightClick, setUnitRef
}) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center gap-6 relative bg-slate-900/30 border-y border-white/5">
            {/* Enemy Board */}
            <div className="flex justify-center gap-3 min-h-[140px] items-end relative">
                <div className="absolute -top-6 text-xs text-slate-500 font-mono">{enemy.board.length}/{MAX_BOARD_SLOTS} UNITS</div>
                {enemy.board.length === 0 && <div className="text-white/20 font-mono text-sm absolute top-10">Empty Sector</div>}
                
                <AnimatePresence>
                {enemy.board.map(u => (
                    <div key={u.uid} ref={(el) => setUnitRef(u.uid, el)}>
                        <Unit 
                            layoutId={`card-${u.uid}`}
                            unit={u} 
                            onClick={() => onUnitClick(u)}
                            onContextMenu={(e) => onUnitRightClick(e, u)}
                            isTarget={!!selectedUnitId && isValidTarget(u)}
                            className={cn(
                                targetingCard && u.owner === 'enemy' && targetingCard.mechanics.some(m => m.target?.includes('enemy') || m.target === 'target_unit') ? "ring-2 ring-red-400 cursor-crosshair animate-pulse" : ""
                            )}
                        />
                    </div>
                ))}
                </AnimatePresence>
                
                {Array.from({ length: Math.max(0, MAX_BOARD_SLOTS - enemy.board.length) }).map((_, i) => (
                    <div key={`e-slot-${i}`} className="w-24 h-32 border-2 border-dashed border-slate-700/50 rounded-lg flex items-center justify-center opacity-30"></div>
                ))}
            </div>

            {/* Center Line */}
            <div className="w-2/3 h-px bg-cyan-500/20 shadow-[0_0_10px_#00ffff]"></div>

            {/* Player Board */}
            <div className="flex justify-center gap-3 min-h-[140px] items-start relative">
                 <div className="absolute -bottom-6 text-xs text-slate-500 font-mono">{player.board.length}/{MAX_BOARD_SLOTS} UNITS</div>
                 {player.board.length === 0 && <div className="text-white/20 font-mono text-sm absolute top-10">Deploy Units Here</div>}
                 
                 <AnimatePresence>
                 {player.board.map(u => (
                    <div key={u.uid} ref={(el) => setUnitRef(u.uid, el)}>
                        <Unit 
                            layoutId={`card-${u.uid}`}
                            unit={u} 
                            onClick={() => onUnitClick(u)}
                            onContextMenu={(e) => onUnitRightClick(e, u)}
                            canAttack={u.ready && phase === 'player_turn'}
                            isTarget={selectedUnitId === u.uid}
                            className={cn(
                                selectedUnitId === u.uid ? "ring-2 ring-yellow-400 scale-105" : "",
                                targetingCard && u.owner === 'player' && targetingCard.mechanics.some(m => m.target?.includes('ally') || m.target === 'target_unit') ? "ring-2 ring-green-400 cursor-crosshair animate-pulse" : ""
                            )}
                        />
                    </div>
                 ))}
                 </AnimatePresence>
                 
                 {Array.from({ length: Math.max(0, MAX_BOARD_SLOTS - player.board.length) }).map((_, i) => (
                    <div key={`p-slot-${i}`} className="w-24 h-32 border-2 border-dashed border-cyan-900/30 rounded-lg flex items-center justify-center opacity-30"></div>
                ))}
            </div>
        </div>
    );
};
