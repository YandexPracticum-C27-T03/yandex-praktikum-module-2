import axios from 'axios';
import { API_ROOT } from '../constants';

const isDev = typeof document !== 'undefined' ? API_ROOT : 'https://ya-praktikum.tech';

export const axiosInstance = (endpoint: string, options: any) => {
  return axios.create({
    baseURL: `${isDev}/api/v2/${endpoint}`,
    timeout: 1000,
    withCredentials: true,
    headers: {
      ...(options.cookie && { cookie: options.cookie }),
    },
  });
};
