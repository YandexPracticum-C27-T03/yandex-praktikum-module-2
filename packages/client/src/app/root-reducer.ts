import { combineReducers } from '@reduxjs/toolkit';
import { themeSlice } from '../entities/theme';

export const reducer = combineReducers({
  theme: themeSlice.reducer,
});
