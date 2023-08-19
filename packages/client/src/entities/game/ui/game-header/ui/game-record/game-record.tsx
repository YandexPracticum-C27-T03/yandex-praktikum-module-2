import { useContext } from 'react';
import { GameContext } from '@@entities/game/lib/context/game-context';
import { Group, Text } from '@vkontakte/vkui';

export const GameRecord = () => {
  const { record } = useContext(GameContext);

  return (
    <Group style={{ padding: '10px 20px' }}>
      <Text weight="1">РЕКОРД: {record}</Text>
    </Group>
  );
};
