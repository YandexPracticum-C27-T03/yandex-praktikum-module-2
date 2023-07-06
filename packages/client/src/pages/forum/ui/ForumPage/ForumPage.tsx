import React from 'react';
import { View, Panel, PanelHeader, Group } from '@vkontakte/vkui';
import TopicList from '../TopicList/TopicList';
import CreateTopicForm from '../CreateTopicForm/CreateTopicForm';

export const ForumPage = () => {
  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>Форум</PanelHeader>
        <Group>
          <CreateTopicForm />
        </Group>
        <Group>
          <TopicList />
        </Group>
      </Panel>
    </View>
  );
};
