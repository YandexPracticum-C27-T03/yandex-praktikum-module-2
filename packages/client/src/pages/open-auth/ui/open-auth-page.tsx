import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenAuthLogin, openAuthLogin } from '@@entities/user';
import { Routes } from '@@shared/config';
import { isClient } from '@@shared/lib/common';
import { config } from '@@shared/lib/constants';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';

const mapDispatch = makeMapDispatch((dispatch) => ({
  oAuthLogin: (data: OpenAuthLogin, onOk: () => void, onError: () => void) =>
    dispatch(openAuthLogin({ data, onOk, onError })),
}));

export const OpenAuthPage: FC = React.memo(() => {
  const { oAuthLogin } = useMapDispatch(mapDispatch);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate(Routes.ROOT);
  }, [navigate]);

  const onError = useCallback(() => {
    navigate(Routes.LOGIN);
  }, [navigate]);

  useEffect(() => {
    if (isClient()) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code') ?? '';

      const data = {
        code,
        redirect_uri: config.OAUTH_CALLBACK_URL,
      };

      void oAuthLogin(data, handleLogin, onError);
    }
  }, [handleLogin, oAuthLogin, onError]);

  return <main className="___">Ожидайте</main>;
});
