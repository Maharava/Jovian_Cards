import type { Card } from '../../types';

interface CardSearchListProps {
  cards: Card[];
  onSelectCard: (card: Card) => void;
}

export function CardSearchList({ cards, onSelectCard }: CardSearchListProps) {
  if (cards.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-gray-700 border border-gray-600 rounded mt-1 max-h-60 overflow-y-auto z-10">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => onSelectCard(card)}
          className="w-full text-left px-3 py-2 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
        >
          <div className="text-white font-medium">{card.name}</div>
          <div className="text-gray-400 text-xs">
            {card.type === 'unit' && card.stats && `${card.stats.atk}/${card.stats.hp} •`} {card.cost} energy • {card.faction}
          </div>
        </button>
      ))}
    </div>
  );
}
