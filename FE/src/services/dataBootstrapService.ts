import { getBooks, getCategories, getDetailedCategories } from '../api/publicApi';
import { getBlogs } from '../api/blogsApi';
import type { Blog, Book, BookstoreData, Category, DetailedCategory } from '../context/BookstoreContext';

export async function bootstrapFromBackend(): Promise<BookstoreData | null> {
  try {
    const [books, categories, detailedCategories, blogs] = await Promise.all([
      getBooks<Book>(),
      getCategories<Category>(),
      getDetailedCategories<DetailedCategory>(),
      getBlogs().catch(() => []),
    ]);

    return {
      users: [],
      books,
      categories,
      detailedCategories,
      orders: [],
      blogs: (blogs || []) as Blog[],
      reviews: [],
      cart: [],
      inventoryLogs: [],
    };
  } catch {
    return null;
  }
}
