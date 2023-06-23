import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_ACTION_PREFIX } from '@constants';
import { createAction, PrepareAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { IThunkDispatch, RootState } from './types';

export type DuckActionType<
  D extends string,
  T extends string,
> = `${typeof GLOBAL_ACTION_PREFIX}/${Lowercase<D>}/${Uppercase<T>}`;

const entireState = (state: RootState) => state;

export const useMapState = <T = unknown>(mapState: (state: RootState) => T) => {
  const state = useSelector(entireState);

  return useMemo(() => mapState(state), [mapState, state]);
};

export const useMapDispatch = <T = unknown>(mapDispatch: (dispatch: IThunkDispatch) => T) => {
  const dispatch = useDispatch();

  return useMemo(() => mapDispatch(dispatch), [dispatch, mapDispatch]);
};

export const makeMapState = <T = unknown>(mapState: (state: RootState) => T) => mapState;
export const makeMapDispatch = <T = unknown>(mapDispatch: (dispatch: IThunkDispatch) => T) => mapDispatch;

/**
 *
 * Makes action factory for injecting duck prefix into action.type
 * @param duckName {string}
 * @returns {Function} Returns createAction factory
 *
 * @example Auto inferring generic parameters
 * const createAction = makeDuckActionFactory('auth');
 * const login = createAction('auth'); // Good
 *
 * @example Manual providing generic parameters
 * const createAction = makeDuckActionFactory('auth');
 * const login = createAction<string, 'auth'>('auth'); // Good
 *
 * @example TypeScript doesn't support this
 * const login = createAction<string>('auth'); // Bad
 */
export const makeDuckActionFactory = <D extends string>(duckName: D) => {
  function actionFactory<P = void, T extends string = string>(type: T): PayloadActionCreator<P, DuckActionType<D, T>>;
  function actionFactory<PA extends PrepareAction<never>, T extends string>(
    type: T,
    prepareAction: PA,
  ): PayloadActionCreator<ReturnType<PA>['payload'], DuckActionType<D, T>, PA>;
  function actionFactory(type: string, prepareAction?: PrepareAction<never>) {
    return createAction(
      `${GLOBAL_ACTION_PREFIX}/${duckName.toLowerCase()}/${type.toUpperCase()}`,
      prepareAction as PrepareAction<never>,
    ) as never;
  }

  return actionFactory;
};

export const makeDuckActionTypeFactory =
  <D extends string>(duckName: D) =>
  <T extends string = string>(type: T) => {
    return `${GLOBAL_ACTION_PREFIX}/${duckName.toLowerCase()}/${type.toUpperCase()}` as DuckActionType<D, T>;
  };
