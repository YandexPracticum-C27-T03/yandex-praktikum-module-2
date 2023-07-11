import { createBrowserRouter } from 'react-router-dom';
import { ForumPage } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { LeaderBoardPage } from '@@pages/leaderboard';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { BaseLayout } from './layouts/BaseLayout';

//test_yury@m.ru
// yury_test_123

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
    ],
  },
];

export const appRouter = createBrowserRouter(routerConfig);
