import { Link } from 'react-router-dom';
import { CardGrid, Card, Div, Button } from '@vkontakte/vkui';

const TopicList = () => {
  const topics = [
    { id: 1, title: 'Топик 1', summary: 'Краткое содержание топика 1' },
    { id: 2, title: 'Топик 2', summary: 'Краткое содержание топика 2' },
    { id: 3, title: 'Топик 3', summary: 'Краткое содержание топика 3' },
  ];

  return (
    <CardGrid size="l">
      {topics.map((topic) => (
        <Card key={topic.id} mode="shadow">
          <Div>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
          </Div>
          <Link to={`/forum/topic/${topic.id}`}>
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
