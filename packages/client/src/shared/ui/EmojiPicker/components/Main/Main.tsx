import { PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';
import { useElementMainRef } from '../../context/RefContext';

const cnEmojiContainer = cn('EmojiContainer');

export function MainContainer({ children }: PropsWithChildren) {
  const PickerMainRef = useElementMainRef();

  return (
    <div className={cnEmojiContainer()} ref={PickerMainRef}>
      {children}
    </div>
  );
}
