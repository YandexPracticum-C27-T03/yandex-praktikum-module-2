import { useState } from 'react';
import { GameView } from '@@entities/game';
import { useFullscreen } from '@@shared/hooks/useFullscreen';
import { FullScreenContainer } from '@@shared/ui/Fullscreen';
import { Button, Div } from '@vkontakte/vkui';
import { GamePreview } from './game-preview';

export const GamePage = () => {
  const handle = useFullscreen();
  const [gameStart, setGameStart] = useState(false);
  const handleStartGame = () => setGameStart(true);

  return (
    <Div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: 0 }}>
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
    </Div>
  );
};

export default GamePage;
