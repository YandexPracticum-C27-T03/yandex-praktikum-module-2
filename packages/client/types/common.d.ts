import React from 'react';

declare global {
  export type FunctionalComponentWithChildren<T = unknown> = React.FC<T & { children?: React.ReactNode }>;
  export type ReactFCWC<T = unknown> = FunctionalComponentWithChildren<T>;

  export type ValuesOfObject<T> = T extends { [key: string]: infer R } ? R : never;

  // Меняем название ключа в объекте, сохраняя его тип
  export type PickRename<T, K extends keyof T, R extends PropertyKey> = {
    [P in keyof T as P extends K ? R : P]: T[P];
  };

  export type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>;
  };

  // Указываем конкретные поля в объекте, как NonNullable
  export type Ensure<T, K extends keyof T> = T & RequiredNotNull<Pick<T, K>>;
}

export {};
