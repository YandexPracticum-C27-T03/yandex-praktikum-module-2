import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@@entities/user';
import { Routes } from '@@shared/config';

export const UNProtectedRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={Routes.PROFILE} />;
  }

  return <Outlet />;
};
