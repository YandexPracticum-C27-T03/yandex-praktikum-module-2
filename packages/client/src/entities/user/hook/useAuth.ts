import { makeMapState, useMapState } from '@@shared/lib/model/hooks';
import { getCurrentUser } from '../model/selectors';

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
