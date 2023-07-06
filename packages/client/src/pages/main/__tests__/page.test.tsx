import { Provider } from 'react-redux';
import { themeSlice } from '@@entities/theme';
import { THEMES } from '@@entities/theme/model/contants';
import { userSlice } from '@@entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { MainPage } from '../ui/Page';

const shoutBeText = `Текущая тема: ${THEMES.light}`;

describe('render page with store', () =>
  test('should render main page with display theme value', () => {
    const mockStore = configureStore<RootState>({
      reducer: {
        theme: themeSlice.reducer,
        user: userSlice.reducer,
      },
    });

    const renderApp = render(
      <Provider store={mockStore}>
        <MainPage />
      </Provider>,
    );

    renderApp.findByDisplayValue(shoutBeText);
  }));
