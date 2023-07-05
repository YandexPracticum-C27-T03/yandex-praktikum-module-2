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
      return { ...state, isLoading: true };
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        isAuth: true,
        isLoading: false,
        error: null,
      };
    });

    builder.addCase(registration.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message as string,
      };
    });

    // Авторизация
    builder.addCase(login.pending, (state) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        isAuth: true,
        isLoading: false,
        error: null,
      };
    });

    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        error: action.error.message as string,
      };
    });

    // Получение данных о пользователе
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        isAuth: true,
        isLoading: false,
        error: null,
      };
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      return {
        ...state,
        data: null,
        isAuth: false,
        isLoading: false,
        error: action.error.message as string,
      };
    });
  },
});
