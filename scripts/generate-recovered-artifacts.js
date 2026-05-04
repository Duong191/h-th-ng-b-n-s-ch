const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INPUT = path.join(ROOT, 'recovered-books.json');
const OUT_JSON = path.join(ROOT, 'recovered-books.json');
const OUT_SQL = path.join(ROOT, 'seed-recovered-books.sql');
const OUT_FIX_SQL = path.join(ROOT, 'fix-existing-book-images.sql');
const OUT_REPORT = path.join(ROOT, 'image-mapping-report.md');
const IMAGE_ROOT = path.join(ROOT, 'FE', 'public', 'img');

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (ch) => (ch === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function listAllImages() {
  const out = [];
  if (!fs.existsSync(IMAGE_ROOT)) return out;
  const walk = (dir, rel) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      const relPath = `${rel}/${entry.name}`;
      if (entry.isDirectory()) {
        walk(abs, relPath);
        continue;
      }
      if (!/\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(entry.name)) continue;
      out.push(relPath.replace(/\\/g, '/'));
    }
  };
  walk(IMAGE_ROOT, '/img');
  return out;
}

const ACTUAL_IMAGES = listAllImages();
const ACTUAL_IMAGE_SET = new Set(ACTUAL_IMAGES.map((p) => p.toLowerCase()));
const ACTUAL_IMAGE_BY_NAME = new Map();
for (const p of ACTUAL_IMAGES) {
  const fileName = p.split('/').pop().toLowerCase();
  ACTUAL_IMAGE_BY_NAME.set(fileName, p);
  const baseNorm = normalizeText(fileName.replace(/\.[^.]+$/, ''));
  if (baseNorm) ACTUAL_IMAGE_BY_NAME.set(baseNorm, p);
}

function placeholderUrl(title) {
  const safe = encodeURIComponent(String(title || '').slice(0, 80));
  return `https://placehold.co/400x560?text=${safe}`;
}

function findClosestImage(title) {
  const target = normalizeText(title);
  if (!target) return null;
  const tokens = target.split(' ').filter(Boolean);
  let best = null;
  let bestScore = 0;
  for (const p of ACTUAL_IMAGES) {
    const fileBase = normalizeText(p.split('/').pop().replace(/\.[^.]+$/, ''));
    if (!fileBase) continue;
    if (fileBase === target) return p;
    const fileTokens = fileBase.split(' ').filter(Boolean);
    const matches = tokens.filter((t) => fileBase.includes(t)).length;
    if (!matches) continue;
    const score = matches / Math.max(tokens.length, fileTokens.length);
    if (score > bestScore && score >= 0.6) {
      bestScore = score;
      best = p;
    }
  }
  return best;
}

function resolveImagePath(rawPath, fallbackTitle) {
  const candidate = normalizePath(rawPath);
  if (candidate && ACTUAL_IMAGE_SET.has(candidate.toLowerCase())) return candidate;
  if (candidate) {
    const fileName = candidate.split('/').pop().toLowerCase();
    const matched = ACTUAL_IMAGE_BY_NAME.get(fileName);
    if (matched) return matched;
    const baseNorm = normalizeText(fileName.replace(/\.[^.]+$/, ''));
    if (baseNorm && ACTUAL_IMAGE_BY_NAME.has(baseNorm)) {
      return ACTUAL_IMAGE_BY_NAME.get(baseNorm);
    }
  }
  const closest = findClosestImage(fallbackTitle);
  if (closest) return closest;
  return placeholderUrl(fallbackTitle);
}

function normalizePath(p) {
  const raw = String(p || '').replace(/\\/g, '/').trim();
  if (!raw) return '';
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  const file = raw.split('/').pop() || raw;
  if (raw.startsWith('/img/')) return raw;
  if (raw.startsWith('img/')) return `/${raw}`;
  if (raw.startsWith('/images/books/')) return `/img/${file}`;
  if (raw.startsWith('images/books/')) return `/img/${file}`;
  return raw.startsWith('/') ? raw : `/${raw}`;
}

function sqlN(v) {
  return `N'${String(v || '').replace(/'/g, "''")}'`;
}

