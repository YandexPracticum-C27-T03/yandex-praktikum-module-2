import { ReactNode, PropsWithChildren } from 'react';
import { User } from '@@entities/user';
import { cn } from '@@shared/lib/bem';
import { Group, View, Panel, Gradient, Title, Header, SimpleCell, Div } from '@vkontakte/vkui';

import './styles.scss';

type ProfileViewerProps = {
  user: Nullable<User>;
  avatar: ReactNode;
  avatarUpload: ReactNode;
  changePassoword: ReactNode;
  logoutButton: ReactNode;
  switchTheme: ReactNode;
};

const userViewerCn = cn('UserViewer');

export const UserViewer = ({
  user,
  avatar,
  avatarUpload,
  children,
  changePassoword,
  logoutButton,
  switchTheme,
}: PropsWithChildren<ProfileViewerProps>) => {
  if (!user) {
    return null;
  }
  return (
    <Div style={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
      <View activePanel="gradient">
        <Panel id="gradient" className={userViewerCn()}>
          <Group>
            <Gradient mode="tint" className={userViewerCn('avatar')}>
              {avatar}

              {user.dispay_name && (
                <Title className={userViewerCn('title')} level="2" weight="2">
                  {user.dispay_name}
                </Title>
              )}
              <br />
              {children}
            </Gradient>

            <Group mode="plain">
              <Header>Основная информация</Header>
              <SimpleCell indicator={user.login}>Логин</SimpleCell>
              <SimpleCell indicator={user.first_name}>Имя</SimpleCell>
              <SimpleCell indicator={user.second_name}>Фамилия</SimpleCell>
              <SimpleCell indicator={user.phone}>Номер телефона</SimpleCell>
              <SimpleCell indicator={user.email}>Email</SimpleCell>
              {switchTheme}
            </Group>
          </Group>

          {logoutButton}

          {avatarUpload}
          {changePassoword}
        </Panel>
      </View>
    </Div>
  );
};
