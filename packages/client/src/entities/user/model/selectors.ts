import { RootState } from '@@app/app-store';
import { makeMapState, useMapState } from '@@shared/lib/model/hooks';

const getUserModule = (state: RootState) => state.user;
export const getCurrentUser = (state: RootState) => getUserModule(state);

const mapState = makeMapState((state) => ({
  user: getCurrentUser(state),
}));

export const useAuth = () => {
  const {
    user: { isLoading, isAuth, data },
  } = useMapState(mapState);

  return { isLoading, isAuth, user: data };
};
