import { useContext } from 'react';
import './styles.scss';

import { GameContext } from '@@entities/game/lib/context/game-context';
import { Group, Text } from '@vkontakte/vkui';

export const GameScore = () => {
  const { score } = useContext(GameContext);

  return (
    <Group style={{ padding: '10px 20px' }}>
      <Text weight="1">{score}</Text>
    </Group>
  );
};
