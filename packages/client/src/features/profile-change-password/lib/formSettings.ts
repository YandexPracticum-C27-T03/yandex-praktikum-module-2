import { IForm } from '@@shared/lib/types';

export const loginFormFields: IForm[] = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
  },

  {
    name: 'newPassword',
    label: 'Новый пароль',
  },
];
