import { getCurrentUser } from '@@entities/user';
import { makeMapState, useMapState } from '../model/hooks';

export const useAuth = () => {
  const mapState = makeMapState((state) => ({
    user: getCurrentUser(state),
  }));

  const { user } = useMapState(mapState);

  const { isLoading, isAuth, data } = user;

  return { isLoading, isAuth, user: data };
};
