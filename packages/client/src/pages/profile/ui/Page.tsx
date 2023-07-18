import { useSelector } from 'react-redux';
import { UserViewer } from '@@entities/profile';
import { getUserData } from '@@entities/user';
import { ProfileAvatar } from '@@features/profile-avatar';
import { ProfileChangePassword } from '@@features/profile-change-password';
import { ProfileUploadAvatar } from '@@features/profile-uploader-avatar-popup';
import { useControlledPopup } from '@@shared/hooks/useControlledPopup';
import { Button } from '@vkontakte/vkui';

export const ProfilePage = () => {
  const user = useSelector(getUserData);

  function onCloseUploadAvatarPopup() {
    onClose();
  }

  function onCloseChangePasswordPopup() {
    closePasswordPopup();
  }

  const {
    popup: avatarUploadPopup,
    onOpenModal,
    onClose,
  } = useControlledPopup(<ProfileUploadAvatar user={user} onClose={onCloseUploadAvatarPopup} />);

  const {
    popup: changePassowordPopup,
    onOpenModal: openPasswordPopup,
    onClose: closePasswordPopup,
  } = useControlledPopup(<ProfileChangePassword onClose={onCloseChangePasswordPopup} />);

  return (
    <UserViewer
      avatarUpload={avatarUploadPopup}
      changePassoword={changePassowordPopup}
      avatar={<ProfileAvatar user={user} onOpenModal={onOpenModal} />}
      user={user}
    >
      <Button onClick={openPasswordPopup}>Cменить пароль</Button>
    </UserViewer>
  );
};
