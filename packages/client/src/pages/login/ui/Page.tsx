import { login } from '@@entities/user';
import { UserLogin } from '@@entities/user/model/types';
import { loginFormFields } from '@@shared/lib/constants/login-form-fields';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { HeaderLayout } from '@@widgets/header-layout';

const mapDispatch = makeMapDispatch((dispatch) => ({
  login: (data: UserLogin) => dispatch(login(data)),
}));

export const LoginPage = () => {
  const { login } = useMapDispatch(mapDispatch);

  const onSubmit = async (data: UserLogin) => login(data);

  return (
    <HeaderLayout title="Авторизация">
      <Form<UserLogin> fields={loginFormFields} cb={onSubmit} buttonValue="Войти" />
    </HeaderLayout>
  );
};
