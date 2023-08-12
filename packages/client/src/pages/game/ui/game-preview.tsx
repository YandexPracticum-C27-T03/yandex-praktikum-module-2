import React from 'react';
import { getLeaderBoardSelecotr } from '@@entities/leader-board/model/selectors';
import { makeMapState, useMapState } from '@@shared/lib/model/hooks';
import { HeaderLayout } from '@@widgets/header-layout';
import { Text, Group, Button, Div, Header } from '@vkontakte/vkui';

type GamePreviewProps = {
  handleStartGame: () => void;
  startActive: boolean;
};

const mapState = makeMapState((state) => ({
  leaderboard: getLeaderBoardSelecotr(state),
}));

export const GamePreview: React.FC<GamePreviewProps> = ({ handleStartGame, startActive }) => {
  const {
    leaderboard: { isLoading },
  } = useMapState(mapState);

  return (
    <HeaderLayout>
      <>
        <Group header={<Header mode="secondary">Описание игры</Header>}>
          <Div>
            <Text>
              Добро пожаловать в захватывающий мир нашего 2D раннера! В этой игре ваша реакция и ловкость будут стоять
              на испытании. Вам предстоит стать героем, который должен перепрыгивать разнообразные препятствия,
              преодолевая преодолевая преодолевая преодолевая трудности на своем пути. Вам нужно проявить отличную
              координацию движений, чтобы преграды, которые будут появляться на вашем пути. Ваша задача - собрать как
              можно больше бонусов и монет, чтобы получить максимальный счет. Используйте свои навыки и реакцию, чтобы
              избегать столкновений. Не забывайте, что каждое препятствие будет появляться все быстрее и быстрее,
              поэтому ваше внимание должно быть постоянно направлено на игровое поле. Постарайтесь достичь высочайшего
              счета, ставьте рекорды.
            </Text>
          </Div>
        </Group>
        <Div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ width: '200px' }}
            disabled={!startActive && isLoading}
            onClick={handleStartGame}
            stretched
            mode="primary"
            size="l"
          >
            Начать игру
          </Button>
        </Div>
      </>
    </HeaderLayout>
  );
};
