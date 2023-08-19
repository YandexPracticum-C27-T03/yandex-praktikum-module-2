import { cn } from '@bem-react/classname';

import { useEmojiPickerContext } from '../../context/EmojiContext';
import { parseNativeEmoji } from '../../data-parse/parse-native-emoji';

import type { EmojiEntity } from '../../types';

import './index.scss';

const emojiButtonCn = cn('EmojiButton');

type EmojiViewerProps = {
  emoji: EmojiEntity;
};

export function EmojiViewer({ emoji }: EmojiViewerProps) {
  const { onSelectEmoji } = useEmojiPickerContext();

  return (
    <button
      className={emojiButtonCn()}
      onClick={() => onSelectEmoji(emoji)}
      data-unified={emoji.u}
      aria-label={emoji.n.join(',')}
    >
      {parseNativeEmoji(emoji.u)}
    </button>
  );
}
