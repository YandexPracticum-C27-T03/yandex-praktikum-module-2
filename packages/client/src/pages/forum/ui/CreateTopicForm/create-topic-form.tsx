import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTopicRedusers, CardProps } from '@@entities/forum';
import { Routes } from '@@shared/config';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { View, Panel, PanelHeader, Group, FormLayout, Input, Textarea, Button } from '@vkontakte/vkui';

const mapDispatch = makeMapDispatch((dispatch) => ({
  setTopic: (data: CardProps, onRedirect: () => void) => dispatch(setTopicRedusers({ data, onRedirect })),
}));
export const CreateTopicForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { setTopic } = useMapDispatch(mapDispatch);
  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(Routes.FORUM);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTopic({ title, content }, onRedirect);
  };
  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>Создание топика</PanelHeader>
        <Group>
          <FormLayout onSubmit={handleSubmit}>
            <Input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Содержание" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="submit">Создать</Button>
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};
