const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_JSON = path.join(ROOT, "FE", "public", "seed", "bookstoreData.json");
const SOURCE_SQL = path.join(ROOT, "BE", "SQLQuery1.sql");
const IMAGE_ROOT = path.join(ROOT, "FE", "public", "img");

const OUTPUT_RECOVERED_JSON = path.join(ROOT, "recovered-books.json");
const OUTPUT_REPORT = path.join(ROOT, "image-mapping-report.md");
const OUTPUT_SQL = path.join(ROOT, "seed-books.sql");
const OUTPUT_FE_JSON = path.join(ROOT, "FE", "public", "seed", "recoveredBookstoreBooks.json");

const IMAGE_EXT_RE = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function stripAccents(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, (ch) => (ch === "đ" ? "d" : "D"));
}

function normalizeKey(text) {
  return stripAccents(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(text) {
  return normalizeKey(text).replace(/\s+/g, "-");
}

function parseVolume(text) {
  const normalized = normalizeKey(text);
  const m = normalized.match(/\b(tap|vol|volume|phan)\s*(\d{1,4})\b/);
  return m ? Number(m[2]) : null;
}

function levenshtein(a, b) {
  const s = String(a || "");
  const t = String(b || "");
  if (s === t) return 0;
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const v0 = new Array(t.length + 1);
  const v1 = new Array(t.length + 1);
  for (let i = 0; i <= t.length; i += 1) v0[i] = i;
  for (let i = 0; i < s.length; i += 1) {
    v1[0] = i + 1;
    for (let j = 0; j < t.length; j += 1) {
      const cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= t.length; j += 1) v0[j] = v1[j];
  }
  return v1[t.length];
}

function similarity(a, b) {
  const aa = normalizeKey(a);
  const bb = normalizeKey(b);
  if (!aa || !bb) return 0;
  const dist = levenshtein(aa, bb);
  const maxLen = Math.max(aa.length, bb.length) || 1;
  return 1 - dist / maxLen;
}

function collectImages(dir, relPrefix = "img") {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...collectImages(abs, `${relPrefix}/${ent.name}`));
      continue;
    }
    if (!IMAGE_EXT_RE.test(ent.name)) continue;
    const rel = `${relPrefix}/${ent.name}`.replace(/\\/g, "/");
    out.push({
      absolutePath: abs,
      relativePath: rel,
      fileName: ent.name,
      ext: path.extname(ent.name).toLowerCase(),
      baseName: path.basename(ent.name, path.extname(ent.name)),
      normalizedName: normalizeKey(path.basename(ent.name, path.extname(ent.name))),
      slugName: slugify(path.basename(ent.name, path.extname(ent.name))),
    });
  }
  return out;
}

