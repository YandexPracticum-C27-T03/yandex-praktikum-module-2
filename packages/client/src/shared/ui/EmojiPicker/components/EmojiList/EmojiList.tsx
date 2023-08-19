import { cn } from '@bem-react/classname';
import { EmojiViewer } from '../EmojiViewer';

import type { EmojiEntity } from '../../types';

import './index.scss';

type EmojiListProps = {
  emojilist: Nullable<EmojiEntity[]>;
};

const emojilistCn = cn('EmojiList');

export function EmojiList({ emojilist }: EmojiListProps) {
  return (
    <ul className={emojilistCn()}>
      {(emojilist || []).map((emoji) => (
        <EmojiViewer key={emoji.u} emoji={emoji} />
      ))}
    </ul>
  );
}
