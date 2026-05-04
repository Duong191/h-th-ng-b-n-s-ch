import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { discountedUnitPrice } from '../utils/format';
import {
  fetchCurrentUser,
  loginRequest,
  logoutRequest,
  registerRequest,
  updateProfileRequest,
} from '../api/authApi';
import {
  confirmOrderReceivedRequest,
  createOrderRequest,
  getOrders,
  updateOrderStatusRequest,
} from '../api/ordersApi';
import { createBookRequest, deleteBookRequest, updateBookRequest } from '../api/adminBooksApi';
import { createBlogRequest, deleteBlogRequest, updateBlogRequest } from '../api/blogsApi';
import { createInventoryLogRequest, getInventoryLogsRequest } from '../api/inventoryApi';
import { getCartRequest, updateCartRequest } from '../api/cartApi';
import { getBooks } from '../api/publicApi';
import { bootstrapFromBackend } from '../services/dataBootstrapService';

const ACCESS_TOKEN_KEY = 'bookstoreAccessToken';
const REFRESH_TOKEN_KEY = 'bookstoreRefreshToken';
function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/** Gộp các dòng trùng bookId (ví dụ gọi addToCart nhiều lần trước khi React kịp cập nhật state). */
function mergeCartLineItems(cart: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of cart) {
    const k = String(item.bookId);
    const prev = map.get(k);
    if (prev) {
      prev.quantity += item.quantity;
    } else {
      map.set(k, { ...item });
    }
  }
  return Array.from(map.values());
}

// ============ TYPE DEFINITIONS ============

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  birthday: {
    day: string;
    month: string;
    year: string;
  };
  role: 'user' | 'admin' | 'staff';
  /** RBAC: từ API login / users/me khi backend trả về */
  roles?: string[];
  permissions?: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  importPrice?: number;
  discount: number;
  stock: number;
  categoryId: string;
  description: string;
  image: string;
  isbn?: string;
  publisher?: string;
  publishDate?: string;
  pages?: number;
  language?: string;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  viewCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface DetailedCategory {
  id: string;
  name: string;
  subCategories: {
    name: string;
    link: string;
  }[];
  viewAllLink: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  addedAt: string;
}

export interface CartItemWithDetails extends CartItem {
  book: Book;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    bookId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  bookId: string;
  type: 'import' | 'export';
  quantity: number;
  importPrice?: number;
  note: string;
  userId: string;
  createdAt: string;
}

export interface BookstoreData {
  users: User[];
  books: Book[];
  categories: Category[];
  detailedCategories: DetailedCategory[];
  orders: Order[];
  blogs: Blog[];
  reviews: Review[];
  cart?: CartItem[];
  inventoryLogs?: InventoryLog[];
}

export interface Session {
  userId: string;
  loginTime: string;
  expiresAt: string;
}

