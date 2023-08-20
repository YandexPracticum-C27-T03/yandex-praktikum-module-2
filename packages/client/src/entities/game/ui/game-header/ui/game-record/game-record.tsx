import { useContext } from 'react';
import { GameContext } from '@@entities/game/lib/context/game-context';
import { Group, Text } from '@vkontakte/vkui';

export const GameRecord = () => {
  const { record } = useContext(GameContext);

  return (
    <Group mode="card" padding="m">
      <Text weight="1">РЕКОРД: {record}</Text>
    </Group>
  );
};
