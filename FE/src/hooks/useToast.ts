import { useBookstore } from '../context/BookstoreContext';

/**
 * Hook dùng để hiển thị thông báo toàn hệ thống.
 * Tách riêng để các page không cần gọi trực tiếp useBookstore chỉ để lấy showToast.
 * Hook này không chứa logic UI mới.
 */
export function useToast() {
  const { showToast } = useBookstore();

  return {
    showToast,
  };
}

