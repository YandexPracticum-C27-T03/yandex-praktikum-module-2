import { PropsWithChildren, useContext } from 'react';

// eslint-disable-next-line import/order
import { GameRecord } from './game-record';

import './styles.scss';
import { GAME_STATUS } from '@@entities/game/lib/constants';
import { GameContext } from '@@entities/game/lib/context/game-context';

import { useControlledPopup } from '@@shared/hooks/useControlledPopup';

import { Button, Div } from '@vkontakte/vkui';
import { GameLeaderBoard } from './game-leaderboard';
import { GameScore } from './game-score';

export const GameHeader = ({ children }: PropsWithChildren) => {
  function onCloseLeaderBoard() {
    onClose();
  }

  function onOpenLeaderBoard() {
    onOpenModal();
  }

  const { popup, onClose, onOpenModal } = useControlledPopup(<GameLeaderBoard onClose={onCloseLeaderBoard} />);
  const { gameStatus } = useContext(GameContext);

  return (
    <Div className="Game-header">
      {children}
      <Button appearance="neutral" disabled={gameStatus === GAME_STATUS.START} onClick={onOpenLeaderBoard}>
        Лидеры
      </Button>
      <GameRecord />
      <GameScore />
      {popup}
    </Div>
  );
};
