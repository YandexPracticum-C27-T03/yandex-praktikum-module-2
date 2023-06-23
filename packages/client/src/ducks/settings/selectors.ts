import { createSelector } from '@reduxjs/toolkit';
import { MOUNTING_POINT } from './actions';
import { SettingsState } from './types';

// Пример оформления селекторов
const slice = (state: { [MOUNTING_POINT]: SettingsState }) => state[MOUNTING_POINT];
export const isDarkThemeSelector = createSelector(slice, (state) => state.darkTheme);
