import { cn } from '@bem-react/classname';
import { parseEmojiTitle } from '../../data-parse/parse-emoji-title';
import { Emoji } from '../../types';

import './index.scss';

type TitleProps = {
  type: keyof Emoji;
};

const titleCn = cn('Title');

export function Title({ type }: TitleProps) {
  return <div className={titleCn()}>{parseEmojiTitle(type)}</div>;
}
