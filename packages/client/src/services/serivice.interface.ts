import { User } from '@@entities/user';

type ServiceNames = 'user';

export interface IUserService {
  getUser(): Promise<User>;
}

export interface IServiceFactory {
  getService: (serviceName: ServiceNames) => IUserService;
}
