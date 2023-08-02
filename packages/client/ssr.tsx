import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRouter } from '@@app/app-router';
import { appStore } from '@@app/app-store';
import { SSRWrapper } from '@vkontakte/vkui';

export async function render(url: string) {
  const html = renderToString(
    <React.StrictMode>
      <Provider store={appStore}>
        <SSRWrapper>
          <StaticRouter location={url}>
            <AppRouter />
          </StaticRouter>
        </SSRWrapper>
      </Provider>
    </React.StrictMode>,
  );

  return [html];
}
