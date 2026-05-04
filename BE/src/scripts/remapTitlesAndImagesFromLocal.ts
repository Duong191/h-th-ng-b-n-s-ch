/** File này dò ảnh local để remap lại tiêu đề và ảnh bìa cho sách. */
import fs from "fs";
import path from "path";
import { getDb, sql } from "../config/db";

type LocalImage = {
  relativeUrl: string;
  fileName: string;
};

const imgRoot = path.resolve(__dirname, "../../../FE/public/img");

const toTitle = (fileName: string): string => {
  const base = fileName.replace(/\.[^.]+$/, "");
  const cleaned = base
    .replace(/[_-]+/g, " ")
    .replace(/\bcopy\b/gi, "")
    .replace(/\b\d+\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "Book";
  return cleaned
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
};

const collectImages = (dir: string, prefix = "img"): LocalImage[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: LocalImage[] = [];

  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImages(abs, `${prefix}/${entry.name}`));
      continue;
    }

    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(entry.name)) continue;
    const stat = fs.statSync(abs);
    if (stat.size <= 0) continue;
    files.push({
      relativeUrl: `/${prefix}/${entry.name}`,
      fileName: entry.name
    });
  }

  return files;
};

const run = async (): Promise<void> => {
  const allImages = collectImages(imgRoot).sort((a, b) => a.relativeUrl.localeCompare(b.relativeUrl));
  if (!allImages.length) {
    throw new Error("No valid images found in FE/public/img");
  }

  const pool = await getDb();
  const booksRs = await pool.request().query("SELECT id FROM books WHERE is_deleted=0 ORDER BY id");
  const books = booksRs.recordset as Array<{ id: number }>;
  if (!books.length) throw new Error("No books found in DB");

  let imageIdx = 0;
  const changes: Array<{ id: number; title: string; img1: string; img2: string }> = [];

  for (const book of books) {
    const img1 = allImages[imageIdx % allImages.length];
    const img2 = allImages[(imageIdx + 1) % allImages.length];
    imageIdx += 2;

    const newTitle = toTitle(img1.fileName);

    const tx = new sql.Transaction(pool);
    await tx.begin();
    try {
      await new sql.Request(tx)
        .input("bookId", sql.BigInt, book.id)
        .input("title", sql.NVarChar(255), newTitle)
        .query("UPDATE books SET title=@title WHERE id=@bookId");

      await new sql.Request(tx).input("bookId", sql.BigInt, book.id).query("DELETE FROM book_images WHERE book_id=@bookId");

      await new sql.Request(tx)
        .input("bookId", sql.BigInt, book.id)
        .input("imageUrl", sql.NVarChar(500), img1.relativeUrl)
        .query(
          `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
           VALUES (@bookId, @imageUrl, 1, 1, GETUTCDATE())`
        );

      await new sql.Request(tx)
        .input("bookId", sql.BigInt, book.id)
        .input("imageUrl", sql.NVarChar(500), img2.relativeUrl)
        .query(
          `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
           VALUES (@bookId, @imageUrl, 0, 2, GETUTCDATE())`
        );

      await tx.commit();
      changes.push({ id: book.id, title: newTitle, img1: img1.relativeUrl, img2: img2.relativeUrl });
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  console.log(`Remapped ${changes.length} books`);
  for (const c of changes) {
    console.log(`${c.id} | ${c.title} | ${c.img1} | ${c.img2}`);
  }
};

void run().then(
  () => process.exit(0),
  (error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
);
