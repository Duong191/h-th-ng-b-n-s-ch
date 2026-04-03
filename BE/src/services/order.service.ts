import { getDb, sql } from "../config/db";
import { AppError } from "../utils/appError";
import { parsePagination } from "../utils/pagination";
import type { AuthUser } from "../types";

function isOrderAdmin(auth: AuthUser): boolean {
  return (
    auth.roles.some((r) => ["admin", "staff"].includes(r)) ||
    auth.permissions.includes("orders.read") ||
    auth.permissions.includes("orders.update")
  );
}

function toIso(d: unknown): string {
  if (d instanceof Date) return d.toISOString();
  if (d == null) return new Date().toISOString();
  return String(d);
}

/** Shape expected by the React app (Bookstore Order type). */
export function mapOrderToApi(orderRow: Record<string, unknown>, itemsRows: Record<string, unknown>[]) {
  const items = itemsRows.map((i) => {
    const qty = Number(i.quantity);
    const totalPrice = Number(i.total_price);
    const unit = qty > 0 ? totalPrice / qty : Number(i.unit_price);
    return {
      bookId: String(i.book_id),
      quantity: qty,
      price: unit
    };
  });

  return {
    id: String(orderRow.id),
    userId: String(orderRow.user_id),
    items,
    total: Number(orderRow.final_amount ?? orderRow.total_amount),
    status: String(orderRow.status),
    shippingAddress: {
      name: String(orderRow.shipping_name ?? ""),
      phone: String(orderRow.shipping_phone ?? ""),
      email: orderRow.shipping_email != null ? String(orderRow.shipping_email) : "",
      street: String(orderRow.shipping_address ?? ""),
      city: String(orderRow.shipping_city ?? ""),
      state: orderRow.shipping_state != null ? String(orderRow.shipping_state) : "",
      zipCode: orderRow.shipping_zipcode != null ? String(orderRow.shipping_zipcode) : "",
      country: orderRow.shipping_country != null ? String(orderRow.shipping_country) : "Vietnam"
    },
    paymentMethod: String(orderRow.payment_method ?? ""),
    createdAt: toIso(orderRow.created_at),
    updatedAt: toIso(orderRow.updated_at)
  };
}

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
  const request = pool.request();
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
  return { orderId: Number(result.output.p_order_id) };
};

export const listOrders = async (auth: AuthUser, query: Record<string, unknown>) => {
  const { page, limit, offset } = parsePagination(query);
  const pool = await getDb();
  const admin = isOrderAdmin(auth);

  let orderRows: Record<string, unknown>[] = [];
  let total = 0;

  if (admin) {
    const listRs = await pool
      .request()
      .input("limit", sql.Int, limit)
      .input("offset", sql.Int, offset)
      .query(
        `SELECT * FROM orders
         ORDER BY created_at DESC
         OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
      );
    orderRows = listRs.recordset as Record<string, unknown>[];
    const countRs = await pool.request().query(`SELECT COUNT(*) AS total FROM orders`);
    total = Number((countRs.recordset[0] as { total: number }).total);
  } else {
    const listRs = await pool
      .request()
      .input("userId", sql.BigInt, auth.id)
      .input("limit", sql.Int, limit)
      .input("offset", sql.Int, offset)
      .query(
        `SELECT * FROM orders
         WHERE user_id=@userId
         ORDER BY created_at DESC
         OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
      );
    orderRows = listRs.recordset as Record<string, unknown>[];
    const countRs = await pool
      .request()
      .input("userId", sql.BigInt, auth.id)
      .query(`SELECT COUNT(*) AS total FROM orders WHERE user_id=@userId`);
    total = Number((countRs.recordset[0] as { total: number }).total);
  }

  const data: ReturnType<typeof mapOrderToApi>[] = [];
  for (const row of orderRows) {
    const irs = await pool
      .request()
      .input("orderId", sql.BigInt, row.id)
      .query(
        `SELECT book_id, quantity, unit_price, discount, total_price
         FROM order_items WHERE order_id=@orderId ORDER BY id`
      );
    data.push(mapOrderToApi(row, irs.recordset as Record<string, unknown>[]));
  }

  return {
    data,
    meta: { page, limit, total }
  };
};

export const updateOrderStatus = async (orderId: number, newStatus: string, note: string | undefined, changedBy: number) => {
  const allowed = ["pending", "confirmed", "processing", "shipping", "completed", "cancelled"];
  if (!allowed.includes(newStatus)) throw new AppError(400, "Invalid order status");
  const pool = await getDb();
  await pool
    .request()
    .input("p_order_id", sql.BigInt, orderId)
    .input("p_new_status", sql.NVarChar(20), newStatus)
    .input("p_note", sql.NVarChar(sql.MAX), note ?? null)
    .input("p_changed_by", sql.BigInt, changedBy)
    .execute("sp_update_order_status");
};

/** Customer marks order as received: shipping → completed (own orders only). */
export const confirmDeliveryByCustomer = async (userId: number, orderId: number) => {
  const pool = await getDb();
  const rs = await pool
    .request()
    .input("orderId", sql.BigInt, orderId)
    .query(`SELECT TOP 1 user_id, status FROM orders WHERE id=@orderId`);
  if (!rs.recordset.length) throw new AppError(404, "Không tìm thấy đơn hàng");
  const row = rs.recordset[0] as { user_id: unknown; status: string };
  if (Number(row.user_id) !== userId) {
    throw new AppError(403, "Bạn không thể xác nhận đơn hàng này");
  }
  if (row.status !== "shipping") {
    throw new AppError(400, "Chỉ xác nhận được khi đơn đang ở trạng thái đang giao hàng");
  }
  await updateOrderStatus(orderId, "completed", undefined, userId);
};
