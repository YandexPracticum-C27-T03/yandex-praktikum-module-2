import { authService, getUserData, userAdapter } from '@@entities/user';
import { ServiceFactory } from '@@services/service-factory';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UserLogin, UserRegistration } from './types';

type LoginThunkParams = {
  data: UserLogin;
  onRedirect: () => void;
};

export const registration = createAsyncThunk('entities/user/register', async (data: UserRegistration, { dispatch }) => {
  try {
    await authService.registration(data);
    await dispatch(fetchUser());
  } catch (error) {
    return Promise.reject(error);
  }
});

export const login = createAsyncThunk(
  'entities/user/login',
  async ({ data, onRedirect }: LoginThunkParams, { dispatch }) => {
    try {
      await authService.login(data);
      await dispatch(fetchUser());

      onRedirect();
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const fetchUser = createAsyncThunk(
  'entities/user/fetchUser',
  async (_, { getState, extra, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = getUserData(state);

      if (!user) {
        const sevice = extra as ServiceFactory;

        const user = await sevice.getService('user').getUser();

        return userAdapter(user);
      }

      return userAdapter(user);
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.status === 401) {
        return rejectWithValue('unautorized');
      }

      return rejectWithValue('error');
    }
  },
);
