import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@@/shared/lib/model/hooks';
import { AuthLayer } from '@@app/layers/auth-layer';
import { selectCurrentTheme } from '@@entities/theme';
import { ErrorBoundary } from '@@shared/ui/ErrorBoundary/ErrorBoundary';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';

export const BaseLayout = () => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <ErrorBoundary fallback={<div>Произошла ошибка</div>}>
          <AuthLayer>
            <AppRoot>
              <Outlet />
            </AppRoot>
          </AuthLayer>
        </ErrorBoundary>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
