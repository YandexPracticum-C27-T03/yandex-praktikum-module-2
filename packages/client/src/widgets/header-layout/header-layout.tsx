import React from 'react';
import { usePageName } from '@@entities/service-values/hook/use-page-name';
import { cn } from '@@shared/lib/bem';
import { View, Panel, PanelHeader, Header, Div } from '@vkontakte/vkui';

import './styles.scss';

type HeaderLayoutProps = {
  title?: string;
};

const cnAuthLayout = cn('AuthLayout');

// TODO: Вынести HeaderLayout на верхний уровень, обернув всё приложение
export const HeaderLayout: ReactFCWC<HeaderLayoutProps> = ({ children, title }) => {
  const [pageName] = usePageName();

  return (
    <View activePanel="main">
      <Panel className={cnAuthLayout('panel')} id="main">
        {/* TODO: Реализовать кнопку "Назад" в хедере */}
        <PanelHeader /* before={<PanelHeaderBack onClick={() => void 0} title={'Back'} />} */>
          {/* TODO: Вынести имя приложения в другое место */}
          <Header subtitle={title ?? pageName}>2D Runner</Header>
        </PanelHeader>
        <Div className={cnAuthLayout('content')}>{children}</Div>
      </Panel>
    </View>
  );
};
