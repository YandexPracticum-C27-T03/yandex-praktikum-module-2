import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../api/forum.service';
import { CardProps, setCommentType } from '../types/types';
import { getComments, getTopics } from './slice';

export const getTopicsReducer = createAsyncThunk('entities/forum/get-topics', async (_, { dispatch }) => {
  try {
    const { data } = await forumService.getTopics();
    dispatch(getTopics(data));
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getTopicReducer = createAsyncThunk('entities/forum/get-topic', async (id: number) => {
  try {
    const { data } = await forumService.getTopics(id);
    return data;
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

export const setCommentRedusers = createAsyncThunk(
  'entities/forum/set-comment',
  async (data: setCommentType, { dispatch }) => {
    try {
      await forumService.setComment(data);
      dispatch(getCommentRedusers(Number(data.topicId)));
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const getCommentRedusers = createAsyncThunk('entities/forum/get-comment', async (id: number, { dispatch }) => {
  try {
    const { data } = await forumService.getComment(id);
    dispatch(getComments(data));
  } catch (error) {
    return Promise.reject(error);
  }
});

type removeCommentProps = {
  id: number;
  topicId: number;
};
export const removeCommentReduser = createAsyncThunk(
  'entities/forum/remove-comment',
  async ({ id, topicId }: removeCommentProps, { dispatch }) => {
    try {
      await forumService.removeComment(id);
      dispatch(getCommentRedusers(Number(topicId)));
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
