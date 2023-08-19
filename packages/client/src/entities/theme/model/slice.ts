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
    toggleTheme(state) {
      const theme = state.theme === THEMES.light ? THEMES.dark : THEMES.light;
      state.theme = theme;
    },

    setCurrentTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setCurrentTheme, toggleTheme } = themeSlice.actions;
