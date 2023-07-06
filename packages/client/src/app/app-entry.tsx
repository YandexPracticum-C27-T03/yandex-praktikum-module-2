import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { appRouter } from '@@app/app-router';
import { appStore } from '@@app/app-store';

import '@vkontakte/vkui/dist/vkui.css';
import { AuthProvider } from './providers/AuthProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Ошибка! Не найден #root элемент');
}

const root = createRoot(container);

export const initialazeApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={appStore}>
        <AuthProvider>
          <RouterProvider router={appRouter} />
        </AuthProvider>
      </Provider>
    </React.StrictMode>,
  );
};
