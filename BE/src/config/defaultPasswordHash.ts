/** File này lưu hash mật khẩu mặc định dùng cho seed/dev admin. */
/**
 * bcrypt hash của mật khẩu dev "1" (10 rounds), khớp bcryptjs.
 * Sinh bằng: require("bcryptjs").hashSync("1", 10) — giữ cố định để seed SQL / ensureDefaultAdmin đồng bộ.
 */
export const BCRYPT_HASH_DEV_PASSWORD_1 =
  "$2b$10$Qm1PTtEa2.EPCScWdPPxouw2Jc5xT2l1VCin3BeqmYwl/p2dZctj2";
