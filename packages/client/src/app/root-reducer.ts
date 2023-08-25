import { forumSlice } from '@@entities/forum';
import { leaderBoardSlice } from '@@entities/leader-board';
import { serviceValuesSlice } from '@@entities/service-values';
import { themeSlice } from '@@entities/theme';
import { userSlice } from '@@entities/user';
import { requestSlice } from '@@shared/lib/model/request-helper-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  serviceValues: serviceValuesSlice.reducer,
  theme: themeSlice.reducer,
  user: userSlice.reducer,
  forum: forumSlice.reducer,
  request: requestSlice.reducer,
  leaderboard: leaderBoardSlice.reducer,
});
