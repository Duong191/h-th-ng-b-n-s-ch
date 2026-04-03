import { getDb, sql } from "../config/db";
import { AppError } from "../utils/appError";

const getOrCreateCartId = async (userId: number | null, sessionId: string | null): Promise<number> => {
  const pool = await getDb();
  const lookup = await pool
    .request()
    .input("userId", sql.BigInt, userId)
    .input("sessionId", sql.NVarChar(255), sessionId)
    .query(`SELECT TOP 1 id FROM carts WHERE (@userId IS NOT NULL AND user_id=@userId) OR (@sessionId IS NOT NULL AND session_id=@sessionId)`);
  if (lookup.recordset.length) return Number(lookup.recordset[0].id);

  const created = await pool
    .request()
    .input("userId", sql.BigInt, userId)
    .input("sessionId", sql.NVarChar(255), sessionId)
    .query("INSERT INTO carts (user_id, session_id, created_at, updated_at) OUTPUT INSERTED.id VALUES (@userId, @sessionId, GETUTCDATE(), GETUTCDATE())");
  return Number(created.recordset[0].id);
};

export const getCart = async (userId: number | null, sessionId: string | null) => {
  if (!userId && !sessionId) throw new AppError(400, "Missing guest session or token");
  const cartId = await getOrCreateCartId(userId, sessionId);

  const pool = await getDb();
  const rs = await pool
    .request()
    .input("cartId", sql.BigInt, cartId)
    .query(
      `SELECT ci.book_id, b.title, b.price, b.discount, ci.quantity,
              (ci.quantity * (b.price * (1 - b.discount / 100.0))) AS line_total
       FROM cart_items ci
       JOIN books b ON b.id=ci.book_id
       WHERE ci.cart_id=@cartId AND b.is_deleted=0`
    );

  return rs.recordset;
};

export const upsertCart = async (userId: number | null, sessionId: string | null, items: { bookId: number; quantity: number }[]) => {
  if (!userId && !sessionId) throw new AppError(400, "Missing guest session or token");
  const cartId = await getOrCreateCartId(userId, sessionId);
  const pool = await getDb();
  const tx = new sql.Transaction(pool);
  await tx.begin();

  try {
    await new sql.Request(tx)
      .input("cartId", sql.BigInt, cartId)
      .query("DELETE FROM cart_items WHERE cart_id=@cartId");

    for (const item of items) {
      const stock = await new sql.Request(tx)
        .input("bookId", sql.BigInt, item.bookId)
        .query("SELECT TOP 1 stock FROM books WHERE id=@bookId AND is_deleted=0 AND is_active=1");
      if (!stock.recordset.length) throw new AppError(404, `Book ${item.bookId} not found`);
      if (item.quantity > Number(stock.recordset[0].stock)) throw new AppError(400, `Book ${item.bookId} out of stock`);

      await new sql.Request(tx)
        .input("cartId", sql.BigInt, cartId)
        .input("bookId", sql.BigInt, item.bookId)
        .input("quantity", sql.Int, item.quantity)
        .query(
          `MERGE cart_items AS target
           USING (SELECT @cartId AS cart_id, @bookId AS book_id) AS source
           ON target.cart_id=source.cart_id AND target.book_id=source.book_id
           WHEN MATCHED THEN UPDATE SET quantity=@quantity
           WHEN NOT MATCHED THEN INSERT (cart_id, book_id, quantity, added_at) VALUES (@cartId, @bookId, @quantity, GETUTCDATE());`
        );
    }
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw error;
  }

  return getCart(userId, sessionId);
};
