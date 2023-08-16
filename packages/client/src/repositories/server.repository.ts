import { axiosInstance } from '@@shared/lib/HTTPTransport/axios-config';
import { config } from '@@shared/lib/constants';
import { IRepository } from './repository.interface';

const http = axiosInstance(`${config.API_URL}/auth`, {});

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
