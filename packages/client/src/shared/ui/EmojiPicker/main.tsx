import React from 'react';
import { List } from './components/List';
import { MainContainer } from './components/Main';
import { Tabs } from './components/Tabs';
import { EmojiPickerContext as EmojiProvider } from './context/EmojiContext';
import { RefContextProvider } from './context/RefContext';
import type { EmojiPickerContextProps } from './types';

export function EmojiPicker({ ...props }: EmojiPickerContextProps) {
  return (
    <RefContextProvider>
      <EmojiProvider {...props}>
        <MainContainer>
          <Tabs />
          <List />
        </MainContainer>
      </EmojiProvider>
    </RefContextProvider>
  );
}
