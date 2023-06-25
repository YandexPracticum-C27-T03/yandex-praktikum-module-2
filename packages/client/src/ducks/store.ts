import * as process from 'process';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './root-reducer';

export const configureReduxStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
        immutableCheck: true,
      }),
    devTools: process.env.NODE_ENV === 'development',
  });

  return { store };
};
