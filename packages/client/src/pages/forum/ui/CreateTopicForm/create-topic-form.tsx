import React, { useState } from 'react';
import { View, Panel, PanelHeader, Group, FormLayout, Input, Textarea, Button } from '@vkontakte/vkui';

export const CreateTopicForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Отправляем запрос на создание топика
  };

  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>Создание топика</PanelHeader>
        <Group>
          <FormLayout onSubmit={handleSubmit}>
            <Input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Содержание" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button sizes="xl" type="submit">
              Создать
            </Button>
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};
