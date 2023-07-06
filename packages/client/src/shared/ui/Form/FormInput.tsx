import { forwardRef } from 'react';
import { Input, InputProps } from '@vkontakte/vkui';

export const FormInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input {...props} getRef={ref} />;
});