function parseSqlSeedBooks(sqlText) {
  const books = [];
  const mergeBlock = sqlText.match(/MERGE INTO books[\s\S]*?USING\s*\(VALUES([\s\S]*?)\)\s*AS source/i);
  if (!mergeBlock) return books;
  const valuesBlock = mergeBlock[1];
  const rows = valuesBlock.match(/\(([^()]*?)\)/g) || [];
  for (const row of rows) {
    const cleaned = row.slice(1, -1);
    const tokens = [];
    let cur = "";
    let inString = false;
    for (let i = 0; i < cleaned.length; i += 1) {
      const ch = cleaned[i];
      if (ch === "'" && cleaned[i - 1] !== "\\") {
        inString = !inString;
        cur += ch;
        continue;
      }
      if (ch === "," && !inString) {
        tokens.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    if (cur.trim()) tokens.push(cur.trim());
    if (tokens.length < 12) continue;
    const id = Number(tokens[0]);
    const isbn = tokens[1].replace(/^'/, "").replace(/'$/, "");
    const title = tokens[2].replace(/^N?'/, "").replace(/'$/, "");
    const author = tokens[3].replace(/^N?'/, "").replace(/'$/, "");
    books.push({ id, isbn, title, author, source: "BE/SQLQuery1.sql" });
  }
  return books;
}

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function safeSqlString(value) {
  if (value === null || value === undefined) return "NULL";
  return `N'${String(value).replace(/'/g, "''")}'`;
}

function toNumberOrNull(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function mapBookImage(book, imageCatalog, usedImageMap) {
  const candidates = [];
  const normalizedTitle = normalizeKey(book.title);
  const slugTitle = slugify(book.title);
  const isbnNorm = normalizeKey(book.isbn || "");
  const authorNorm = normalizeKey(book.author || "");
  const volume = parseVolume(book.title);

  for (const img of imageCatalog) {
    let score = 0;
    let strategy = "";

    if (book.images && book.images.includes(img.relativePath)) {
      score = 1.0;
      strategy = "declared";
    } else if (isbnNorm && img.normalizedName.includes(isbnNorm)) {
      score = 0.99;
      strategy = "isbn";
    } else if (slugTitle && img.slugName.includes(slugTitle)) {
      score = 0.97;
      strategy = "slug";
    } else {
      const sim = similarity(book.title, img.baseName);
      if (sim >= 0.45) {
        score = sim;
        strategy = "fuzzy";
      }
      if (authorNorm && img.normalizedName.includes(authorNorm) && score > 0) {
        score += 0.05;
        strategy = strategy === "fuzzy" ? "fuzzy+author" : strategy;
      }
      if (volume !== null) {
        const imgVol = parseVolume(img.baseName);
        if (imgVol !== null && imgVol === volume) {
          score += 0.08;
        } else if (imgVol !== null && score > 0) {
          score -= 0.1;
        }
      }
    }

    if (score > 0) {
      candidates.push({ img, score, strategy });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0] || null;

  let confidence = "low";
  if (!best) confidence = "unmapped";
  else if (best.strategy === "declared" || best.strategy === "isbn" || best.score >= 0.95) confidence = "high";
  else if (best.score >= 0.72) confidence = "medium";

  let mapped = [];
  let matchedBy = "none";
  if (best) {
    mapped = [best.img.relativePath];
    matchedBy = best.strategy;
  }

  // Keep only available declared images if they exist.
  const declaredExisting = (book.images || []).filter((i) => imageCatalog.some((img) => img.relativePath === i));
  if (declaredExisting.length) {
    mapped = uniq([...declaredExisting, ...mapped]);
    matchedBy = "declared";
    confidence = "high";
  }

  for (const m of mapped) {
    if (!usedImageMap.has(m)) usedImageMap.set(m, []);
    usedImageMap.get(m).push(book.title);
  }

  return {
    images: mapped,
    matchConfidence: confidence,
    matchedBy,
    topCandidates: candidates.slice(0, 3).map((c) => ({
      image: c.img.relativePath,
      score: Number(c.score.toFixed(3)),
      strategy: c.strategy,
    })),
  };
}

function recover() {
  const seed = readJson(SOURCE_JSON);
  const sqlBooks = parseSqlSeedBooks(readText(SOURCE_SQL));
  const imageCatalog = collectImages(IMAGE_ROOT).sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  const categories = Array.isArray(seed.categories) ? seed.categories : [];
  const categoryNameById = new Map(categories.map((c) => [String(c.id), c.name]));
  const booksSeed = Array.isArray(seed.books) ? seed.books : [];

  const byKey = new Map();
  for (const b of booksSeed) {
    const key = normalizeKey(b.isbn || b.title);
    if (!key) continue;
    byKey.set(key, b);
  }
  for (const sb of sqlBooks) {
    const key = normalizeKey(sb.isbn || sb.title);
    if (!key || byKey.has(key)) continue;
    byKey.set(key, {
      id: String(sb.id),
      title: sb.title,
      author: sb.author,
      isbn: sb.isbn,
      description: null,
      category: null,
      images: [],
      sourceFallback: sb.source,
    });
  }

  const dataSources = [
    "FE/public/seed/bookstoreData.json",
    "BE/SQLQuery1.sql",
    "BE/src/scripts/remapBookImages.ts",
    "BE/src/scripts/remapTitlesAndImagesFromLocal.ts",
    "BE/src/scripts/importBooksFromImages.ts",
    "FE/src/context/BookstoreContext.tsx",
    "FE/src/services/dataBootstrapService.ts",
  ];

  const usedImageMap = new Map();
  const recoveredBooks = [];
  const reportRows = [];

  for (const rawBook of byKey.values()) {
    const mapResult = mapBookImage(rawBook, imageCatalog, usedImageMap);
    const recovered = {
      title: rawBook.title || null,
      author: rawBook.author || null,
      category: categoryNameById.get(String(rawBook.category || rawBook.categoryId)) || null,
      isbn: rawBook.isbn || null,
      description: rawBook.description || null,
      price: toNumberOrNull(rawBook.price),
      stock: toNumberOrNull(rawBook.stock),
      tags: Array.isArray(rawBook.tags) ? rawBook.tags : [],
      images: mapResult.images,
      publisher: rawBook.publisher || rawBook.brand || null,
      language: rawBook.language || null,
      format: rawBook.format || null,
      featured: Boolean(rawBook.featured),
      bestSeller: Boolean(rawBook.bestSeller),
      trending: Boolean(rawBook.trending),
      isNew: Boolean(rawBook.isNew),
      rating: toNumberOrNull(rawBook.rating),
      reviewsCount: toNumberOrNull(rawBook.reviews || rawBook.reviewCount),
      salesCount: toNumberOrNull(rawBook.salesCount || rawBook.soldCount),
      mapping: {
        confidence: mapResult.matchConfidence,
        matchedBy: mapResult.matchedBy,
        topCandidates: mapResult.topCandidates,
      },
      source: rawBook.sourceFallback || "FE/public/seed/bookstoreData.json",
    };
    recoveredBooks.push(recovered);
    reportRows.push({
      title: recovered.title,
      images: recovered.images,
      confidence: recovered.mapping.confidence,
      matchedBy: recovered.mapping.matchedBy,
      candidates: recovered.mapping.topCandidates,
    });
  }

  const duplicateImageUsage = Array.from(usedImageMap.entries())
    .filter(([, titles]) => titles.length > 1)
    .map(([img, titles]) => ({ image: img, books: titles }));

  const usedImages = new Set(Array.from(usedImageMap.keys()));
  const unusedImages = imageCatalog.map((i) => i.relativePath).filter((p) => !usedImages.has(p));

  const exactMapped = recoveredBooks.filter((b) => b.mapping.confidence === "high").length;
  const fuzzyMapped = recoveredBooks.filter((b) => b.mapping.confidence === "medium").length;
  const unmapped = recoveredBooks.filter((b) => b.mapping.confidence === "unmapped").length;

  const sqlLines = [];
  sqlLines.push("-- Auto-generated by scripts/recover-books-data.js");
  sqlLines.push("-- Inserts for books, book_images, book_tags");
  sqlLines.push("BEGIN TRANSACTION;");
  sqlLines.push("");

  recoveredBooks.forEach((book, idx) => {
    const bookNo = idx + 1;
    sqlLines.push(
      `INSERT INTO books (isbn, title, author, publisher, category_id, description, price, stock, language, featured, bestseller, trending, is_new, rating, review_count, sold_count, is_active, is_deleted, created_at, updated_at)`
    );
    sqlLines.push(
      `VALUES (${safeSqlString(book.isbn)}, ${safeSqlString(book.title)}, ${safeSqlString(book.author)}, ${safeSqlString(book.publisher)}, ` +
        `${book.category ? "(SELECT TOP 1 id FROM categories WHERE name = " + safeSqlString(book.category) + ")" : "NULL"}, ` +
        `${safeSqlString(book.description)}, ${book.price ?? "NULL"}, ${book.stock ?? 0}, ${safeSqlString(book.language)}, ` +
        `${book.featured ? 1 : 0}, ${book.bestSeller ? 1 : 0}, ${book.trending ? 1 : 0}, ${book.isNew ? 1 : 0}, ` +
        `${book.rating ?? "NULL"}, ${book.reviewsCount ?? 0}, ${book.salesCount ?? 0}, 1, 0, GETUTCDATE(), GETUTCDATE());`
    );
    sqlLines.push("DECLARE @book_id BIGINT = SCOPE_IDENTITY();");
    (book.images || []).forEach((imageUrl, i) => {
      sqlLines.push(
        `INSERT INTO book_images (book_id, image_url, is_primary, display_order, created_at) VALUES (@book_id, ${safeSqlString(
          imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`
        )}, ${i === 0 ? 1 : 0}, ${i + 1}, GETUTCDATE());`
      );
    });
    (book.tags || []).forEach((tag) => {
      sqlLines.push(
        `INSERT INTO book_tags (book_id, tag, created_at) VALUES (@book_id, ${safeSqlString(tag)}, GETUTCDATE());`
      );
    });
    sqlLines.push(`-- end book ${bookNo}`);
    sqlLines.push("");
  });

  sqlLines.push("COMMIT TRANSACTION;");
  sqlLines.push("");

  const reportLines = [];
  reportLines.push("# Image Mapping Report");
  reportLines.push("");
  reportLines.push("## Summary");
  reportLines.push(`- Total recovered books: ${recoveredBooks.length}`);
  reportLines.push(`- High-confidence mapping: ${exactMapped}`);
  reportLines.push(`- Medium-confidence (fuzzy) mapping: ${fuzzyMapped}`);
  reportLines.push(`- Unmapped books: ${unmapped}`);
  reportLines.push(`- Total product images found: ${imageCatalog.length}`);
  reportLines.push(`- Unused product images: ${unusedImages.length}`);
  reportLines.push("");

  reportLines.push("## Data Sources");
  for (const src of dataSources) reportLines.push(`- ${src}`);
  reportLines.push("");

  reportLines.push("## Product Image Folders Scanned");
  const folders = uniq(imageCatalog.map((img) => path.dirname(img.relativePath).replace(/\\/g, "/")));
  for (const folder of folders) reportLines.push(`- ${folder}`);
  reportLines.push("");

  reportLines.push("## Mapping Details");
  for (const row of reportRows) {
    reportLines.push(
      `- ${row.title} | confidence: ${row.confidence} | matchedBy: ${row.matchedBy} | images: ${
        row.images.length ? row.images.join(", ") : "(none)"
      }`
    );
  }
  reportLines.push("");

  reportLines.push("## Books Requiring Manual Review");
  const manual = reportRows.filter((r) => r.confidence !== "high");
  if (!manual.length) reportLines.push("- None");
  for (const r of manual) {
    reportLines.push(`- ${r.title} (${r.confidence})`);
    for (const c of r.candidates) {
      reportLines.push(`  - candidate: ${c.image} | score: ${c.score} | strategy: ${c.strategy}`);
    }
  }
  reportLines.push("");

  reportLines.push("## Unused Images");
  if (!unusedImages.length) reportLines.push("- None");
  for (const img of unusedImages) reportLines.push(`- ${img}`);
  reportLines.push("");

  reportLines.push("## Duplicate Image Usage");
  if (!duplicateImageUsage.length) reportLines.push("- None");
  for (const row of duplicateImageUsage) {
    reportLines.push(`- ${row.image} -> ${row.books.join(" | ")}`);
  }
  reportLines.push("");

  const recoveredPayload = {
    generatedAt: new Date().toISOString(),
    metadata: {
      totalBooks: recoveredBooks.length,
      highConfidence: exactMapped,
      mediumConfidence: fuzzyMapped,
      unmapped,
      totalImages: imageCatalog.length,
      unusedImages: unusedImages.length,
      dataSources,
    },
    categories,
    books: recoveredBooks,
  };

  fs.writeFileSync(OUTPUT_RECOVERED_JSON, JSON.stringify(recoveredPayload, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_FE_JSON, JSON.stringify({ categories, books: recoveredBooks }, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_SQL, sqlLines.join("\n"), "utf8");
  fs.writeFileSync(OUTPUT_REPORT, reportLines.join("\n"), "utf8");

  return {
    dataSources,
    imageFolders: folders,
    totalBooks: recoveredBooks.length,
    highConfidence: exactMapped,
    mediumConfidence: fuzzyMapped,
    unmapped,
    totalImages: imageCatalog.length,
    filesCreated: [
      path.relative(ROOT, OUTPUT_RECOVERED_JSON).replace(/\\/g, "/"),
      path.relative(ROOT, OUTPUT_REPORT).replace(/\\/g, "/"),
      path.relative(ROOT, OUTPUT_SQL).replace(/\\/g, "/"),
      path.relative(ROOT, OUTPUT_FE_JSON).replace(/\\/g, "/"),
      path.relative(ROOT, path.join(__dirname, "recover-books-data.js")).replace(/\\/g, "/"),
    ],
  };
}

if (require.main === module) {
  const result = recover();
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { recover };
