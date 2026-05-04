/** File này xử lý nghiệp vụ sách: tìm kiếm, chi tiết và CRUD dữ liệu. */
/**
 * Service quản lý sách (admin + public).
 *
 * Vai trò chính:
 * - Truy vấn danh sách / chi tiết sách kèm ảnh đại diện (lấy từ bảng `book_images`).
 * - CRUD sách: insert vào `books`, đồng thời đồng bộ ảnh vào `book_images`.
 * - Soft delete: đánh dấu `is_deleted = 1`, KHÔNG xóa vật lý để giữ tham chiếu đơn hàng.
 *
 * Lưu ý:
 * - Mọi truy vấn dùng parameterized query (chống SQL injection).
 * - Ảnh hiển thị ngoài UI được join từ `book_images`, không phải cột trên bảng `books`.
 *   Nên khi sửa sách phải ghi cả 2 nơi đúng cách (xem `replaceBookImages`).
 */
import { getDb, sql } from "../config/db";
import { parsePagination } from "../utils/pagination";
import { AppError } from "../utils/appError";

// Chuẩn hóa text optional: trả null nếu rỗng/whitespace để DB nhận NULL đúng nghĩa
const normalizeOptionalText = (value: unknown): string | null => {
  if (value == null) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

/** Khớp cột `book_images.image_url` NVARCHAR(500) — cắt để tránh lỗi insert. */
const IMAGE_URL_MAX = 500;

/** Lấy danh sách URL từ body admin: `images[]` hoặc `image` đơn. */
function extractImageUrlsFromPayload(payload: Record<string, unknown>): string[] {
  const rawArr = payload.images;
  if (Array.isArray(rawArr) && rawArr.length > 0) {
    const urls = rawArr
      .map((x) => String(x ?? "").trim())
      .filter(Boolean)
      .map((u) => (u.length > IMAGE_URL_MAX ? u.slice(0, IMAGE_URL_MAX) : u));
    return [...new Set(urls)];
  }
  const single = payload.image;
  if (single != null && String(single).trim()) {
    const u = String(single).trim();
    return [u.length > IMAGE_URL_MAX ? u.slice(0, IMAGE_URL_MAX) : u];
  }
  return [];
}

/** Xóa và ghi lại ảnh sách (ảnh hiển thị lấy từ `book_images`, không phải cột trên `books`). */
export async function replaceBookImages(bookId: number, urls: string[]): Promise<void> {
  const pool = await getDb();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    await new sql.Request(tx).input("bookId", sql.BigInt, bookId).query("DELETE FROM book_images WHERE book_id=@bookId");
    let order = 1;
    for (const imageUrl of urls) {
      await new sql.Request(tx)
        .input("bookId", sql.BigInt, bookId)
        .input("imageUrl", sql.NVarChar(500), imageUrl)
        .input("isPrimary", sql.Bit, order === 1 ? 1 : 0)
        .input("displayOrder", sql.Int, order)
        .query(
          `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
           VALUES (@bookId, @imageUrl, @isPrimary, @displayOrder, GETUTCDATE())`
        );
      order += 1;
    }
    await tx.commit();
  } catch (err) {
    await tx.rollback();
    throw err;
  }
}

/**
 * Liệt kê sách cho storefront/admin với phân trang + tìm kiếm + lọc theo danh mục.
 * Trả về `{ data, meta }` trong đó `meta.total` lấy từ COUNT(*) cùng filter.
 */
