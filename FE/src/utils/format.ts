export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export function formatCurrency(n: number): string {
  return formatPrice(n);
}

export function formatDate(iso: string | Date): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso) : d.toLocaleDateString('vi-VN');
}

export function formatDateTime(iso: string | Date): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso) : d.toLocaleString('vi-VN');
}

export function discountedUnitPrice(book: { price: number; discount?: number }): number {
  if (!book) return 0;
  return book.discount && book.discount > 0
    ? Math.round(book.price * (1 - book.discount / 100))
    : book.price;
}

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
