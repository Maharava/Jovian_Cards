import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';
import type { Card, UnitInstance } from '../types';
import { GameControlSection } from './DevPanel/GameControlSection';
import { HPControlSection } from './DevPanel/HPControlSection';
import { EnergyControlSection } from './DevPanel/EnergyControlSection';
import { CardSearchList } from './DevPanel/CardSearchList';

export function DevPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardSearch, setCardSearch] = useState('');
  const [showCardList, setShowCardList] = useState(false);
  const [enemyCardSearch, setEnemyCardSearch] = useState('');
  const [showEnemyCardList, setShowEnemyCardList] = useState(false);

  // Refs to track timeouts for cleanup
  const cardSearchTimeoutRef = useRef<NodeJS.Timeout>();
  const enemyCardSearchTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    player,
    enemy,
    phase,
    turn,
    devSetPlayerHP,
    devSetEnemyHP,
    devSetUnitHP,
    devSetUnitATK,
    devSetPlayerEnergy,
    devSetMaxEnergy,
    devSpawnCard,
    devSpawnEnemyCard,
    devRemoveUnit,
    devClearBoard,
    startBattle
  } = useGameStore();

  // Filter cards based on search
  const filteredCards = cardSearch.trim()
    ? ALL_CARDS.filter(card =>
        card.name.toLowerCase().includes(cardSearch.toLowerCase()) ||
        card.id.toLowerCase().includes(cardSearch.toLowerCase()) ||
        (card.title && card.title.toLowerCase().includes(cardSearch.toLowerCase()))
      ).slice(0, 20)
    : [];

  const filteredEnemyCards = enemyCardSearch.trim()
    ? ALL_CARDS.filter(card =>
        card.type === 'unit' && (
          card.name.toLowerCase().includes(enemyCardSearch.toLowerCase()) ||
          card.id.toLowerCase().includes(enemyCardSearch.toLowerCase()) ||
          (card.title && card.title.toLowerCase().includes(enemyCardSearch.toLowerCase()))
        )
      ).slice(0, 20)
    : [];

  const handleSpawnCard = (card: Card) => {
    devSpawnCard(card.id);
    setCardSearch('');
    setShowCardList(false);
  };

  const handleSpawnEnemyCard = (card: Card) => {
    devSpawnEnemyCard(card.id);
    setEnemyCardSearch('');
    setShowEnemyCardList(false);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (cardSearchTimeoutRef.current) {
        clearTimeout(cardSearchTimeoutRef.current);
      }
      if (enemyCardSearchTimeoutRef.current) {
        clearTimeout(enemyCardSearchTimeoutRef.current);
      }
    };
  }, []);

  const allUnits: (UnitInstance & { side: 'player' | 'enemy' })[] = [
    ...player.board.map(u => ({ ...u, side: 'player' as const })),
    ...enemy.board.map(u => ({ ...u, side: 'enemy' as const }))
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg font-bold z-50 border-2 border-purple-400 transition-all"
      >
        🛠️ DEV PANEL
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border-2 border-purple-500 rounded-lg shadow-2xl z-50 w-96 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="bg-purple-600 px-4 py-2 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-white font-bold text-lg">🛠️ Developer Panel</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-red-300 font-bold text-xl leading-none"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Use refactored components */}
        <GameControlSection phase={phase} turn={turn} startBattle={startBattle} />
        <HPControlSection player={player} enemy={enemy} devSetPlayerHP={devSetPlayerHP} devSetEnemyHP={devSetEnemyHP} />
        <EnergyControlSection player={player} devSetPlayerEnergy={devSetPlayerEnergy} devSetMaxEnergy={devSetMaxEnergy} />

        {/* Card Spawner - Player */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Spawn Card</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search card name..."
              value={cardSearch}
              onChange={(e) => {
                setCardSearch(e.target.value);
                setShowCardList(e.target.value.trim().length > 0);
              }}
              onFocus={() => setShowCardList(cardSearch.trim().length > 0)}
              onBlur={() => {
                cardSearchTimeoutRef.current = setTimeout(() => setShowCardList(false), 200);
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            {showCardList && <CardSearchList cards={filteredCards} onSelectCard={handleSpawnCard} />}
          </div>
        </section>

        {/* Enemy Spawner */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Spawn Enemy Unit</h3>
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search enemy unit..."
              value={enemyCardSearch}
              onChange={(e) => {
                setEnemyCardSearch(e.target.value);
                setShowEnemyCardList(e.target.value.trim().length > 0);
              }}
              onFocus={() => setShowEnemyCardList(enemyCardSearch.trim().length > 0)}
              onBlur={() => {
                enemyCardSearchTimeoutRef.current = setTimeout(() => setShowEnemyCardList(false), 200);
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />
            {showEnemyCardList && <CardSearchList cards={filteredEnemyCards} onSelectCard={handleSpawnEnemyCard} />}
          </div>
        </section>

        {/* Unit Control */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Unit Control</h3>
          {allUnits.length === 0 ? (
            <p className="text-gray-400 text-sm">No units on board</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allUnits.map(unit => (
                <div key={unit.uid} className="bg-gray-700 rounded p-2">
                  <div className="text-white text-sm font-semibold mb-1">
                    {unit.name}
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                      unit.side === 'player' ? 'bg-blue-600' : 'bg-red-600'
                    }`}>
                      {unit.side === 'player' ? 'Player' : 'Enemy'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    ATK: {unit.atk} • HP: {unit.hp}/{unit.maxHp}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => devSetUnitHP(unit.uid, 1)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      1 HP
                    </button>
                    <button
                      onClick={() => devSetUnitATK(unit.uid, 10)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      10 ATK
                    </button>
                    <button
                      onClick={() => devRemoveUnit(unit.uid)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => devClearBoard('player')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded transition-colors"
            >
              Clear Player
            </button>
            <button
              onClick={() => devClearBoard('enemy')}
              className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded transition-colors"
            >
              Clear Enemy
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
