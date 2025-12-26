import React, { useEffect, useState, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { useMetaStore } from '../store/metaStore';
import { cn } from '../lib/utils';
import { Commander } from './Commander';

// Sub-components
import { Hand } from './game/Hand';
import { Battlefield } from './game/Battlefield';
import { EnemyZone } from './game/EnemyZone';
import { TargetingOverlay } from './game/TargetingOverlay';
import { InspectionModal } from './game/InspectionModal';
import { ScoutModal } from './game/ScoutModal';
import { AbilityNotification } from './AbilityNotification';
import { DevPanel } from './DevPanel';

export const GameBoard: React.FC = () => {
    const {
      player, enemy,
      playUnit, endPlayerTurn, attackTarget, closeScout,
      phase, turn, scoutedCards, isProcessingQueue,
      attackVector, effectVector, playTactic
    } = useGameStore();

    const { savedDecks, activeDeckId } = useMetaStore();
    const activeDeck = savedDecks.find(d => d.id === activeDeckId);
    const deckName = activeDeck?.name || 'Vanguard';
  
    const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
    const [targetingCard, setTargetingCard] = useState<import('../types').Card | null>(null);
    const [viewingUnit, setViewingUnit] = useState<import('../types').UnitInstance | null>(null);

    // Refs for position tracking
    const unitRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const enemyCommanderRef = useRef<HTMLDivElement>(null);
    const playerCommanderRef = useRef<HTMLDivElement>(null);
    const [lineCoords, setLineCoords] = useState<{x1:number, y1:number, x2:number, y2:number} | null>(null);

    // AI Turn Trigger handled in gameStore/AI logic, but we need to ensure loop starts if phase changes
    useEffect(() => {
        if (phase === 'enemy_turn') {
            useGameStore.getState().enemyAction();
        }
    }, [phase]);

    // Animation Effect Helper
    const getCenter = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    useEffect(() => {
        const vector = attackVector || effectVector;
        if (vector) {
            const fromEl = unitRefs.current[vector.from] || 
                         (vector.from === 'enemy_commander' ? enemyCommanderRef.current : 
                         (vector.from === 'player_commander' ? playerCommanderRef.current : null));
                         
            const toEl = unitRefs.current[vector.to] || 
                       (vector.to === 'enemy_commander' ? enemyCommanderRef.current : 
                       (vector.to === 'player_commander' ? playerCommanderRef.current : null));
            
            if (fromEl && toEl) {
                const start = getCenter(fromEl);
                const end = getCenter(toEl);
                setLineCoords({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
            }
        } else {
            setLineCoords(null);
        }
    }, [attackVector, effectVector]);

    const isValidAttackTarget = (unit: import('../types').UnitInstance) => {
        if (!selectedUnitId) return false;
        const attacker = player.board.find(u => u.uid === selectedUnitId);
        if (!attacker) return false;

        const isSnipe = attacker.mechanics.some(m => m.type === 'snipe');
        const enemyGuards = enemy.board.filter(u => u.mechanics.some(m => m.type === 'guard') && u.hp > 0);

        if (enemyGuards.length > 0 && !isSnipe) {
            return unit.mechanics.some(m => m.type === 'guard');
        }
        return true;
    };

    const isEnemyCommanderValidTarget = () => {
        if (!selectedUnitId) return false;
        const attacker = player.board.find(u => u.uid === selectedUnitId);
        if (!attacker) return false;

        const isSnipe = attacker.mechanics.some(m => m.type === 'snipe');
        const enemyGuards = enemy.board.filter(u => u.mechanics.some(m => m.type === 'guard') && u.hp > 0);

        if (enemyGuards.length > 0 && !isSnipe) return false;
        return true;
    };

    const handlePlayCard = async (card: import('../types').Card) => {
        if (phase !== 'player_turn') return;
        // Only enter targeting mode for onPlay mechanics that need targets
        const needsTarget = card.mechanics.some(m =>
            m.trigger === 'onPlay' && ['target_unit', 'target_enemy', 'target_ally'].includes(m.target || '')
        );

        if (needsTarget) {
            // Check if there are any valid targets before entering targeting mode
            const hasValidTargets = card.mechanics.some(m => {
                if (m.target === 'target_ally') {
                    // For target_ally, check if there are any allies on board (excluding the card being played if it's a unit)
                    return player.board.length > 0;
                }
                if (m.target === 'target_enemy') {
                    return enemy.board.length > 0;
                }
                if (m.target === 'target_unit') {
                    return player.board.length > 0 || enemy.board.length > 0;
                }
                return false;
            });

            if (!hasValidTargets) {
                // No valid targets, play card anyway and let mechanics resolve skip targeting
                if (card.type === 'unit') await playUnit(card);
                else await playTactic(card);
                return;
            }

            if (targetingCard?.id === card.id) setTargetingCard(null);
            else setTargetingCard(card);
        } else {
            if (card.type === 'unit') await playUnit(card);
            else await playTactic(card);
        }
    };

    const handleUnitClick = async (unit: import('../types').UnitInstance) => {
        if (phase !== 'player_turn') return;

        if (targetingCard) {
            const canTargetUnit = targetingCard.mechanics.some(m => 
                m.target === 'target_unit' || 
                (m.target === 'target_enemy' && unit.owner === 'enemy') ||
                (m.target === 'target_ally' && unit.owner === 'player')
            );

            if (canTargetUnit) {
                if (targetingCard.type === 'unit') await playUnit(targetingCard, unit.uid);
                else await playTactic(targetingCard, unit.uid);
                setTargetingCard(null);
            }
            return;
        }

        if (unit.owner === 'player') {
            // FIXED: Check attacksLeft and prevent 0 attack units from being selected
            if (unit.attacksLeft <= 0 || unit.atk <= 0) return;
            if (selectedUnitId === unit.uid) setSelectedUnitId(null);
            else setSelectedUnitId(unit.uid);
        } else {
            if (selectedUnitId) {
                attackTarget(selectedUnitId, 'unit', unit.uid);
                setSelectedUnitId(null);
            }
        }
    };

    const handleEnemyCommanderClick = async () => {
        if (phase !== 'player_turn') return;

        if (targetingCard) {
            const canTargetEnemyCommander = targetingCard.mechanics.some(m => m.target === 'target_enemy_commander');
            if (canTargetEnemyCommander) {
                if (targetingCard.type === 'unit') await playUnit(targetingCard, 'enemy_commander');
                else await playTactic(targetingCard, 'enemy_commander');
                setTargetingCard(null);
            }
            return;
        }

        if (selectedUnitId) {
            attackTarget(selectedUnitId, 'enemy');
            setSelectedUnitId(null);
        }
    };

    return (
        <div className={cn("w-full h-screen bg-jovian-black text-white flex flex-col overflow-hidden relative select-none", isProcessingQueue && "pointer-events-none cursor-wait")}>
            
            {/* Background & Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <svg className="absolute inset-0 pointer-events-none z-50 w-full h-full">
                {lineCoords && (
                    <line 
                        x1={lineCoords.x1} y1={lineCoords.y1} x2={lineCoords.x2} y2={lineCoords.y2} 
                        stroke={effectVector ? effectVector.color : "red"} strokeWidth="4" strokeLinecap="round"
                        className={cn("opacity-80", effectVector ? "animate-pulse" : "")}
                    />
                )}
            </svg>

            {/* Turn Info & Surrender */}
            <div className="absolute top-0 w-full flex justify-between items-start py-2 px-8 z-10">
                <div></div>
                <div className="bg-slate-800 px-6 py-1 rounded-b-xl border border-t-0 border-slate-600 font-mono text-xl font-bold">
                    Turn {turn} — <span className={phase === 'player_turn' ? 'text-cyan-400' : 'text-red-400'}>{phase === 'player_turn' ? 'YOUR TURN' : 'ENEMY TURN'}</span>
                </div>
                <button
                    onClick={() => useGameStore.getState().setPhase('main_menu')}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-red-400 transition-all active:scale-95"
                >
                    SURRENDER
                </button>
            </div>

            <EnemyZone 
                enemy={enemy} 
                isValidAttackTarget={!!selectedUnitId && isEnemyCommanderValidTarget()}
                onCommanderClick={handleEnemyCommanderClick}
                commanderRef={enemyCommanderRef}
            />

            <Battlefield 
                player={player} enemy={enemy} phase={phase}
                selectedUnitId={selectedUnitId} targetingCard={targetingCard}
                isValidTarget={isValidAttackTarget}
                onUnitClick={handleUnitClick}
                onUnitRightClick={(e, u) => { e.preventDefault(); setViewingUnit(u); }}
                setUnitRef={(uid, el) => unitRefs.current[uid] = el}
            />

            {targetingCard && <TargetingOverlay card={targetingCard} onCancel={() => setTargetingCard(null)} />}

            {/* Player Zone (Manual Layout for Commander + Hand) */}
            <div className="h-1/4 flex flex-col justify-end pb-2 relative z-20 px-8">
                <div ref={playerCommanderRef} className="absolute left-[408px] bottom-4 mb-0">
                    <Commander
                        name={deckName} hp={player.hp} maxHp={player.maxHp}
                        energy={player.energy} maxEnergy={player.maxEnergy} isPlayer
                    />
                </div>
                
                <div className="flex justify-between items-end w-full max-w-7xl mx-auto relative">
                    <Hand 
                        player={player} phase={phase}
                        onPlayCard={handlePlayCard}
                        onInspectUnit={(card) => {
                             // Mock unit for inspection from hand
                             setViewingUnit({
                                 uid: 'hand_inspect', cardId: card.id, name: card.name, baseAsset: card.baseAsset,
                                 faction: card.faction, atk: card.stats?.atk || 0, hp: card.stats?.hp || 1, maxHp: card.stats?.hp || 1,
                                 owner: 'player', ready: false, attacksLeft: 0, mechanics: card.mechanics || [], shield: 0
                             });
                        }}
                    />

                    <div className="flex flex-col gap-3 mb-4 min-w-[120px]">
                        <button
                            onClick={() => { setSelectedUnitId(null); endPlayerTurn(); }}
                            disabled={phase !== 'player_turn'}
                            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg border-2 border-cyan-400 disabled:border-slate-600 transition-all active:scale-95"
                        >
                            END TURN
                        </button>
                        <div className="text-center text-xs text-slate-400 font-mono">
                            Deck: {player.deck.length} | GY: {player.graveyard.length}
                        </div>
                    </div>
                </div>
            </div>

            {viewingUnit && <InspectionModal unit={viewingUnit} onClose={() => setViewingUnit(null)} />}
            {scoutedCards && scoutedCards.length > 0 && <ScoutModal cards={scoutedCards} onClose={closeScout} />}

            {/* Ability Notification */}
            <AbilityNotification />

            {/* Game Over Overlay */}
            {(player.hp <= 0 || enemy.hp <= 0) && (
                <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <h1 className={cn("text-6xl font-black mb-8 tracking-widest", player.hp <= 0 ? "text-red-600" : "text-yellow-400")}>
                        {player.hp <= 0 ? "MISSION FAILED" : "SECTOR CLEARED"}
                    </h1>
                    <div className="text-xl text-slate-300 mb-8 font-mono">
                        {player.hp <= 0 ? "The Vanguard has fallen." : "Enemy threat neutralized."}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-black font-bold py-4 px-12 rounded hover:scale-105 transition-transform"
                    >
                        {player.hp <= 0 ? "REBOOT SYSTEM" : "PROCEED TO NEXT NODE"}
                    </button>
                </div>
            )}

            {/* Dev Panel */}
            <DevPanel />
        </div>
    );
};