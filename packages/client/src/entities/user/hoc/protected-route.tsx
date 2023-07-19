import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@@shared/config';
import { useAuth } from '../hook/useAuth';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={Routes.LOGIN} />;
};
