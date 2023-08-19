import { IRepository } from '@@repositories/repository.interface';
import { ServiceFactory } from '@@services/service-factory';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const configureReduxStore = <T = unknown>(repository: IRepository, initialState?: T) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: true,
        thunk: {
          extraArgument: new ServiceFactory(repository),
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
    ...(initialState && { preloadedState: initialState }),
  });
};

export type RootState = ReturnType<ReturnType<typeof configureReduxStore>['getState']>;
export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];
