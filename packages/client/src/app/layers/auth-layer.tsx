import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@@entities/user';
import { Routes as Pages } from '@@shared/config/constants';

export const AuthGuard: ReactFCWC = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const { pathname } = useLocation();

  useEffect(() => {
    function redirect() {
      if (isAuth && (pathname === Pages.LOGIN || pathname === Pages.REGISTRATION)) {
        return navigate('/');
      }
    }

    redirect();
  }, [navigate, pathname, isAuth]);

  return children as JSX.Element;
};
