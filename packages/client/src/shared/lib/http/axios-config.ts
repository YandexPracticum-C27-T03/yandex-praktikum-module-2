import axios from 'axios';

export const axiosInstance = (endpoint: string) => {
  return axios.create({
    baseURL: `https://ya-praktikum.tech/api/v2/${endpoint}`,
    timeout: 1000,
    withCredentials: true,
  });
};
