import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Comment } from '@@entities/forum';
import { getCommentRedusers, removeCommentReduser } from '@@entities/forum/model/redusers';
import { getCommentsSelectors } from '@@entities/forum/model/selecrots';
import { getUserData } from '@@entities/user';
import { makeMapDispatch, useAppSelector, useMapDispatch } from '@@shared/lib/model/hooks';
import { Avatar, Button, Card, Div, Group, Spacing } from '@vkontakte/vkui';

const mapDispatch = makeMapDispatch((dispatch) => ({
  getComments: (id: number) => dispatch(getCommentRedusers(id)),
  removeComment: (id: number, topicId: number) => dispatch(removeCommentReduser({ id, topicId })),
}));
type commentListProps = {
  topicId: number;
  setParent: Dispatch<SetStateAction<number | undefined>>;
};
const CommentList = ({ topicId, setParent }: commentListProps) => {
  const { getComments, removeComment } = useMapDispatch(mapDispatch);
  const commentsList = useAppSelector(getCommentsSelectors);
  const [comments, setComments] = useState<Comment[]>(commentsList);
  const user = useAppSelector(getUserData);

  useEffect(() => {
    getComments(topicId);
  }, [getComments, topicId]);

  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

  const renderParentComment = (parentId: number) => {
    const commentParent = commentsList.find((com) => com.id === parentId);
    return <Card style={{ opacity: '0.4' }}>{commentParent?.content}</Card>;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const year = date.getUTCFullYear();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;

    return `${formattedTime} ${formattedDate}`;
  };

  return (
    <Group mode="plain">
      {comments ? (
        comments?.map((comment) => (
          <>
            <Card mode="shadow" style={{ borderBottom: '2px solid #a5a5a5' }}>
              <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={comment.user?.avatar ?? ''} size={40} />
                  <span style={{ marginRight: 8, fontWeight: 'bold' }}>{comment.user?.login ?? 'anonim'}</span>
                  <span>{formatTime(comment.createdAt)}</span>
                </div>
                {user?.id === comment.user.id && (
                  <Button
                    mode="tertiary"
                    onClick={() => {
                      removeComment(comment.id, topicId);
                    }}
                  >
                    Удалить
                  </Button>
                )}
              </Div>

              <Div style={{ marginLeft: 12 }}>
                <div>
                  <span>{comment.content}</span>
                  {comment.parentId ? renderParentComment(comment.parentId) : null}
                </div>
                <Button
                  mode="tertiary"
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    setParent(comment.id);
                  }}
                >
                  Ответить
                </Button>
              </Div>
            </Card>
            <Spacing />
          </>
        ))
      ) : (
        <Div>Комментариев нет</Div>
      )}
    </Group>
  );
};

export default CommentList;
