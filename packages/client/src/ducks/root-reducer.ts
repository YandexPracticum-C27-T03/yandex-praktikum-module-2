import { combineReducers } from '@reduxjs/toolkit';
import { settingsReducer } from './settings/reducers';
import { RootDucks, RootState } from './types';

export const reducer = combineReducers<RootState>({
  [RootDucks.SETTINGS]: settingsReducer,
});
