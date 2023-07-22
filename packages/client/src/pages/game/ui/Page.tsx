import { useState } from 'react';
import { GameView } from '@@entities/game';
import { Div } from '@vkontakte/vkui';
import { GamePreview } from './game-preview';

export const GamePage = () => {
  const [gameStart, setGameStart] = useState(false);
  const handleStartGame = () => setGameStart(true);

  return (
    <Div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: 0 }}>
      {gameStart ? (
        <>
          <GameView />
        </>
      ) : (
        <GamePreview handleStartGame={handleStartGame} />
      )}
    </Div>
  );
};

export default GamePage;
