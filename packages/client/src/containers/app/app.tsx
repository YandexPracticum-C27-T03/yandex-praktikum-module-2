import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { configureReduxStore } from '@@ducks/store';
import { useTheme } from '@@hooks/useTheme';
import { Initial } from '@@pages/initial';
import { cn } from '@@utils/bem';

import './styles.scss';

const cnApp = cn('App');

const { store } = configureReduxStore();

const AppContainer = () => {
  const [themeName] = useTheme();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line no-console
      console.log(data);
    };

    void fetchServerData();
  }, []);

  return (
    <ConfigProvider appearance={themeName}>
      <AdaptivityProvider>
        <AppRoot className={cnApp()}>
          <Initial />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

const AppContainerWithStore = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export const App = AppContainerWithStore;
