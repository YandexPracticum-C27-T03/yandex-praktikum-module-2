import { RootState } from '@@app/app-store';
import { createSelector } from '@reduxjs/toolkit';

const getUserModule = (state: RootState) => state.user;
export const getCurrentUser = (state: RootState) => getUserModule(state);

export const getUserData = createSelector(getCurrentUser, (state) => state.data);
