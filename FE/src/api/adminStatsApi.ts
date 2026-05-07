import { httpRequest } from './httpClient';

export async function getAdminStatsRequest(token: string): Promise<{ totalUsers: number }> {
  return httpRequest<{ totalUsers: number }>('/admin/stats', { token });
}
