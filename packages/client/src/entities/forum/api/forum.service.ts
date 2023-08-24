import { axiosInstance } from '@@shared/lib/HTTPTransport/axios-config';
import { AxiosInstance } from 'axios';
import { CardProps, setCommentType } from '../types/types';

class ForumService {
  http: AxiosInstance;
  constructor() {
    this.http = axiosInstance(`/api/`, {});
  }
  public getTopics(id: number | null = null) {
    return this.http.get(`topics/${id ?? ''}`);
  }
  public setTopic(data: CardProps) {
    return this.http.post('topics', data);
  }

  public setComment(data: setCommentType) {
    return this.http.post('comments', data);
  }
}

export const forumService = new ForumService();
