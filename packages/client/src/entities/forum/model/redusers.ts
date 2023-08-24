import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../api/forum.service';
import { CardProps, setCommentType } from '../types/types';
import { getTopics } from './slice';

export const getTopicsReducer = createAsyncThunk('entities/forum/get-topics', async (_, { dispatch }) => {
  try {
    const { data } = await forumService.getTopics();
    dispatch(getTopics(data));
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getTopicReducer = createAsyncThunk('entities/forum/get-topic', async (id: number, { dispatch }) => {
  try {
    const { data } = await forumService.getTopics(id);
    dispatch(getTopics(data));
  } catch (error) {
    return Promise.reject(error);
  }
});

type setTopicParams = {
  data: CardProps;
  onRedirect: () => void;
};
export const setTopicRedusers = createAsyncThunk(
  'entities/forum/set-topic',
  async ({ data, onRedirect }: setTopicParams) => {
    try {
      await forumService.setTopic(data);
      onRedirect();
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const setCommentRedusers = createAsyncThunk('entities/forum/set-comment', async (data: setCommentType) => {
  try {
    await forumService.setComment(data);
  } catch (error) {
    return Promise.reject(error);
  }
});
