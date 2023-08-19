import React from 'react';

import { Topic } from '@@entities/forum/model/types';
import { CardGrid } from '@vkontakte/vkui';
import { TopicItem } from '../TopicItem';

const TopicList = () => {
  const topics = [
    {
      id: 1,
      title: 'Топик 1',
      summary: 'Краткое содержание топика 1',
      reactions: ['1f603', '1f601', '1f606', '1f605', '1f600', '1f600', '1f603', '1f604', '1f603', '1f603', '1f603'],
    },
    { id: 2, title: 'Топик 2', summary: 'Краткое содержание топика 2', reactions: [] },
    { id: 3, title: 'Топик 3', summary: 'Краткое содержание топика 3', reactions: [] },
  ] as Topic[];

  return (
    <CardGrid size="l">
      {topics.map((topic) => (
        <TopicItem key={topic.id} topic={topic} />
      ))}
    </CardGrid>
  );
};

export default TopicList;
