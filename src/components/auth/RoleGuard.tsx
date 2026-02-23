import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  if (!allowedRoles.includes(user?.role)) {
    
    return <Navigate to={user?.role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor'} />;
  }

  return <>{children}</>;
};