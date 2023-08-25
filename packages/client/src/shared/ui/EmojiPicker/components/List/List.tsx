import { cn } from '@bem-react/classname';
import { useElementListRef } from '../../context/RefContext';
import { EmojiSection } from '../EmojiSection';

import './index.scss';

const emojiListCn = cn('List');

export function List() {
  const ListRef = useElementListRef();

  return (
    <div ref={ListRef} className={emojiListCn()}>
      <EmojiSection />
    </div>
  );
}
