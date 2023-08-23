import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../api/forum.service';
import { getTopics } from './slice';

export const getTopicReducer = createAsyncThunk('entities/forum', async () => {
  try {
    const result = await forumService.getTopics();
    getTopics(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
});
