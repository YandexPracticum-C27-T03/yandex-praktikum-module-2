import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Topic, Comment } from '../types/types';

interface ForumState {
  topics: Topic[];
  topic: Topic | undefined;
  comments: Comment[];
}

const initialState: ForumState = {
  topics: [],
  topic: undefined,
  comments: [],
};

export const forumSlice = createSlice({
  name: 'entities/forum/get-topic',
  initialState,
  reducers: {
    getTopics(state, action: PayloadAction<Topic[]>) {
      state.topics = action.payload;
    },
    getComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
  },
});

export const { getTopics, getComments } = forumSlice.actions;

export default forumSlice.reducer;
