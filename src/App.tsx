import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { GameBoard } from './components/GameBoard';
import { MainMenu } from './components/MainMenu';
import { FactionSelect } from './components/FactionSelect';
import { VictoryScreen } from './components/VictoryScreen';
import { Hangar } from './components/Hangar';
import { Market } from './components/Market';

import { Workshop } from './components/Workshop';

function App() {
  const phase = useGameStore((state) => state.phase);
  const startGame = useGameStore((state) => state.startGame);
  
  // Initialize game to Main Menu on mount
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black font-sans">
      {phase === 'main_menu' && <MainMenu />}
      
      {phase === 'faction_select' && <FactionSelect />}

      {phase === 'hangar' && <Hangar />}

      {phase === 'market' && <Market />}

      {phase === 'workshop' && <Workshop />}
      
      {(phase === 'player_turn' || phase === 'enemy_turn' || phase === 'game_over' || phase === 'victory') && (        <>
          <GameBoard />
          {phase === 'victory' && <VictoryScreen />}
          
          {phase === 'game_over' && (
             <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-6xl text-red-600 font-bold mb-4">CRITICAL FAILURE</h2>
                    <button 
                      onClick={() => useGameStore.getState().startGame()}
                      className="px-8 py-3 bg-red-800 hover:bg-red-700 text-white font-bold rounded"
                    >
                      SYSTEM REBOOT
                    </button>
                </div>
             </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;