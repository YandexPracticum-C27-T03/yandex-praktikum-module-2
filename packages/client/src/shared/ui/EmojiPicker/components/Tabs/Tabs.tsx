import { useState } from 'react';
import { cn } from '@bem-react/classname';
import { EmojiTypes } from '../../config/emoji-type';
import { useActiveTypeTab } from '../../hooks/useActiveTypeTab';
import { useScrollToEmojiType } from '../../hooks/useScrollToEmojiType';
import { EmojiType } from '../../types';
import { Tab } from '../Tab';

import './index.scss';

const tabsCn = cn('Tabs');

export function Tabs() {
  const [activeTab, setActiveTab] = useState<EmojiType['0'] | null>(null);
  const [scrollToCategory] = useScrollToEmojiType();

  useActiveTypeTab(setActiveTab);

  return (
    <ul className={tabsCn()}>
      {EmojiTypes.map((tab, i) => (
        <Tab
          key={i}
          tab={tab}
          className={tab}
          activeTab={activeTab!}
          onTabClick={(tab) => {
            scrollToCategory(tab);
          }}
        />
      ))}
    </ul>
  );
}
