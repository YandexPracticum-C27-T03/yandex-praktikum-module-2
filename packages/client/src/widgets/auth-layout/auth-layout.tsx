import React from 'react';
import { cn } from '@@shared/lib/bem';
import { View, Panel, PanelHeader, Header } from '@vkontakte/vkui';

import './styles.scss';

const cnAuthLayout = cn('AuthLayout');

export const AuthLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return (
    <View activePanel="main">
      <Panel className={cnAuthLayout('panel')} id="main">
        <PanelHeader>
          {/* TODO: Вынести имя приложения в другое место */}
          <Header subtitle={title}>AppName</Header>
        </PanelHeader>
        <div className={cnAuthLayout('content')}>{children}</div>
      </Panel>
    </View>
  );
};
