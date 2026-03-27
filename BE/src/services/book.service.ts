import { getDb, sql } from "../config/db";
import { parsePagination } from "../utils/pagination";
import { AppError } from "../utils/appError";

const normalizeOptionalText = (value: unknown): string | null => {
  if (value == null) return null;
  const text = String(value).trim();
  return text.length ? text : null;
};

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

export const getBookById = async (id: number) => {
  const pool = await getDb();
  const rs = await pool.request().input("id", sql.BigInt, id).query(
    `SELECT
      b.*,
      c.name AS category_name,
      b.review_count AS reviewCount,
      b.sold_count AS soldCount
     FROM books b
     JOIN categories c ON c.id = b.category_id
     WHERE b.id=@id AND b.is_deleted=0`
  );
  if (!rs.recordset.length) throw new AppError(404, "Book not found");
  return rs.recordset[0];
};

export const createBook = async (payload: Record<string, unknown>) => {
  const pool = await getDb();
  const isbn = normalizeOptionalText(payload.isbn);
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
    .query(
      `INSERT INTO books (isbn, title, author, publisher, publish_date, category_id, description, price, import_price, discount, stock, is_active, is_deleted, created_at, updated_at)
       OUTPUT INSERTED.id
       VALUES (@isbn, @title, @author, @publisher, @publishDate, @categoryId, @description, @price, @importPrice, @discount, @stock, 1, 0, GETUTCDATE(), GETUTCDATE())`
    );
  return getBookById(Number(rs.recordset[0].id));
};

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
  return getBookById(id);
};

export const deleteBook = async (id: number) => {
  const pool = await getDb();
  await pool.request().input("id", sql.BigInt, id).query("UPDATE books SET is_deleted=1, deleted_at=GETUTCDATE() WHERE id=@id");
};
