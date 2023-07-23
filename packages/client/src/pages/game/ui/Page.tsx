import { useCallback, useEffect, useState } from 'react';
import { GameView } from '@@entities/game';
import { resourceLoader, ResourceLoaderEvents } from '@@entities/game';
import { Div } from '@vkontakte/vkui';
import { GamePreview } from './game-preview';

export const GamePage = () => {
  const [gameStart, setGameStart] = useState(false);
  const [resourceLoaded, setResourceLoaded] = useState(false);
  const handleStartGame = () => setGameStart(true);

  const onLoad = useCallback(() => setResourceLoaded(true), []);

  useEffect(() => {
    // TODO: Добавить спиннер или что-то такое, что отобразит состояние загрузки ресурсов
    resourceLoader.on(ResourceLoaderEvents.Success, onLoad).load(30000);

    return () => void resourceLoader.off(ResourceLoaderEvents.Success, onLoad);
  }, [onLoad]);

  return (
    <Div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: 0 }}>
      {gameStart ? (
        <>
          <GameView resourceLoader={resourceLoader} />
        </>
      ) : (
        <GamePreview handleStartGame={handleStartGame} startActive={resourceLoaded} />
      )}
    </Div>
  );
};

export default GamePage;
