import { IRepository } from '@@repositories/repository.interface';
import { IUserService } from './serivice.interface';

export class UserService implements IUserService {
  constructor(private repository: IRepository) {}

  getUser() {
    return this.repository.getUser();
  }
}
