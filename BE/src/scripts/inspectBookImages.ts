/** File này kiểm tra nhanh tình trạng ảnh sách đang lưu trong DB. */
import { closeDb, getDb } from "../config/db";

const main = async (): Promise<void> => {
  const pool = await getDb();
  const total = await pool.request().query("SELECT COUNT(*) AS total FROM books");
  console.log("Total books:", total.recordset[0]?.total);

  const legacy = await pool.request().query(`
    SELECT TOP 30 b.id, b.title, b.author,
           (SELECT TOP 1 image_url FROM book_images bi WHERE bi.book_id = b.id ORDER BY display_order) AS image_url
    FROM books b
    ORDER BY b.id ASC;
  `);
  console.log("First 30 books:");
  console.table(legacy.recordset);

  const broken = await pool.request().query(`
    SELECT b.id, b.title, bi.image_url
    FROM books b
    LEFT JOIN book_images bi ON bi.book_id = b.id
    WHERE bi.image_url IS NULL
       OR bi.image_url LIKE '/images/books/%'
       OR bi.image_url LIKE '/img/dac-nhan-tam.jpg'
       OR bi.image_url LIKE '/img/clean-code.jpg'
       OR bi.image_url LIKE '/img/sapiens.jpg'
       OR bi.image_url LIKE '/img/nguyen-ly-marketing.jpg'
       OR bi.image_url LIKE '/img/ielts-16.jpg'
       OR bi.image_url LIKE '/img/doraemon-1.jpg'
       OR bi.image_url LIKE '/img/luoc-su-thoi-gian.jpg'
       OR bi.image_url LIKE '/img/tu-duy-nhanh-cham.jpg'
       OR bi.image_url LIKE '/img/conan-50.jpg';
  `);
  console.log("Broken-style image rows:", broken.recordset.length);
  if (broken.recordset.length) console.table(broken.recordset);

  await closeDb();
};

void main().catch(async (err) => {
  console.error(err);
  await closeDb();
  process.exit(1);
});
