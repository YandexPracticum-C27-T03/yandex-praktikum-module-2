import { http } from '@@shared/lib/http';
import { ChangePasswordDTO } from '../types/password-dto';

class ProfileService extends http {
  constructor() {
    super('user');
  }

  async updateAvatar(file: FormData) {
    const { data } = await this.http.put('profile/avatar', file);

    return data;
  }

  async updatePassword(file: ChangePasswordDTO) {
    const { data } = await this.http.put('password', file);

    return data;
  }
}

export const profileService = new ProfileService();
