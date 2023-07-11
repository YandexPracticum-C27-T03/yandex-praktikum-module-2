import { ChangePasswordDTO, profileService } from '@@entities/profile';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changePassowordThunk = createAsyncThunk(
  'features/profileChangePassword',
  async (dto: ChangePasswordDTO) => {
    return await profileService.updatePassword(dto);
  },
);
