/*
Do not access Object.prototype method 'hasOwnProperty' from target object  no-prototype-builtins
https://eslint.org/docs/latest/rules/no-prototype-builtins
*/
export const hasOwnProperty: (object: unknown, key: PropertyKey) => boolean = Function.prototype.call.bind(
  Object.prototype.hasOwnProperty,
);

export const isDefined = <T>(p: T): p is Exclude<T, undefined> => p !== undefined;

export const isNotNil = <T>(p: T): p is Exclude<T, undefined | null> => isDefined(p) && p !== null;

export const isClient = () => typeof document !== 'undefined';
export const isProduction = () => import.meta.env.PROD;