export interface Toast {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface BookstoreContextValue {
  data: BookstoreData | null;
  loading: boolean;
  session: Session | null;
  currentUser: User | null;
  toast: Toast | null;
  showToast: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void;
  cartItemCount: number;
  getBookById: (id: string) => Book | undefined;
  getCart: () => CartItem[];
  getCartItems: () => CartItemWithDetails[];
  saveCart: (cart: CartItem[]) => void;
  addToCart: (bookId: string, quantity?: number) => boolean;
  updateCartItem: (bookId: string, quantity: number) => boolean;
  removeFromCart: (bookId: string) => boolean;
  clearCartStorage: () => void;
  login: (email: string, password: string) => boolean | Promise<boolean>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => { success: boolean; userId?: string } | Promise<{ success: boolean; userId?: string }>;
  updateUserProfile: (userId: string, userData: Partial<User>) => User | null | Promise<User | null>;
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order | Promise<Order>;
  updateOrder: (orderId: string, patch: Partial<Order>) => Order | null | Promise<Order | null>;
  /** Khách xác nhận đã nhận hàng → hoàn thành (chỉ khi đang giao). */
  confirmOrderReceived: (orderId: string) => Order | null | Promise<Order | null>;
  /** Đồng bộ danh sách sách từ server (tồn kho sau đơn hàng / nhập kho). */
  refreshBooksFromApi: () => Promise<void>;
  /** Gộp dòng giỏ trùng sách (sửa dữ liệu cũ). */
  dedupeCartLines: () => void;
  addBook: (bookData: Omit<Book, 'id' | 'createdAt'>) => Book | Promise<Book>;
  updateBook: (bookId: string, bookData: Partial<Book>) => Book | null | Promise<Book | null>;
  deleteBook: (bookId: string) => boolean | Promise<boolean>;
  addBlog: (blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => Blog | Promise<Blog>;
  updateBlog: (blogId: string, blogData: Partial<Blog>) => Blog | null | Promise<Blog | null>;
  deleteBlog: (blogId: string) => boolean | Promise<boolean>;
  getUserById: (id: string) => User | undefined;
  persist: (nextOrFn: BookstoreData | ((prev: BookstoreData) => BookstoreData)) => void;
  addInventoryLog: (
    bookId: string,
    type: 'import' | 'export',
    quantity: number,
    note: string,
    importPrice?: number
  ) => void | Promise<void>;
  getInventoryLogs: () => InventoryLog[];
}

// ============ CONTEXT SETUP ============

const DATA_KEY = 'bookstoreData';
const SESSION_KEY = 'bookstoreSession';

/** Xóa blob demo cũ; catalog chỉ lấy từ API (không persist `bookstoreData`). */
function clearLegacyStoredCatalog(): void {
  try {
    localStorage.removeItem(DATA_KEY);
  } catch {
    /* ignore */
  }
}

const BookstoreContext = createContext<BookstoreContextValue | null>(null);

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: Session = JSON.parse(raw);
    if (new Date() > new Date(session.expiresAt)) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function writeSession(session: Session | null): void {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function loadCatalogFromApi(): Promise<BookstoreData> {
  clearLegacyStoredCatalog();
  const bootstrapped = await bootstrapFromBackend();
  if (bootstrapped) return bootstrapped;

  return {
    users: [],
    books: [],
    categories: [],
    detailedCategories: [],
    orders: [],
    blogs: [],
    reviews: [],
    cart: [],
    inventoryLogs: [],
  };
}

// ============ PROVIDER COMPONENT ============

export function BookstoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BookstoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(() => readSession());
  const [toast, setToast] = useState<Toast | null>(null);

  const persist = useCallback((nextOrFn: BookstoreData | ((prev: BookstoreData) => BookstoreData)) => {
    setData((prev) => {
      const base: BookstoreData = prev || {
        users: [],
        books: [],
        categories: [],
        detailedCategories: [],
        orders: [],
        blogs: [],
        reviews: [],
        cart: [],
      };
      const next = typeof nextOrFn === 'function' ? nextOrFn(base) : nextOrFn;
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        console.log('[Init] Loading data...');
        const d = await loadCatalogFromApi();
        console.log('[Init] Data loaded. Users:', d.users?.length, 'Books:', d.books?.length);
        if (!cancelled) setData(d);
      } catch (e) {
        console.error('[Init] Error loading data:', e);
        if (!cancelled) {
          setData({
            users: [],
            books: [],
            categories: [],
            detailedCategories: [],
            orders: [],
            blogs: [],
            reviews: [],
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const token = getAccessToken();
    if (!token || !session?.userId) return;

    let cancelled = false;
    (async () => {
      try {
        const [user, orders, inventoryLogs, cartItems] = await Promise.all([
          fetchCurrentUser(token).catch(() => null),
          getOrders(token).catch(() => []),
          getInventoryLogsRequest(token).catch(() => []),
          getCartRequest({ token }).catch(() => []),
        ]);
        if (cancelled) return;
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            users: user ? [user] : prev.users,
            orders,
            inventoryLogs,
            cart: cartItems.map((item) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              addedAt: item.addedAt,
            })),
          };
        });
      } catch {
        /* session or network error — keep catalog */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loading, session?.userId]);

  const showToast = useCallback((message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const currentUser = useMemo(() => {
    if (!data || !session?.userId) {
      console.log('[CurrentUser] No data or session');
      return null;
    }
    const user = data.users?.find((u) => String(u.id) === String(session.userId)) || null;
    console.log('[CurrentUser] Session userId:', session.userId, 'Found user:', user ? user.email : null);
    return user;
  }, [data, session]);

  const getBookById = useCallback(
    (id: string) => data?.books?.find((b) => b && String(b.id) === String(id)),
    [data]
  );

  const getCart = useCallback((): CartItem[] => {
    return data?.cart || [];
  }, [data]);

  const saveCart = useCallback(
    (cart: CartItem[]) => {
      persist((prev) => ({ ...prev, cart }));
    },
    [persist]
  );

  const getCartItems = useCallback((): CartItemWithDetails[] => {
    const cart = mergeCartLineItems(getCart());
    return cart
      .map((item) => {
        const book = getBookById(item.bookId);
        if (!book) return null;
        const price = discountedUnitPrice(book);
        return {
          ...item,
          book,
          price,
          total: price * item.quantity,
        };
      })
      .filter((item): item is CartItemWithDetails => item !== null);
  }, [getCart, getBookById]);

  const cartItemCount = useMemo(
    () => getCartItems().reduce((s, i) => s + i.quantity, 0),
    [getCartItems]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { accessToken, refreshToken, user } = await loginRequest(email, password);
        const [orders, inventoryLogs, cartItems] = await Promise.all([
          getOrders(accessToken).catch(() => []),
          getInventoryLogsRequest(accessToken).catch(() => []),
          getCartRequest({ token: accessToken }).catch(() => []),
        ]);
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        const s: Session = {
          userId: user.id,
          loginTime: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };
        writeSession(s);
        setSession(s);
        setData((prev) => ({
          ...(prev || {
            users: [],
            books: [],
            categories: [],
            detailedCategories: [],
            orders: [],
            blogs: [],
            reviews: [],
          }),
          users: [user],
          orders,
          inventoryLogs,
          cart: cartItems.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            addedAt: item.addedAt,
          })),
        }));
        showToast('Đăng nhập thành công', 'success');
        return true;
      } catch {
        showToast('Email hoặc mật khẩu không đúng', 'error');
        return false;
      }
    },
    [showToast]
  );

  const logout = useCallback(() => {
    const rt = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (rt) {
      logoutRequest(rt).catch(() => {});
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    writeSession(null);
    setSession(null);
    setData((prev) =>
      prev
        ? {
            ...prev,
            users: [],
            orders: [],
            inventoryLogs: [],
            cart: [],
          }
        : prev
    );
    showToast('Đã đăng xuất', 'success');
  }, [showToast]);

  const register = useCallback(
    async (name: string, email: string, password: string, phone: string = '') => {
      try {
        const parts = name.trim().split(/\s+/);
        const firstName = parts[0] || 'User';
        const lastName = parts.slice(1).join(' ') || 'User';
        const { accessToken, refreshToken, user } = await registerRequest({ firstName, lastName, email, password, phone });
        const [orders, inventoryLogs, cartItems] = await Promise.all([
          getOrders(accessToken).catch(() => []),
          getInventoryLogsRequest(accessToken).catch(() => []),
          getCartRequest({ token: accessToken }).catch(() => []),
        ]);
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        const s: Session = {
          userId: user.id,
          loginTime: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };
        writeSession(s);
        setSession(s);
        setData((prev) => ({
          ...(prev || {
            users: [],
            books: [],
            categories: [],
            detailedCategories: [],
            orders: [],
            blogs: [],
            reviews: [],
          }),
          users: [user],
          orders,
          inventoryLogs,
          cart: cartItems.map((item) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            addedAt: item.addedAt,
          })),
        }));
        showToast('Đăng ký thành công', 'success');
        return { success: true, userId: user.id };
      } catch {
        showToast('Không đăng ký được (email có thể đã tồn tại)', 'error');
        return { success: false, userId: '' };
      }
    },
    [showToast]
  );

