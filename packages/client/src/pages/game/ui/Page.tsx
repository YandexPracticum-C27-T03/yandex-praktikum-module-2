import { useState } from 'react';
import { GameView } from '@@entities/game';
import { GamePreview } from './game-preview';

export const GamePage = () => {
  const [gameStart, setGameStart] = useState(false);
  const handleStartGame = () => setGameStart(true);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {gameStart ? (
        <>
          <GameView />
        </>
      ) : (
        <GamePreview handleStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default GamePage;
