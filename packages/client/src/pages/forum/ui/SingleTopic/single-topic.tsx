import React, { useState } from 'react';
import { Comment } from '@@entities/forum/model/types';
import { View, Panel, PanelHeader, Group, Card, Div, Spinner } from '@vkontakte/vkui';
import { AddCommentForm } from '../AddCommentForm';
import CommentList from '../CommentList';

export const SingleTopic = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Заглушка для тестовых данных топика{}
  const topic = {
    id: 1,
    title: 'Топик 1',
    content: 'Содержание топика 1',
  };

  const [comments, setComments] = useState<Comment[]>([]); // Использование типа Comment[] для комментариев

  const handleSubmitComment = (comment: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      text: comment,
    };
    setComments([...comments, newComment]);
  };

  // Установка флага загрузки в false
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (isLoading) {
    return (
      <Group>
        <Spinner size="large" />
      </Group>
    );
  }

  return (
    <View activePanel="forum">
      <Panel id="forum">
        <PanelHeader>{topic.title}</PanelHeader>
        <Group>
          <Card>
            <Div>
              <h3>{topic.title}</h3>
              <p>{topic.content}</p>
            </Div>
          </Card>
          <CommentList comments={comments} />
          <AddCommentForm />
        </Group>
      </Panel>
    </View>
  );
};
