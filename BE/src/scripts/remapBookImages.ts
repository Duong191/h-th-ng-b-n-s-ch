/** File này remap ảnh từ seed JSON sang bản ghi sách hiện có trong DB. */
import fs from "fs";
import path from "path";
import { getDb, sql } from "../config/db";

type SeedBook = {
  title: string;
  images?: string[];
};

const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const seedPath = path.resolve(__dirname, "../../../FE/public/seed/bookstoreData.json");

const run = async (): Promise<void> => {
  const raw = fs.readFileSync(seedPath, "utf8");
  const seed = JSON.parse(raw) as { books?: SeedBook[] };
  const seedBooks = Array.isArray(seed.books) ? seed.books : [];

  const seedByTitle = new Map<string, SeedBook>();
  for (const book of seedBooks) {
    const key = normalize(book.title || "");
    if (!key || seedByTitle.has(key)) continue;
    seedByTitle.set(key, book);
  }

  const pool = await getDb();
  const booksRs = await pool.request().query("SELECT id, title FROM books WHERE is_deleted=0 ORDER BY id");
  const books = booksRs.recordset as Array<{ id: number; title: string }>;

  const updated: Array<{ id: number; title: string; images: number }> = [];
  const missed: Array<{ id: number; title: string }> = [];

  for (const book of books) {
    const match = seedByTitle.get(normalize(book.title || ""));
    const images = Array.from(
      new Set((match?.images ?? []).map((img) => String(img || "").trim()).filter(Boolean))
    ).map((img) => (img.startsWith("/") ? img : `/${img}`));

    if (!images.length) {
      missed.push({ id: book.id, title: book.title });
      continue;
    }

    const tx = new sql.Transaction(pool);
    await tx.begin();
    try {
      await new sql.Request(tx).input("bookId", sql.BigInt, book.id).query("DELETE FROM book_images WHERE book_id=@bookId");

      let order = 1;
      for (const imageUrl of images) {
        await new sql.Request(tx)
          .input("bookId", sql.BigInt, book.id)
          .input("imageUrl", sql.NVarChar(500), imageUrl)
          .input("isPrimary", sql.Bit, order === 1)
          .input("displayOrder", sql.Int, order)
          .query(
            `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at)
             VALUES (@bookId, @imageUrl, @isPrimary, @displayOrder, GETUTCDATE())`
          );
        order += 1;
      }

      await tx.commit();
      updated.push({ id: book.id, title: book.title, images: images.length });
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  console.log(`Updated: ${updated.length}`);
  for (const row of updated) {
    console.log(`${row.id} | ${row.title} | ${row.images} images`);
  }

  if (missed.length) {
    console.log(`Missed: ${missed.length}`);
    for (const row of missed) {
      console.log(`${row.id} | ${row.title}`);
    }
  }
};

void run().then(
  () => process.exit(0),
  (error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
);
