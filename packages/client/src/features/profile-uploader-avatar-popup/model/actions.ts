import { profileService } from '@@entities/profile';
import { userAdapter } from '@@entities/user';
import { setUser } from '@@entities/user/model/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateAvatarThunk = createAsyncThunk(
  'features/profileChangeAvatar',
  async (file: FormData, { dispatch }) => {
    const user = await profileService.updateAvatar(file);

    dispatch(setUser(userAdapter(user)));
  },
);
