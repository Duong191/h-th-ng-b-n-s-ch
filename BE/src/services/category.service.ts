import { getDb } from "../config/db";

export const listCategories = async () => {
  const pool = await getDb();
  const rs = await pool.request().query("SELECT id, name, slug, icon FROM categories WHERE is_active=1 ORDER BY display_order");
  return rs.recordset;
};

export const listCategoriesDetailed = async () => {
  const pool = await getDb();
  const rs = await pool.request().query("SELECT * FROM v_category_performance ORDER BY total_sold DESC");
  return rs.recordset;
};
