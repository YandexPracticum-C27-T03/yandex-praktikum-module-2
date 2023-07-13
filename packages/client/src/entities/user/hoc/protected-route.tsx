import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@@features';
import { useAuth } from '../hook/useAuth';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={Routes.LOGIN} />;
};