export const listBooks = async (query: Record<string, unknown>) => {
  const { page, limit, offset } = parsePagination(query);
  const search = String(query.search ?? "").trim();
  const categoryId = query.categoryId ? Number(query.categoryId) : null;

  const pool = await getDb();
  const rs = await pool
    .request()
    .input("search", sql.NVarChar(255), search ? `%${search}%` : null)
    .input("categoryId", sql.BigInt, categoryId)
    .input("limit", sql.Int, limit)
    .input("offset", sql.Int, offset)
    .query(
      `SELECT
         b.id,
         b.title,
         b.author,
         b.description,
         b.price,
         b.import_price,
         b.discount,
         b.stock,
         b.rating,
         b.review_count,
         b.sold_count,
         b.language,
         b.category_id,
         b.featured,
         b.bestseller,
         b.trending,
         b.is_new,
         b.publish_date,
         b.created_at,
         c.name AS category_name,
         (
           SELECT TOP 1 bi.image_url
           FROM book_images bi
           WHERE bi.book_id = b.id
           ORDER BY bi.is_primary DESC, bi.display_order ASC, bi.id ASC
         ) AS image_url
       FROM books b
       JOIN categories c ON c.id = b.category_id
       WHERE b.is_deleted=0 AND b.is_active=1
       AND (@search IS NULL OR b.title LIKE @search OR b.author LIKE @search)
       AND (@categoryId IS NULL OR b.category_id = @categoryId)
       ORDER BY b.created_at DESC
       OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;

       SELECT COUNT(*) AS total
       FROM books b
       WHERE b.is_deleted=0 AND b.is_active=1
       AND (@search IS NULL OR b.title LIKE @search OR b.author LIKE @search)
       AND (@categoryId IS NULL OR b.category_id = @categoryId);`
    );

  const recordsets = rs.recordsets as unknown as Array<Array<Record<string, unknown>>>;
  return {
    data: recordsets[0],
    meta: { page, limit, total: Number(recordsets[1][0].total) }
  };
};

/**
 * Lấy chi tiết một sách theo id. Ảnh đại diện cũng lấy từ `book_images`
 * (ưu tiên ảnh `is_primary`, sau đó theo `display_order`).
 * Ném 404 nếu không tồn tại / đã soft-delete.
 */
export const getBookById = async (id: number) => {
  const pool = await getDb();
  const rs = await pool.request().input("id", sql.BigInt, id).query(
    `SELECT
      b.*,
      c.name AS category_name,
      (
        SELECT TOP 1 bi.image_url
        FROM book_images bi
        WHERE bi.book_id = b.id
        ORDER BY bi.is_primary DESC, bi.display_order ASC, bi.id ASC
      ) AS image_url,
      b.review_count AS reviewCount,
      b.sold_count AS soldCount
     FROM books b
     JOIN categories c ON c.id = b.category_id
     WHERE b.id=@id AND b.is_deleted=0`
  );
  if (!rs.recordset.length) throw new AppError(404, "Book not found");
  return rs.recordset[0];
};

/**
 * Tạo mới một cuốn sách + đồng bộ ảnh sang `book_images`.
 * Mặc định: nếu client không gửi `isNew` thì sách mới luôn lên kệ "Sách Mới".
 */
export const createBook = async (payload: Record<string, unknown>) => {
  const pool = await getDb();
  const isbn = normalizeOptionalText(payload.isbn);
  const featured = payload.featured == null ? false : Boolean(payload.featured);
  const bestseller = payload.bestseller == null ? false : Boolean(payload.bestseller);
  const trending = payload.trending == null ? false : Boolean(payload.trending);
  /** Mặc định sách tạo mới = “sách mới” trên kệ nếu client không gửi rõ. */
  const isNew = payload.isNew == null ? true : Boolean(payload.isNew);
  const rs = await pool
    .request()
    .input("isbn", sql.NVarChar(20), isbn)
    .input("title", sql.NVarChar(255), String(payload.title))
    .input("author", sql.NVarChar(255), String(payload.author))
    .input("publisher", sql.NVarChar(255), payload.publisher ?? null)
    .input("publishDate", sql.Date, payload.publishDate ?? null)
    .input("categoryId", sql.BigInt, Number(payload.categoryId))
    .input("description", sql.NVarChar(sql.MAX), payload.description ?? null)
    .input("price", sql.Decimal(18, 2), Number(payload.price))
    .input("importPrice", sql.Decimal(18, 2), payload.importPrice != null ? Number(payload.importPrice) : null)
    .input("discount", sql.Decimal(5, 2), payload.discount != null ? Number(payload.discount) : 0)
    .input("stock", sql.Int, Number(payload.stock ?? 0))
    .input("featured", sql.Bit, featured ? 1 : 0)
    .input("bestseller", sql.Bit, bestseller ? 1 : 0)
    .input("trending", sql.Bit, trending ? 1 : 0)
    .input("isNew", sql.Bit, isNew ? 1 : 0)
    .query(
      `INSERT INTO books (
         isbn, title, author, publisher, publish_date, category_id, description, price, import_price, discount, stock,
         featured, bestseller, trending, is_new,
         is_active, is_deleted, created_at, updated_at
       )
       OUTPUT INSERTED.id
       VALUES (
         @isbn, @title, @author, @publisher, @publishDate, @categoryId, @description, @price, @importPrice, @discount, @stock,
         @featured, @bestseller, @trending, @isNew,
         1, 0, GETUTCDATE(), GETUTCDATE()
       )`
    );
  const newId = Number(rs.recordset[0].id);
  const imageUrls = extractImageUrlsFromPayload(payload);
  if (imageUrls.length > 0) {
    await replaceBookImages(newId, imageUrls);
  }
  return getBookById(newId);
};

