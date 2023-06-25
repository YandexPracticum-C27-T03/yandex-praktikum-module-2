import { createReducer } from '@reduxjs/toolkit';
import { setDefaultTheme, setDarkTheme, toggleTheme } from './actions';
import { SettingsState } from './types';

// Пример оформления редьюсера.

const initialState: SettingsState = {
  darkTheme: false,
};

/* Info: По скольку мы используем createReducer из @reduxjs/toolkit, необязательно возвращать состояние из редьюсера, можно менять его через точку. */

export const reducer = createReducer<SettingsState>(initialState, {
  [setDefaultTheme.type]: (state) => {
    state.darkTheme = false;
  },
  [setDarkTheme.type]: (state) => {
    state.darkTheme = true;
  },
  [toggleTheme.type]: (state) => {
    state.darkTheme = !state.darkTheme;
  },
});

export const settingsReducer = reducer;
