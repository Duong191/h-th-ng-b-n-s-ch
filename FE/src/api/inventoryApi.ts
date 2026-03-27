import { httpRequest } from './httpClient';
import type { InventoryLog } from '../context/BookstoreContext';

interface InventoryResponse {
  items: InventoryLog[];
}

export async function getInventoryLogsRequest(token: string): Promise<InventoryLog[]> {
  const data = await httpRequest<InventoryResponse>('/inventory', { token });
  return data.items || [];
}

export async function createInventoryLogRequest(token: string, payload: Record<string, unknown>): Promise<void> {
  await httpRequest('/inventory', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
}
