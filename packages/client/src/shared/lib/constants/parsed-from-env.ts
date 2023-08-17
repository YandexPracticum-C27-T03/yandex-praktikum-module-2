import { isClient, isProduction } from '@@shared/lib/common';

type IConfiguration = {
  API_URL: string;
  OAUTH_API_URL: string;
  OAUTH_CALLBACK_PATH: string;
  OAUTH_CALLBACK_URL: string;
};

function getValue<T = string>(name: string): T | undefined;
function getValue<T = string>(name: string, defaultValue: T): T;
function getValue<T = string>(name: string, defaultValue?: T): T | undefined {
  const finalValue = import.meta.env[name];

  if (finalValue === undefined || finalValue === '') {
    return defaultValue;
  }

  if (typeof finalValue !== 'string') {
    return finalValue as T;
  }

  try {
    return JSON.parse(finalValue) as T;
  } catch {
    return finalValue as never;
  }
}

export const config: IConfiguration = (function buildConfig(): IConfiguration {
  const defaultHostName = isClient() ? window.location.origin : 'https://ya-praktikum.tech';

  const API_URL = `${defaultHostName}/api/v2`;
  const OAUTH_API_URL = `${API_URL}/oauth/yandex`;

  const OAUTH_CALLBACK_PATH = getValue('REACT_APP_OAUTH_CALLBACK_PATH', 'oauth');

  const OAUTH_CALLBACK_URL_DEV = getValue('REACT_APP_OAUTH_CALLBACK_URL_DEV', `${defaultHostName}`);
  const OAUTH_CALLBACK_URL_PROD = getValue('REACT_APP_OAUTH_CALLBACK_URL_PROD', `${defaultHostName}`);

  return {
    API_URL,
    OAUTH_API_URL,
    OAUTH_CALLBACK_PATH,
    OAUTH_CALLBACK_URL: `${isProduction() ? OAUTH_CALLBACK_URL_PROD : OAUTH_CALLBACK_URL_DEV}/${OAUTH_CALLBACK_PATH}`,
  };
})();
