import { isClient } from '@@shared/lib/common';
import { API_ROOT } from '@@shared/lib/constants';
import { AxiosInstance } from 'axios';
import { axiosInstance } from './axios-config';

const defaultHost = isClient() ? API_ROOT : 'https://ya-praktikum.tech/api/v2';

export abstract class HTTPTransport {
  protected http: AxiosInstance;

  protected constructor(endpoint: string, host?: string) {
    this.http = axiosInstance(`${host ?? defaultHost}${endpoint}`, {});
  }
}
