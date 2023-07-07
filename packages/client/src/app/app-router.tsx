import { createBrowserRouter } from 'react-router-dom';
import { ForumPage, CreateTopicForm, SingleTopic } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { LeaderBoardPage } from '@@pages/leaderboard';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { BaseLayout } from './layouts/BaseLayout';

const routerConfig = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/game',
        element: <GamePage />,
      },
      {
        path: '/leaderboard',
        element: <LeaderBoardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/forum',
        element: <ForumPage />,
      },
      {
        path: '/forum/create-topic',
        element: <CreateTopicForm />,
      },
      {
        path: '/forum/topic/:id',
        element: <SingleTopic />,
      },
    ],
  },
];

export const appRouter = createBrowserRouter(routerConfig);
