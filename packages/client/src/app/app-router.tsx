
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Routes } from '@@features';
import { ForumPage, CreateTopicForm, SingleTopic } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { InternalErrorPage } from '@@pages/internal-error';
import { LeaderBoardPage } from '@@pages/leaderboard';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { NotFoundPage } from '@@pages/not-found';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { BaseLayout } from './layouts/BaseLayout';

const routerConfig: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: [
      {
        path: Routes.ROOT,
        element: <MainPage />,
      },
      {
        path: Routes.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Routes.REGISTRATION,
        element: <RegistrationPage />,
      },
      {
        path: Routes.GAME,
        element: <GamePage />,
      },
      {
        path: Routes.LEADERBOARD,
        element: <LeaderBoardPage />,
      },
      {
        path: Routes.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: Routes.FORUM,
        element: <ForumPage />,
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
      {
        path: '/forum/create-topic',
        element: <CreateTopicForm />,
      },
      {
        path: '/forum/topic/:id',
        element: <SingleTopic />,
    ],
  },
];

export const appRouter = createBrowserRouter(routerConfig);
