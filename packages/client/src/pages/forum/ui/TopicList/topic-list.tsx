import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTopicListSelectors, getTopicsReducer } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { CardGrid, Card, Div, Button, Link } from '@vkontakte/vkui';

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
        <Card key={topic.id} mode="shadow">
          <Div>
            <h3>{topic.title}</h3>
            <p>{topic.content?.length > 50 ? topic.content?.substring(0, 50) + '...' : topic.content}</p>
          </Div>
          <Link href={`/forum/topic/${topic.id}`}>
            <Button size="l" mode="tertiary">
              Комментарии ({topic.comments?.length})
            </Button>
          </Link>
        </Card>
      ))}
    </CardGrid>
  );
};

export default TopicList;
