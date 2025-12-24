import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { ALL_CARDS } from '../data/cards';
import type { Card, UnitInstance } from '../types';

export function DevPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardSearch, setCardSearch] = useState('');
  const [showCardList, setShowCardList] = useState(false);
  const [enemyCardSearch, setEnemyCardSearch] = useState('');
  const [showEnemyCardList, setShowEnemyCardList] = useState(false);

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
      ).slice(0, 20) // Limit to 20 results
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

  // Combine all units from both boards
  const allUnits: (UnitInstance & { side: 'player' | 'enemy' })[] = [
    ...player.board.map(u => ({ ...u, side: 'player' as const })),
    ...enemy.board.map(u => ({ ...u, side: 'enemy' as const }))
  ];

  // Toggle button (always visible when closed)
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

  // Full panel
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
        {/* Game Control Section */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Game Control</h3>
          <button
            onClick={() => startBattle('Megacorp', 1)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition-colors mb-2"
          >
            🎮 Start New Battle
          </button>
          <div className="text-gray-400 text-xs space-y-1">
            <div>Phase: <span className="text-white">{phase}</span></div>
            <div>Turn: <span className="text-white">{turn}</span></div>
          </div>
        </section>

        {/* HP Control Section */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">HP Control</h3>

          {/* Player HP */}
          <div className="mb-3">
            <label className="text-gray-300 text-sm block mb-1">
              Player HP: <span className="text-white font-semibold">{player.hp}/{player.maxHp}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HP"
                className="flex-1 bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(val)) {
                      devSetPlayerHP(val);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                onClick={() => devSetPlayerHP(player.maxHp)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Max
              </button>
            </div>
          </div>

          {/* Enemy HP */}
          <div>
            <label className="text-gray-300 text-sm block mb-1">
              Enemy HP: <span className="text-white font-semibold">{enemy.hp}/{enemy.maxHp}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="HP"
                className="flex-1 bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(val)) {
                      devSetEnemyHP(val);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                onClick={() => devSetEnemyHP(1)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                1 HP
              </button>
            </div>
          </div>
        </section>

        {/* Energy Control Section */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Energy Control</h3>

          <div className="mb-2">
            <label className="text-gray-300 text-sm block mb-1">
              Current Energy: <span className="text-white font-semibold">{player.energy}/{player.maxEnergy}</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Energy"
                className="flex-1 bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseInt((e.target as HTMLInputElement).value);
                    if (!isNaN(val)) {
                      devSetPlayerEnergy(val);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                onClick={() => devSetPlayerEnergy(10)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                10
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">Max Energy</label>
            <input
              type="number"
              placeholder="Max Energy"
              defaultValue={player.maxEnergy}
              className="w-full bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt((e.target as HTMLInputElement).value);
                  if (!isNaN(val)) {
                    devSetMaxEnergy(val);
                  }
                }
              }}
            />
          </div>
        </section>

        {/* Card Spawner Section */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Spawn Card</h3>

          <div className="relative mb-2">
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
                // Delay to allow click on dropdown items
                setTimeout(() => setShowCardList(false), 200);
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />

            {/* Card List Dropdown */}
            {showCardList && filteredCards.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-purple-500 rounded-lg max-h-64 overflow-y-auto shadow-xl z-10">
                {filteredCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => handleSpawnCard(card)}
                    className="w-full text-left px-3 py-2 hover:bg-purple-600 border-b border-gray-600 last:border-b-0 transition-colors"
                  >
                    <div className="text-white font-semibold text-sm">
                      {card.name}
                      {card.title && <span className="text-gray-400 ml-1">- {card.title}</span>}
                    </div>
                    <div className="text-gray-400 text-xs">
                      T{card.tier} {card.faction} • {card.cost}⚡ • {card.id}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showCardList && filteredCards.length === 0 && cardSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-400 text-sm shadow-xl">
                No cards found
              </div>
            )}
          </div>

          {/* Quick spawn buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => devSpawnCard('elara_t1')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Elara T1
            </button>
            <button
              onClick={() => devSpawnCard('europa_t3')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Europa T3
            </button>
            <button
              onClick={() => devSpawnCard('tactic_power_shot')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Power Shot
            </button>
            <button
              onClick={() => devSpawnCard('tactic_supply_drop')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Supply Drop
            </button>
          </div>
        </section>

        {/* Enemy Card Spawner Section */}
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
                setTimeout(() => setShowEnemyCardList(false), 200);
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 placeholder-gray-400 focus:border-red-500 focus:outline-none"
            />

            {/* Enemy Card List Dropdown */}
            {showEnemyCardList && filteredEnemyCards.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-red-500 rounded-lg max-h-64 overflow-y-auto shadow-xl z-10">
                {filteredEnemyCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => handleSpawnEnemyCard(card)}
                    className="w-full text-left px-3 py-2 hover:bg-red-600 border-b border-gray-600 last:border-b-0 transition-colors"
                  >
                    <div className="text-white font-semibold text-sm">
                      {card.name}
                      {card.title && <span className="text-gray-400 ml-1">- {card.title}</span>}
                    </div>
                    <div className="text-gray-400 text-xs">
                      T{card.tier} {card.faction} • {card.stats?.atk}/{card.stats?.hp} • {card.id}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showEnemyCardList && filteredEnemyCards.length === 0 && enemyCardSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-400 text-sm shadow-xl">
                No units found
              </div>
            )}
          </div>

          {/* Quick spawn enemy buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => devSpawnEnemyCard('corp_guard_t1')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Corp Guard T1
            </button>
            <button
              onClick={() => devSpawnEnemyCard('corp_manager_t3')}
              className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Manager T3
            </button>
          </div>
        </section>

        {/* Unit Control Section */}
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

                  {/* HP Controls */}
                  <div className="mb-1">
                    <div className="text-xs text-gray-400 mb-1">Set HP:</div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="HP"
                        className="flex-1 bg-gray-600 text-white px-2 py-1 rounded text-sm border border-gray-500 focus:border-purple-500 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(val)) {
                              devSetUnitHP(unit.uid, val);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => devSetUnitHP(unit.uid, 1)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        1HP
                      </button>
                      <button
                        onClick={() => devSetUnitHP(unit.uid, unit.maxHp)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  {/* ATK Controls */}
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Set ATK:</div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="ATK"
                        className="flex-1 bg-gray-600 text-white px-2 py-1 rounded text-sm border border-gray-500 focus:border-purple-500 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(val)) {
                              devSetUnitATK(unit.uid, val);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => devSetUnitATK(unit.uid, 0)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        0
                      </button>
                      <button
                        onClick={() => devSetUnitATK(unit.uid, 10)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        10
                      </button>
                    </div>
                  </div>

                  {/* Remove Unit */}
                  <div className="mt-2 pt-2 border-t border-gray-600">
                    <button
                      onClick={() => devRemoveUnit(unit.uid)}
                      className="w-full bg-red-700 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors"
                    >
                      ✕ Remove Unit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clear Board Buttons */}
          {allUnits.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-600">
              <button
                onClick={() => devClearBoard('player')}
                className="bg-blue-700 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition-colors"
              >
                Clear Player
              </button>
              <button
                onClick={() => devClearBoard('enemy')}
                className="bg-red-700 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition-colors"
              >
                Clear Enemy
              </button>
              <button
                onClick={() => devClearBoard('both')}
                className="bg-purple-700 hover:bg-purple-600 text-white text-xs py-1 px-2 rounded transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-purple-300 font-semibold mb-2">Game State</h3>
          <div className="text-gray-400 text-xs space-y-1">
            <div>Hand: <span className="text-white">{player.hand.length}</span> cards</div>
            <div>Deck: <span className="text-white">{player.deck.length}</span> cards</div>
            <div>Graveyard: <span className="text-white">{player.graveyard.length}</span> cards</div>
            <div>Player Board: <span className="text-white">{player.board.length}/7</span> units</div>
            <div>Enemy Board: <span className="text-white">{enemy.board.length}/7</span> units</div>
          </div>
        </section>
      </div>
    </div>
  );
}
