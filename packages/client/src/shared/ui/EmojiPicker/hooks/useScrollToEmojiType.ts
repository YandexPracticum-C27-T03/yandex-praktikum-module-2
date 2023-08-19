import { useCallback } from 'react';
import { useElementListRef, useElementMainRef } from '../context/RefContext';
import { scrollTo } from '../utils/dom-utils';
import type { EmojiType } from '../types';

export function useScrollToEmojiType(): [(type: EmojiType['0']) => void] {
  const mainRef = useElementMainRef();

  const listRef = useElementListRef();

  const onScrollToEmojiType = useCallback(
    (type: EmojiType['0']) => {
      if (!mainRef.current || !listRef.current) {
        return;
      }

      const emoji = mainRef.current?.querySelector(`[data-name="${type}"]`) as HTMLDivElement;

      if (!emoji) {
        return;
      }

      scrollTo(listRef.current, emoji.offsetTop);
    },
    [listRef, mainRef],
  );

  return [onScrollToEmojiType];
}
