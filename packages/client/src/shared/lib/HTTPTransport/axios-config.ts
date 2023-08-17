import axios from 'axios';

type AxiosRequestOptions = {
  cookie?: string[];
};

export const axiosInstance = (baseUrl: string, options: AxiosRequestOptions) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    withCredentials: true,
    headers: {
      ...(options.cookie && { cookie: options.cookie }),
    },
  });
};
