import { useCallback, useEffect, useRef, useState } from 'react';
import { GameView } from '@@entities/game';
import { ResourceLoaderEvents } from '@@entities/game';
import { ResourceLoader } from '@@entities/game/lib/utils';
import { getLeaderBoard } from '@@entities/leader-board/model/reducers';
import { selectCurrentTheme } from '@@entities/theme';
import { useFullscreen } from '@@shared/hooks/useFullscreen';
import { makeMapDispatch, makeMapState, useMapDispatch, useMapState } from '@@shared/lib/model/hooks';
import { FullScreenContainer } from '@@shared/ui/Fullscreen';
import { Button } from '@vkontakte/vkui';
import { Div } from '@vkontakte/vkui';
import { GamePreview } from './game-preview';

const mapDispatch = makeMapDispatch((dispatch) => ({
  getTeamList: () => dispatch(getLeaderBoard()),
}));

const mapState = makeMapState((state) => ({
  currentTheme: selectCurrentTheme(state),
}));

export const GamePage = () => {
  const fullscreenController = useFullscreen();
  const { getTeamList } = useMapDispatch(mapDispatch);
  const [gameStart, setGameStart] = useState(false);
  const [resourceLoaded, setResourceLoaded] = useState(false);
  const handleStartGame = () => setGameStart(true);
  const { currentTheme } = useMapState(mapState);
  const resourceLoader = useRef<ResourceLoader>(new ResourceLoader(currentTheme));

  const onLoad = useCallback(() => setResourceLoaded(true), []);

  useEffect(() => {
    // TODO: Добавить спиннер или что-то такое, что отобразит состояние загрузки ресурсов
    // void -для того, чтобы среда разработки не указывала на не перехваченный промис(он нам не нужен)
    void resourceLoader.current.on(ResourceLoaderEvents.Success, onLoad).load(30000);
    // void - для того, чтобы TS не ругался на тип возвращаемых данных(ResourceLoader, а не void)
    return () => void resourceLoader.current.off(ResourceLoaderEvents.Success, onLoad);
  }, [onLoad]);

  useEffect(() => {
    getTeamList();
  }, [getTeamList]);

  return (
    <FullScreenContainer controller={fullscreenController}>
      <Div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: 0 }}>
        {gameStart ? (
          <GameView resourceLoader={resourceLoader.current}>
            <Button appearance="neutral" onClick={fullscreenController.enter}>
              Полный экран
            </Button>
          </GameView>
        ) : (
          <GamePreview handleStartGame={handleStartGame} startActive={resourceLoaded} />
        )}
      </Div>
    </FullScreenContainer>
  );
};

export default GamePage;
