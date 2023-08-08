import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AppRouter } from '@@app/app-router';
import { configureReduxStore } from '@@app/app-store';

import { ClientRepository } from '@@repositories/client.repository';

import '@vkontakte/vkui/dist/vkui.css';

const initialState = window.initialState;

export const initializeApp = () => {
  const root = document.getElementById('root') as HTMLElement;

  const appStore = configureReduxStore<RootState>(new ClientRepository(), JSON.parse(initialState) as RootState);

  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <Provider store={appStore}>
        <BrowserRouter>
          <AppRouter dispatch={appStore.dispatch} />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
};
