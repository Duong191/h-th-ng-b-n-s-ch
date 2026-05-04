import { getBooks, getCategories, getDetailedCategories } from '../api/publicApi';
import { getBlogs } from '../api/blogsApi';
import type { Blog, Book, BookstoreData, Category, DetailedCategory } from '../context/BookstoreContext';

type LocalRecoveredPayload = {
  categories?: Category[];
  detailedCategories?: DetailedCategory[];
  books?: Array<Record<string, unknown>>;
};

function normalizeKey(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (ch) => (ch === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function isBadImagePath(path?: string): boolean {
  const p = String(path || '').trim().toLowerCase();
  if (!p) return true;
  if (p.includes('placehold.co')) return true;
  if (p.startsWith('/images/books/')) return true;
  return false;
}

function buildFallbackDetailedCategories(categories: Category[]): DetailedCategory[] {
  const fallbackSubsBySlug: Record<string, string[]> = {
    'van-hoc': ['Tiểu Thuyết', 'Truyện Ngắn - Tản Văn', 'Light Novel', 'Ngôn Tình'],
    'kinh-te': ['Quản Trị - Lãnh Đạo', 'Marketing - Bán Hàng', 'Phân Tích Kinh Tế', 'Khởi Nghiệp'],
    'khoa-hoc': ['Khoa Học Thường Thức', 'Công Nghệ', 'Tâm Lý Học Ứng Dụng', 'Khám Phá'],
    'lich-su': ['Lịch Sử Việt Nam', 'Lịch Sử Thế Giới', 'Nhân Vật Lịch Sử', 'Tiểu Sử - Hồi Ký'],
    'thieu-nhi': ['Manga - Comic', 'Truyện Thiếu Nhi', 'Kiến Thức Bách Khoa', 'Kỹ Năng Cho Bé'],
    'ngoai-ngu': ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Trung', 'Tiếng Hàn'],
    'tam-ly-hoc': ['Kỹ Năng Sống', 'Phát Triển Bản Thân', 'Giao Tiếp', 'Tư Duy'],
    'tam-ly-ky-nang-song': ['Kỹ Năng Sống', 'Phát Triển Bản Thân', 'Giao Tiếp', 'Tư Duy'],
    'cong-nghe': ['Lập Trình', 'Thiết Kế Phần Mềm', 'Dữ Liệu - AI', 'Quản Lý Dự Án'],
    'cong-nghe-thong-tin': ['Lập Trình', 'Thiết Kế Phần Mềm', 'Dữ Liệu - AI', 'Quản Lý Dự Án'],
  };

  return categories.map((c) => ({
    id: String(c.id),
    name: String(c.name).toUpperCase(),
    subCategories: (fallbackSubsBySlug[String(c.slug || '').toLowerCase()] || ['Sách Mới', 'Nổi Bật', 'Bán Chạy', 'Đề Xuất'])
      .slice(0, 4)
      .map((name) => ({
        name,
        link: `/shop?category=${encodeURIComponent(String(c.id))}&sub=${encodeURIComponent(
          name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, (ch) => (ch === 'đ' ? 'd' : 'D'))
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        )}`,
      })),
    viewAllLink: `/shop?category=${encodeURIComponent(String(c.id))}`,
  }));
}

function mapRecoveredBook(raw: Record<string, unknown>, categories: Category[]): Book & {
  category?: string;
  categoryName?: string;
  tags?: string[];
  images?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
  isNew?: boolean;
  reviews?: number;
  salesCount?: number;
} {
  const price = Number(raw.price ?? 0);
  const stock = Number(raw.stock ?? 0);
  const rawCategory = String(raw.categoryId ?? raw.category ?? '');
  const categoryByName = categories.find(
    (c) => String(c.name).toLowerCase() === rawCategory.toLowerCase()
  );
  const categoryId = categoryByName ? String(categoryByName.id) : rawCategory;
  const images = Array.isArray(raw.images) ? raw.images.map((x) => String(x)) : [];
  const image = images[0] || String(raw.image ?? '');
  const reviewCount = Number(raw.reviewsCount ?? raw.reviewCount ?? raw.reviews ?? 0);
  const soldCount = Number(raw.salesCount ?? raw.soldCount ?? 0);

  return {
    id: String(raw.id ?? raw.isbn ?? raw.title ?? ''),
    title: String(raw.title ?? ''),
    author: String(raw.author ?? ''),
    price,
    discount: Number(raw.discount ?? 0),
    stock,
    categoryId,
    category: categoryId,
    categoryName: raw.category ? String(raw.category) : undefined,
    description: String(raw.description ?? ''),
    image,
    images,
    isbn: raw.isbn ? String(raw.isbn) : undefined,
    publisher: raw.publisher ? String(raw.publisher) : undefined,
    publishDate: raw.publishDate ? String(raw.publishDate) : undefined,
    pages: raw.pages != null ? Number(raw.pages) : undefined,
    language: raw.language ? String(raw.language) : undefined,
    rating: raw.rating != null ? Number(raw.rating) : undefined,
    reviewCount,
    reviews: reviewCount,
    soldCount,
    salesCount: soldCount,
    createdAt: new Date().toISOString(),
    featured: Boolean(raw.featured),
    bestSeller: Boolean(raw.bestSeller),
    trending: Boolean(raw.trending),
    isNew: Boolean(raw.isNew),
    tags: Array.isArray(raw.tags) ? raw.tags.map((x) => String(x)) : [],
  };
}

async function loadRecoveredLocalData(): Promise<{
  books: Book[];
  categories: Category[];
  detailedCategories: DetailedCategory[];
} | null> {
  try {
    const res = await fetch('/seed/recoveredBookstoreBooks.json', { cache: 'no-store' });
    if (!res.ok) return null;
    const payload = (await res.json()) as LocalRecoveredPayload;
    const categories = Array.isArray(payload.categories) ? payload.categories : [];
    const detailedCategories = Array.isArray(payload.detailedCategories)
      ? payload.detailedCategories
      : buildFallbackDetailedCategories(categories);
    const books = Array.isArray(payload.books)
      ? payload.books.map((b) => mapRecoveredBook(b, categories))
      : [];
    if (!books.length) return null;
    return { books, categories, detailedCategories };
  } catch {
    return null;
  }
}

function enrichBooksWithRecoveredImages(apiBooks: Book[], recoveredBooks: Book[]): Book[] {
  const byIsbn = new Map<string, Book>();
  const byTitle = new Map<string, Book>();

  for (const rb of recoveredBooks) {
    if (rb.isbn) byIsbn.set(normalizeKey(String(rb.isbn)), rb);
    byTitle.set(normalizeKey(String(rb.title)), rb);
  }

  return apiBooks.map((book) => {
    const fromIsbn = book.isbn ? byIsbn.get(normalizeKey(String(book.isbn))) : undefined;
    const fromTitle = byTitle.get(normalizeKey(String(book.title)));
    const fallback = fromIsbn || fromTitle;
    if (!fallback) return book;

    const fallbackImages = (fallback as Book & { images?: string[] }).images || [];
    const fallbackImage = fallbackImages[0] || fallback.image;
    if (!fallbackImage) return book;

    const currentImages = (book as Book & { images?: string[] }).images || [];
    const currentImage = currentImages[0] || book.image;
    if (!isBadImagePath(currentImage)) return book;

    return {
      ...(book as Book & { images?: string[] }),
      image: fallbackImage,
      images: fallbackImages.length ? fallbackImages : [fallbackImage],
    };
  });
}

export async function bootstrapFromBackend(): Promise<BookstoreData | null> {
  try {
    const [books, categories, detailedCategories, blogs] = await Promise.all([
      getBooks<Book>(),
      getCategories<Category>(),
      getDetailedCategories<DetailedCategory>(),
      getBlogs().catch(() => []),
    ]);

    const recovered = await loadRecoveredLocalData();

    if (!books.length) {
      if (recovered) {
        return {
          users: [],
          books: recovered.books,
          categories: recovered.categories.length ? recovered.categories : categories,
          detailedCategories:
            recovered.detailedCategories.length > 0
              ? recovered.detailedCategories
              : detailedCategories,
          orders: [],
          blogs: (blogs || []) as Blog[],
          reviews: [],
          cart: [],
          inventoryLogs: [],
        };
      }
    }

    const mergedBooks = recovered ? enrichBooksWithRecoveredImages(books, recovered.books) : books;

    return {
      users: [],
      books: mergedBooks,
      categories,
      detailedCategories,
      orders: [],
      blogs: (blogs || []) as Blog[],
      reviews: [],
      cart: [],
      inventoryLogs: [],
    };
  } catch {
    const recovered = await loadRecoveredLocalData();
    if (!recovered) return null;
    return {
      users: [],
      books: recovered.books,
      categories: recovered.categories,
      detailedCategories: recovered.detailedCategories,
      orders: [],
      blogs: [],
      reviews: [],
      cart: [],
      inventoryLogs: [],
    };
  }
}
