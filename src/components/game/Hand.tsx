import React from 'react';
import { Card } from '../Card';
import { Commander } from '../Commander';
import type { PlayerState, Card as CardType } from '../../types';

interface HandProps {
    player: PlayerState;
    phase: string;
    onPlayCard: (card: CardType) => void;
    onInspectUnit: (card: CardType) => void; // Using card type for simplicity as we mock unit from card
}

export const Hand: React.FC<HandProps> = ({ player, phase, onPlayCard, onInspectUnit }) => {
    // We assume the commander logic stays here or moves? 
    // In original GameBoard, Player Commander is separate from Hand div but visually near.
    // The structure was:
    // <div className="h-1/4 ...">
    //    <div className="... flex justify-between ...">
    //       <Commander ... />
    //       <div className="flex-grow ... ml-48"> {Hand Cards} </div>
    //    </div>
    // </div>
    
    // I will include the Commander here for the "Player Zone" component, usually.
    // But the file is named "Hand". I'll keep it strictly Hand? 
    // No, "PlayerZone" might be better if it includes Commander.
    // I'll call it Hand for now but maybe just render the cards. 
    // The parent GameBoard lays them out.
    // Actually, looking at the layout, "Player Zone" contains Commander + Hand + Action Buttons.
    // I'll stick to extracting the *Hand* part (the cards loop).
    
    return (
        <div className="flex-grow flex justify-center items-end px-4 pb-4 h-full relative perspective-1000 ml-48">
            <div className="flex -space-x-24 hover:-space-x-4 transition-all duration-300 ease-out items-end">
                {player.hand.map((card, index) => (
                    <div key={`${card.id}-${index}`} className="transition-transform hover:-translate-y-12 hover:z-50 hover:scale-110 duration-200 animate-in fade-in slide-in-from-bottom-10">
                         <Card 
                            card={card} 
                            onClick={() => onPlayCard(card)} 
                            onContextMenu={(e) => {
                                e.preventDefault();
                                onInspectUnit(card); 
                            }}
                            disabled={phase !== 'player_turn' || player.energy < card.cost}
                         />
                    </div>
                ))}
            </div>
        </div>
    );
};
