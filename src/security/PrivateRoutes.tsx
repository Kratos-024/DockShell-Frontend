import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = () => {
  const { authState } = useAuth();

  if (authState === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

  if (authState === 'authenticated') {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};
