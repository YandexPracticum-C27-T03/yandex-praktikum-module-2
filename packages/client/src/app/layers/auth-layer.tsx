import { useEffect } from 'react';
import { useAuth, fetchUser } from '@@entities/user';
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

  return children as JSX.Element;
};
