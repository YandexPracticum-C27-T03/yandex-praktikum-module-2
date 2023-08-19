import React from 'react';
import { Link } from 'react-router-dom';
import { View, Panel, PanelHeader, Group } from '@vkontakte/vkui';
import TopicList from '../TopicList/topic-list';

export const ForumPage = () => {
  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>Форум</PanelHeader>
        <Group>
          <Link to="/forum/create-topic">Создать топик</Link>
        </Group>
        <Group>
          <TopicList />
        </Group>
      </Panel>
    </View>
  );
};
