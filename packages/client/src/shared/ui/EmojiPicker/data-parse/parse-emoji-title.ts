const REPLACER = ' & ';

export function parseEmojiTitle(title: string) {
  return title.replace(/_/g, REPLACER);
}
