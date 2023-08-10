import { Outlet } from 'react-router-dom';
import { AuthLayer } from '@@app/layers/auth-layer';
import { NotificationLayer } from '@@app/layers/notification-layer';
import { selectCurrentTheme } from '@@entities/theme';
import { useAppSelector } from '@@shared/lib/model/hooks';
import { ErrorBoundary } from '@@shared/ui/ErrorBoundary/ErrorBoundary';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';

export const BaseLayout = () => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <ErrorBoundary fallback={<div>Произошла ошибка</div>}>
          <NotificationLayer>
            <AuthLayer>
              <AppRoot>
                <Outlet />
              </AppRoot>
            </AuthLayer>
          </NotificationLayer>
        </ErrorBoundary>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
