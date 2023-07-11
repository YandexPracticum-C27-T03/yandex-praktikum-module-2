import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, login, registration } from './reducers';
import { User } from './types';

type UserSlice = {
  data: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserSlice = {
  data: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'entities/user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Регистрация
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(registration.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    // Авторизация
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    // Получение данных о пользователе
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.data = null;
      state.isAuth = false;
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});
