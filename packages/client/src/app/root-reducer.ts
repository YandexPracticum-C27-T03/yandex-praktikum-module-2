import { userSlice } from '@@entities/user';
import { requestSlice } from '@@shared/lib/model/request-helper-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { themeSlice } from '../entities/theme';

export const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
  request: requestSlice.reducer,
});
