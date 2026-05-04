/** File này chạy các script SQL để nạp lại dữ liệu sách/ảnh đã khôi phục. */
/**
 * Áp dụng seed khôi phục sách + ảnh:
 *   1. fix-existing-book-images.sql  (sửa ảnh cho 10 sách hiện có + 86 sách recovered)
 *   2. seed-recovered-books.sql      (insert ~86 sách + ảnh + tags)
 *
 * Chạy:
 *   cd BE
 *   npx ts-node-dev --transpile-only src/scripts/applyRecoveredSeed.ts
 */
import * as fs from "fs";
import * as path from "path";
import { closeDb, getDb } from "../config/db";

const ROOT = path.resolve(__dirname, "..", "..", "..");
const FILES = [
  path.join(ROOT, "fix-existing-book-images.sql"),
  path.join(ROOT, "seed-recovered-books.sql")
];

const splitBatches = (sql: string): string[] => {
  return sql
    .split(/^\s*GO\s*;?\s*$/im)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

const applyFile = async (filePath: string): Promise<void> => {
  if (!fs.existsSync(filePath)) {
    console.warn(`[applyRecoveredSeed] Skip missing file: ${filePath}`);
    return;
  }
  const sqlText = fs.readFileSync(filePath, "utf8");
  const batches = splitBatches(sqlText);
  const pool = await getDb();
  console.log(`[applyRecoveredSeed] Applying ${path.basename(filePath)} (${batches.length} batch(es))`);
  for (const batch of batches) {
    try {
      await pool.request().batch(batch);
    } catch (err) {
      console.error(`[applyRecoveredSeed] Batch failed in ${path.basename(filePath)}:`, err);
      throw err;
    }
  }
};

const verify = async (): Promise<void> => {
  const pool = await getDb();
  const totalRows = await pool.request().query("SELECT COUNT(*) AS total FROM books");
  const imageRows = await pool
    .request()
    .query(
      "SELECT TOP 5 b.title, bi.image_url FROM books b LEFT JOIN book_images bi ON bi.book_id = b.id ORDER BY b.id DESC"
    );
  console.log(`[applyRecoveredSeed] Total books in DB: ${totalRows.recordset[0]?.total}`);
  console.log("[applyRecoveredSeed] Sample latest books + images:");
  console.table(imageRows.recordset);
};

const main = async (): Promise<void> => {
  try {
    for (const file of FILES) {
      await applyFile(file);
    }
    await verify();
    console.log("[applyRecoveredSeed] DONE");
    await closeDb();
    process.exit(0);
  } catch (err) {
    console.error("[applyRecoveredSeed] FAILED", err);
    await closeDb();
    process.exit(1);
  }
};

void main();
