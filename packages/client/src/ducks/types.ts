import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { SettingsState } from './settings/types';

export enum RootDucks {
  SETTINGS = 'settings',
}

export interface RootState {
  [RootDucks.SETTINGS]: SettingsState;
}

export type IThunkDispatch<Action extends AnyAction = AnyAction> = ThunkDispatch<RootState, unknown, Action>;
