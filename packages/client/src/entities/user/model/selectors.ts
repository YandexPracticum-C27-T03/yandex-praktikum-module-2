import { RootState } from '@@app/app-store';

const getUserModule = (state: RootState) => state.user;
export const getCurrentUser = (state: RootState) => getUserModule(state);
