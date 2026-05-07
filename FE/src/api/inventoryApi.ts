/**
 * File này chứa các hàm gọi API liên quan đến quản lý kho.
 * Không xử lý UI, chỉ gửi request nhập/xuất kho và đọc lịch sử giao dịch tồn kho.
 */
import { httpRequest } from './httpClient';
import type { InventoryLog } from '../types/bookstore.types';

/** Backend: GET /api/admin/inventory/transactions — lịch sử từ bảng `inventory_transactions`. */
interface InventoryTransactionsResponse {
  items?: InventoryLog[];
}

// Endpoint quản lý kho phía admin.
const ADMIN_INVENTORY = '/admin/inventory';

/** Lấy lịch sử nhập/xuất kho (dùng cho trang quản lý kho admin). */
export async function getInventoryLogsRequest(token: string): Promise<InventoryLog[]> {
  const data = await httpRequest<InventoryTransactionsResponse>(`${ADMIN_INVENTORY}/transactions?limit=500`, {
    token,
  });
  return Array.isArray(data.items) ? data.items : [];
}

/** Tạo giao dịch nhập/xuất kho và để backend cập nhật tồn kho. */
export async function createInventoryLogRequest(token: string, payload: Record<string, unknown>): Promise<void> {
  // Chuẩn hóa payload theo định dạng backend yêu cầu.
  const body = {
    bookId: Number(payload.bookId),
    transactionType: payload.transactionType,
    quantity: Number(payload.quantity),
    ...(payload.importPrice != null && payload.importPrice !== ''
      ? { importPrice: Number(payload.importPrice) }
      : {}),
    ...(payload.supplierId != null ? { supplierId: Number(payload.supplierId) } : {}),
    ...(payload.note != null && String(payload.note).trim() !== '' ? { note: String(payload.note) } : {}),
  };

  // Endpoint tạo transaction nhập/xuất kho.
  await httpRequest(ADMIN_INVENTORY, {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  });
}
