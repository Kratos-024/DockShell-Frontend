import { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthStateType } from './assets/contstant';
import UserServicesInstance from './services/user.service';
import { AuthContext } from './hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateType>('loading');

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setAuthState('unauthenticated');
      return;
    }
    const response = await UserServicesInstance.validateSession();
    if (response.data && !response.error) {
      setAuthState('authenticated');
    } else {
      localStorage.removeItem('accessToken');
      setAuthState('unauthenticated');
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value = { authState, setAuthState, checkAuthStatus };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
