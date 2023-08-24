import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment, getTopicSelectors, getTopicReducer } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { View, Panel, PanelHeader, Group, Card, Div, Spinner } from '@vkontakte/vkui';
import { AddCommentForm } from '../AddCommentForm';
import CommentList from '../CommentList';

const mapDispatch = makeMapDispatch((dispatch) => ({
  getTopic: (id: number) => dispatch(getTopicReducer(id)),
}));

export const SingleTopic = () => {
  const { getTopic } = useMapDispatch(mapDispatch);
  const topicList = useSelector(getTopicSelectors);
  const [topic, setTopic] = useState(topicList);
  const { id } = useParams();

  useEffect(() => {
    id && getTopic(Number(id));
  }, [getTopic, id]);

  useEffect(() => {
    setTopic(topicList);
  }, [topicList]);

  return (
    <View activePanel="forum">
      {topic && (
        <Panel id="forum">
          <PanelHeader>{topic.title}</PanelHeader>
          <Group>
            <Card>
              <Div>
                <h3>{topic.title}</h3>
                <p>{topic.content}</p>
              </Div>
            </Card>
            <CommentList comments={topic.comments} />
            <AddCommentForm topicId={topic.id} />
          </Group>
        </Panel>
      )}
    </View>
  );
};
