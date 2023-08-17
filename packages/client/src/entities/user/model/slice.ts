import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, login, logout, openAuthLogin, registration } from './reducers';
import { User } from './types';

type UserSlice = {
  data: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
};

const initialState: UserSlice = {
  data: null,
  isAuth: false,
  isLoading: true,
  isFetching: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'entities/user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    // Регистрация
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registration.fulfilled, (state) => {
      state.isAuth = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(registration.rejected, (state) => {
      state.isAuth = false;
    });

    // Авторизация
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    // Авторизация OAuth
    builder.addCase(openAuthLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(openAuthLogin.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(openAuthLogin.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    // Выход пользователя
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.data = null;
      state.isAuth = false;
    });

    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
    // Выход пользователя

    // Получение данных о пользователе
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data = payload;
      }

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

export const { setUser } = userSlice.actions;
