import { Topic } from '@@entities/forum/model/types';
import { parseNativeEmoji } from '@@shared/ui/EmojiPicker';
import { cn } from '@bem-react/classname';

import './index.scss';
import { ReactionsBadge } from '../ReactionsBadge';
import { reactionAdapter } from './lib/reaction-adapter';

const MIN_COUNTER_REACTION = 1;

type ReactionsTopicProps = {
  reactions: Topic['reactions'];
  onReactionClick: (reaction: Topic['reactions'][0]) => void;
};

const reactionCn = cn('Reactions');

export function ReactionsTopic({ reactions, onReactionClick }: ReactionsTopicProps) {
  const reactionMap = reactionAdapter(reactions);

  return (
    <ul className={reactionCn()}>
      {Object.values(reactionMap).map(({ reaction, count }, i) => (
        <li className={reactionCn('item')} key={`${reaction}__${i}`}>
          <span
            className={reactionCn('icon')}
            onClick={() => onReactionClick(reaction)}
            aria-roledescription="reaction-button"
          >
            {parseNativeEmoji(reaction)}
          </span>

          {count > MIN_COUNTER_REACTION && <ReactionsBadge>{count}</ReactionsBadge>}
        </li>
      ))}
    </ul>
  );
}
