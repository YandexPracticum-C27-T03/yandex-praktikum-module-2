import { userSlice } from '@@entities/user/model/slice';
import { combineReducers } from '@reduxjs/toolkit';
import { themeSlice } from '../entities/theme';

export const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});
