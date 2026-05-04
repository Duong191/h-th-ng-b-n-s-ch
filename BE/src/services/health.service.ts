/** File này kiểm tra nhanh kết nối DB phục vụ health check. */
import { getDb } from "../config/db";

export const checkDbHealth = async () => {
  const pool = await getDb();
  await pool.request().query("SELECT 1 AS ok");
  return { status: "ok" };
};
