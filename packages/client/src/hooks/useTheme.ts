import { useEffect } from 'react';
import { AppearanceType } from '@vkontakte/vk-bridge';
import { toggleTheme } from '@ducks/settings/actions';
import { isDarkThemeSelector } from '@ducks/settings/selectors';
import { makeMapDispatch, makeMapState, useMapDispatch, useMapState } from '@ducks/utils';

type IUseTheme = () => [AppearanceType, boolean, () => void];

enum ThemePresetList {
  DEFAULT = 'light',
  DARK = 'dark',
}

const getPresetName = (isDark: boolean): ThemePresetList => (isDark ? ThemePresetList.DARK : ThemePresetList.DEFAULT);
const getPresetClass = (isDark: boolean): AppearanceType => (isDark ? 'dark' : 'light');

const mapState = makeMapState((state) => ({
  isDarkTheme: isDarkThemeSelector(state),
}));

const mapDispatch = makeMapDispatch((dispatch) => ({
  toggleTheme: () => dispatch(toggleTheme()),
}));

const useTheme: IUseTheme = () => {
  const { isDarkTheme } = useMapState(mapState);
  const { toggleTheme } = useMapDispatch(mapDispatch);

  useEffect(() => {
    document.documentElement.className = `Theme_${getPresetName(isDarkTheme)}`;
  }, [isDarkTheme]);

  const presetTheme: AppearanceType = getPresetClass(isDarkTheme);

  return [presetTheme, isDarkTheme, toggleTheme];
};

export { useTheme };
