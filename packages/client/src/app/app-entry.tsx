import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { routerConfig } from '@@app/app-router';
import { appStore } from '@@app/app-store';

import '@vkontakte/vkui/dist/vkui.css';

export const initializeApp = () => {
  const root = document.getElementById('root') as HTMLElement;

  const router = createBrowserRouter(routerConfig);

  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );
};
