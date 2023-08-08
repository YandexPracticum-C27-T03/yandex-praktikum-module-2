import { axiosInstance } from '@@shared/lib/HTTPTransport/axios-config';
import { IRepository } from './repository.interface';

const http = axiosInstance('auth', {});

export class ServerRepository implements IRepository {
  constructor(private cookies: string | undefined) {}

  async getUser() {
    const { data } = await http.get('/user', {
      headers: {
        cookie: this.cookies,
      },
    });

    return data;
  }
}
