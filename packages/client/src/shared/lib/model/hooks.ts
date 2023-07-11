import { useCallback, useEffect, useMemo, useState } from 'react';
import { type TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, AsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { STATUSES } from '../constants/statuses-request';
import { selectRequestStatus } from './request-helper-slice';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type IThunkDispatch<Action extends AnyAction = AnyAction> = ThunkDispatch<RootState, unknown, Action>;

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

export const useRequest = (createAction: (agrs: unknown) => AnyAction, ...params: unknown[]) => {
  const [requestId, setRequestId] = useState<string>('');
  const status = useSelector((state: RootState) => selectRequestStatus(state, requestId));

  const dispatch = useDispatch();

  useEffect(() => {
    setRequestId(dispatch(createAction(params)).requestId);
  }, [createAction, dispatch, params]);

  return status;
};

export const useTriggerRequest = <T>(
  createAction: AsyncThunk<void, T, object>,
): [AsyncThunk<void, T, object>, keyof typeof STATUSES] => {
  const [requestId, setRequestId] = useState<keyof typeof STATUSES>('idle');
  const status = useSelector((state: RootState) => selectRequestStatus(state, requestId));

  const dispatch = useDispatch();

  const trigger = useCallback(
    (params: T) => {
      // @ts-expect-error
      return setRequestId(dispatch(createAction(params)).requestId);
    },
    [createAction, dispatch],
  ) as AsyncThunk<void, T, object>;

  return [trigger, status];
};
