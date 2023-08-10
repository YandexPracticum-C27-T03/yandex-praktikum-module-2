import { IRepository } from '@@repositories/repository.interface';
import { ServiceFactory } from '@@services/service-factory';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './root-reducer';

export const configureReduxStore = <T = unknown>(repository: IRepository, intialState?: T) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: true,
        immutableCheck: true,
        thunk: {
          extraArgument: new ServiceFactory(repository),
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
    ...(intialState && { preloadedState: intialState }),
  });

  return store;
};

export type RootState = ReturnType<ReturnType<typeof configureReduxStore>['getState']>;
export type AppDispatch = ReturnType<typeof configureReduxStore>['dispatch'];
