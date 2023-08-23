import { axiosInstance } from '@@shared/lib/HTTPTransport/axios-config';
import { AxiosInstance } from 'axios';

class ForumService {
  http: AxiosInstance;
  constructor() {
    this.http = axiosInstance(`/api/`, {});
  }
  public getTopics() {
    return this.http.get('topics');
  }
}

export const forumService = new ForumService();
