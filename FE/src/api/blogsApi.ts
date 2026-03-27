import { httpRequest } from './httpClient';
import type { Blog } from '../context/BookstoreContext';

interface BlogsResponse {
  items: Blog[];
}

interface BlogResponse {
  item: Blog;
}

export async function getBlogs(): Promise<Blog[]> {
  const data = await httpRequest<BlogsResponse>('/blogs');
  return data.items || [];
}

export async function createBlogRequest(token: string, payload: Record<string, unknown>): Promise<Blog> {
  const data = await httpRequest<BlogResponse>('/blogs', {
    method: 'POST',
    token,
    body: JSON.stringify(payload)
  });
  return data.item;
}

export async function updateBlogRequest(token: string, blogId: string, payload: Record<string, unknown>): Promise<Blog> {
  const data = await httpRequest<BlogResponse>(`/blogs/${blogId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload)
  });
  return data.item;
}

export async function deleteBlogRequest(token: string, blogId: string): Promise<void> {
  await httpRequest(`/blogs/${blogId}`, {
    method: 'DELETE',
    token
  });
}
