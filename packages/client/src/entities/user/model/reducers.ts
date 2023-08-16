import { authService, getUserData, userAdapter } from '@@entities/user';
import { openAuthService } from '@@entities/user/api/open-auth.service';
import { ServiceFactory } from '@@services/service-factory';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { OpenAuthLogin, UserLogin, UserRegistration } from './types';

type LoginThunkParams = {
  data: UserLogin;
  onRedirect: () => void;
};

type OpenAuthThunkParams = {
  data: OpenAuthLogin;
  onOk: () => void;
  onError: (message: string) => void;
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

export const logout = createAsyncThunk(
  'entities/user/logout',
  async ({ onLogout }: { onLogout: () => void }, { dispatch }) => {
    try {
      await authService.logout();
      await dispatch(fetchUser());

      onLogout();
    } catch (error) {
      onLogout();
      // return Promise.reject(error);
    }
  },
);

export const openAuthLogin = createAsyncThunk(
  'entities/user/open-auth-login',
  async ({ data, onOk, onError }: OpenAuthThunkParams, { dispatch }) => {
    const localOnOk = async () => {
      await dispatch(fetchUser());
      onOk();
    };

    try {
      await openAuthService.openAuthIn(data);
      await localOnOk();
    } catch (error: unknown) {
      const { message } = error as Error;

      if (message === 'User already in system') {
        await localOnOk();
      } else {
        onError(message);
        return Promise.reject(error);
      }
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
        const service = extra as ServiceFactory;

        const user = await service.getService('user').getUser();

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
