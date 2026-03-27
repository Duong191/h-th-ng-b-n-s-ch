import { httpRequest } from './httpClient';
import type { User } from '../context/BookstoreContext';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  return httpRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerRequest(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{ user: User }> {
  return httpRequest<{ user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function logoutRequest(refreshToken: string): Promise<void> {
  await httpRequest('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

export async function fetchCurrentUser(accessToken: string): Promise<User> {
  const res = await httpRequest<{ item: User }>('/users/me', { token: accessToken });
  return res.item;
}

export async function updateProfileRequest(accessToken: string, patch: Record<string, unknown>): Promise<User> {
  const res = await httpRequest<{ item: User }>('/users/me', {
    method: 'PATCH',
    token: accessToken,
    body: JSON.stringify(patch),
  });
  return res.item;
}
