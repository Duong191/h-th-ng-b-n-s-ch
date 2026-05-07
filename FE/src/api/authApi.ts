/**
 * File này chứa các hàm gọi API liên quan đến xác thực người dùng.
 * Không xử lý UI, chỉ gửi request auth và trả dữ liệu user/token cho tầng context/page.
 */
import { httpRequest } from './httpClient';
import type { User } from '../types/bookstore.types';

// Kiểu response đăng nhập/đăng ký: bao gồm token và thông tin người dùng.
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  roles: string[];
  permissions: string[];
}

/** Đăng nhập và nhận token + hồ sơ user hiện tại. */
export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  return httpRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/** Đăng ký tài khoản mới, backend trả luôn phiên đăng nhập. */
export async function registerRequest(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<LoginResponse> {
  return httpRequest<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Đăng xuất phiên hiện tại bằng refresh token.
 * Backend sẽ vô hiệu refresh token để ngăn dùng lại.
 */
export async function logoutRequest(refreshToken: string): Promise<void> {
  await httpRequest('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

/** Đặt lại mật khẩu về mặc định "1" khi biết email (không cần đăng nhập). */
export async function resetPasswordByEmailRequest(email: string): Promise<void> {
  await httpRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/** Lấy thông tin người dùng từ access token hiện tại. */
export async function fetchCurrentUser(accessToken: string): Promise<User> {
  // Endpoint hồ sơ người dùng hiện tại (đã xác thực).
  const res = await httpRequest<{ item: User }>('/users/me', { token: accessToken });
  return res.item;
}

/** Cập nhật thông tin hồ sơ (tên, avatar, địa chỉ...). */
export async function updateProfileRequest(accessToken: string, patch: Record<string, unknown>): Promise<User> {
  const res = await httpRequest<{ item: User }>('/users/me', {
    method: 'PATCH',
    token: accessToken,
    body: JSON.stringify(patch),
  });
  return res.item;
}
