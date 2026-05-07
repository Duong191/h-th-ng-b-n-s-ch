import { useBookstore } from '../context/BookstoreContext';

/**
 * Hook wrapper cho nghiệp vụ xác thực.
 * Dùng để lấy nhanh thông tin phiên đăng nhập + các action auth từ BookstoreContext.
 * Hook này không chứa logic mới, chỉ nhóm lại dữ liệu/action liên quan auth.
 */
export function useAuth() {
  const { currentUser, session, login, logout, register } = useBookstore();

  return {
    currentUser,
    session,
    login,
    logout,
    register,
  };
}

