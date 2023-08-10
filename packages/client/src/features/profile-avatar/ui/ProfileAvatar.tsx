import { User } from '@@entities/user';
import { Avatar } from '@vkontakte/vkui';

type ProfileAvatarProps = {
  user: Nullable<User>;
  onOpenModal?: () => void;
};

export const ProfileAvatar = ({ user, onOpenModal }: ProfileAvatarProps) => {
  if (!user) {
    return null;
  }

  return <Avatar size={96} data-test-id="avatar" src={user.avatar || undefined} onClick={onOpenModal} />;
};
