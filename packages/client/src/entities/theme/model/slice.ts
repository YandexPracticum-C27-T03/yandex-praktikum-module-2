import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { THEMES } from './contants';
import { Theme } from './types';

type ThemeSlice = {
  theme: Theme;
};

const initialState: ThemeSlice = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'entities/theme',
  initialState,
  reducers: {
    setCurrentTheme(state, actions: PayloadAction<Theme>) {
      const { payload } = actions;
      state.theme = payload === THEMES.light ? THEMES.dark : THEMES.light;
    },
  },
});

export const { setCurrentTheme } = themeSlice.actions;
