import { Book } from '../context/BookstoreContext';

export function filterBooks(books: Book[], category = 'all', priceRange = 'all', rating = 'all'): Book[] {
  let list = [...books];

  if (category !== 'all') {
    list = list.filter((book) => (book as any).category === category || book.categoryId === category);
  }

  if (priceRange !== 'all') {
    const parts = priceRange.split('-').map(Number);
    const min = parts[0];
    const max = parts[1];
    list = list.filter((book) => {
      const discountedPrice =
        book.discount > 0 ? Math.round(book.price * (1 - book.discount / 100)) : book.price;
      return discountedPrice >= min && (max === undefined || discountedPrice <= max);
    });
  }

  if (rating !== 'all') {
    list = list.filter((book) => (book.rating || 0) >= parseFloat(rating));
  }

  return list;
}

export function searchBooks(books: Book[], keyword: string): Book[] {
  if (!keyword.trim()) return books;
  const searchTerm = keyword.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      (book.publisher && book.publisher.toLowerCase().includes(searchTerm)) ||
      (book.description && book.description.toLowerCase().includes(searchTerm))
  );
}

export function sortBooks(books: Book[], sortBy = 'default'): Book[] {
  const sortedBooks = [...books];

  switch (sortBy) {
    case 'name-asc':
      return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return sortedBooks.sort((a, b) => {
        const priceA = a.discount > 0 ? Math.round(a.price * (1 - a.discount / 100)) : a.price;
        const priceB = b.discount > 0 ? Math.round(b.price * (1 - b.discount / 100)) : b.price;
        return priceA - priceB;
      });
    case 'price-desc':
      return sortedBooks.sort((a, b) => {
        const priceA = a.discount > 0 ? Math.round(a.price * (1 - a.discount / 100)) : a.price;
        const priceB = b.discount > 0 ? Math.round(b.price * (1 - b.discount / 100)) : b.price;
        return priceB - priceA;
      });
    case 'rating':
      return sortedBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return sortedBooks.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    case 'oldest':
      return sortedBooks.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      });
    default:
      return sortedBooks;
  }
}

interface BookWithExtras extends Book {
  salesCount?: number;
  trending?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  reviews?: number;
  images?: string[];
}

export function calculateRankingScore(book: BookWithExtras): number {
  const salesScore = (book.salesCount || book.soldCount || 0) * 10;
  const ratingScore = (book.rating || 0) * 100;
  const reviewScore = (book.reviews || book.reviewCount || 0) * 2;
  const trendingBonus = book.trending ? 500 : 0;
  const bestsellerBonus = book.bestSeller ? 300 : 0;
  const newBonus = book.isNew ? 200 : 0;
  return salesScore + ratingScore + reviewScore + trendingBonus + bestsellerBonus + newBonus;
}

export function getBestSellersByCategory(books: BookWithExtras[], categoryId: string): BookWithExtras[] {
  let list = [...books];

  if (categoryId === 'foreign') {
    list = list.filter((book) => book.language && book.language.toLowerCase().includes('english'));
  } else if (categoryId === 'other') {
    const mainCategories = ['1', '2', '3', '4', '5', '6', '7', '8'];
    list = list.filter((book) => !mainCategories.includes((book as any).category || book.categoryId));
  } else if (categoryId !== 'all') {
    list = list.filter((book) => (book as any).category === categoryId || book.categoryId === categoryId);
  }

  return list.sort((a, b) => calculateRankingScore(b) - calculateRankingScore(a));
}

export function getRelatedBooks(books: Book[], bookId: string, limit = 4): Book[] {
  const current = books.find((b) => String(b.id) === String(bookId));
  if (!current) return [];
  const currentCat = (current as any).category || current.categoryId;
  return books
    .filter((b) => {
      const bookCat = (b as any).category || b.categoryId;
      return String(b.id) !== String(bookId) && bookCat === currentCat;
    })
    .slice(0, limit);
}
