import bcrypt from "bcryptjs";
import { getDb, sql } from "../config/db";
import { AppError } from "../utils/appError";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { mapDbUserToFeUser } from "../utils/userMapper";

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export const register = async (input: RegisterInput) => {
  const pool = await getDb();
  const existing = await pool.request().input("email", sql.NVarChar(255), input.email).query("SELECT id FROM users WHERE email=@email AND is_deleted=0");
  if (existing.recordset.length) throw new AppError(409, "Email already exists");

  const hash = await bcrypt.hash(input.password, 10);
  const tx = new sql.Transaction(pool);
  await tx.begin();

  try {
    const userInsert = await new sql.Request(tx)
      .input("email", sql.NVarChar(255), input.email)
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
    return login(input.email, input.password);
  } catch (error) {
    await tx.rollback();
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const pool = await getDb();
  const rs = await pool.request().input("email", sql.NVarChar(255), email).query(
    `SELECT TOP 1
      u.id, u.email, u.password_hash, u.first_name, u.last_name, u.phone, u.gender, u.birth_date, u.avatar_url, u.is_active, u.created_at, u.updated_at,
      r.name AS role_name
     FROM users u
     LEFT JOIN user_roles ur ON ur.user_id = u.id
     LEFT JOIN roles r ON r.id = ur.role_id
     WHERE u.email=@email AND u.is_active=1 AND u.is_deleted=0`
  );
  if (!rs.recordset.length) throw new AppError(401, "Invalid credentials");
  const user = rs.recordset[0];
  const ok = await bcrypt.compare(password, String(user.password_hash));
  if (!ok) throw new AppError(401, "Invalid credentials");

  const payload = { sub: Number(user.id), email: String(user.email) };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  await pool
    .request()
    .input("userId", sql.BigInt, user.id)
    .input("token", sql.NVarChar(500), refreshToken)
    .input("expiresAt", sql.DateTime2, new Date(Date.now() + 7 * 24 * 3600 * 1000))
    .query("INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (@userId, @token, @expiresAt, GETUTCDATE())");

  return {
    accessToken,
    refreshToken,
    user: mapDbUserToFeUser(rs.recordset[0])
  };
};

export const refresh = async (token: string) => {
  const payload = verifyRefreshToken(token);
  const pool = await getDb();

  const rs = await pool
    .request()
    .input("token", sql.NVarChar(500), token)
    .query("SELECT TOP 1 user_id FROM refresh_tokens WHERE token=@token AND expires_at > GETUTCDATE()");
  if (!rs.recordset.length) throw new AppError(401, "Refresh token invalid");

  const newAccess = signAccessToken({ sub: payload.sub, email: payload.email });
  return { accessToken: newAccess };
};

export const logout = async (token: string): Promise<void> => {
  const pool = await getDb();
  await pool.request().input("token", sql.NVarChar(500), token).query("DELETE FROM refresh_tokens WHERE token=@token");
};
