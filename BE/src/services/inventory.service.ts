import { getDb, sql } from "../config/db";
import { parsePagination } from "../utils/pagination";

export const listInventory = async (query: Record<string, unknown>) => {
  const { page, limit, offset } = parsePagination(query);
  const search = String(query.search ?? "").trim();
  const pool = await getDb();
  const rs = await pool
    .request()
    .input("search", sql.NVarChar(255), search ? `%${search}%` : null)
    .input("limit", sql.Int, limit)
    .input("offset", sql.Int, offset)
    .query(
      `SELECT * FROM v_inventory_summary
       WHERE @search IS NULL OR title LIKE @search OR author LIKE @search
       ORDER BY total_stock ASC
       OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
       SELECT COUNT(*) AS total FROM v_inventory_summary WHERE @search IS NULL OR title LIKE @search OR author LIKE @search;`
    );

  const recordsets = rs.recordsets as unknown as Array<Array<Record<string, unknown>>>;
  return {
    data: recordsets[0],
    meta: { page, limit, total: Number(recordsets[1][0].total) }
  };
};

export const createInventoryTransaction = async (payload: {
  bookId: number;
  transactionType: string;
  quantity: number;
  importPrice?: number;
  supplierId?: number;
  note?: string;
  createdBy: number;
}) => {
  const pool = await getDb();
  await pool
    .request()
    .input("p_book_id", sql.BigInt, payload.bookId)
    .input("p_transaction_type", sql.NVarChar(20), payload.transactionType)
    .input("p_quantity", sql.Int, payload.quantity)
    .input("p_import_price", sql.Decimal(18, 2), payload.importPrice ?? null)
    .input("p_supplier_id", sql.BigInt, payload.supplierId ?? null)
    .input("p_note", sql.NVarChar(sql.MAX), payload.note ?? null)
    .input("p_created_by", sql.BigInt, payload.createdBy)
    .execute("sp_inventory_transaction");
};
