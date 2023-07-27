import { RootState } from '@@app/app-store';

const selectThemeModule = (state: RootState) => state.serviceValues;
export const selectPageName = (state: RootState) => selectThemeModule(state).pageName;
