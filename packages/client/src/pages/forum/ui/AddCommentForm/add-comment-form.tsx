import React, { useState, FormEvent } from 'react';
import { setCommentRedusers, setCommentType } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { FormLayout, Textarea, Button } from '@vkontakte/vkui';

type addCommentProps = {
  topicId: number;
  parentId?: number;
};
const mapDispatch = makeMapDispatch((dispatch) => ({
  setCommentRequest: (comment: setCommentType) => dispatch(setCommentRedusers(comment)),
}));
export const AddCommentForm = (payload: addCommentProps) => {
  const { topicId } = payload;
  const { setCommentRequest } = useMapDispatch(mapDispatch);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentRequest({
      topicId,
      content: comment,
    });
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Textarea placeholder="Добавить комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit">Отправить</Button>
    </FormLayout>
  );
};
