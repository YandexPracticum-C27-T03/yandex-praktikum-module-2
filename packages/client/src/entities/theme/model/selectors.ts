import { RootState } from '@@app/app-store';

const selectThemeModule = (state: RootState) => state.theme;
export const selectCurrentTheme = (state: RootState) => selectThemeModule(state).theme;
