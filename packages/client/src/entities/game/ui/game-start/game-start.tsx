import { memo, useContext } from 'react';
import { GAME_STATUS } from '@@entities/game/lib/constants/game-status';
import { declOfNum } from '@@entities/game/lib/utils/decl-of-num';
import { Button } from '@vkontakte/vkui';
import { GameContext } from '../../lib/context/game-context';

import './styles.scss';

export const GameStart = memo(() => {
  const { gameStatus, start, reset, score, record } = useContext(GameContext);

  if (gameStatus === GAME_STATUS.START) {
    return null;
  }

  return (
    <div className="Game">
      {gameStatus === GAME_STATUS.STOP && (
        <>
          <h1>
            Рекорд: {record} {declOfNum(record)}
          </h1>
          <Button onClick={start}>Начать !</Button>
        </>
      )}

      {gameStatus === GAME_STATUS.RESTART && (
        <>
          <h1>
            Вы набрали: {score} {declOfNum(score)}
          </h1>
          <Button onClick={reset}>Начать заново</Button>
        </>
      )}
    </div>
  );
});
