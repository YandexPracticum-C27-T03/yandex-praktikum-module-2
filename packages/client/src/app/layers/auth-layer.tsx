import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth, fetchUser } from '@@entities/user';
import { Routes } from '@@shared/config';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';

const mapDispatch = makeMapDispatch((dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
}));

export const AuthLayer: ReactFCWC = ({ children }) => {
  const { fetchUser } = useMapDispatch(mapDispatch);
  const { isLoading, isAuth, user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuth || !user) {
      fetchUser();
    }
  }, [fetchUser, isAuth, user]);

  const checkPath = pathname === Routes.LOGIN || pathname === Routes.REGISTRATION;

  return (checkPath ? children : !isLoading && children) as JSX.Element;
};
