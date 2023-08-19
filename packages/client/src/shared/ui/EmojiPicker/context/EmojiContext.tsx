import React, { PropsWithChildren, useContext } from 'react';
import { identity } from '@@shared/lib/common';
import emoji from '../data/emoji.json';

import type { EmojiPickerContext, EmojiPickerContextProps } from '../types';

const EmojiContext = React.createContext<EmojiPickerContext>({
  getEmoji: () => null,
  selected: null,
  onSelectEmoji: identity,
  getEmojiByCategory: (type) => emoji[type],
});

export function EmojiPickerContext({ children, ...props }: PropsWithChildren<EmojiPickerContextProps>) {
  const emojiApi = {
    selected: null,
    getEmoji: () => emoji,
    onSelectEmoji: props.onSelectEmoji,
    getEmojiByCategory: (type) => emoji[type],
  } as EmojiPickerContext;

  return <EmojiContext.Provider value={emojiApi}>{children}</EmojiContext.Provider>;
}

export function useEmojiPickerContext() {
  return useContext(EmojiContext);
}
