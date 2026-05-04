// @ts-nocheck
import * as fs from 'fs';
import * as path from 'path';

type MappingConfidence = 'exact' | 'fuzzy' | 'manual_check';

type RecoveredBook = {
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  description: string;
  price: number;
  import_price: number | null;
  discount: number;
  stock: number;
  category_id: number;
  pages: number | null;
  language: string;
  featured: boolean;
  bestseller: boolean;
  trending: boolean;
  is_new: boolean;
  rating: number | null;
  review_count: number;
  sold_count: number;
  view_count: number;
  images: string[];
  tags: string[];
  mapping_confidence: MappingConfidence;
  mapping_reason?: string;
};

type ImageEntry = {
  absolute: string;
  relative: string;
  fileName: string;
  baseName: string;
  normalizedBase: string;
};

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_JSON = path.join(ROOT, 'recovered-books.json');
const OUTPUT_SQL = path.join(ROOT, 'seed-recovered-books.sql');
const OUTPUT_REPORT = path.join(ROOT, 'image-mapping-report.md');
const IMAGE_EXT_RE = /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i;

const IMAGE_DIR_HINTS = ['img', 'images', 'books'];
const IMAGE_ROOT_CANDIDATES = [
  path.join(ROOT, 'FE', 'public', 'img'),
  path.join(ROOT, 'FE', 'src', 'assets', 'img'),
  path.join(ROOT, 'assets', 'img'),
];

function normalizeVietnamese(input: string): string {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function slugify(input: string): string {
  return normalizeVietnamese(input).replace(/\s+/g, '-');
}

function readJsonSafe<T>(absPath: string): T | null {
  try {
    if (!fs.existsSync(absPath)) return null;
    return JSON.parse(fs.readFileSync(absPath, 'utf8')) as T;
  } catch {
    return null;
  }
}

function listAllFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listAllFiles(abs));
      continue;
    }
    out.push(abs);
  }
  return out;
}

function discoverImageRoots(): string[] {
  const roots = new Set<string>();
  for (const candidate of IMAGE_ROOT_CANDIDATES) {
    if (fs.existsSync(candidate)) roots.add(candidate);
  }

  const scanRoots = [ROOT, path.join(ROOT, 'FE'), path.join(ROOT, 'BE')].filter((p) => fs.existsSync(p));
  for (const scanRoot of scanRoots) {
    const all = listAllFiles(scanRoot);
    for (const file of all) {
      if (!IMAGE_EXT_RE.test(file)) continue;
      const folder = path.dirname(file);
      const marker = folder.split(path.sep).find((part) => IMAGE_DIR_HINTS.includes(part.toLowerCase()));
      if (marker) {
        const idx = folder.toLowerCase().lastIndexOf(`${path.sep}${marker.toLowerCase()}`);
        if (idx >= 0) {
          roots.add(folder.slice(0, idx + marker.length + 1));
        }
      }
    }
  }
  return Array.from(roots);
}

function collectImagesFromRoot(imageRoot: string): ImageEntry[] {
  const files = listAllFiles(imageRoot).filter((f) => IMAGE_EXT_RE.test(f));
  const lowerRoot = imageRoot.toLowerCase().replace(/\\/g, '/');
  const relPrefix = lowerRoot.endsWith('/img') ? 'img' : lowerRoot.endsWith('/images') ? 'images' : path.basename(imageRoot).toLowerCase();

  return files.map((abs) => {
    const relLocal = path.relative(imageRoot, abs).replace(/\\/g, '/');
    const relative = `${relPrefix}/${relLocal}`.replace(/\/+/g, '/');
    const fileName = path.basename(abs);
    const baseName = fileName.replace(/\.[^.]+$/, '');
    return {
      absolute: abs,
      relative,
      fileName,
      baseName,
      normalizedBase: normalizeVietnamese(baseName),
    };
  });
}

