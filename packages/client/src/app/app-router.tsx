import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { UNProtectedRoute } from '@@entities/user';
import { ProtectedRoute } from '@@entities/user';
import { ForumPage } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { InternalErrorPage } from '@@pages/internal-error';
import { LeaderBoardPage } from '@@pages/leaderboard';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { NotFoundPage } from '@@pages/not-found';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { Routes } from '../shared/config';
import { BaseLayout } from './layouts/BaseLayout';

const routerConfig: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      // Доступ только для авторизированных
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: Routes.GAME,
            element: <GamePage />,
          },
          {
            path: Routes.LEADERBOARD,
            element: <LeaderBoardPage />,
          },
          {
            path: Routes.FORUM,
            element: <ForumPage />,
          },
          {
            path: Routes.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
      // Доступ только для авторизированных //

      // Блокирует доступ, если пользователь авторизирован
      {
        element: <UNProtectedRoute />,
        children: [
          {
            path: Routes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: Routes.REGISTRATION,
            element: <RegistrationPage />,
          },
        ],
      },
      // Блокирует роуты, если пользователь авторизирован //

      // Публичные роуты
      {
        path: Routes.ROOT,
        element: <MainPage />,
      },

      {
        path: Routes.INTERNAL_ERROR,
        element: <InternalErrorPage />,
      },
      {
        path: Routes.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
      // Публичные роуты //
    ],
  },
];

export const appRouter = createBrowserRouter(routerConfig);
