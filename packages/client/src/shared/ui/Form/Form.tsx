import { useForm, Controller, FieldValues, Path } from 'react-hook-form';
import { IForm } from '@@shared/lib/types';
import { cn } from '@bem-react/classname';
import { FormLayoutGroup, FormItem, Button, FormLayout, Group } from '@vkontakte/vkui';
import { FormInput } from './FormInput';

import './styles.scss';

type Props<T> = {
  fields: IForm[];
  cb: (value: T) => void;
  buttonValue: string;
};

const cnForm = cn('Form');

export const Form = function <T extends FieldValues>({ cb, fields, buttonValue }: Props<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmit = handleSubmit(cb);

  return (
    <Group mode="card" className={cnForm('body')}>
      <FormLayout onSubmit={onSubmit}>
        <FormLayoutGroup>
          {fields.map(({ name, rules, label, ...input }) => {
            const error = errors[name] as FieldValues;
            const isExist = typeof error !== 'undefined';

            return (
              <Controller
                key={name}
                control={control}
                name={name as Path<T>}
                rules={rules}
                render={({ field }) => (
                  <FormItem
                    status={isExist && error['message'] && 'error'}
                    bottom={isExist && error['message']}
                    top={label}
                    htmlFor={name}
                  >
                    <FormInput id={name} {...field} {...input} />
                  </FormItem>
                )}
              />
            );
          })}
          <FormItem>
            <Button type="submit">{buttonValue}</Button>
          </FormItem>
        </FormLayoutGroup>
      </FormLayout>
    </Group>
  );
};
