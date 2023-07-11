import { authService } from '@@entities/user';
import { RESOURCES_ULR } from '@@shared/lib/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLogin, UserRegistration } from './types';

export const registration = createAsyncThunk('entities/user/register', (data: UserRegistration) => {
  return authService.registration(data).then(() => authService.fetchUser());
});

export const login = createAsyncThunk('entities/user/login', (data: UserLogin) => {
  return authService.login(data).then(() => authService.fetchUser());
});

export const fetchUser = createAsyncThunk('entities/user/fetchUser', async () => {
  const user = await authService.fetchUser();

  return {
    ...user,
    ...(Boolean(user.avatar) && { avatar: `${RESOURCES_ULR}${user.avatar}` }),
  };
});
