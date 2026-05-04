/** File này đối soát ảnh local và cập nhật image_url cho sách trong DB. */
import fs from "fs";
import path from "path";
import { getDb, sql } from "../config/db";

type ImageItem = {
  relativeUrl: string;
  fileName: string;
  folder: string;
};

const imgRoot = path.resolve(__dirname, "../../../FE/public/img");

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const toTitle = (fileName: string): string => {
  const base = fileName.replace(/\.[^.]+$/, "");
  const cleaned = base
    .replace(/[_-]+/g, " ")
    .replace(/\bcopy\b/gi, "")
    .replace(/\b\d+\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "Untitled Book";
  return cleaned
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
};

const collectImages = (dir: string, prefix = "img", folder = "root"): ImageItem[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: ImageItem[] = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      items.push(...collectImages(abs, `${prefix}/${entry.name}`, entry.name));
      continue;
    }
    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name)) continue;
    const stat = fs.statSync(abs);
    if (stat.size <= 0) continue;
    items.push({
      relativeUrl: `/${prefix}/${entry.name}`,
      fileName: entry.name,
      folder
    });
  }

  return items;
};

const pickCategoryId = (folder: string): number => {
  const f = folder.toLowerCase();
  if (f.includes("tieng_anh") || f.includes("tieng_nhat")) return 6; // Ngoai ngu
  return 1; // Van hoc fallback
};

const run = async (): Promise<void> => {
  const images = collectImages(imgRoot).sort((a, b) => a.relativeUrl.localeCompare(b.relativeUrl));
  if (!images.length) throw new Error("No images found in FE/public/img");

  const pool = await getDb();
  const existingBooks = await pool.request().query("SELECT id,title FROM books WHERE is_deleted=0");
  const existingByNorm = new Map<string, { id: number; title: string }>();
  for (const b of existingBooks.recordset as Array<{ id: number; title: string }>) {
    existingByNorm.set(normalize(b.title), b);
  }

  let insertedCount = 0;
  let linkedCount = 0;
  const insertedTitles: string[] = [];

  for (const img of images) {
    const title = toTitle(img.fileName);
    const key = normalize(title);
    const categoryId = pickCategoryId(img.folder);

    let bookId: number;
    const existed = existingByNorm.get(key);
    if (existed) {
      bookId = existed.id;
    } else {
      const insert = await pool
        .request()
        .input("title", sql.NVarChar(255), title)
        .input("author", sql.NVarChar(255), "Unknown Author")
        .input("categoryId", sql.BigInt, categoryId)
        .input("description", sql.NVarChar(sql.MAX), `Imported from image file: ${img.fileName}`)
        .input("price", sql.Decimal(18, 2), 99000)
        .input("stock", sql.Int, 100)
        .query(
          `INSERT INTO books
             (title, author, category_id, description, price, stock, is_active, is_deleted, created_at, updated_at)
           OUTPUT INSERTED.id
           VALUES
             (@title, @author, @categoryId, @description, @price, @stock, 1, 0, GETUTCDATE(), GETUTCDATE())`
        );
      bookId = Number(insert.recordset[0].id);
      existingByNorm.set(key, { id: bookId, title });
      insertedCount += 1;
      insertedTitles.push(title);
    }

    const hasImage = await pool
      .request()
      .input("bookId", sql.BigInt, bookId)
      .input("url", sql.NVarChar(500), img.relativeUrl)
      .query("SELECT TOP 1 id FROM book_images WHERE book_id=@bookId AND image_url=@url");

    if (!hasImage.recordset.length) {
      const nextOrderRs = await pool
        .request()
        .input("bookId", sql.BigInt, bookId)
        .query("SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order FROM book_images WHERE book_id=@bookId");
      const nextOrder = Number(nextOrderRs.recordset[0].next_order);

      await pool
        .request()
        .input("bookId", sql.BigInt, bookId)
        .input("url", sql.NVarChar(500), img.relativeUrl)
        .input("isPrimary", sql.Bit, nextOrder === 1)
        .input("displayOrder", sql.Int, nextOrder)
        .query(
          `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
           VALUES (@bookId, @url, @isPrimary, @displayOrder, GETUTCDATE())`
        );
      linkedCount += 1;
    }
  }

  const totalBooksRs = await pool.request().query("SELECT COUNT(*) AS total FROM books WHERE is_deleted=0");
  const totalBooks = Number(totalBooksRs.recordset[0].total);

  console.log(`Inserted books: ${insertedCount}`);
  console.log(`Linked images: ${linkedCount}`);
  console.log(`Total books in DB: ${totalBooks}`);
  if (insertedTitles.length) {
    console.log("New books:");
    for (const t of insertedTitles.slice(0, 50)) console.log(`- ${t}`);
  }
};

void run().then(
  () => process.exit(0),
  (error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
);
