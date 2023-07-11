import { ReactNode, PropsWithChildren } from 'react';
import { User } from '@@entities/user';
import { Group, SimpleCell } from '@vkontakte/vkui';

type ProfileViewerProps = {
  user: Nullable<User>;
  avatar: ReactNode;
  avatarUpload: ReactNode;
  changePassoword: ReactNode;
};

export const UserViewer = ({
  user,
  avatar,
  avatarUpload,
  children,
  changePassoword,
}: PropsWithChildren<ProfileViewerProps>) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Group>
        <SimpleCell subtitle={user.dispay_name && `${user.dispay_name}`}>{avatar}</SimpleCell>

        <Group mode="plain">
          <SimpleCell indicator={user.login}>Логин</SimpleCell>
          <SimpleCell indicator={user.first_name}>Имя</SimpleCell>
          <SimpleCell indicator={user.second_name}>Фамилия</SimpleCell>
          <SimpleCell indicator={user.phone}>Номер телефона</SimpleCell>
          <SimpleCell indicator={user.email}>Email</SimpleCell>
        </Group>
        {children}
      </Group>
      {avatarUpload}
      {changePassoword}
    </>
  );
};
