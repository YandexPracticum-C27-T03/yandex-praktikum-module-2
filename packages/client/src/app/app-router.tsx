import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import { UNProtectedRoute, fetchUser } from '@@entities/user';
import { ProtectedRoute } from '@@entities/user';
import { ForumPage, CreateTopicForm, SingleTopic } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { InternalErrorPage } from '@@pages/internal-error';
import { LeaderBoardPage } from '@@pages/leaderboard';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { NotFoundPage } from '@@pages/not-found';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { Routes as Pages } from '../shared/config';

import { BaseLayout } from './layouts/BaseLayout';

export const routerConfig = [
  {
    element: <BaseLayout />,

    id: 'root',

    children: [
      // Доступ только для авторизированных
      {
        element: <ProtectedRoute />,

        children: [
          {
            path: Pages.GAME,
            element: <GamePage />,
          },
          {
            path: Pages.LEADERBOARD,
            element: <LeaderBoardPage />,
          },
          {
            path: Pages.FORUM,
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
          {
            path: Pages.PROFILE,
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
            path: Pages.LOGIN,
            element: <LoginPage />,
          },
          {
            path: Pages.REGISTRATION,
            element: <RegistrationPage />,
          },
        ],
      },
      // Блокирует роуты, если пользователь авторизирован //

      // Публичные роуты
      {
        path: Pages.ROOT,
        element: <MainPage />,
      },
      {
        path: Pages.INTERNAL_ERROR,
        element: <InternalErrorPage />,
      },
      {
        path: Pages.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
];

function createRouter(router: RouteObject[]) {
  function renderChild(children: RouteObject['children']) {
    if (!Array.isArray(children) || !children.length) {
      return <></>;
    }

    return createRouter(children);
  }

  return router.map(({ children, path, element, loader }, index) => (
    <React.Fragment key={`${path}__${index}`}>
      <Route path={path} element={element} loader={loader} children={<Route>{renderChild(children)}</Route>} />
    </React.Fragment>
  ));
}

export function AppRouter() {
  return <Routes>{createRouter(routerConfig)}</Routes>;
}
