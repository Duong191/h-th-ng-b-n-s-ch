import { useBookstore } from '../context/BookstoreContext';

/**
 * Hook wrapper cho nghiệp vụ kho.
 * Cung cấp dữ liệu lịch sử nhập/xuất và các action quản lý kho từ context.
 * Hook này chỉ forward dữ liệu/action hiện có, không thêm logic mới.
 */
export function useInventory() {
  const { data, getInventoryLogs, addInventoryLog, refreshInventoryLogsFromApi } = useBookstore();

  return {
    inventoryLogs: data?.inventoryLogs ?? [],
    getInventoryLogs,
    addInventoryLog,
    refreshInventoryLogsFromApi,
  };
}

