import { useBookstore } from '../context/BookstoreContext';

/**
 * Hook wrapper cho nghiệp vụ giỏ hàng.
 * Cung cấp danh sách item trong giỏ và các action thao tác giỏ hàng.
 * Hook này không thay đổi logic context, chỉ gom nhóm API sử dụng.
 */
export function useCart() {
  const {
    cartItemCount,
    getCart,
    getCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCartStorage,
  } = useBookstore();

  return {
    cartItemCount,
    getCart,
    getCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCartStorage,
  };
}

