import { cn } from '@bem-react/classname';
import type { EmojiType } from '../../types';

import './styles.scss';

type TabProps = {
  tab: EmojiType['0'];
  activeTab: EmojiType['0'];
  onTabClick: (type: EmojiType['0']) => void;
  className: string;
};

export function Tab({ tab, onTabClick, activeTab, className }: TabProps) {
  const tabCn = cn('Tab');

  return (
    <button
      className={tabCn({
        active: tab === activeTab,
        [`${className}`]: tab,
      })}
      onClick={() => onTabClick(tab)}
    />
  );
}
