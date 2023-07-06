import React from 'react';
import { Group, Card, Div, Button } from '@vkontakte/vkui';
import CommentList from '../CommentList/CommentList';
import AddCommentForm from '../AddCommentForm/AddCommentForm';

const SingleTopic = ({ topic, comments }: any) => {
  return (
    <Group>
      <Card size="l">
        <Div>
          <h3>{topic.title}</h3>
          <p>{topic.content}</p>
        </Div>
        <Button size="l" mode="tertiary">
          Добавить комментарий
        </Button>
      </Card>
      <CommentList comments={comments} />
      <AddCommentForm />
    </Group>
  );
};

export default SingleTopic;
