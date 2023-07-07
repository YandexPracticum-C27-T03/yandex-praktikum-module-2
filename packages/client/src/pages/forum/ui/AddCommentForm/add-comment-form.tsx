import React, { useState } from 'react';
import { FormLayout, Textarea, Button } from '@vkontakte/vkui';

export const AddCommentForm = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ваша логика для отправки комментария на сервер
    // Например, вызов функции для создания комментария
    // или отправка комментария на сервер с помощью API запроса
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Textarea placeholder="Добавить комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit">Отправить</Button>
    </FormLayout>
  );
};
