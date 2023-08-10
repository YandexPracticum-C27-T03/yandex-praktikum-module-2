import { authService } from '@@entities/user';

import { IRepository } from './repository.interface';

export class ClientRepository implements IRepository {
  getUser() {
    return authService.fetchUser();
  }
}
