import { httpRequest } from './httpClient';
import type { InventoryLog } from '../context/BookstoreContext';

/** Backend: GET /api/admin/inventory — tóm tắt tồn (không phải lịch sử giao dịch). */
interface InventorySummaryResponse {
  data?: unknown[];
  items?: InventoryLog[];
}

const ADMIN_INVENTORY = '/admin/inventory';

export async function getInventoryLogsRequest(token: string): Promise<InventoryLog[]> {
  const data = await httpRequest<InventorySummaryResponse>(ADMIN_INVENTORY, { token });
  return data.items || [];
}

export async function createInventoryLogRequest(token: string, payload: Record<string, unknown>): Promise<void> {
  const body = {
    bookId: Number(payload.bookId),
    transactionType: payload.transactionType,
    quantity: Number(payload.quantity),
    ...(payload.importPrice != null && payload.importPrice !== ''
      ? { importPrice: Number(payload.importPrice) }
      : {}),
    ...(payload.supplierId != null ? { supplierId: Number(payload.supplierId) } : {}),
    ...(payload.note != null && String(payload.note).trim() !== '' ? { note: String(payload.note) } : {})
  };
  await httpRequest(ADMIN_INVENTORY, {
    method: 'POST',
    token,
    body: JSON.stringify(body)
  });
}
