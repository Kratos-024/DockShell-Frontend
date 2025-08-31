import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomePage } from '../pages/HomePage';

interface ProtectedRouteProps {
  handleLoginClick: () => void;
  isModalOpen: boolean;
}

export const ProtectedRoute = ({ handleLoginClick, isModalOpen }: ProtectedRouteProps) => {
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
    return <Navigate to="/ctf/labs" replace />;
  }
  return <HomePage handleLoginClick={handleLoginClick} isModalOpen={isModalOpen} />;
};
