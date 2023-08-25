import React, { useState, FormEvent } from 'react';
import { setCommentRedusers, setCommentType } from '@@entities/forum';
import { getCommentsSelectors } from '@@entities/forum/model/selecrots';
import { makeMapDispatch, useAppSelector, useMapDispatch } from '@@shared/lib/model/hooks';
import { FormLayout, Textarea, Button, Div } from '@vkontakte/vkui';

type addCommentProps = {
  topicId: number;
  parentId?: number;
};
const mapDispatch = makeMapDispatch((dispatch) => ({
  setCommentRequest: (comment: setCommentType) => dispatch(setCommentRedusers(comment)),
}));
export const AddCommentForm = (payload: addCommentProps) => {
  const { topicId, parentId } = payload;
  const { setCommentRequest } = useMapDispatch(mapDispatch);
  const [comment, setComment] = useState<string>('');
  const commentsList = useAppSelector(getCommentsSelectors);
  const parendComment = commentsList.find((com) => com.id === parentId);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentRequest({
      topicId,
      content: comment,
      parentId: Number(parentId) ?? 'undefined',
    });
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      {parendComment && parentId ? <Div>{parendComment.content}</Div> : null}
      <Textarea placeholder="Добавить комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit">Отправить</Button>
    </FormLayout>
  );
};
