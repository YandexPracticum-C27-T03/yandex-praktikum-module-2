import { useContext } from 'react';
import { GAME_STATUS } from '@@entities/game/lib/constants/game-status';
import { Button } from '@vkontakte/vkui';
import { GameContext } from '../context/game-context';

import './styles.scss';

export const GameStart = () => {
  const record = localStorage.getItem('score') || 0;

  const { gameStatus, start, reset, score } = useContext(GameContext);

  if (gameStatus === GAME_STATUS.START) {
    return null;
  }

  return (
    <div className="Game">
      {gameStatus === GAME_STATUS.STOP && (
        <>
          <h1>Рекорд: {record} очков</h1>
          <Button onClick={start}>Start game</Button>
        </>
      )}

      {gameStatus === GAME_STATUS.RESTART && (
        <>
          <h1>Вы набрали: {score} очков</h1>
          <Button onClick={reset}>Restart game</Button>
        </>
      )}
    </div>
  );
};
