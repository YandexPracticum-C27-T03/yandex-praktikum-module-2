import React from 'react';
import { Comment } from '@@entities/forum';
import { Card, Div } from '@vkontakte/vkui';

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <Card>
      {comments.map((comment) => (
        <Div key={comment.id}>
          <p>{comment.text}</p>
        </Div>
      ))}
    </Card>
  );
};

export default CommentList;
