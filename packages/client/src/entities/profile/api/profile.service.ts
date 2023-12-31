import { ChangePasswordDTO } from '@@entities/profile';
import { HTTPTransport } from '@@shared/lib/HTTPTransport';

class ProfileService extends HTTPTransport {
  constructor() {
    super('/user');
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
