import { getDb, sql } from "../config/db";
import { AppError } from "../utils/appError";
import { parsePagination } from "../utils/pagination";

export const createOrder = async (
  userId: number,
  payload: {
    paymentMethod: string;
    shippingName: string;
    shippingPhone: string;
    shippingEmail?: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState?: string;
    shippingZipcode?: string;
    shippingCountry?: string;
    note?: string;
  }
) => {
  const pool = await getDb();
  const tx = new sql.Transaction(pool);
  await tx.begin();

  try {
    const request = new sql.Request(tx);
    request.input("p_user_id", sql.BigInt, userId);
    request.input("p_payment_method", sql.NVarChar(50), payload.paymentMethod);
    request.input("p_shipping_name", sql.NVarChar(255), payload.shippingName);
    request.input("p_shipping_phone", sql.NVarChar(20), payload.shippingPhone);
    request.input("p_shipping_email", sql.NVarChar(255), payload.shippingEmail ?? null);
    request.input("p_shipping_address", sql.NVarChar(500), payload.shippingAddress);
    request.input("p_shipping_city", sql.NVarChar(100), payload.shippingCity);
    request.input("p_shipping_state", sql.NVarChar(100), payload.shippingState ?? null);
    request.input("p_shipping_zipcode", sql.NVarChar(20), payload.shippingZipcode ?? null);
    request.input("p_shipping_country", sql.NVarChar(100), payload.shippingCountry ?? "Vietnam");
    request.input("p_note", sql.NVarChar(sql.MAX), payload.note ?? null);
    request.output("p_order_id", sql.BigInt);

    const result = await request.execute("sp_create_order");
    await tx.commit();
    return { orderId: Number(result.output.p_order_id) };
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

export const listOrders = async (userId: number, query: Record<string, unknown>) => {
  const { page, limit, offset } = parsePagination(query);
  const pool = await getDb();
  const rs = await pool
    .request()
    .input("userId", sql.BigInt, userId)
    .input("limit", sql.Int, limit)
    .input("offset", sql.Int, offset)
    .query(
      `SELECT * FROM orders
       WHERE user_id=@userId
       ORDER BY created_at DESC
       OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
       SELECT COUNT(*) AS total FROM orders WHERE user_id=@userId;`
    );

  const recordsets = rs.recordsets as unknown as Array<Array<Record<string, unknown>>>;
  return {
    data: recordsets[0],
    meta: { page, limit, total: Number(recordsets[1][0].total) }
  };
};

export const updateOrderStatus = async (orderId: number, newStatus: string, note: string | undefined, changedBy: number) => {
  const allowed = ["pending", "confirmed", "processing", "shipping", "completed", "cancelled"];
  if (!allowed.includes(newStatus)) throw new AppError(400, "Invalid order status");
  const pool = await getDb();
  const tx = new sql.Transaction(pool);
  await tx.begin();
  try {
    await new sql.Request(tx)
      .input("p_order_id", sql.BigInt, orderId)
      .input("p_new_status", sql.NVarChar(20), newStatus)
      .input("p_note", sql.NVarChar(sql.MAX), note ?? null)
      .input("p_changed_by", sql.BigInt, changedBy)
      .execute("sp_update_order_status");
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};
