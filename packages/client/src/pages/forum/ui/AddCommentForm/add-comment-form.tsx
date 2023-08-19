import React, { useState, FormEvent } from 'react';

import { FormLayout, Textarea, Button } from '@vkontakte/vkui';

export const AddCommentForm = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Логика для отправки комментария на сервер
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Textarea placeholder="Добавить комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit">Отправить</Button>
    </FormLayout>
  );
};
