import { registration } from '@@entities/user';
import { UserRegistration } from '@@entities/user/model/types';
import { registerFormFields } from '@@shared/lib/constants';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { HeaderLayout } from '@@widgets/header-layout';
import { cn } from '@bem-react/classname';

import './styles.scss';

const cnRegistrationPage = cn('RegistrationPage');

const mapDispatch = makeMapDispatch((dispatch) => ({
  registration: (data: UserRegistration) => dispatch(registration(data)),
}));

export const RegistrationPage = () => {
  const { registration } = useMapDispatch(mapDispatch);

  return (
    <HeaderLayout title="Регистрация">
      <Form<UserRegistration>
        className={cnRegistrationPage()}
        fields={registerFormFields}
        cb={registration}
        buttonValue="Зарегистрироваться"
      />
    </HeaderLayout>
  );
};
