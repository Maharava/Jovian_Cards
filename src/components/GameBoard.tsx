import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Card } from './Card';
import { Unit } from './Unit';
import { Commander } from './Commander';
import { HERO_CARDS } from '../data/cards';
import { cn } from '../lib/utils';

export const GameBoard: React.FC = () => {
  const { 
    player, enemy, 
    startGame, playUnit, endPlayerTurn, attackTarget,
    phase, turn
  } = useGameStore();

  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  // Initialize debug game
  useEffect(() => {
    const debugDeck = Array.from({ length: 20 }).map((_, i) => ({
      ...HERO_CARDS[i % HERO_CARDS.length],
      id: `hero_${i}_${Date.now()}`
    }));
    // Add some enemies (commented out unused var)
    // const enemyDebugDeck = ...

    startGame(debugDeck);
    
    // Hack: Manually populate enemy board for testing
    // In real game, AI plays these.
    useGameStore.setState(state => ({
        enemy: {
            ...state.enemy,
            board: [
                { 
                    uid: 'e1', cardId: 'drone', name: 'Mining Drone', baseAsset: 'enemy_drone', 
                    atk: 1, hp: 2, maxHp: 2, owner: 'enemy', ready: true, mechanics: [], shield: 0 
                },
                { 
                    uid: 'e2', cardId: 'bot', name: 'Security Bot', baseAsset: 'enemy_bot', 
                    atk: 2, hp: 3, maxHp: 3, owner: 'enemy', ready: true, mechanics: ['guard'], shield: 0 
                }
            ]
        }
    }));

  }, []);

  // AI Turn Trigger
  useEffect(() => {
    if (phase === 'enemy_turn') {
        const timer = setTimeout(() => {
            useGameStore.getState().enemyAction();
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [phase]);

  const handlePlayCard = (card: import('../types').Card) => {
    if (phase !== 'player_turn') return;
    if (card.type === 'unit') {
      playUnit(card);
    } else {
      console.log('Tactics not implemented yet');
    }
  };

  const handleUnitClick = (unit: import('../types').UnitInstance) => {
      if (phase !== 'player_turn') return;

      if (unit.owner === 'player') {
          // Select own unit to attack with
          if (!unit.ready) return; // Can't select summoning sick units
          
          if (selectedUnitId === unit.uid) {
              setSelectedUnitId(null); // Deselect
          } else {
              setSelectedUnitId(unit.uid); // Select
          }
      } else {
          // Enemy unit: Attack it if we have a selection
          if (selectedUnitId) {
              attackTarget(selectedUnitId, 'unit', unit.uid);
              setSelectedUnitId(null);
          }
      }
  };

  const handleEnemyCommanderClick = () => {
       if (phase !== 'player_turn') return;
       if (selectedUnitId) {
           attackTarget(selectedUnitId, 'enemy');
           setSelectedUnitId(null);
       }
  };

  return (
    <div className="w-full h-screen bg-jovian-black text-white flex flex-col overflow-hidden relative select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Top Bar: Turn Info */}
      <div className="absolute top-0 w-full flex justify-center py-2 z-10">
        <div className="bg-slate-800 px-6 py-1 rounded-b-xl border border-t-0 border-slate-600 font-mono text-xl font-bold">
            Turn {turn} — <span className={phase === 'player_turn' ? 'text-cyan-400' : 'text-red-400'}>
                {phase === 'player_turn' ? 'YOUR TURN' : 'ENEMY TURN'}
            </span>
        </div>
      </div>

      {/* --- ENEMY ZONE --- */}
      <div className="h-1/4 flex justify-center items-start pt-12 relative">
         <Commander 
            name="Rogue AI" 
            hp={enemy.hp} 
            maxHp={enemy.maxHp} 
            className="absolute top-4 z-10"
            onClick={handleEnemyCommanderClick}
            isTarget={!!selectedUnitId}
         />
         {/* Enemy Hand Count */}
         <div className="absolute top-8 right-12 flex gap-1">
             {Array.from({length: 3}).map((_,i) => (
                 <div key={i} className="w-12 h-16 bg-slate-800 border border-slate-600 rounded"></div>
             ))}
         </div>
      </div>

      {/* --- BATTLEFIELD --- */}
      <div className="flex-grow flex flex-col items-center justify-center gap-6 relative bg-slate-900/30 border-y border-white/5">
        
        {/* Enemy Board */}
        <div className="flex justify-center gap-3 min-h-[140px] items-end">
            {enemy.board.length === 0 && <div className="text-white/20 font-mono text-sm">Empty Sector</div>}
            {enemy.board.map(u => (
                <Unit 
                    key={u.uid} 
                    unit={u} 
                    onClick={() => handleUnitClick(u)}
                    isTarget={!!selectedUnitId}
                />
            ))}
        </div>

        {/* Center Line */}
        <div className="w-2/3 h-px bg-cyan-500/20 shadow-[0_0_10px_#00ffff]"></div>

        {/* Player Board */}
        <div className="flex justify-center gap-3 min-h-[140px] items-start">
             {player.board.length === 0 && <div className="text-white/20 font-mono text-sm">Deploy Units Here</div>}
             {player.board.map(u => (
                <Unit 
                    key={u.uid} 
                    unit={u} 
                    onClick={() => handleUnitClick(u)}
                    canAttack={u.ready && phase === 'player_turn'}
                    isTarget={selectedUnitId === u.uid}
                    className={selectedUnitId === u.uid ? "ring-2 ring-yellow-400 scale-105" : ""}
                />
            ))}
        </div>
      </div>

      {/* --- PLAYER ZONE --- */}
      <div className="h-1/3 flex flex-col justify-end pb-2 relative z-20">
         <div className="flex justify-between items-end px-8 w-full max-w-7xl mx-auto">
            
            {/* Player Commander */}
            <Commander 
                name="Vanguard" 
                hp={player.hp} 
                maxHp={player.maxHp} 
                energy={player.energy}
                maxEnergy={player.maxEnergy}
                isPlayer
                className="mb-4"
            />

            {/* Hand Area */}
            <div className="flex-grow flex justify-center items-end px-4 pb-4 h-full relative perspective-1000">
                <div className="flex -space-x-24 hover:-space-x-4 transition-all duration-300 ease-out items-end">
                    {player.hand.map((card, index) => (
                        <div key={index} className="transition-transform hover:-translate-y-12 hover:z-50 hover:scale-110 duration-200">
                             <Card 
                                card={card} 
                                onClick={() => handlePlayCard(card)} 
                                disabled={phase !== 'player_turn' || player.energy < card.cost}
                             />
                        </div>
                    ))}
                </div>
            </div>

                        {/* Action Buttons */}

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

            

                  {/* --- GAME OVER OVERLAY --- */}

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

            

                </div>

              );

            };

            