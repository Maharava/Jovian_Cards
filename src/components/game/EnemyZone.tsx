import React from 'react';
import { Commander } from '../Commander';
import type { EnemyState, Card as CardType } from '../../types';

interface EnemyZoneProps {
    enemy: EnemyState;
    isValidAttackTarget: boolean;
    onCommanderClick: () => void;
    commanderRef: React.RefObject<HTMLDivElement>;
    playerBoardLength: number; // To check if board is empty for commander attack logic
}

export const EnemyZone: React.FC<EnemyZoneProps> = ({ 
    enemy, 
    isValidAttackTarget, 
    onCommanderClick, 
    commanderRef,
    playerBoardLength 
}) => {
    return (
        <div 
            className="h-1/5 flex justify-start items-start pt-12 relative px-8 cursor-pointer"
            onClick={() => {
                 // Allow clicking anywhere in enemy zone (if empty board) to attack commander
                 if (enemy.board.length === 0) onCommanderClick();
            }}
        >
            <div ref={commanderRef}>
                <Commander 
                    name="Rogue AI" 
                    hp={enemy.hp} 
                    maxHp={enemy.maxHp} 
                    className="absolute top-4 left-8 z-10"
                    onClick={onCommanderClick}
                    isTarget={isValidAttackTarget}
                />
            </div>

             {/* Enemy Hand Count */}
             <div className="absolute top-8 right-12 flex gap-1">
                 {Array.from({length: 5}).map((_,i) => (
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
