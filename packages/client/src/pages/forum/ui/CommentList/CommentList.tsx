import React from 'react';
import { Card, Div } from '@vkontakte/vkui';

const CommentList = ({ comments }: any) => {
  return (
    <Card size="l">
      {comments.map((comment) => (
        <Div key={comment.id}>
          <p>{comment.text}</p>
        </Div>
      ))}
    </Card>
  );
};

export default CommentList;