/**
 * Cập nhật sách theo id. Mọi cột dùng `COALESCE(@param, col)` nên
 * client chỉ cần gửi field cần đổi, các field khác để `null/undefined` là giữ nguyên.
 *
 * Ảnh sách: chỉ ghi đè khi client GỬI `images` (mảng) — gửi mảng rỗng nghĩa là xóa hết ảnh.
 * Không gửi `images` thì giữ ảnh cũ trong `book_images`.
 */
export const updateBook = async (id: number, payload: Record<string, unknown>) => {
  const pool = await getDb();
  const isbn = normalizeOptionalText(payload.isbn);
  await pool
    .request()
    .input("id", sql.BigInt, id)
    .input("isbn", sql.NVarChar(20), isbn)
    .input("title", sql.NVarChar(255), payload.title ?? null)
    .input("author", sql.NVarChar(255), payload.author ?? null)
    .input("publisher", sql.NVarChar(255), payload.publisher ?? null)
    .input("publishDate", sql.Date, payload.publishDate ?? null)
    .input("categoryId", sql.BigInt, payload.categoryId ? Number(payload.categoryId) : null)
    .input("price", sql.Decimal(18, 2), payload.price != null && payload.price !== "" ? Number(payload.price) : null)
    .input("discount", sql.Decimal(5, 2), payload.discount != null ? Number(payload.discount) : null)
    .input("stock", sql.Int, payload.stock != null && payload.stock !== "" ? Number(payload.stock) : null)
    .input("featured", sql.Bit, payload.featured == null ? null : (payload.featured ? 1 : 0))
    .input("bestseller", sql.Bit, payload.bestseller == null ? null : (payload.bestseller ? 1 : 0))
    .input("trending", sql.Bit, payload.trending == null ? null : (payload.trending ? 1 : 0))
    .input("isNew", sql.Bit, payload.isNew == null ? null : (payload.isNew ? 1 : 0))
    .input("description", sql.NVarChar(sql.MAX), payload.description ?? null)
    .query(
      `UPDATE books SET
       isbn = COALESCE(@isbn, isbn),
       title = COALESCE(@title, title),
       author = COALESCE(@author, author),
       publisher = COALESCE(@publisher, publisher),
       publish_date = COALESCE(@publishDate, publish_date),
       category_id = COALESCE(@categoryId, category_id),
       price = COALESCE(@price, price),
       discount = COALESCE(@discount, discount),
       stock = COALESCE(@stock, stock)
       ,featured = COALESCE(@featured, featured)
       ,bestseller = COALESCE(@bestseller, bestseller)
       ,trending = COALESCE(@trending, trending)
       ,is_new = COALESCE(@isNew, is_new)
       ,description = COALESCE(@description, description)
       WHERE id=@id AND is_deleted=0`
    );
  /** FE gửi `images` (kể cả []) khi submit form — lúc đó ghi DB; không gửi = giữ nguyên ảnh cũ. */
  if (Array.isArray(payload.images)) {
    await replaceBookImages(id, extractImageUrlsFromPayload(payload));
  } else if (payload.image !== undefined && Object.prototype.hasOwnProperty.call(payload, "image")) {
    await replaceBookImages(id, extractImageUrlsFromPayload(payload));
  }
  return getBookById(id);
};

/**
 * Xóa mềm sách: đánh dấu `is_deleted = 1` và giữ lại bản ghi.
 * Tránh xóa vật lý vì đơn hàng cũ có thể đang tham chiếu.
 */
export const deleteBook = async (id: number) => {
  const pool = await getDb();
  await pool.request().input("id", sql.BigInt, id).query("UPDATE books SET is_deleted=1, deleted_at=GETUTCDATE() WHERE id=@id");
};