  const updateUserProfile = useCallback(
    async (_userId: string, userData: Partial<User>): Promise<User | null> => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) return null;
      try {
        const patch: Record<string, unknown> = {};
        if (userData.firstName !== undefined) patch.firstName = userData.firstName;
        if (userData.lastName !== undefined) patch.lastName = userData.lastName;
        if (userData.phone !== undefined) patch.phone = userData.phone;
        if (userData.gender !== undefined) patch.gender = userData.gender;
        if (userData.avatar !== undefined) patch.avatar = userData.avatar;
        if (userData.address) {
          patch.address = {
            street: userData.address.street,
            city: userData.address.city,
            state: userData.address.state,
            zipCode: userData.address.zipCode,
            country: userData.address.country,
          };
        }
        const updated = await updateProfileRequest(token, patch);
        setData((prev) => ({
          ...(prev!),
          users: [updated],
        }));
        return updated;
      } catch {
        return null;
      }
    },
    []
  );

  const addToCart = useCallback(
    (bookId: string, quantity: number = 1) => {
      const book = getBookById(bookId);
      if (!book) {
        showToast('Không tìm thấy sách', 'error');
        return false;
      }
      if (book.stock < quantity) {
        showToast(`Chỉ còn ${book.stock} cuốn trong kho`, 'error');
        return false;
      }
      const cart = getCart();
      const existing = cart.find((i) => String(i.bookId) === String(bookId));
      if (existing) {
        existing.quantity += quantity;
        if (existing.quantity > book.stock) {
          existing.quantity = book.stock;
          showToast(`Đã cập nhật số lượng tối đa là ${book.stock}`, 'warning');
        }
      } else {
        cart.push({
          bookId,
          quantity,
          addedAt: new Date().toISOString(),
        });
      }
      saveCart(cart);
      showToast('Đã thêm vào giỏ hàng', 'success');
      return true;
    },
    [getBookById, getCart, saveCart, showToast]
  );

  const updateCartItem = useCallback(
    (bookId: string, quantity: number) => {
      const cart = getCart();
      const item = cart.find((i) => String(i.bookId) === String(bookId));
      if (!item) return false;
      if (quantity <= 0) {
        const next = cart.filter((i) => String(i.bookId) !== String(bookId));
        saveCart(next);
        return true;
      }
      const book = getBookById(bookId);
      if (!book) return false;
      if (quantity > book.stock) {
        showToast(`Chỉ còn ${book.stock} cuốn trong kho`, 'error');
        return false;
      }
      item.quantity = quantity;
      saveCart(cart);
      return true;
    },
    [getBookById, getCart, saveCart, showToast]
  );

  const removeFromCart = useCallback(
    (bookId: string) => {
      const cart = getCart().filter((i) => String(i.bookId) !== String(bookId));
      saveCart(cart);
      return true;
    },
    [getCart, saveCart]
  );

  const clearCartStorage = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const refreshBooksFromApi = useCallback(async () => {
    try {
      const books = await getBooks<Book>('page=1&limit=500');
      persist((prev) => (prev ? { ...prev, books } : prev));
    } catch {
      /* ignore */
    }
  }, [persist]);

  const dedupeCartLines = useCallback(() => {
    persist((prev) => {
      if (!prev?.cart?.length) return prev;
      return { ...prev, cart: mergeCartLineItems(prev.cart) };
    });
  }, [persist]);

  const addOrder = useCallback(
    async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
      const token = getAccessToken();
      if (!token) {
        throw new Error('Bạn cần đăng nhập để đặt hàng');
      }
      const itemsPayload = orderData.items.map((i) => ({
        bookId: Number(i.bookId),
        quantity: i.quantity
      }));
      if (itemsPayload.length === 0) {
        throw new Error('Giỏ hàng trống');
      }
      await updateCartRequest({ items: itemsPayload }, { token });

      const addr = orderData.shippingAddress;
      const email = addr.email?.trim();
      const created = await createOrderRequest(
        token,
        {
          paymentMethod: orderData.paymentMethod,
          shippingName: addr.name,
          shippingPhone: addr.phone,
          ...(email ? { shippingEmail: email } : {}),
          shippingAddress: addr.street,
          shippingCity: addr.city,
          ...(addr.state?.trim() ? { shippingState: addr.state.trim() } : {}),
          ...(addr.zipCode?.trim() ? { shippingZipcode: addr.zipCode.trim() } : {}),
          ...(addr.country?.trim() ? { shippingCountry: addr.country.trim() } : {}),
        },
        orderData
      );
      persist((prev) => ({
        ...prev,
        orders: [created, ...(prev.orders || [])],
      }));
      await refreshBooksFromApi();
      return created;
    },
    [persist, refreshBooksFromApi]
  );

  const updateOrder = useCallback(
    async (orderId: string, patch: Partial<Order>): Promise<Order | null> => {
      if (!patch.status) {
        return null;
      }
      const token = getAccessToken();
      if (!token) return null;
      try {
        await updateOrderStatusRequest(token, orderId, patch.status);
        let merged: Order | null = null;
        persist((prev) => {
          const existing = (prev.orders || []).find((o) => String(o.id) === String(orderId));
          if (!existing) return prev;
          merged = {
            ...existing,
            ...patch,
            updatedAt: new Date().toISOString()
          } as Order;
          return {
            ...prev,
            orders: (prev.orders || []).map((o) => (String(o.id) === String(orderId) ? merged! : o))
          };
        });
        return merged;
      } catch {
        return null;
      }
    },
    [persist]
  );

  const confirmOrderReceived = useCallback(
    async (orderId: string): Promise<Order | null> => {
      const token = getAccessToken();
      if (!token) return null;
      try {
        await confirmOrderReceivedRequest(token, orderId);
        let merged: Order | null = null;
        persist((prev) => {
          const existing = (prev.orders || []).find((o) => String(o.id) === String(orderId));
          if (!existing) return prev;
          merged = {
            ...existing,
            status: 'completed',
            updatedAt: new Date().toISOString(),
          } as Order;
          return {
            ...prev,
            orders: (prev.orders || []).map((o) => (String(o.id) === String(orderId) ? merged! : o)),
          };
        });
        return merged;
      } catch {
        return null;
      }
    },
    [persist]
  );

  const addBook = useCallback(
    async (bookData: Omit<Book, 'id' | 'createdAt'>): Promise<Book> => {
      const token = getAccessToken();
      if (!token) throw new Error('Unauthorized');
      const payload = bookData as unknown as Record<string, unknown>;
      const categoryRaw = payload.categoryId ?? payload.category;
      const categoryId = Number(categoryRaw);
      const isbnRaw = payload.isbn;
      const isbn = isbnRaw == null ? undefined : String(isbnRaw).trim() || undefined;
      const publishRaw = payload.publishDate ?? payload.publishYear;
      const publishDate =
        publishRaw == null || publishRaw === ''
          ? undefined
          : String(publishRaw).match(/^\d{4}$/)
            ? `${publishRaw}-01-01`
            : String(publishRaw);
      const imagesArr = Array.isArray(payload.images)
        ? (payload.images as unknown[]).map((x) => String(x)).filter(Boolean)
        : [];
      const created = await createBookRequest(token, {
        title: payload.title,
        author: payload.author,
        price: Number(payload.price),
        discount: payload.discount,
        stock: Number(payload.stock),
        categoryId,
        description: payload.description,
        ...(imagesArr.length ? { image: imagesArr[0] } : {}),
        ...(imagesArr.length ? { images: imagesArr } : {}),
        isbn,
        publisher: payload.publisher,
        publishDate,
        pages: payload.pages,
        language: payload.language,
        featured: payload.featured,
        bestseller: payload.bestseller ?? payload.bestSeller,
        trending: payload.trending,
        isNew: payload.isNew,
      });
      persist((prev) => ({
        ...prev,
        books: [created, ...(prev.books || [])].filter(Boolean),
      }));
      return created;
    },
    [persist]
  );

  const updateBook = useCallback(
    async (bookId: string, bookData: Partial<Book>): Promise<Book | null> => {
      const token = getAccessToken();
      if (!token) return null;
      const payload = bookData as unknown as Record<string, unknown>;
      const categoryRaw = payload.categoryId ?? payload.category;
      const categoryId = categoryRaw == null || categoryRaw === '' ? undefined : Number(categoryRaw);
      const isbnRaw = payload.isbn;
      const isbn = isbnRaw == null ? undefined : String(isbnRaw).trim() || undefined;
      const publishRaw = payload.publishDate ?? payload.publishYear;
      const publishDate =
        publishRaw == null || publishRaw === ''
          ? undefined
          : String(publishRaw).match(/^\d{4}$/)
            ? `${publishRaw}-01-01`
            : String(publishRaw);
      try {
        const imagesPayload = Array.isArray(payload.images)
          ? (payload.images as unknown[]).map((x) => String(x)).filter(Boolean)
          : undefined;
        const updated = await updateBookRequest(token, bookId, {
          title: payload.title,
          author: payload.author,
          price: payload.price == null || payload.price === '' ? undefined : Number(payload.price),
          discount: payload.discount,
          stock: payload.stock == null || payload.stock === '' ? undefined : Number(payload.stock),
          categoryId,
          description: payload.description,
          ...(payload.image != null && payload.image !== ''
            ? { image: payload.image }
            : imagesPayload?.length
              ? { image: imagesPayload[0] }
              : {}),
          ...(imagesPayload !== undefined ? { images: imagesPayload } : {}),
          isbn,
          publisher: payload.publisher,
          publishDate,
          pages: payload.pages,
          language: payload.language,
          featured: payload.featured,
          bestseller: payload.bestseller ?? payload.bestSeller,
          trending: payload.trending,
          isNew: payload.isNew,
        });
        const imagesFromPayload = Array.isArray(payload.images)
          ? (payload.images as unknown[]).map((x) => String(x)).filter(Boolean)
          : undefined;
        const tagsFromPayload = Array.isArray(payload.tags)
          ? (payload.tags as unknown[]).map((x) => String(x)).filter(Boolean)
          : undefined;
        persist((prev) => ({
          ...prev,
          books: (prev.books || [])
            .map((b) => {
              if (!b || String(b.id) !== String(bookId)) return b;
              const prevBook = b as unknown as Record<string, unknown>;
              const updatedBook = updated as unknown as Record<string, unknown>;
              const merged = {
                ...prevBook,
                ...updatedBook,
                reviewCount:
                  (updatedBook.reviewCount as number | undefined) ??
                  (updatedBook.review_count as number | undefined) ??
                  (prevBook.reviewCount as number | undefined) ??
                  (prevBook.review_count as number | undefined) ??
                  0,
                soldCount:
                  (updatedBook.soldCount as number | undefined) ??
                  (updatedBook.sold_count as number | undefined) ??
                  (prevBook.soldCount as number | undefined) ??
                  (prevBook.sold_count as number | undefined) ??
                  0,
                reviews:
                  (updatedBook.reviews as number | undefined) ??
                  (updatedBook.reviewCount as number | undefined) ??
                  (updatedBook.review_count as number | undefined) ??
                  (prevBook.reviews as number | undefined) ??
                  (prevBook.reviewCount as number | undefined) ??
                  (prevBook.review_count as number | undefined) ??
                  0,
                salesCount:
                  (updatedBook.salesCount as number | undefined) ??
                  (updatedBook.soldCount as number | undefined) ??
                  (updatedBook.sold_count as number | undefined) ??
                  (prevBook.salesCount as number | undefined) ??
                  (prevBook.soldCount as number | undefined) ??
                  (prevBook.sold_count as number | undefined) ??
                  0,
                image: (updatedBook.image as string | undefined) || (prevBook.image as string | undefined),
                images:
                  imagesFromPayload ||
                  (Array.isArray(updatedBook.images) ? (updatedBook.images as unknown[]) : undefined) ||
                  (Array.isArray(prevBook.images) ? (prevBook.images as unknown[]) : undefined),
                tags:
                  tagsFromPayload ||
                  (Array.isArray(updatedBook.tags) ? (updatedBook.tags as unknown[]) : undefined) ||
                  (Array.isArray(prevBook.tags) ? (prevBook.tags as unknown[]) : undefined),
                bestSeller:
                  (updatedBook.bestSeller as boolean | undefined) ??
                  (updatedBook.bestseller as boolean | undefined) ??
                  (prevBook.bestSeller as boolean | undefined) ??
                  (prevBook.bestseller as boolean | undefined) ??
                  false,
              };
              return merged as unknown as Book;
            })
            .filter(Boolean),
        }));
        return updated;
      } catch {
        return null;
      }
    },
    [persist]
  );

  const deleteBook = useCallback(
    async (bookId: string): Promise<boolean> => {
      const token = getAccessToken();
      if (!token) return false;
      try {
        await deleteBookRequest(token, bookId);
        persist((prev) => ({
          ...prev,
          books: (prev.books || []).filter((b) => b && String(b.id) !== String(bookId)),
        }));
        return true;
      } catch {
        return false;
      }
    },
    [persist]
  );

  const addBlog = useCallback(
    async (blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<Blog> => {
      const token = getAccessToken();
      if (!token) throw new Error('Unauthorized');
      const created = await createBlogRequest(token, {
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content,
        author: blogData.author,
        image: blogData.image,
        category: blogData.category,
      });
      persist((prev) => ({
        ...prev,
        blogs: [created, ...(prev.blogs || [])],
      }));
      return created;
    },
    [persist]
  );

  const updateBlog = useCallback(
    async (blogId: string, blogData: Partial<Blog>): Promise<Blog | null> => {
      const token = getAccessToken();
      if (!token) return null;
      try {
        const updated = await updateBlogRequest(token, blogId, {
          title: blogData.title,
          excerpt: blogData.excerpt,
          content: blogData.content,
          author: blogData.author,
          image: blogData.image,
          category: blogData.category,
        });
        persist((prev) => ({
          ...prev,
          blogs: (prev.blogs || []).map((b) => (String(b.id) === String(blogId) ? updated : b)),
        }));
        return updated;
      } catch {
        return null;
      }
    },
    [persist]
  );

  const deleteBlog = useCallback(
    async (blogId: string): Promise<boolean> => {
      const token = getAccessToken();
      if (!token) return false;
      try {
        await deleteBlogRequest(token, blogId);
        persist((prev) => ({
          ...prev,
          blogs: (prev.blogs || []).filter((b) => String(b.id) !== String(blogId)),
        }));
        return true;
      } catch {
        return false;
      }
    },
    [persist]
  );

  const getUserById = useCallback(
    (id: string) => data?.users?.find((u) => String(u.id) === String(id)),
    [data]
  );

  const addInventoryLog = useCallback(
    async (bookId: string, type: 'import' | 'export', quantity: number, note: string, importPrice?: number) => {
      const token = getAccessToken();
      if (!token) return;
      const log: InventoryLog = {
        id: Date.now().toString(),
        bookId,
        type,
        quantity,
        importPrice,
        note,
        userId: currentUser?.id || 'system',
        createdAt: new Date().toISOString(),
      };

      await createInventoryLogRequest(token, {
        bookId,
        transactionType: type,
        quantity: type === 'export' ? -Math.abs(quantity) : Math.abs(quantity),
        importPrice,
        note,
      });

      persist((prev) => {
        const logs = [log, ...(prev.inventoryLogs || [])];
        const books = [...(prev.books || [])];
        const bookIdx = books.findIndex((b) => String(b.id) === String(bookId));

        if (bookIdx !== -1) {
          const newStock = type === 'import'
            ? books[bookIdx].stock + quantity
            : Math.max(0, books[bookIdx].stock - quantity);
          books[bookIdx] = {
            ...books[bookIdx],
            stock: newStock,
            importPrice:
              type === 'import' && importPrice != null && importPrice > 0
                ? importPrice
                : books[bookIdx].importPrice,
          };
        }

        return { ...prev, books, inventoryLogs: logs };
      });

      showToast(
        type === 'import'
          ? `Đã nhập ${quantity} sản phẩm vào kho`
          : `Đã xuất ${quantity} sản phẩm`,
        'success'
      );
      await refreshBooksFromApi();
    },
    [persist, currentUser, showToast, refreshBooksFromApi]
  );

  const getInventoryLogs = useCallback(() => {
    return (data?.inventoryLogs || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);


  const value: BookstoreContextValue = useMemo(
    () => ({
      data,
      loading,
      session,
      currentUser,
      toast,
      showToast,
      cartItemCount,
      getBookById,
      getCart,
      getCartItems,
      saveCart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCartStorage,
      login,
      logout,
      register,
      updateUserProfile,
      addOrder,
      updateOrder,
      confirmOrderReceived,
      refreshBooksFromApi,
      dedupeCartLines,
      addBook,
      updateBook,
      deleteBook,
      addBlog,
      updateBlog,
      deleteBlog,
      getUserById,
      persist,
      addInventoryLog,
      getInventoryLogs,
    }),
    [
      data,
      loading,
      session,
      currentUser,
      toast,
      showToast,
      cartItemCount,
      getBookById,
      getCart,
      getCartItems,
      saveCart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCartStorage,
      login,
      logout,
      register,
      updateUserProfile,
      addOrder,
      updateOrder,
      confirmOrderReceived,
      refreshBooksFromApi,
      dedupeCartLines,
      addBook,
      updateBook,
      deleteBook,
      addBlog,
      updateBlog,
      deleteBlog,
      getUserById,
      persist,
      addInventoryLog,
      getInventoryLogs,
    ]
  );

  return (
    <BookstoreContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`toast ${toast.type}`} style={{ display: 'block' }}>
          {toast.message}
        </div>
      )}
    </BookstoreContext.Provider>
  );
}

export function useBookstore(): BookstoreContextValue {
  const ctx = useContext(BookstoreContext);
  if (!ctx) throw new Error('useBookstore must be used inside BookstoreProvider');
  return ctx;
}