function collectAllImages(): ImageEntry[] {
  const roots = discoverImageRoots();
  const map = new Map<string, ImageEntry>();
  for (const root of roots) {
    for (const img of collectImagesFromRoot(root)) {
      map.set(img.relative, img);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.relative.localeCompare(b.relative));
}

function parseSqlBookRows(sqlPath: string): Array<Partial<RecoveredBook>> {
  if (!fs.existsSync(sqlPath)) return [];
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const m = sql.match(/USING\s*\(VALUES([\s\S]*?)\)\s*AS source/i);
  if (!m) return [];
  const rows = m[1].match(/\(([^()]*?)\)/g) || [];

  const out: Array<Partial<RecoveredBook>> = [];
  for (const row of rows) {
    const body = row.slice(1, -1);
    const parts: string[] = [];
    let current = '';
    let inString = false;
    for (let i = 0; i < body.length; i += 1) {
      const ch = body[i];
      if (ch === "'" && body[i - 1] !== '\\') inString = !inString;
      if (ch === ',' && !inString) {
        parts.push(current.trim());
        current = '';
        continue;
      }
      current += ch;
    }
    if (current.trim()) parts.push(current.trim());
    if (parts.length < 20) continue;

    const unquote = (v: string): string =>
      v.replace(/^N?'/, '').replace(/'$/, '').replace(/''/g, "'");
    const parseNum = (v: string): number => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    out.push({
      isbn: unquote(parts[1]),
      title: unquote(parts[2]),
      author: unquote(parts[3]),
      publisher: unquote(parts[4]),
      category_id: parseNum(parts[6]),
      description: unquote(parts[7]),
      pages: parseNum(parts[8]) || null,
      language: unquote(parts[9]),
      price: parseNum(parts[10]),
      import_price: parseNum(parts[11]) || null,
      discount: parseNum(parts[12]),
      stock: parseNum(parts[13]),
      featured: parseNum(parts[14]) === 1,
      bestseller: parseNum(parts[15]) === 1,
      trending: parseNum(parts[16]) === 1,
      is_new: parseNum(parts[17]) === 1,
      rating: parseNum(parts[18]) || null,
      review_count: parseNum(parts[19]),
      sold_count: parseNum(parts[20]),
      view_count: parseNum(parts[21]),
    });
  }
  return out;
}

function parseBookFromImageName(image: ImageEntry): RecoveredBook {
  let title = image.baseName
    .replace(/[_-]+/g, ' ')
    .replace(/\bcopy\s*\d+\b/gi, '')
    .trim();
  title = title.replace(/\s+/g, ' ');

  return {
    title,
    author: 'Chưa rõ tác giả',
    publisher: 'Chưa rõ NXB',
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
    images: [toFrontendImagePath(image.relative)],
    tags: [],
    mapping_confidence: 'manual_check',
    mapping_reason: 'created_from_image_filename',
  };
}

function toFrontendImagePath(input: string): string {
  const normalized = String(input || '').replace(/\\/g, '/').trim();
  if (!normalized) return '';
  const fileName = normalized.split('/').pop() || normalized;
  if (normalized.startsWith('/img/')) return normalized;
  if (normalized.startsWith('img/')) return `/${normalized}`;
  if (normalized.startsWith('/images/books/')) return `/img/${fileName}`;
  if (normalized.startsWith('images/books/')) return `/img/${fileName}`;
  if (normalized.includes('/img/')) return normalized.slice(normalized.lastIndexOf('/img/'));
  return `/img/${fileName}`;
}

function tokenizeForMatch(name: string): string[] {
  return normalizeVietnamese(name)
    .split(' ')
    .filter(Boolean);
}

function isSeriesVolumeMismatch(title: string, imageName: string): boolean {
  const t = normalizeVietnamese(title);
  const i = normalizeVietnamese(imageName);
  const volRx = /\b(tap|vol|volume|phan)\s*(\d{1,3})\b/g;
  const titleVol = [...t.matchAll(volRx)].map((m) => m[2]);
  const imageVol = [...i.matchAll(volRx)].map((m) => m[2]);
  if (!titleVol.length || !imageVol.length) return false;
  return titleVol[0] !== imageVol[0];
}

function pickBestImage(
  book: Partial<RecoveredBook> & { images?: string[] },
  imageCatalog: ImageEntry[]
): { images: string[]; confidence: MappingConfidence; reason: string } {
  const declared = Array.isArray(book.images) ? book.images.map(toFrontendImagePath).filter(Boolean) : [];
  const catalogByPath = new Map(imageCatalog.map((i) => [toFrontendImagePath(i.relative), i]));

  const exactDeclared = declared.filter((p) => catalogByPath.has(p));
  if (exactDeclared.length) {
    return { images: Array.from(new Set(exactDeclared)), confidence: 'exact', reason: 'declared_path' };
  }

  const title = String(book.title || '');
  const isbn = String(book.isbn || '');
  const titleSlug = slugify(title);
  const titleNorm = normalizeVietnamese(title);
  const tokens = tokenizeForMatch(title);
  const candidates: Array<{ image: ImageEntry; score: number; reason: string }> = [];

  for (const image of imageCatalog) {
    const fileNorm = image.normalizedBase;
    let score = 0;
    let reason = '';

    if (isbn && fileNorm.includes(normalizeVietnamese(isbn))) {
      score = 1;
      reason = 'isbn';
    } else if (titleSlug && slugify(image.baseName).includes(titleSlug)) {
      score = 0.98;
      reason = 'slug_exact';
    } else if (fileNorm === titleNorm) {
      score = 0.96;
      reason = 'filename_exact';
    } else {
      const matchTokens = tokens.filter((t) => fileNorm.includes(t));
      if (tokens.length) {
        score = matchTokens.length / tokens.length;
        if (score > 0) reason = 'token_fuzzy';
      }
    }

    if (isSeriesVolumeMismatch(title, image.baseName)) {
      score -= 0.5;
    }
    if (/\bban dac biet\b/.test(titleNorm) && !/\bban dac biet\b/.test(fileNorm)) score -= 0.3;
    if (/\bban thuong\b/.test(titleNorm) && !/\bban thuong\b/.test(fileNorm)) score -= 0.2;

    if (score > 0.45) candidates.push({ image, score, reason });
  }

  candidates.sort((a, b) => b.score - a.score);
  if (!candidates.length) return { images: [], confidence: 'manual_check', reason: 'no_match' };

  const best = candidates[0];
  const confidence: MappingConfidence = best.score >= 0.95 ? 'exact' : 'fuzzy';
  return {
    images: [toFrontendImagePath(best.image.relative)],
    confidence,
    reason: best.reason,
  };
}

function loadBooksFromJsonLikeSources(): Array<Partial<RecoveredBook> & { images?: string[] }> {
  const sources = [
    path.join(ROOT, 'FE', 'public', 'seed', 'bookstoreData.json'),
    path.join(ROOT, 'FE', 'public', 'seed', 'recoveredBookstoreBooks.json'),
    path.join(ROOT, 'recovered-books.json'),
  ];
  const books: Array<Partial<RecoveredBook> & { images?: string[] }> = [];

  for (const src of sources) {
    const payload = readJsonSafe<any>(src);
    if (!payload) continue;
    const list = Array.isArray(payload) ? payload : Array.isArray(payload.books) ? payload.books : [];
    for (const item of list) {
      const images = Array.isArray(item.images)
        ? item.images.map((x: unknown) => String(x))
        : item.image
          ? [String(item.image)]
          : [];

      const normalized: Partial<RecoveredBook> & { images?: string[] } = {
        title: String(item.title || '').trim(),
        author: String(item.author || 'Chưa rõ tác giả'),
        publisher: String(item.publisher || item.brand || 'Chưa rõ NXB'),
        isbn: String(item.isbn || ''),
        description: String(item.description || ''),
        price: Number(item.price || 0),
        import_price: item.importPrice != null ? Number(item.importPrice) : null,
        discount: Number(item.discount || 0),
        stock: Number(item.stock || 0),
        category_id: Number(item.categoryId || item.category_id || item.category || 1),
        pages: item.pages != null ? Number(item.pages) : null,
        language: String(item.language || 'Tiếng Việt'),
        featured: Boolean(item.featured),
        bestseller: Boolean(item.bestseller ?? item.bestSeller),
        trending: Boolean(item.trending),
        is_new: Boolean(item.is_new ?? item.isNew),
        rating: item.rating != null ? Number(item.rating) : null,
        review_count: Number(item.review_count ?? item.reviewCount ?? item.reviews ?? 0),
        sold_count: Number(item.sold_count ?? item.soldCount ?? item.salesCount ?? 0),
        view_count: Number(item.view_count ?? item.viewCount ?? 0),
        tags: Array.isArray(item.tags) ? item.tags.map((t: unknown) => String(t)) : [],
        images,
      };
      if (!normalized.title) continue;
      books.push(normalized);
    }
  }
  return books;
}

function dedupeBooks(input: Array<Partial<RecoveredBook> & { images?: string[] }>): Array<Partial<RecoveredBook> & { images?: string[] }> {
  const byKey = new Map<string, Partial<RecoveredBook> & { images?: string[] }>();
  for (const b of input) {
    const key = normalizeVietnamese(`${b.isbn || ''}|${b.title || ''}|${b.author || ''}`);
    const prev = byKey.get(key);
    if (!prev) {
      byKey.set(key, b);
      continue;
    }
    const mergedImages = Array.from(new Set([...(prev.images || []), ...(b.images || [])]));
    byKey.set(key, { ...prev, ...b, images: mergedImages });
  }
  return Array.from(byKey.values());
}

function buildRecoveredBooks(): {
  books: RecoveredBook[];
  allImages: ImageEntry[];
  duplicateImageUsage: Record<string, string[]>;
  unusedImages: string[];
  noImageBooks: string[];
} {
  const imageCatalog = collectAllImages();
  const jsonBooks = dedupeBooks(loadBooksFromJsonLikeSources());
  const sqlBooks = parseSqlBookRows(path.join(ROOT, 'BE', 'SQLQuery1.sql'));
  const merged = dedupeBooks([...jsonBooks, ...sqlBooks]);

  const recovered: RecoveredBook[] = merged.map((book) => {
    const mapping = pickBestImage(book, imageCatalog);
    return {
      title: String(book.title || 'Chưa rõ tên sách'),
      author: String(book.author || 'Chưa rõ tác giả'),
      publisher: String(book.publisher || 'Chưa rõ NXB'),
      isbn: String(book.isbn || ''),
      description: String(book.description || ''),
      price: Number(book.price || 0),
      import_price: book.import_price != null ? Number(book.import_price) : null,
      discount: Number(book.discount || 0),
      stock: Number(book.stock || 0),
      category_id: Number(book.category_id || 1),
      pages: book.pages != null ? Number(book.pages) : null,
      language: String(book.language || 'Tiếng Việt'),
      featured: Boolean(book.featured),
      bestseller: Boolean(book.bestseller),
      trending: Boolean(book.trending),
      is_new: Boolean(book.is_new),
      rating: book.rating != null ? Number(book.rating) : null,
      review_count: Number(book.review_count || 0),
      sold_count: Number(book.sold_count || 0),
      view_count: Number(book.view_count || 0),
      images: mapping.images,
      tags: Array.isArray(book.tags) ? book.tags.map((t) => String(t)) : [],
      mapping_confidence: mapping.confidence,
      mapping_reason: mapping.reason,
    };
  });

  const usedMap: Record<string, string[]> = {};
  for (const book of recovered) {
    for (const img of book.images) {
      if (!usedMap[img]) usedMap[img] = [];
      usedMap[img].push(book.title);
    }
  }
  const duplicateImageUsage: Record<string, string[]> = {};
  for (const [img, titles] of Object.entries(usedMap)) {
    if (titles.length > 1) duplicateImageUsage[img] = titles;
  }

  const used = new Set(Object.keys(usedMap));
  const allImgPaths = imageCatalog.map((i) => toFrontendImagePath(i.relative));
  const unusedImages = allImgPaths.filter((img) => !used.has(img));
  const noImageBooks = recovered.filter((b) => b.images.length === 0).map((b) => b.title);

  // Add orphan images as manual_check books.
  for (const imgPath of unusedImages) {
    const img = imageCatalog.find((i) => toFrontendImagePath(i.relative) === imgPath);
    if (!img) continue;
    recovered.push(parseBookFromImageName(img));
  }

  return { books: recovered, allImages: imageCatalog, duplicateImageUsage, unusedImages, noImageBooks };
}

function safeSqlN(value: string): string {
  return `N'${String(value || '').replace(/'/g, "''")}'`;
}

function generateSql(books: RecoveredBook[]): string {
  const lines: string[] = [];
  lines.push('-- Auto generated by scripts/recover-books-from-images.ts');
  lines.push('SET NOCOUNT ON;');
  lines.push('BEGIN TRANSACTION;');
  lines.push('');

  lines.push('DECLARE @book_id BIGINT;');
  lines.push('');

  for (const b of books) {
    lines.push(`-- ${b.title}`);
    lines.push(`SET @book_id = NULL;`);
    if (b.isbn) {
      lines.push(`SELECT TOP 1 @book_id = id FROM books WHERE isbn = ${safeSqlN(b.isbn)};`);
    }
    lines.push(`IF @book_id IS NULL`);
    lines.push(`  SELECT TOP 1 @book_id = id FROM books WHERE title = ${safeSqlN(b.title)} AND author = ${safeSqlN(b.author)};`);
    lines.push(`IF @book_id IS NULL`);
    lines.push('BEGIN');
    lines.push(
      `  INSERT INTO books (isbn, title, author, publisher, category_id, description, price, import_price, discount, stock, pages, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, view_count, is_active, is_deleted, created_at, updated_at)`
    );
    lines.push(
      `  VALUES (${b.isbn ? safeSqlN(b.isbn) : 'NULL'}, ${safeSqlN(b.title)}, ${safeSqlN(b.author)}, ${safeSqlN(b.publisher)}, ${b.category_id}, ${safeSqlN(b.description)}, ${b.price}, ${b.import_price == null ? 'NULL' : b.import_price}, ${b.discount}, ${b.stock}, ${b.pages == null ? 'NULL' : b.pages}, ${safeSqlN(b.language)}, ${b.featured ? 1 : 0}, ${b.bestseller ? 1 : 0}, ${b.trending ? 1 : 0}, ${b.is_new ? 1 : 0}, ${b.rating == null ? 'NULL' : b.rating}, ${b.review_count}, ${b.sold_count}, ${b.view_count}, 1, 0, GETUTCDATE(), GETUTCDATE());`
    );
    lines.push('  SET @book_id = SCOPE_IDENTITY();');
    lines.push('END');

    for (let i = 0; i < b.images.length; i += 1) {
      const img = b.images[i];
      lines.push(
        `IF NOT EXISTS (SELECT 1 FROM book_images WHERE book_id = @book_id AND image_url = ${safeSqlN(img)}) INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, ${safeSqlN(img)}, ${i === 0 ? 1 : 0}, ${i + 1}, GETUTCDATE());`
      );
    }
    for (const tag of b.tags) {
      lines.push(
        `IF NOT EXISTS (SELECT 1 FROM book_tags WHERE book_id = @book_id AND tag = ${safeSqlN(tag)}) INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, ${safeSqlN(tag)}, GETUTCDATE());`
      );
    }
    lines.push('');
  }

  lines.push('COMMIT TRANSACTION;');
  lines.push('');
  return lines.join('\n');
}

function generateReport(
  books: RecoveredBook[],
  allImages: ImageEntry[],
  duplicateImageUsage: Record<string, string[]>,
  unusedImages: string[],
  noImageBooks: string[]
): string {
  const exact = books.filter((b) => b.mapping_confidence === 'exact').length;
  const fuzzy = books.filter((b) => b.mapping_confidence === 'fuzzy').length;
  const manual = books.filter((b) => b.mapping_confidence === 'manual_check').length;
  const sqlCurrent = parseSqlBookRows(path.join(ROOT, 'BE', 'SQLQuery1.sql')).length;

  const lines: string[] = [];
  lines.push('# Image Mapping Report');
  lines.push('');
  lines.push(`- Tổng số ảnh tìm thấy: **${allImages.length}**`);
  lines.push(`- Tổng số sách trong SQL hiện tại: **${sqlCurrent}**`);
  lines.push(`- Tổng số sách khôi phục được: **${books.length}**`);
  lines.push(`- Sách map ảnh exact: **${exact}**`);
  lines.push(`- Sách map ảnh fuzzy: **${fuzzy}**`);
  lines.push(`- Sách cần kiểm tra thủ công: **${manual}**`);
  lines.push(`- Ảnh chưa được dùng: **${unusedImages.length}**`);
  lines.push(`- Ảnh bị dùng trùng: **${Object.keys(duplicateImageUsage).length}**`);
  lines.push(`- Danh sách sách còn "No Image": **${noImageBooks.length}**`);
  lines.push('');
  lines.push('## Ảnh chưa được dùng');
  if (!unusedImages.length) lines.push('- Không có');
  else unusedImages.forEach((img) => lines.push(`- ${img}`));
  lines.push('');
  lines.push('## Ảnh bị dùng trùng');
  if (!Object.keys(duplicateImageUsage).length) lines.push('- Không có');
  else {
    Object.entries(duplicateImageUsage).forEach(([img, titles]) => {
      lines.push(`- ${img}: ${titles.join(' | ')}`);
    });
  }
  lines.push('');
  lines.push('## Sách còn No Image');
  if (!noImageBooks.length) lines.push('- Không có');
  else noImageBooks.forEach((title) => lines.push(`- ${title}`));
  lines.push('');
  return lines.join('\n');
}

function run(): void {
  const { books, allImages, duplicateImageUsage, unusedImages, noImageBooks } = buildRecoveredBooks();
  const payload = {
    generated_at: new Date().toISOString(),
    books,
  };
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(payload, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_SQL, generateSql(books), 'utf8');
  fs.writeFileSync(
    OUTPUT_REPORT,
    generateReport(books, allImages, duplicateImageUsage, unusedImages, noImageBooks),
    'utf8'
  );

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        recovered_books: books.length,
        images_found: allImages.length,
        output: [
          path.relative(ROOT, OUTPUT_JSON).replace(/\\/g, '/'),
          path.relative(ROOT, OUTPUT_SQL).replace(/\\/g, '/'),
          path.relative(ROOT, OUTPUT_REPORT).replace(/\\/g, '/'),
        ],
      },
      null,
      2
    )
  );
}

run();
