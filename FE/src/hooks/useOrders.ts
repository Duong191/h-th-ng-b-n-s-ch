import { useBookstore } from '../context/BookstoreContext';

/**
 * Hook wrapper cho nghiệp vụ đơn hàng.
 * Gom nhóm danh sách đơn và các action thao tác đơn hàng từ context.
 * Không thay đổi luồng xử lý hiện tại, chỉ tái đóng gói để tái sử dụng.
 */
export function useOrders() {
  const { data, addOrder, updateOrder, confirmOrderReceived } = useBookstore();

  return {
    orders: data?.orders ?? [],
    addOrder,
    updateOrder,
    confirmOrderReceived,
  };
}

