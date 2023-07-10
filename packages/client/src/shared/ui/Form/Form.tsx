import { useForm, Controller, FieldValues, Path } from 'react-hook-form';
import { IForm } from '@@shared/lib/types';
import { cn } from '@bem-react/classname';

import './styles.scss';

import {
  View,
  Panel,
  PanelHeader,
  SplitLayout,
  SplitCol,
  Group,
  FormLayoutGroup,
  FormItem,
  Input,
  Button,
  FormLayout,
} from '@vkontakte/vkui';

type Props<T> = {
  title: string;
  fields: IForm[];
  cb: (value: T) => void;
  buttonValue: string;
};

const cnForm = cn('Form');

export const Form = function <T extends FieldValues>({ cb, fields, title, buttonValue }: Props<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmit = handleSubmit(cb);

  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol autoSpaced>
        <View activePanel="main">
          <Panel id="main">
            <PanelHeader>{title}</PanelHeader>
            <div className={cnForm()}>
              <Group mode="card" className={cnForm('body')}>
                <FormLayout onSubmit={onSubmit}>
                  <FormLayoutGroup>
                    {fields.map(({ name, rules, label, ...input }) => {
                      const error = errors[name] as FieldValues;
                      const isExist = typeof error !== 'undefined';

                      return (
                        <Controller
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
                              <Input id={name} {...field} {...input} />
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
            </div>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
