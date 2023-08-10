import { User } from '@@entities/user';

export interface IRepository {
  getUser(): Promise<User>;
}
