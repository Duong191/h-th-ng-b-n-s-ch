import { Navigate, useLocation } from 'react-router-dom';
import { useBookstore } from '../../context/BookstoreContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function RequireAuth({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useBookstore();
  const loc = useLocation();
  if (loading) {
    return (
      <div className="container app-loading-state">
        <div className="app-spinner" />
        <p>Đang tải dữ liệu phiên đăng nhập...</p>
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" state={{ from: loc }} replace />;
  return <>{children}</>;
}

export function RequireAdmin({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useBookstore();
  const loc = useLocation();
  if (loading) {
    return (
      <div className="container app-loading-state">
        <div className="app-spinner" />
        <p>Đang tải dữ liệu quyền truy cập...</p>
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (currentUser.role !== 'admin' && currentUser.role !== 'staff') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
