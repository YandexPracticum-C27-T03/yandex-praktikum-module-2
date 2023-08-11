import React from 'react';
import { Provider } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { flatRouter, AppRouter, routerConfig } from '@@app/app-router';
import { configureReduxStore } from '@@app/app-store';
import { ServerRepository } from '@@repositories/server.repository';
import { SSRWrapper } from '@vkontakte/vkui';
import * as express from 'express';
import { UserAgent } from 'express-useragent';

export async function render(request: express.Request<UserAgent>) {
  const appStore = configureReduxStore(new ServerRepository(request.headers['cookie']));

  // в родителе по дефолту есть лоадер для получения контекста пользователя
  const root = routerConfig.find(({ path }) => path && matchPath('/', path));

  // делает вложенный роутер - плоским и ищем нужный роут по пути
  const current = flatRouter(routerConfig).find(({ path }) => path && matchPath(request.originalUrl, path));

  if (root && root.loadData) {
    const { loadData: me } = root;

    await me(appStore.dispatch);

    // если у найденого роута есть лоадер -> прокидываем диспатч стора и запускаем экшн
    if (current && current.loadData) {
      const { loadData } = current;
      await loadData(appStore.dispatch);
    }
  }

  // получаем начальное состояние и возвращем его вместе с статикой приложения в миддлвар для последующего рендера
  const initalState = appStore.getState();

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

  return [html, initalState];
}
