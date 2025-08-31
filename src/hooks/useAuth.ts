import { useContext } from 'react';
import { createContext } from 'react';
import type { AuthContextType } from '../assets/contstant';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
