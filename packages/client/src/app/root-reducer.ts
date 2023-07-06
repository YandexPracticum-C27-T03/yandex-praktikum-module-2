import { userSlice } from '@@entities/user';
import { combineReducers } from '@reduxjs/toolkit';
import { themeSlice } from '../entities/theme';

export const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});
