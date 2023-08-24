export type Topic = {
  id: number;
  title: string;
  comments: Comment[];
  content: string;
};

export type Comment = {
  id: number;
  text: string;
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
