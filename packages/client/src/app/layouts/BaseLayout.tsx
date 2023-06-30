import { Outlet } from 'react-router-dom';
import { selectCurrentTheme } from '@@entities/theme';
import { useAppSelector } from '@@shared/lib/model/hooks';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { cn } from '@@shared/lib/bem';

import './styles.scss';

const cnApp = cn('App');

export const BaseLayout = () => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <AppRoot className={cnApp()}>
          <Outlet />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
