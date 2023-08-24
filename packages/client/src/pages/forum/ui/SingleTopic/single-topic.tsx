import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comment, getTopicReducer, Topic } from '@@entities/forum';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { View, Panel, PanelHeader, Group, Card, Div, Spinner } from '@vkontakte/vkui';
import { AddCommentForm } from '../AddCommentForm';
import CommentList from '../CommentList';

const mapDispatch = makeMapDispatch((dispatch) => ({
  getTopic: (id: number) => dispatch(getTopicReducer(id)),
}));

export const SingleTopic = () => {
  const { getTopic } = useMapDispatch(mapDispatch);
  const [topic, setTopic] = useState<Topic>();
  const [parent, setParent] = useState<number | undefined>();
  const { id } = useParams();

  useEffect(() => {
    const getTopicRequest = async () => {
      const { payload } = await getTopic(Number(id));
      setTopic(payload);
    };
    getTopicRequest();
  }, [getTopic, id]);

  return (
    <View activePanel="forum">
      {topic ? (
        <Panel id="forum">
          <PanelHeader>{topic.title}</PanelHeader>
          <Group>
            <Card>
              <Div>
                <h3>{topic.title}</h3>
                <p style={{ whiteSpace: 'pre' }}>{topic.content}</p>
              </Div>
            </Card>
            <CommentList topicId={topic.id} setParent={setParent} />
            <AddCommentForm topicId={topic.id} parentId={parent} />
          </Group>
        </Panel>
      ) : (
        <Div>Топиков пока нет. Буть первым</Div>
      )}
    </View>
  );
};
