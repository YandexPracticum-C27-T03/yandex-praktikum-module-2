import { getCurrentUser } from '@@entities/user';
import { makeMapState, useMapState } from '../model/hooks';

// НАРУШЕНО НАПРАВЛЕНИЕ ЗАВИСИМОСТЕЙ
const mapState = makeMapState((state) => ({
  user: getCurrentUser(state),
}));

export const useAuth = () => {
  const {
    user: { isLoading, isAuth, data },
  } = useMapState(mapState);

  return { isLoading, isAuth, user: data };
};
