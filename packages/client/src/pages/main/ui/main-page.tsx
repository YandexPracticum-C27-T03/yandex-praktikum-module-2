import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetPageName } from '@@entities/service-values';
import { Routes } from '@@shared/config';
import { HeaderLayout } from '@@widgets/header-layout';
import { Spacing, Header, Group, Div, Text, CellButton } from '@vkontakte/vkui';

export const MainPage = () => {
  useSetPageName('Главная страница');
  const navigate = useNavigate();

  const goToProfile = () => navigate(Routes.PROFILE);
  const goToGame = () => navigate(Routes.GAME);
  const goToLeaderboard = () => navigate(Routes.LEADERBOARD);
  const goToForum = () => navigate(Routes.FORUM);

  return (
    <HeaderLayout>
      <>
        <Group header={<Header mode="secondary">Меню</Header>}>
          <Div className={''}>
            <CellButton onClick={goToProfile}>Профиль</CellButton>
            <CellButton onClick={goToGame}>К игре</CellButton>
            <CellButton onClick={goToLeaderboard}>Страница лидеров</CellButton>
            <CellButton onClick={goToForum}>Форум игры</CellButton>
          </Div>
        </Group>
        <Spacing size={1} />
        <Group header={<Header mode="secondary">Об игре</Header>}>
          <Div>
            <Text weight="1">
              Зарядитесь динамикой и позитивом в нашем захватывающем "2D раннере"!
              <br />
              Уникальное сочетание классического 2D раннера с эпическими элементами приключенческой игры.
              <br />
              Вам предстоит управлять персонажем, которому необходимо преодолевать препятствия, бежать с неимоверной
              неимоверной скоростью и собирать бонусы для достижения максимального счета!
            </Text>
          </Div>
        </Group>

        <Group header={<Header mode="secondary">Особенности игры</Header>}>
          <Div>
            <Text weight="1">
              - Простой, но завораживающий игровой процесс: прыгайте, пробегайте, избегайте препятствий и набирайте
              очки.
              <br />
              - Красочная и детализированная 2D-графика сделает ваше путешествие ярким и незабываемым.
              <br />- Захватывающие уровни и сложные задания, которые становятся все интереснее с каждым пройденным
              этапом.
            </Text>
          </Div>
        </Group>
      </>
    </HeaderLayout>
  );
};
