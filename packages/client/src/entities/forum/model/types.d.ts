export type Topic = {
  id: number;
  title: string;
  summary: string;
};

export type Comment = {
  id: number;
  text: string;
};

export type TopicWithComments = {
  topic: Topic;
  comments: Comment[];
};
