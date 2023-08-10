declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type RootState = import('../src/app/app-store').RootState;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type AppDispatch = import('../src/app/app-store').AppDispatch;

  interface Window {
    initialState: string;
  }
}

export {};
