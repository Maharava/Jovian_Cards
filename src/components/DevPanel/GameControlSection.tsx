interface GameControlSectionProps {
  phase: string;
  turn: number;
  startBattle: (faction: string, difficulty: number) => void;
}

export function GameControlSection({ phase, turn, startBattle }: GameControlSectionProps) {
  return (
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
  );
}
