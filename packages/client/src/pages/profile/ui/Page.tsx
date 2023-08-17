import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserViewer } from '@@entities/profile';
import { getUserData } from '@@entities/user';
import { logout } from '@@entities/user/model/reducers';
import { ProfileAvatar } from '@@features/profile-avatar';
import { ProfileChangePassword } from '@@features/profile-change-password';
import { ProfileUploadAvatar } from '@@features/profile-uploader-avatar-popup';
import { Routes } from '@@shared/config';
import { useControlledPopup } from '@@shared/hooks/useControlledPopup';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Button, ButtonGroup } from '@vkontakte/vkui';

const mapDispatch = makeMapDispatch((dispatch) => ({
  logoutUser: (onLogout: () => void) => dispatch(logout({ onLogout })),
}));

export const ProfilePage = () => {
  const user = useSelector(getUserData);
  const { logoutUser } = useMapDispatch(mapDispatch);
  const navigate = useNavigate();

  function onCloseUploadAvatarPopup() {
    onClose();
  }

  function onCloseChangePasswordPopup() {
    closePasswordPopup();
  }

  const onLogout = () => {
    navigate(Routes.ROOT);
  };

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
      logoutButton={
        <ButtonGroup align="center">
          <Button onClick={() => logoutUser(onLogout)} stretched={false}>
            Выйти
          </Button>
        </ButtonGroup>
      }
    >
      <Button onClick={openPasswordPopup}>Изменить пароль</Button>
    </UserViewer>
  );
};
