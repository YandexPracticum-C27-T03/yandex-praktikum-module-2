import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Topic } from '@@entities/forum/types/types';
import { EmojiPicker } from '@@shared/ui/EmojiPicker';
import { EmojiEntity } from '@@shared/ui/EmojiPicker/types';
import { Icon12SmileFilled } from '@vkontakte/icons';
import { Button, Card, Div, unstable_Popover as Popover } from '@vkontakte/vkui';
import { ReactionsTopic } from '../ReactionsTopic';

type TopicProps = {
  topic: Topic;
};

export function TopicItem({ topic }: TopicProps) {
  const [shown, setShown] = useState<boolean>(false);
  const [topicState, setTopic] = useState(() => topic);

  const onSelectEmoji = useCallback((emoji: EmojiEntity) => {
    setTopic((prev) => ({
      ...prev,
      reactions: (prev.reactions ?? []).concat(emoji.u),
    }));
  }, []);

  const onReactionClick = useCallback((emoji: string) => {
    setTopic((prev) => ({
      ...prev,
      reactions: (prev.reactions ?? []).concat(emoji),
    }));
  }, []);

  return (
    <Card key={topic.id} mode="shadow">
      <Div>
        <h3>{topic.title}</h3>
        <p>{topic.content?.length > 50 ? topic.content?.substring(0, 50) + '...' : topic.content}</p>
        <ReactionsTopic reactions={topicState.reactions!} onReactionClick={onReactionClick} />
      </Div>
      <Link to={`/forum/topic/${topic.id}`}>
        <Button size="l" mode="tertiary">
          Комментарии ({topic.comments?.length})
        </Button>
      </Link>

      <Popover shown={shown} onShownChange={setShown} content={<EmojiPicker onSelectEmoji={onSelectEmoji} />}>
        <Button size="s">
          <Icon12SmileFilled />
        </Button>
      </Popover>
    </Card>
  );
}
