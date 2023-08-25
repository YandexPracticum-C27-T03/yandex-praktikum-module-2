import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTopicListSelectors, getTopicsReducer } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { CardGrid } from '@vkontakte/vkui';
import { TopicItem } from '../TopicItem';

const mapDispatch = makeMapDispatch((dispatch) => ({
  getTopicList: () => dispatch(getTopicsReducer()),
}));

const TopicList = () => {
  const { getTopicList } = useMapDispatch(mapDispatch);
  const topicList = useSelector(getTopicListSelectors);
  const [topics, setTopics] = useState(topicList);

  useEffect(() => {
    getTopicList();
  }, [getTopicList]);
  useEffect(() => {
    setTopics(topicList);
  }, [topicList]);

  return (
    <CardGrid size="l">
      {topics.map((topic) => (
        <TopicItem topic={topic} key={topic.id} />
      ))}
    </CardGrid>
  );
};

export default TopicList;
