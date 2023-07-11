import { http } from '@@shared/lib/http';
import { User, UserLogin, UserRegistration } from '../model/types';

class AuthService extends http {
  constructor() {
    super('auth');
  }

  async login(dto: UserLogin) {
    const { data } = await this.http.post('/signin', dto);

    return data;
  }

  registration(dto: UserRegistration) {
    return this.http.post('/signup', dto);
  }

  async fetchUser() {
    const { data } = await this.http.get<User>('/user');

    return data;
  }
}

export const authService = new AuthService();
