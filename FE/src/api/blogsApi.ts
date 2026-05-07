/**
 * File này chứa các hàm gọi API liên quan đến blog/bài viết.
 * Không xử lý UI, chỉ gửi request backend và trả về dữ liệu đã parse.
 */
import { httpRequest } from './httpClient';
import type { Blog } from '../types/bookstore.types';

// Response danh sách blog.
interface BlogsResponse {
  items: Blog[];
}

// Response một blog đơn lẻ khi tạo/sửa.
interface BlogResponse {
  item: Blog;
}

/**
 * Lấy danh sách bài viết (public).
 */
export async function getBlogs(): Promise<Blog[]> {
  const data = await httpRequest<BlogsResponse>('/blogs');
  return data.items || [];
}

/**
 * Tạo bài viết mới (luồng admin/staff).
 * Yêu cầu token xác thực.
 */
export async function createBlogRequest(token: string, payload: Record<string, unknown>): Promise<Blog> {
  const data = await httpRequest<BlogResponse>('/blogs', {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
  return data.item;
}

/**
 * Cập nhật bài viết theo `blogId` (luồng admin/staff).
 * Yêu cầu token xác thực.
 */
export async function updateBlogRequest(token: string, blogId: string, payload: Record<string, unknown>): Promise<Blog> {
  const data = await httpRequest<BlogResponse>(`/blogs/${blogId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
  return data.item;
}

/**
 * Xóa bài viết theo `blogId` (luồng admin/staff).
 * Yêu cầu token xác thực.
 */
export async function deleteBlogRequest(token: string, blogId: string): Promise<void> {
  await httpRequest(`/blogs/${blogId}`, {
    method: 'DELETE',
    token,
  });
}
