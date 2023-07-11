import { RESOURCES_ULR } from '@@shared/lib/constants';
import { User } from '../model/types';

export function userAdapter(user: User) {
  return {
    ...user,
    ...(Boolean(user.avatar) && { avatar: `${RESOURCES_ULR}${user.avatar}` }),
  };
}
