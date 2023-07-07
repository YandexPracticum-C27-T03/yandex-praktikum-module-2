import React from 'react';
import { View, Panel, PanelHeader, Group, Link } from '@vkontakte/vkui';
import TopicList from '../TopicList/topic-list';

export const ForumPage = () => {
  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>Форум</PanelHeader>
        <Group>
          <Link href="/forum/create-topic">Создать топик</Link>
        </Group>
        <Group>
          <TopicList />
        </Group>
      </Panel>
    </View>
  );
};
