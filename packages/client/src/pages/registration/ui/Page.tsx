import { registerFormFields } from '@@shared/lib/constants/register-form-fields';
import { Form } from '@@shared/ui/Form';

export interface Data {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export const RegistrationPage = () => {
  const onSubmit = async (data: Data) => {
    // Регистрируем
  };

  return <Form<Data> title="Регистрация" fields={registerFormFields} cb={onSubmit} buttonValue="Зарегистрироваться" />;
};
