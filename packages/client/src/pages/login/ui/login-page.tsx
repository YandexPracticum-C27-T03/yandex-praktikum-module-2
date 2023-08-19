import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@@entities/user';
import { openAuthService } from '@@entities/user/api/open-auth.service';
import { UserLogin } from '@@entities/user/model/types';
import { Routes } from '@@shared/config';
import { config, loginFormFields } from '@@shared/lib/constants';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';
import { Form } from '@@shared/ui/Form';
import { HeaderLayout } from '@@widgets/header-layout';
import { cn } from '@bem-react/classname';
import { Button, FormItem } from '@vkontakte/vkui';

import './styles.scss';

const cnLoginPage = cn('LoginPage');

const mapDispatch = makeMapDispatch((dispatch) => ({
  login: (data: UserLogin, onRedirect: () => void) => dispatch(login({ data, onRedirect })),
}));

export const LoginPage = () => {
  const { login } = useMapDispatch(mapDispatch);
  const navigate = useNavigate();

  const onRedirect = useCallback(() => {
    navigate(Routes.ROOT);
  }, [navigate]);

  const onYandexLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { serviceId: clientId, error } = await openAuthService.getServiceId();

    if (!error) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${config.OAUTH_CALLBACK_URL}`;
    }
  };

  return (
    <HeaderLayout title="Авторизация">
      <Form<UserLogin>
        className={cnLoginPage()}
        fields={loginFormFields}
        cb={(data) => login(data, onRedirect)}
        buttonValue="Войти"
      >
        <FormItem>
          <Button appearance="negative" onClick={onYandexLoginClick}>
            Войти через Яндекс
          </Button>
        </FormItem>
      </Form>
    </HeaderLayout>
  );
};
