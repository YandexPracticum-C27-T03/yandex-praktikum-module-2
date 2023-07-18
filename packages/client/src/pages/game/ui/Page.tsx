import React, { useState } from 'react';
import { View, Panel, PanelHeader, Group, Button } from '@vkontakte/vkui';
import { GameView } from '@@entities/game';
export const GamePage = () => {
  const [gameStart, setGameStart] = useState(false);
  const handleStartGame = () => {
    setGameStart(true);
  };
  return (
    <>
      {gameStart ? (
        <GameView />
      ) : (
        <View activePanel="start">
          <Panel id="start">
            <PanelHeader>2D Runner</PanelHeader>
            <>
              <Group title="Описание игры">
                Добро пожаловать в захватывающий мир нашего 2D раннера! В этой игре ваша реакция и ловкость будут стоять
                на испытании. Вам предстоит стать героем, который должен перепрыгивать разнообразные препятствия,
                преодолевая трудности на своем пути. Вам нужно проявить отличную координацию движений, чтобы
                перепрыгивать через преграды, которые будут появляться на вашем пути. Ваша задача - собрать как можно
                больше бонусов и монет, чтобы получить максимальный счет. Используйте свои навыки и реакцию, чтобы
                избегать столкновений. Не забывайте, что каждое препятствие будет появляться все быстрее и быстрее,
                поэтому ваше внимание должно быть постоянно направлено на игровое поле. Постарайтесь достичь высочайшего
                счета, ставьте рекорды.
              </Group>
              <Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ width: '200px' }} onClick={handleStartGame}>
                    Начать игру
                  </Button>
                </div>
              </Group>
            </>
          </Panel>
        </View>
      )}
    </>
  );
};

export default GamePage;
