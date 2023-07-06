import React, { useState } from 'react';
import { FormLayout, Input, Textarea, Button } from '@vkontakte/vkui';

const CreateTopicForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Ваша логика для отправки данных на сервер
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Содержание" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button sizes="xl" type="submit">
        Создать
      </Button>
    </FormLayout>
  );
};

export default CreateTopicForm;
