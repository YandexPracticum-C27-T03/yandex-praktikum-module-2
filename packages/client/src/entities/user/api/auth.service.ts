import { http } from '@@shared/lib/http';
import { User, UserLogin, UserRegistration } from '../model/types';

class AuthService extends http {
  constructor() {
    super('auth');
  }

  login(data: UserLogin) {
    return this.http.post('/signin', data);
  }

  registration(data: UserRegistration) {
    return this.http.post('/signup', data);
  }

  fetchUser() {
    return this.http.get<User>('/user');
  }
}

export default new AuthService();