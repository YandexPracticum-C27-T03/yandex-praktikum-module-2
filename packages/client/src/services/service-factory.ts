import { IRepository } from '@@repositories/repository.interface';
import { IServiceFactory } from './serivice.interface';
import { UserService } from './user-service';

const matcher = (repository: IRepository) => ({
  user: new UserService(repository),
});

export class ServiceFactory implements IServiceFactory {
  constructor(private repository: IRepository) {}

  public getService(service: 'user'): UserService {
    return matcher(this.repository)[service];
  }
}
