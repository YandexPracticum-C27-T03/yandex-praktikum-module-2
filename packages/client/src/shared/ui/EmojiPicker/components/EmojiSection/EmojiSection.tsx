import { EMOJI_CLASSES } from '../../config/classes';
import { EmojiTypesMap } from '../../config/emoji-type';
import { useEmojiPickerContext } from '../../context/EmojiContext';
import { EmojiList } from '../EmojiList';
import { Title } from '../Title/Title';

export function EmojiSection() {
  const { getEmojiByCategory } = useEmojiPickerContext();

  return (
    <>
      {Object.values(EmojiTypesMap).map((emojiType, i) => (
        <div className={EMOJI_CLASSES.EmojiSection} key={`${emojiType}__${i}`} data-name={emojiType}>
          <Title type={emojiType} />
          <EmojiList emojilist={getEmojiByCategory(emojiType)} />
        </div>
      ))}
    </>
  );
}
