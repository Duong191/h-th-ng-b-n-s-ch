import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/bookstore.types';

/**
 * Quản lý redirect sau khi đã có phiên đăng nhập.
 * - Khi `currentUser` tồn tại, hook tự điều hướng về trang user đang định truy cập trước đó (`fromPath`)
 *   hoặc về trang chủ nếu không có `fromPath`.
 * - Chỉ xử lý điều hướng, không can thiệp UI/form/API/auth flow.
 */
export function useAuthRedirect(currentUser: User | null, fromPath?: string): void {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    navigate(fromPath || '/', { replace: true });
  }, [currentUser, fromPath, navigate]);
}

