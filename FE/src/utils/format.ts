/** Format tiền VND theo locale Việt Nam. */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

/** Alias giữ tương thích với chỗ cũ dùng tên `formatCurrency`. */
export function formatCurrency(n: number): string {
  return formatPrice(n);
}

/** Format ngày ngắn gọn cho UI danh sách. */
export function formatDate(iso: string | Date): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso) : d.toLocaleDateString('vi-VN');
}

/** Format ngày + giờ cho màn hình quản trị/lịch sử. */
export function formatDateTime(iso: string | Date): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso) : d.toLocaleString('vi-VN');
}

/** Tính đơn giá sau giảm cho 1 cuốn sách. */
export function discountedUnitPrice(book: { price: number; discount?: number }): number {
  if (!book) return 0;
  return book.discount && book.discount > 0
    ? Math.round(book.price * (1 - book.discount / 100))
    : book.price;
}

/** Chuẩn hóa đường dẫn ảnh từ DB/seed về URL hiển thị được ở FE. */
export function fixImagePath(path: string): string {
  const fallback = 'https://placehold.co/400x560?text=No+Image';
  if (!path) return fallback;
  const normalized = String(path).replace(/\\/g, '/').trim();
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) return normalized;
  if (normalized.startsWith('/img/')) return normalized;
  if (normalized.startsWith('img/')) return `/${normalized}`;
  // Legacy DB paths like /images/books/xxx.jpg should resolve to FE public/img.
  if (normalized.startsWith('/images/books/')) return `/img/${normalized.split('/').pop() || ''}`;
  if (normalized.startsWith('images/books/')) return `/img/${normalized.split('/').pop() || ''}`;
  if (normalized.includes('/img/')) return normalized.slice(normalized.lastIndexOf('/img/'));

  const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
  const apiOrigin = apiBase.replace(/\/api\/?$/, '');

  if (normalized.startsWith('/')) return `${apiOrigin}${normalized}`;
  return `${apiOrigin}/${normalized}`;
}
