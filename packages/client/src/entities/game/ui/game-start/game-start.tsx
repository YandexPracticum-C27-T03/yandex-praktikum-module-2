import { memo, useContext } from 'react';
import { GAME_STATUS } from '@@entities/game/lib/constants/game-status';
import { GameContext } from '@@entities/game/lib/context/game-context';
import { declOfNum } from '@@entities/game/lib/utils/decl-of-num';
import { cn } from '@bem-react/classname';
import { Button, Div, Group, Spacing, Text } from '@vkontakte/vkui';

import './styles.scss';

export const GameStart = memo(() => {
  const { gameStatus, start, reset, score, record } = useContext(GameContext);
  const GameWindow = cn('GameWindow');
  if (gameStatus === GAME_STATUS.START) {
    return null;
  }

  return (
    <Div className={GameWindow()}>
      <Group>
        <Div className={GameWindow('body')}>
          {gameStatus === GAME_STATUS.STOP && (
            <>
              <Text weight="1" className={GameWindow('start')}>
                Рекорд: {record} {declOfNum(record)}
              </Text>
              <Spacing size={1} />
              <Button onClick={start}>Начать !</Button>
            </>
          )}

          {gameStatus === GAME_STATUS.RESTART && (
            <>
              <Text weight="1">
                Вы набрали: {score} {declOfNum(score)}
              </Text>
              <Spacing size={1} />
              <Button onClick={reset}>Начать заново</Button>
            </>
          )}
        </Div>
      </Group>
    </Div>
  );
});
