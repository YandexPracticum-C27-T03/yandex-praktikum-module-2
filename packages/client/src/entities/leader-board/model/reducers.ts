import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, leaderBoardService } from '../api/leaderboard.service';

export const getLeaderBoard = createAsyncThunk('entities/leaderboard/getleaderboard', async () => {
  try {
    return await leaderBoardService.getLeaderBoard();
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateScore = createAsyncThunk(
  'entities/leaderboard/updatescore',
  async (data: UserData, { dispatch }) => {
    try {
      await leaderBoardService.updateScore(data);
      dispatch(getLeaderBoard());
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
