import type { PlayerState } from '../../types';

interface EnergyControlSectionProps {
  player: PlayerState;
  devSetPlayerEnergy: (energy: number) => void;
  devSetMaxEnergy: (maxEnergy: number) => void;
}

export function EnergyControlSection({ player, devSetPlayerEnergy, devSetMaxEnergy }: EnergyControlSectionProps) {
  return (
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
  );
}
