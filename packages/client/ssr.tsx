import React from 'react';
import { Provider } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { flatRouter, AppRouter, routerConfig } from '@@app/app-router';
import { configureReduxStore } from '@@app/app-store';
import { fetchUser } from '@@entities/user';
import { ServerRepository } from '@@repositories/server.repository';
import { SSRWrapper } from '@vkontakte/vkui';
import * as express from 'express';
import { UserAgent } from 'express-useragent';

const isDev = () => process.env.NODE_ENV === 'development';

async function getUser(dispatch: AppDispatch) {
  try {
    await dispatch(fetchUser()).unwrap();
  } catch (error) {
    // если выкидывать эксешн мидлвара рендера выбросит в кетч и будет пустой экран бразуера
    return '[not autorized] - error';
  }
}

export async function render(
  request: express.Request<UserAgent>,
): Promise<[ReturnType<typeof renderToString>, RootState]> {
  // прокидываем в редакс стора репозиторий для работы с сетью на сервере
  const appStore = configureReduxStore<RootState>(new ServerRepository(request.headers['cookie']));

  const flat = flatRouter(routerConfig);

  // получаем пользователя
  await getUser(appStore.dispatch);

  const currentRoute = flat.find(({ path }) => path && matchPath(request.originalUrl, path));

  // если у найденого роута есть лоадер -> прокидываем диспатч стора и запускаем экшн
  if (currentRoute && currentRoute.loadData) {
    const { loadData } = currentRoute;
    loadData(appStore.dispatch);
  }

  // получаем начальное состояние и возвращем его вместе с статикой приложения в миддлвар для последующего рендера
  const initalState = appStore.getState();

  if (isDev()) {
    console.info('[initial-state-app]', initalState);
  }

  const html = renderToString(
    <React.StrictMode>
      <Provider store={appStore}>
        <SSRWrapper userAgent={request.useragent?.source}>
          <StaticRouter location={request.originalUrl}>
            <AppRouter />
          </StaticRouter>
        </SSRWrapper>
      </Provider>
    </React.StrictMode>,
  );

  return [html, initalState as RootState];
}
