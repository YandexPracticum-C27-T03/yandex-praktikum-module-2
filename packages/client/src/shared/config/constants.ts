import { config } from '@@shared/lib/constants';

export const Routes = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  GAME: '/game',
  PROFILE: '/profile',
  FORUM: '/forum',
  NOT_FOUND: '/not-found',
  INTERNAL_ERROR: '/internal-error',
  OPEN_AUTH: `/${config.OAUTH_CALLBACK_PATH}`,
} as const;
