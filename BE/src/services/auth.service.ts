/** File này xử lý nghiệp vụ xác thực: đăng ký, đăng nhập và refresh token. */
import bcrypt from "bcryptjs";
import { getDb, sql } from "../config/db";
import { BCRYPT_HASH_DEV_PASSWORD_1 } from "../config/defaultPasswordHash";
import { AppError } from "../utils/appError";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { mapDbUserToFeUser } from "../utils/userMapper";
import { getUserAuthData } from "./rbac.service";
import type { TokenPayload } from "../types";

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

const DEFAULT_ADMIN_EMAIL = "admin@bookstore.com";
const REFRESH_TOKEN_DB_MAX_LEN = 1000;

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

const primaryRoleName = (roles: string[]): string => {
  if (roles.includes("admin")) return "admin";
  if (roles.includes("staff")) return "staff";
  return "user";
};

const buildTokenPayload = (auth: { id: number; email: string; roles: string[]; permissions: string[] }): TokenPayload => ({
  sub: auth.id,
  email: auth.email,
  roles: auth.roles,
  permissions: auth.permissions
});

const buildLoginResult = async (userRow: Record<string, unknown>, userId: number) => {
  const auth = await getUserAuthData(userId);
  if (!auth) throw new AppError(401, "Invalid credentials");

  const payload = buildTokenPayload(auth);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const pool = await getDb();
  await pool
    .request()
    .input("userId", sql.BigInt, userId)
    .input("token", sql.NVarChar(REFRESH_TOKEN_DB_MAX_LEN), refreshToken)
    .input("expiresAt", sql.DateTime2, new Date(Date.now() + 7 * 24 * 3600 * 1000))
    .query("INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (@userId, @token, @expiresAt, GETUTCDATE())");

  const user = mapDbUserToFeUser({
    ...userRow,
    role_name: primaryRoleName(auth.roles)
  } as Parameters<typeof mapDbUserToFeUser>[0]);

  return {
    accessToken,
    refreshToken,
    user: {
      ...user,
      roles: auth.roles,
      permissions: auth.permissions
    },
    roles: auth.roles,
    permissions: auth.permissions
  };
};

/**
 * Đảm bảo có tài khoản admin mặc định (idempotent).
 * Email: admin@bookstore.com — mật khẩu dev: 1 (hash cố định trong defaultPasswordHash).
 */
export const ensureDefaultAdmin = async (): Promise<void> => {
  const pool = await getDb();
  const email = normalizeEmail(DEFAULT_ADMIN_EMAIL);
  const hash = BCRYPT_HASH_DEV_PASSWORD_1;

  const roleRs = await pool.request().query(`SELECT id FROM roles WHERE name = N'admin'`);
  if (!roleRs.recordset.length) {
    // eslint-disable-next-line no-console
    console.warn("[ensureDefaultAdmin] Skip: roles table has no 'admin' role.");
    return;
  }
  const adminRoleId = Number((roleRs.recordset[0] as { id: number }).id);

  const existing = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query(`SELECT id FROM users WHERE LOWER(LTRIM(RTRIM(email))) = @email`);

  let userId: number;

  if (!existing.recordset.length) {
    const ins = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("hash", sql.NVarChar(255), hash)
      .query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, gender, birth_date, avatar_url, is_active, is_deleted, created_at, updated_at)
         OUTPUT INSERTED.id AS id
         VALUES (@email, @hash, N'Admin', N'System', NULL, NULL, NULL, NULL, 1, 0, GETUTCDATE(), GETUTCDATE())`
      );
    userId = Number((ins.recordset[0] as { id: number }).id);
    // eslint-disable-next-line no-console
    console.log(`[ensureDefaultAdmin] Created default admin user id=${userId}`);
  } else {
    userId = Number((existing.recordset[0] as { id: number }).id);
    await pool
      .request()
      .input("id", sql.BigInt, userId)
      .query(`UPDATE users SET is_active = 1, is_deleted = 0, updated_at = GETUTCDATE() WHERE id = @id`);
  }

  await pool
    .request()
    .input("uid", sql.BigInt, userId)
    .input("rid", sql.BigInt, adminRoleId)
    .query(
      `IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = @uid AND role_id = @rid)
       INSERT INTO user_roles (user_id, role_id, created_at) VALUES (@uid, @rid, GETUTCDATE())`
    );
};

export const register = async (input: RegisterInput) => {
  const pool = await getDb();
  const email = normalizeEmail(input.email);
  const existing = await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .query("SELECT id FROM users WHERE LOWER(LTRIM(RTRIM(email))) = @email AND is_deleted=0");
  if (existing.recordset.length) throw new AppError(409, "Email already exists");

  const hash = await bcrypt.hash(input.password, 10);
  const tx = new sql.Transaction(pool);
  await tx.begin();

  try {
    const userInsert = await new sql.Request(tx)
      .input("email", sql.NVarChar(255), email)
      .input("password", sql.NVarChar(255), hash)
      .input("firstName", sql.NVarChar(100), input.firstName)
      .input("lastName", sql.NVarChar(100), input.lastName)
      .input("phone", sql.NVarChar(20), input.phone ?? null)
      .query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, is_active, is_deleted, created_at, updated_at)
         OUTPUT INSERTED.id
         VALUES (@email, @password, @firstName, @lastName, @phone, 1, 0, GETUTCDATE(), GETUTCDATE())`
      );

    const userId = Number(userInsert.recordset[0].id);
    await new sql.Request(tx).input("userId", sql.BigInt, userId).query(
      `INSERT INTO user_roles (user_id, role_id, created_at)
       SELECT @userId, id, GETUTCDATE() FROM roles WHERE name='user'`
    );
    await tx.commit();
    return login(email, input.password);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

export const login = async (emailRaw: string, password: string) => {
  const email = normalizeEmail(emailRaw);
  const pool = await getDb();
  const rs = await pool.request().input("email", sql.NVarChar(255), email).query(
    `SELECT TOP 1
      u.id, u.email, u.password_hash, u.first_name, u.last_name, u.phone, u.gender, u.birth_date, u.avatar_url, u.is_active, u.created_at, u.updated_at
     FROM users u
     WHERE LOWER(LTRIM(RTRIM(u.email))) = @email AND u.is_active=1 AND u.is_deleted=0`
  );
  if (!rs.recordset.length) throw new AppError(401, "Invalid credentials");
  const user = rs.recordset[0] as Record<string, unknown>;
  const ok = await bcrypt.compare(password, String(user.password_hash));
  if (!ok) throw new AppError(401, "Invalid credentials");

  return buildLoginResult(user, Number(user.id));
};

export const refresh = async (token: string) => {
  const payload = verifyRefreshToken(token);
  const auth = await getUserAuthData(payload.sub);
  if (!auth) throw new AppError(401, "Refresh token invalid");

  const newPayload = buildTokenPayload(auth);
  return { accessToken: signAccessToken(newPayload) };
};

export const logout = async (token: string): Promise<void> => {
  const pool = await getDb();
  await pool.request().input("token", sql.NVarChar(500), token).query("DELETE FROM refresh_tokens WHERE token=@token");
};
