export type Topic = {
  id: number;
  title: string;
  comments: Comment[];
  content: string;
  reactions?: string[];
};

export type Comment = {
  id: number;
  content: string;
  user: {
    avatar: string | null;
    id: number;
    login: string;
  };
  createdAt: string;
  updatedAt: string;
  parentId: number;
};

export type TopicWithComments = {
  topic: Topic;
  comments: Comment[];
};

export type CardProps = {
  title: string;
  content: string;
};

export type setCommentType = {
  content: string;
  topicId: number;
  parentId?: number;
};
