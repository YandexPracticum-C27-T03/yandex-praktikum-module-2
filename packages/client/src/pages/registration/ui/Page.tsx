import { registration } from '@@entities/user';
import { UserRegistration } from '@@entities/user/model/types';
import { registerFormFields } from '@@shared/lib/constants/register-form-fields';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { HeaderLayout } from '@@widgets/header-layout';

const mapDispatch = makeMapDispatch((dispatch) => ({
  registration: (data: UserRegistration) => dispatch(registration(data)),
}));

export const RegistrationPage = () => {
  const { registration } = useMapDispatch(mapDispatch);

  const onSubmit = async (data: UserRegistration) => registration(data);

  return (
    <HeaderLayout title="Регистрация">
      <Form<UserRegistration> fields={registerFormFields} cb={onSubmit} buttonValue="Зарегистрироваться" />
    </HeaderLayout>
  );
};
