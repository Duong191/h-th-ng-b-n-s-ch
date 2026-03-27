import { httpRequest } from './httpClient';
import type { Book } from '../context/BookstoreContext';

type ListResponse<T> = T[] | { items?: T[]; data?: T[] };

function unwrapList<T>(payload: ListResponse<T>): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
}

type RawBook = Record<string, unknown>;

function mapBook(raw: RawBook): Book & {
  featured?: boolean;
  bestseller?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
  isNew?: boolean;
  reviews?: number;
  salesCount?: number;
  images?: string[];
  originalPrice?: number;
} {
  const price = Number(raw.price ?? 0);
  const discount = Number(raw.discount ?? 0);
  const image = String(raw.image_url ?? raw.image ?? '');
  const soldCount = Number(raw.sold_count ?? raw.soldCount ?? 0);
  const reviewCount = Number(raw.review_count ?? raw.reviewCount ?? 0);

  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    author: String(raw.author ?? ''),
    price,
    importPrice: raw.import_price != null ? Number(raw.import_price) : undefined,
    discount,
    stock: Number(raw.stock ?? 0),
    categoryId: String(raw.category_id ?? raw.categoryId ?? ''),
    description: String(raw.description ?? ''),
    image,
    isbn: raw.isbn != null ? String(raw.isbn) : undefined,
    publisher: raw.publisher != null ? String(raw.publisher) : undefined,
    publishDate: raw.publish_date != null ? String(raw.publish_date) : undefined,
    pages: raw.pages != null ? Number(raw.pages) : undefined,
    language: raw.language != null ? String(raw.language) : undefined,
    rating: raw.rating != null ? Number(raw.rating) : undefined,
    reviewCount,
    soldCount,
    viewCount: raw.view_count != null ? Number(raw.view_count) : undefined,
    createdAt: raw.created_at ? String(raw.created_at) : new Date().toISOString(),
    updatedAt: raw.updated_at ? String(raw.updated_at) : undefined,
    featured: Boolean(raw.featured),
    bestseller: Boolean(raw.bestseller),
    bestSeller: Boolean(raw.bestseller),
    trending: Boolean(raw.trending),
    isNew: Boolean(raw.is_new ?? raw.isNew),
    reviews: reviewCount,
    salesCount: soldCount,
    images: image ? [image] : [],
    originalPrice: discount > 0 ? Math.round(price / (1 - discount / 100)) : undefined
  };
}

export async function getHealthStatus(): Promise<{ status: string; service: string }> {
  return httpRequest('/health');
}

export async function getBooks<TBook>(params = 'page=1&limit=100'): Promise<TBook[]> {
  const data = await httpRequest<ListResponse<RawBook>>(`/books?${params}`);
  return unwrapList(data).map((b) => mapBook(b) as unknown as TBook);
}

export async function getCategories<TCategory>(): Promise<TCategory[]> {
  const data = await httpRequest<ListResponse<TCategory>>('/categories');
  return unwrapList(data);
}

export async function getDetailedCategories<TDetailedCategory>(): Promise<TDetailedCategory[]> {
  const data = await httpRequest<ListResponse<TDetailedCategory>>('/categories/detailed');
  return unwrapList(data);
}
