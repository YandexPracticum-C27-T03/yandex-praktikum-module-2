import React, { useEffect } from 'react';
import { fetchUser } from '@@entities/user';
import { useAuth } from '@@shared/lib/hooks/useAuth';
import { makeMapDispatch, useMapDispatch } from '@@shared/lib/model/hooks';

const mapDispatch = makeMapDispatch((dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
}));

export const AuthLayer: ReactFCWC = ({ children }) => {
  const { fetchUser } = useMapDispatch(mapDispatch);
  const { isAuth, user } = useAuth();

  useEffect(() => {
    if (!isAuth || !user) {
      fetchUser();
    }
  }, [fetchUser, isAuth, user]);

  return <>{children}</>;
};
