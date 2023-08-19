import emoji from '../data/emoji.json';

export type Emoji = typeof emoji;
export type Unified = Emoji['activities'][0]['u'];
export type EmojiEntity = Emoji['flags'][0];

export type EmojiType = (keyof Emoji)[];

export type EmojiPickerContext = {
  selected: null | EmojiEntity;
  getEmoji: () => typeof emoji | null;
  onSelectEmoji: (emoji: EmojiEntity) => void;
  getEmojiByCategory: (emoji: keyof Emoji) => Emoji[keyof Emoji];
};

export type EmojiPickerContextProps = {
  onSelectEmoji: EmojiPickerContext['onSelectEmoji'];
};

export type EmojiMapType = Record<keyof Emoji, keyof Emoji>;
