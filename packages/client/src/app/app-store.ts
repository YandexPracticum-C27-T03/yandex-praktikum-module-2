import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './root-reducer';

const configureReduxStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
        immutableCheck: true,
      }),
    devTools: process.env.NODE_ENV === 'development',
  });

  return store;
};

export const appStore = configureReduxStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
