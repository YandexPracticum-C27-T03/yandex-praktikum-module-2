import { useState } from 'react';
import { GameView } from '@@entities/game';
import { useFullscreen } from '@@shared/hooks/useFullscreen';
import { FullScreenContainer } from '@@shared/ui/Fullscreen';
import { Button } from '@vkontakte/vkui';
import { GamePreview } from './game-preview';

export const GamePage = () => {
  const handle = useFullscreen();
  const [gameStart, setGameStart] = useState(false);
  const handleStartGame = () => setGameStart(true);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <FullScreenContainer handle={handle}>
        {gameStart ? (
          <>
            <Button
              style={{ position: 'absolute', top: '2%', left: '1%', background: '#000', zIndex: 1 }}
              onClick={handle.enter}
            >
              Fullscreen
            </Button>
            <GameView />
          </>
        ) : (
          <GamePreview handleStartGame={handleStartGame} />
        )}
      </FullScreenContainer>
    </div>
  );
};

export default GamePage;
