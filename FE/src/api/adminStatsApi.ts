/**
 * File này chứa các hàm gọi API liên quan đến thống kê dashboard admin.
 * Không xử lý UI, chỉ gửi request tới backend và nhận dữ liệu tổng hợp.
 */
import { httpRequest } from './httpClient';

// Kiểu dữ liệu thống kê cơ bản backend trả về cho trang admin dashboard.
export async function getAdminStatsRequest(token: string): Promise<{ totalUsers: number }> {
  // Endpoint lấy thống kê quản trị (ví dụ: tổng người dùng và các chỉ số mở rộng).
  return httpRequest<{ totalUsers: number }>('/admin/stats', { token });
}
