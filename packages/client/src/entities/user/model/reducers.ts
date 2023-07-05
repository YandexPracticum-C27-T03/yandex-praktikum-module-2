import authService from '@@entities/user/api/auth.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLogin, UserRegistration } from './types';

export const registration = createAsyncThunk('entities/user/register', (data: UserRegistration) => {
  return authService.registration(data).then(() => authService.fetchUser());
});

export const login = createAsyncThunk('entities/user/login', (data: UserLogin) => {
  return authService.login(data).then(() => authService.fetchUser());
});

export const fetchUser = createAsyncThunk('entities/user/fetchUser', () => {
  return authService.fetchUser();
});
