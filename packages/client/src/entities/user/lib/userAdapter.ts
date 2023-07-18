import { RESOURCES_URL } from '@@shared/lib/constants';
import { User } from '../model/types';

export function userAdapter(user: User) {
  return {
    ...user,
    ...(Boolean(user.avatar) && { avatar: `${RESOURCES_URL}${user.avatar}` }),
  };
}
