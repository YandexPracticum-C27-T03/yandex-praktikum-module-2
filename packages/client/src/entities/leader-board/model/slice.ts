import { createSlice } from '@reduxjs/toolkit';
import { getLeaderBoard } from './reducers';

export type userRecord = {
  data: {
    id: number;
    avatar: string;
    name: string;
    score: number;
  };
};

type LeaderBoardState = {
  recordList: userRecord[];
  isLoading: boolean;
  error: string | null;
};

const initialState: LeaderBoardState = {
  recordList: [],
  isLoading: true,
  error: null,
};

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderBoard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLeaderBoard.fulfilled, (state, { payload }) => {
      state.recordList = payload.data;
      state.isLoading = false;
    });
    builder.addCase(getLeaderBoard.rejected, (state, { error }) => {
      state.error = error.message as string;
    });
  },
});
