import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState.loading) {
    return <div className="text-center mt-20">Chargement...</div>;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/adminPage" state={{ redirect: location.pathname }} replace />;
  }

  return children;
};


export default ProtectedRoute;
