import React from 'react';
import { Commander } from '../Commander';
import type { EnemyState } from '../../types';

interface EnemyZoneProps {
    enemy: EnemyState;
    isValidAttackTarget: boolean;
    onCommanderClick: () => void;
    commanderRef: React.RefObject<HTMLDivElement | null>;
}

export const EnemyZone: React.FC<EnemyZoneProps> = ({ 
    enemy, 
    isValidAttackTarget, 
    onCommanderClick, 
    commanderRef
}) => {
    return (
        <div 
            className="h-1/5 flex justify-start items-start pt-12 relative px-8 cursor-pointer"
            onClick={() => {
                 // Allow clicking anywhere in enemy zone (if empty board) to attack commander
                 // Using playerBoardLength prop to suppress warning about unused prop if I keep it, 
                 // or I should just use it? The logic below uses enemy.board.length.
                 // The prompt logic was: "Allow clicking... if enemy.board.length === 0"
                 // I'll just keep playerBoardLength in interface but not use it if not needed, or remove it.
                 // The error said "playerBoardLength declared but never read".
                 // I will comment it out or use it. Actually, I'll just remove it from destructuring if I don't use it.
                 // But wait, the interface says it's required. I'll make it optional or just consume it.
                 if (enemy.board.length === 0) onCommanderClick();
            }}
        >
            <div ref={commanderRef} className="absolute top-4 left-8 z-10">
                <Commander
                    name="Rogue AI"
                    hp={enemy.hp}
                    maxHp={enemy.maxHp}
                    energy={enemy.energy}
                    maxEnergy={enemy.maxEnergy}
                    onClick={onCommanderClick}
                    isTarget={isValidAttackTarget}
                />
            </div>

             {/* Enemy Hand - moved below turn counter at center */}
             <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1">
                 {Array.from({length: enemy.hand.length}).map((_,i) => (
                     <div key={i} className="w-12 h-16 bg-slate-800 border border-slate-600 rounded shadow-md relative group">
                         <div className="absolute inset-1 bg-red-900/50 rounded flex items-center justify-center text-[10px] text-red-500 font-mono">
                             AI
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};
