import { RootState } from '@@app/appStore';

const selectThemeModule = (state: RootState) => state.theme;
export const selectCurrentTheme = (state: RootState) => selectThemeModule(state).theme;
