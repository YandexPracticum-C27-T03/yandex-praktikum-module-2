import { RootDucks } from '../types';
import { makeDuckActionFactory } from '../utils';

// Пример оформления файла с экшнами.
export const MOUNTING_POINT = RootDucks.SETTINGS;
const createAction = makeDuckActionFactory(MOUNTING_POINT);

export const setDefaultTheme = createAction<boolean, 'SET_DEFAULT_THEME'>('SET_DEFAULT_THEME');
export const setDarkTheme = createAction<boolean, 'SET_DARK_THEME'>('SET_DARK_THEME');
export const toggleTheme = createAction('TOGGLE_THEME');
