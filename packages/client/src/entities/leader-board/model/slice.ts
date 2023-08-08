import { createSlice } from '@reduxjs/toolkit';

type MockFromTest = {
  id: number;
  name: string;
};

type LeaderBoardState = {
  leaderboard: MockFromTest[];
};

const initialState: LeaderBoardState = {
  leaderboard: [],
};

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderUser(state, { payload }) {
      state.leaderboard.push(payload);
    },
  },
});

export const { setLeaderUser } = leaderBoardSlice.actions;
