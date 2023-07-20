import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ServiceValuesSlice = {
  pageName: string | null;
};

const initialState: ServiceValuesSlice = {
  pageName: null,
};

export const serviceValuesSlice = createSlice({
  name: 'entities/theme',
  initialState,
  reducers: {
    setPageName(state, action: PayloadAction<ServiceValuesSlice['pageName']>) {
      state.pageName = action.payload;
    },
  },
});

export const { setPageName } = serviceValuesSlice.actions;
