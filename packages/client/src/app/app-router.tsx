import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import { fetchUser } from '@@entities/user';
import { ProtectedRoute } from '@@entities/user';
import { ForumPage, CreateTopicForm, SingleTopic } from '@@pages/forum';
import { GamePage } from '@@pages/game';
import { InternalErrorPage } from '@@pages/internal-error';
import { LoginPage } from '@@pages/login';
import { MainPage } from '@@pages/main';
import { NotFoundPage } from '@@pages/not-found';
import { ProfilePage } from '@@pages/profile';
import { RegistrationPage } from '@@pages/registration';
import { Routes as Pages } from '../shared/config';
import { BaseLayout } from './layouts/BaseLayout';

export type AppRoute = {
  element: RouteObject['element'];
  path?: RouteObject['path'];
  loadData?: (dispatch: AppDispatch) => Promise<void | unknown> | void;
  children?: AppRoute[];
};

export const routerConfig: AppRoute[] = [
  {
    element: <BaseLayout />,

    path: '/',

    loadData: (dispatch: AppDispatch) => dispatch(fetchUser()).unwrap(),

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
        path: Pages.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Pages.REGISTRATION,
        element: <RegistrationPage />,
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

function createRouter(router: AppRoute[]) {
  function renderChild(children: AppRoute['children']) {
    if (!Array.isArray(children) || !children.length) {
      return <></>;
    }

    return <Route>{createRouter(children)}</Route>;
  }

  return router.map(({ children, path, element }, index) => (
    <React.Fragment key={`${path}__${index}`}>
      <Route path={path} element={element} children={renderChild(children)} />
    </React.Fragment>
  ));
}

export function AppRouter() {
  return <Routes>{createRouter(routerConfig)}</Routes>;
}

export function flatRouter(router: AppRoute[]) {
  return router.reduce((acc: AppRoute[], route: AppRoute) => {
    if (route.children && Array.isArray(route.children)) {
      acc = acc.concat(flatRouter(route.children));
    }
    return acc.concat(route);
  }, []);
}
