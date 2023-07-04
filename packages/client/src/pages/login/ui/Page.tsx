import { loginFormFields } from '@@shared/lib/constants/login-form-fields';
import { Form } from '@@shared/ui/Form';

export interface Data {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const onSubmit = async (data: Data) => {
    // Регистрируем
  };

  return <Form<Data> title="Авторизация" fields={loginFormFields} cb={onSubmit} buttonValue="Войти" />;
};
