import { AxiosInstance } from 'axios';
import { axiosInstance } from './axios-config';

export abstract class http {
  protected http: AxiosInstance;

  protected constructor(endpoint: string) {
    this.http = axiosInstance(endpoint);
  }
}
