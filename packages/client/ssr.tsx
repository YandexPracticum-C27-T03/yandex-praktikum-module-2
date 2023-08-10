import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticHandlerContext, StaticRouter, createStaticHandler } from 'react-router-dom/server';
import { AppRouter, routerConfig } from '@@app/app-router';
import { configureReduxStore } from '@@app/app-store';
import { ServerRepository } from '@@repositories/server.repository';
import { SSRWrapper } from '@vkontakte/vkui';
import * as express from 'express';
import { UserAgent } from 'express-useragent';

function createFetchRequest(req: express.Request<UserAgent>) {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export async function render(request: express.Request<UserAgent>, responce: express.Response) {
  const appStore = configureReduxStore(new ServerRepository(request.headers['cookie']));

  const { query } = createStaticHandler(routerConfig(appStore.dispatch));
  const requsetContext = createFetchRequest(request);

  const context = await query(requsetContext);

  const initalState = appStore.getState();

  if (context instanceof Response) {
    throw context;
  }

  const html = renderToString(
    <React.StrictMode>
      <Provider store={appStore}>
        <SSRWrapper userAgent={request.useragent?.source}>
          <StaticRouter location={request.originalUrl}>
            <AppRouter dispatch={appStore.dispatch} />
          </StaticRouter>
        </SSRWrapper>
      </Provider>
    </React.StrictMode>,
  );

  return [html, initalState];
}
