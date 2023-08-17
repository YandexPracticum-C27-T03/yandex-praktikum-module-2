import { isClient } from '@@shared/lib/common';
import { config } from './parsed-from-env';

export const TEAM_NAME = 'pAPPrika';

export const API_ROOT = isClient() ? config.API_URL : 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_URL = `${API_ROOT}/api/v2/resources`;
