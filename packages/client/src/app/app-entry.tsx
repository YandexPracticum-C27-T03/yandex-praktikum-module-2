import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { appRouter } from '@@app/app-router';
import { appStore } from '@@app/app-store';

import '@vkontakte/vkui/dist/vkui.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Ошибка! Не найден #root элемент');
}

const root = createRoot(container);

export const initializeApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </React.StrictMode>,
  );
};
