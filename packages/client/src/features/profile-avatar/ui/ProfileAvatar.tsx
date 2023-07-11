import { User } from '@@entities/user';
import { Avatar } from '@vkontakte/vkui';

type ProfileAvatarProps = {
  user: Nullable<User>;
  onOpenModal: () => void;
};

export const ProfileAvatar = ({ user, onOpenModal }: ProfileAvatarProps) => {
  return user && <Avatar src={user.avatar || undefined} onClick={onOpenModal} />;
};
