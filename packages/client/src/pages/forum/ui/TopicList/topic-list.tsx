import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTopicListSelectors, getTopicReducer } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { CardGrid, Card, Div, Button, Link } from '@vkontakte/vkui';

const mapDispatch = makeMapDispatch((dispatch) => ({
  forum: () => dispatch(getTopicReducer()),
}));

const TopicList = () => {
  const { forum } = useMapDispatch(mapDispatch);

  const topicList = useSelector(getTopicListSelectors);

  useEffect(() => {
    forum();
  }, [forum]);

  return (
    <CardGrid size="l">
      {topicList.map((topic) => (
        <Card key={topic.id} mode="shadow">
          <Div>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </Div>
          <Link href={`/forum/topic/${topic.id}`}>
            <Button size="l" mode="tertiary">
              Добавить комментарий
            </Button>
          </Link>
        </Card>
      ))}
    </CardGrid>
  );
};

export default TopicList;