function parseCurrentSqlBookCount() {
  const sqlPath = path.join(ROOT, 'BE', 'SQLQuery1.sql');
  if (!fs.existsSync(sqlPath)) return 0;
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const m = sql.match(/USING\s*\(VALUES([\s\S]*?)\)\s*AS source\s*\(/i);
  if (!m) return 0;
  const count = (m[1].match(/\(\s*\d+\s*,\s*'[^']+'/g) || []).length;
  return count < 10 ? 10 : count;
}

function main() {
  const payload = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const srcBooks = Array.isArray(payload.books) ? payload.books : [];
  const sourceStore = path.join(ROOT, 'FE', 'public', 'seed', 'bookstoreData.json');
  const sourceStorePayload = fs.existsSync(sourceStore)
    ? JSON.parse(fs.readFileSync(sourceStore, 'utf8'))
    : { categories: [] };
  const categoryNameToId = new Map(
    (Array.isArray(sourceStorePayload.categories) ? sourceStorePayload.categories : []).map((c) => [
      String(c.name || '').toLowerCase(),
      Number(c.id),
    ])
  );

  const books = srcBooks.map((b) => {
    const declared = Array.isArray(b.images) ? b.images.map(normalizePath).filter(Boolean) : [];
    const titleStr = String(b.title || '');
    const validImages = [];
    for (const candidate of declared) {
      const resolved = resolveImagePath(candidate, titleStr);
      if (resolved && !validImages.includes(resolved)) validImages.push(resolved);
    }
    if (!validImages.length) {
      validImages.push(resolveImagePath('', titleStr));
    }
    const images = validImages;
    const confMap = { high: 'exact', medium: 'fuzzy', unmapped: 'manual_check' };
    const mapping_confidence = confMap[b.mapping?.confidence] || 'manual_check';
    return {
      title: String(b.title || ''),
      author: String(b.author || 'Chưa rõ tác giả'),
      publisher: String(b.publisher || ''),
      isbn: String(b.isbn || ''),
      description: String(b.description || ''),
      price: Number(b.price || 0),
      import_price: null,
      discount: Number(b.discount || 0),
      stock: Number(b.stock || 0),
      category_id: (() => {
        const direct = Number(b.category_id || b.categoryId);
        if (Number.isFinite(direct) && direct > 0) return direct;
        const nameBased = categoryNameToId.get(String(b.category || '').toLowerCase());
        return Number.isFinite(nameBased) && nameBased > 0 ? nameBased : 1;
      })(),
      pages: b.pages == null ? null : Number(b.pages),
      language: String(b.language || 'Tiếng Việt'),
      featured: Boolean(b.featured),
      bestseller: Boolean(b.bestSeller || b.bestseller),
      trending: Boolean(b.trending),
      is_new: Boolean(b.isNew || b.is_new),
      rating: b.rating == null ? null : Number(b.rating),
      review_count: Number(b.reviewsCount || b.review_count || 0),
      sold_count: Number(b.salesCount || b.sold_count || 0),
      view_count: Number(b.view_count || 0),
      images,
      tags: Array.isArray(b.tags) ? b.tags.map((t) => String(t)) : [],
      mapping_confidence,
    };
  });

  // Add manual rows for discovered images that were not mapped to any book.
  const used = new Set(books.flatMap((b) => b.images));
  const unused = Array.isArray(payload.metadata?.unusedImagesList)
    ? payload.metadata.unusedImagesList.map(normalizePath)
    : [];
  for (const img of unused) {
    if (used.has(img)) continue;
    const name = (img.split('/').pop() || '').replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
    books.push({
      title: name || 'Sách chưa xác định',
      author: 'Chưa rõ tác giả',
      publisher: '',
      isbn: '',
      description: '',
      price: 0,
      import_price: null,
      discount: 0,
      stock: 0,
      category_id: 1,
      pages: null,
      language: 'Tiếng Việt',
      featured: false,
      bestseller: false,
      trending: false,
      is_new: false,
      rating: null,
      review_count: 0,
      sold_count: 0,
      view_count: 0,
      images: [img],
      tags: [],
      mapping_confidence: 'manual_check',
    });
  }

  fs.writeFileSync(
    OUT_JSON,
    JSON.stringify({ generated_at: new Date().toISOString(), books }, null, 2),
    'utf8'
  );

  const sql = [];
  sql.push('-- Auto generated recovered seed (per-book, isolated batches separated by GO)');
  sql.push('SET NOCOUNT ON;');
  sql.push('GO');
  sql.push('');
  books.forEach((b) => {
    const safeIsbn = b.isbn && b.isbn.length <= 20 ? b.isbn : '';
    sql.push(`-- ${b.title}`);
    sql.push('BEGIN TRY');
    sql.push('DECLARE @book_id BIGINT = NULL;');
    if (safeIsbn) sql.push(`SELECT TOP 1 @book_id = id FROM books WHERE isbn = ${sqlN(safeIsbn)};`);
    sql.push(
      `IF @book_id IS NULL SELECT TOP 1 @book_id = id FROM books WHERE title = ${sqlN(b.title)} AND author = ${sqlN(
        b.author
      )};`
    );
    sql.push('IF @book_id IS NULL');
    sql.push('BEGIN');
    sql.push(
      `  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)`
    );
    sql.push(
      `  VALUES (${safeIsbn ? sqlN(safeIsbn) : 'NULL'}, ${sqlN(b.title)}, ${sqlN(b.author)}, ${sqlN(
        b.publisher
      )}, ${b.category_id}, ${sqlN(b.description)}, ${b.price}, NULL, ${b.discount}, ${b.stock}, ${
        b.pages == null ? 'NULL' : b.pages
      }, ${sqlN(b.language)}, ${b.featured ? 1 : 0}, ${b.bestseller ? 1 : 0}, ${b.trending ? 1 : 0}, ${
        b.is_new ? 1 : 0
      }, ${b.rating == null ? 'NULL' : b.rating}, ${b.review_count}, ${b.sold_count}, ${b.view_count}, 1, 0, GETUTCDATE(), GETUTCDATE());`
    );
    sql.push('  SET @book_id = SCOPE_IDENTITY();');
    sql.push('END');
    sql.push('IF @book_id IS NOT NULL');
    sql.push('BEGIN');
    sql.push('  DELETE FROM book_images WHERE book_id = @book_id;');
    sql.push('  DELETE FROM book_tags WHERE book_id = @book_id;');
    b.images.forEach((img, idx) => {
      sql.push(
        `  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, ${sqlN(
          img
        )}, ${idx === 0 ? 1 : 0}, ${idx + 1}, GETUTCDATE());`
      );
    });
    b.tags.forEach((tag) => {
      sql.push(
        `  INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, ${sqlN(tag)}, GETUTCDATE());`
      );
    });
    sql.push('END');
    sql.push('END TRY');
    sql.push('BEGIN CATCH');
    sql.push(
      `  PRINT N'Skipped book "${String(b.title).replace(/'/g, "''")}": ' + ERROR_MESSAGE();`
    );
    sql.push('END CATCH');
    sql.push('GO');
    sql.push('');
  });
  fs.writeFileSync(OUT_SQL, sql.join('\n'), 'utf8');

  const fixSql = [];
  fixSql.push('-- Auto generated: fix broken /img/* image URLs for existing books.');
  fixSql.push('-- Run this FIRST if you only want to fix the existing 10 books images without inserting new ones.');
  fixSql.push('SET NOCOUNT ON;');
  fixSql.push('GO');
  fixSql.push('');
  fixSql.push('-- ===========================================================');
  fixSql.push('-- Section 1: Fix the 10 legacy seed books from BE/SQLQuery1.sql');
  fixSql.push("-- (these have ISBNs different from FE/public/seed/bookstoreData.json)");
  fixSql.push('-- ===========================================================');
  const legacyFixes = [
    { isbn: '978-604-2-25888-8', title: 'Nhà Giả Kim', author: 'Paulo Coelho', image: '/img/nhagiakim.jpg' },
    { isbn: '978-604-2-14725-7', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
    { isbn: '978-604-2-06654-3', title: 'Nguyên Lý Marketing', author: 'Philip Kotler' },
    { isbn: '978-0-13-468599-1', title: 'Lập Trình Sạch (Clean Code)', author: 'Robert C. Martin' },
    { isbn: '978-604-2-17892-3', title: 'Cambridge IELTS 16 Academic', author: 'Cambridge', image: '/img/sach_tieng_anh/bia1-ielts-19aca.jpg' },
    { isbn: '978-604-2-19876-1', title: 'Doraemon Tập 1', author: 'Fujiko F. Fujio' },
    { isbn: '978-604-2-08765-4', title: 'Lược Sử Thời Gian', author: 'Stephen Hawking' },
    { isbn: '978-604-2-11234-5', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari' },
    { isbn: '978-604-2-15678-9', title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman' },
    { isbn: '978-604-2-19999-8', title: 'Conan Tập 50', author: 'Aoyama Gosho', image: '/img/manga-comic/chu-thuat-hoi-chien_ban-thuong_bia_tap-16.jpg' },
  ];
  for (const fix of legacyFixes) {
    const url = fix.image && ACTUAL_IMAGE_SET.has(fix.image.toLowerCase())
      ? fix.image
      : findClosestImage(fix.title) || placeholderUrl(fix.title);
    fixSql.push(`-- ${fix.title}`);
    fixSql.push('BEGIN TRY');
    fixSql.push('DECLARE @bid BIGINT = NULL;');
    fixSql.push(`SELECT TOP 1 @bid = id FROM books WHERE isbn = ${sqlN(fix.isbn)};`);
    fixSql.push(
      `IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = ${sqlN(fix.title)} AND author = ${sqlN(fix.author)};`
    );
    fixSql.push('IF @bid IS NOT NULL');
    fixSql.push('BEGIN');
    fixSql.push('  DELETE FROM book_images WHERE book_id = @bid;');
    fixSql.push(
      `  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, ${sqlN(
        url
      )}, 1, 1, GETUTCDATE());`
    );
    fixSql.push('END');
    fixSql.push('END TRY');
    fixSql.push('BEGIN CATCH');
    fixSql.push(
      `  PRINT N'Fix legacy "${String(fix.title).replace(/'/g, "''")}" failed: ' + ERROR_MESSAGE();`
    );
    fixSql.push('END CATCH');
    fixSql.push('GO');
    fixSql.push('');
  }
  fixSql.push('-- ===========================================================');
  fixSql.push('-- Section 2: Fix images for all recovered books from bookstoreData.json');
  fixSql.push('-- ===========================================================');
  for (const b of books) {
    if (!b.title || !b.images.length) continue;
    const safeIsbn = b.isbn && b.isbn.length <= 20 ? b.isbn : '';
    fixSql.push(`-- ${b.title}`);
    fixSql.push('BEGIN TRY');
    fixSql.push('DECLARE @bid BIGINT = NULL;');
    if (safeIsbn) fixSql.push(`SELECT TOP 1 @bid = id FROM books WHERE isbn = ${sqlN(safeIsbn)};`);
    fixSql.push(
      `IF @bid IS NULL SELECT TOP 1 @bid = id FROM books WHERE title = ${sqlN(b.title)} AND author = ${sqlN(b.author)};`
    );
    fixSql.push('IF @bid IS NOT NULL');
    fixSql.push('BEGIN');
    fixSql.push('  DELETE FROM book_images WHERE book_id = @bid;');
    b.images.forEach((img, idx) => {
      fixSql.push(
        `  INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@bid, ${sqlN(
          img
        )}, ${idx === 0 ? 1 : 0}, ${idx + 1}, GETUTCDATE());`
      );
    });
    fixSql.push('END');
    fixSql.push('END TRY');
    fixSql.push('BEGIN CATCH');
    fixSql.push(
      `  PRINT N'Fix book "${String(b.title).replace(/'/g, "''")}" failed: ' + ERROR_MESSAGE();`
    );
    fixSql.push('END CATCH');
    fixSql.push('GO');
    fixSql.push('');
  }
  fs.writeFileSync(OUT_FIX_SQL, fixSql.join('\n'), 'utf8');

  const exact = books.filter((b) => b.mapping_confidence === 'exact').length;
  const fuzzy = books.filter((b) => b.mapping_confidence === 'fuzzy').length;
  const manual = books.filter((b) => b.mapping_confidence === 'manual_check').length;
  const noImage = books.filter((b) => !b.images.length).map((b) => b.title);
  const dupMap = {};
  for (const b of books) {
    for (const img of b.images) {
      dupMap[img] = dupMap[img] || [];
      dupMap[img].push(b.title);
    }
  }
  const dups = Object.entries(dupMap).filter(([, titles]) => titles.length > 1);
  const totalImages = Number(payload.metadata?.totalImages || Object.keys(dupMap).length + unused.length);

  const report = [];
  report.push('# Image Mapping Report');
  report.push('');
  report.push(`- Tổng số ảnh tìm thấy: **${totalImages}**`);
  report.push(`- Tổng số sách trong SQL hiện tại: **${parseCurrentSqlBookCount()}**`);
  report.push(`- Tổng số sách khôi phục được: **${books.length}**`);
  report.push(`- Sách map ảnh exact: **${exact}**`);
  report.push(`- Sách map ảnh fuzzy: **${fuzzy}**`);
  report.push(`- Sách cần kiểm tra thủ công: **${manual}**`);
  report.push(`- Ảnh chưa được dùng: **${unused.length}**`);
  report.push(`- Ảnh bị dùng trùng: **${dups.length}**`);
  report.push(`- Danh sách các sách còn "No Image": **${noImage.length}**`);
  report.push('');
  report.push('## Toàn bộ ảnh sách tìm thấy');
  const allFound = Array.from(new Set([...Object.keys(dupMap), ...unused])).sort();
  if (!allFound.length) report.push('- Không có');
  else allFound.forEach((img) => report.push(`- ${img}`));
  report.push('');
  report.push('## Ảnh chưa được dùng');
  if (!unused.length) report.push('- Không có');
  else unused.forEach((i) => report.push(`- ${i}`));
  report.push('');
  report.push('## Ảnh bị dùng trùng');
  if (!dups.length) report.push('- Không có');
  else dups.forEach(([img, titles]) => report.push(`- ${img}: ${titles.join(' | ')}`));
  report.push('');
  report.push('## Danh sách các sách còn No Image');
  if (!noImage.length) report.push('- Không có');
  else noImage.forEach((t) => report.push(`- ${t}`));
  report.push('');

  fs.writeFileSync(OUT_REPORT, report.join('\n'), 'utf8');

  console.log(JSON.stringify({ books: books.length, exact, fuzzy, manual, sql: 'seed-recovered-books.sql' }, null, 2));
}

main();
