import { authService, getCurrentUser, userAdapter } from '@@entities/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLogin, UserRegistration } from './types';

export const registration = createAsyncThunk('entities/user/register', (data: UserRegistration) => {
  return authService.registration(data).then(() => authService.fetchUser());
});

export const login = createAsyncThunk('entities/user/login', (data: UserLogin) => {
  return authService.login(data).then(() => authService.fetchUser());
});

export const fetchUser = createAsyncThunk('entities/user/fetchUser', async (_, { getState }) => {
  const state = getState() as RootState;

  const slice = getCurrentUser(state);

  if (!slice.data) {
    const user = await authService.fetchUser();

    return userAdapter(user);
  }

  return slice.data;
});
