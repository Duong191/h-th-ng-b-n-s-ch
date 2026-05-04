/** File này chuẩn hóa tham số phân trang từ query request. */
/**
 * Chuẩn hóa tham số phân trang `?page=&limit=` từ query string.
 * - `page` luôn ≥ 1.
 * - `limit` được kẹp trong khoảng [1, 100] để tránh client request 1 trang quá lớn.
 *
 * GHI CHÚ: `Number("abc")` cho ra `NaN`. Hiện logic vẫn về giá trị mặc định
 * do `Math.max(1, NaN) === NaN` rồi `(page - 1) * limit` ra NaN.
 * Nếu siết chặt hơn nên kiểm tra `Number.isFinite` — chưa sửa để tránh đổi behavior.
 */
export const parsePagination = (query: Record<string, unknown>) => {
  const page = Math.max(1, Number(query.page ?? 1));
  const limit = Math.min(100, Math.max(1, Number(query.limit ?? 10)));
  return { page, limit, offset: (page - 1) * limit };
};
