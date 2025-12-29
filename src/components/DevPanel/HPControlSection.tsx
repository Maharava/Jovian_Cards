import type { PlayerState, EnemyState } from '../../types';

interface HPControlSectionProps {
  player: PlayerState;
  enemy: EnemyState;
  devSetPlayerHP: (hp: number) => void;
  devSetEnemyHP: (hp: number) => void;
}

export function HPControlSection({ player, enemy, devSetPlayerHP, devSetEnemyHP }: HPControlSectionProps) {
  return (
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
  );
}
