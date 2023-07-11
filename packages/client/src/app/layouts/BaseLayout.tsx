import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@@/shared/lib/model/hooks';
import { selectCurrentTheme } from '@@entities/theme';
import { cn } from '@@shared/lib/bem';
import ErrorBoundary from '@@shared/ui/ErrorBoundary/ErrorBoundary';

import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';

import './styles.scss';

const cnApp = cn('App');

export const BaseLayout = () => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <ConfigProvider appearance={theme}>
      <ErrorBoundary fallback={<div>Произошла ошибка</div>}>
        <AdaptivityProvider>
          <AppRoot className={cnApp()}>
            <Outlet />
          </AppRoot>
        </AdaptivityProvider>
      </ErrorBoundary>
    </ConfigProvider>
  );
};
