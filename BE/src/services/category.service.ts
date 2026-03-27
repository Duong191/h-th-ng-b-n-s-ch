import { getDb } from "../config/db";

export const listCategories = async () => {
  const pool = await getDb();
  const rs = await pool.request().query("SELECT id, name, slug, icon FROM categories WHERE is_active=1 ORDER BY display_order");
  return rs.recordset;
};

export const listCategoriesDetailed = async () => {
  const pool = await getDb();
  const rs = await pool
    .request()
    .query("SELECT id, name, slug FROM categories WHERE is_active=1 ORDER BY display_order, id");

  const categories = rs.recordset as Array<{ id: number; name: string; slug: string }>;

  const bySlug: Record<
    string,
    Array<{
      name: string;
      link: string;
    }>
  > = {
    "van-hoc": [
      { name: "Tiểu thuyết", link: "/shop?category=1&search=tiểu thuyết" },
      { name: "Truyện ngắn - Tản văn", link: "/shop?category=1&search=truyện ngắn" },
      { name: "Light Novel", link: "/shop?category=1&search=light novel" },
      { name: "Ngôn tình", link: "/shop?category=1&search=ngôn tình" },
    ],
    "kinh-te": [
      { name: "Nhân vật - Bài học kinh doanh", link: "/shop?category=2&search=kinh doanh" },
      { name: "Quản trị - Lãnh đạo", link: "/shop?category=2&search=quản trị" },
      { name: "Marketing - Bán hàng", link: "/shop?category=2&search=marketing" },
      { name: "Phân tích kinh tế", link: "/shop?category=2&search=kinh tế" },
    ],
    "tam-ly-ky-nang-song": [
      { name: "Kỹ năng sống", link: "/shop?category=7&search=kỹ năng" },
      { name: "Rèn luyện nhân cách", link: "/shop?category=7&search=nhân cách" },
      { name: "Tâm lý", link: "/shop?category=7&search=tâm lý" },
      { name: "Sách cho tuổi mới lớn", link: "/shop?category=7&search=tuổi mới lớn" },
    ],
    "thieu-nhi": [
      { name: "Sách thiếu nhi", link: "/shop?category=5" },
      { name: "Kiến thức bách khoa", link: "/shop?category=5&search=bách khoa" },
      { name: "Sách tranh kỹ năng sống", link: "/shop?category=5&search=kỹ năng" },
      { name: "Vừa học - vừa chơi", link: "/shop?category=5&search=vừa học" },
    ],
    "manga-comic": [
      { name: "Manga", link: "/shop?category=9" },
      { name: "Sách thiếu nhi", link: "/shop?category=5" },
    ],
    "ngoai-ngu": [
      { name: "Tiếng Anh", link: "/shop?category=6&search=english" },
      { name: "Tiếng Nhật", link: "/shop?category=6&search=jlpt" },
      { name: "Tiếng Hoa", link: "/shop?category=6&search=hsk" },
      { name: "Tiếng Hàn", link: "/shop?category=6&search=topik" },
    ],
    "lich-su": [
      { name: "Lịch sử Việt Nam", link: "/shop?category=4&search=việt nam" },
      { name: "Lịch sử thế giới", link: "/shop?category=4&search=thế giới" },
      { name: "Danh nhân", link: "/shop?category=4&search=danh nhân" },
      { name: "Văn hóa", link: "/shop?category=4&search=văn hóa" },
    ],
    "cong-nghe-thong-tin": [
      { name: "Lập trình", link: "/shop?category=8&search=lập trình" },
      { name: "Khoa học dữ liệu", link: "/shop?category=8&search=data" },
      { name: "AI - Trí tuệ nhân tạo", link: "/shop?category=8&search=ai" },
      { name: "Mạng máy tính", link: "/shop?category=8&search=mạng" },
    ],
  };

  return categories.map((c) => ({
    id: String(c.id),
    name: c.slug === "manga-comic" ? "Truyện thiếu nhi" : c.name,
    subCategories: bySlug[c.slug] || [],
    viewAllLink: `/shop?category=${c.id}`,
  }));
};
