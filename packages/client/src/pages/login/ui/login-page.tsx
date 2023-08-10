import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@@entities/user';
import { UserLogin } from '@@entities/user/model/types';
import { loginFormFields } from '@@shared/lib/constants';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { HeaderLayout } from '@@widgets/header-layout';
import { cn } from '@bem-react/classname';

import './styles.scss';

const cnLoginPage = cn('LoginPage');

const mapDispatch = makeMapDispatch((dispatch) => ({
  login: (data: UserLogin, onRedirect: () => void) => dispatch(login({ data, onRedirect })),
}));

export const LoginPage = () => {
  const { login } = useMapDispatch(mapDispatch);
  const navigate = useNavigate();

  const onRedirect = useCallback(() => {
    navigate('/game');
  }, [navigate]);

  return (
    <HeaderLayout title="Авторизация">
      <Form<UserLogin>
        className={cnLoginPage()}
        fields={loginFormFields}
        cb={(data) => login(data, onRedirect)}
        buttonValue="Войти"
      />
    </HeaderLayout>
  );
};
