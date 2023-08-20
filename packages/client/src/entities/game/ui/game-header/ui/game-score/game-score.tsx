import { useContext } from 'react';

import { GameContext } from '@@entities/game/lib/context/game-context';
import { Group, Text } from '@vkontakte/vkui';

export const GameScore = () => {
  const { score } = useContext(GameContext);

  return (
    <Group mode="card" padding="m">
      <Text weight="1">{score}</Text>
    </Group>
  );
};
