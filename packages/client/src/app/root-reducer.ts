import { userSlice } from '@@entities/user';
import { requestReducer } from '@@shared/lib/model/request-helper-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { themeSlice } from '../entities/theme';

export const reducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
  request: requestReducer,
});
