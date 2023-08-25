import type { EmojiMapType, EmojiType } from '../types';

export const EmojiTypes = [
  'smileys_people',
  'animals_nature',
  'food_drink',
  'travel_places',
  'activities',
  'objects',
  'symbols',
] as EmojiType;

export const EmojiTypesMap = EmojiTypes.reduce((acc, it) => {
  acc[it] = it;
  return acc;
}, {} as EmojiMapType);
