import { getDb, sql } from "../config/db";
import { AppError } from "../utils/appError";
import { mapDbUserToFeUser } from "../utils/userMapper";

export const getMe = async (userId: number) => {
  const pool = await getDb();
  const rs = await pool.request().input("id", sql.BigInt, userId).query(
    `SELECT TOP 1
      u.id, u.email, u.first_name, u.last_name, u.phone, u.gender, u.birth_date, u.avatar_url, u.is_active, u.created_at, u.updated_at,
      r.name AS role_name
     FROM users
     u
     LEFT JOIN user_roles ur ON ur.user_id = u.id
     LEFT JOIN roles r ON r.id = ur.role_id
     WHERE u.id=@id AND u.is_deleted=0`
  );
  if (!rs.recordset.length) throw new AppError(404, "User not found");
  return mapDbUserToFeUser(rs.recordset[0]);
};

export const updateMe = async (
  userId: number,
  payload: { firstName?: string; lastName?: string; phone?: string; gender?: string; birthDate?: string; avatarUrl?: string; avatar?: string }
) => {
  const pool = await getDb();
  await pool
    .request()
    .input("id", sql.BigInt, userId)
    .input("firstName", sql.NVarChar(100), payload.firstName ?? null)
    .input("lastName", sql.NVarChar(100), payload.lastName ?? null)
    .input("phone", sql.NVarChar(20), payload.phone ?? null)
    .input("gender", sql.NVarChar(10), payload.gender ?? null)
    .input("birthDate", sql.Date, payload.birthDate ?? null)
    .input("avatarUrl", sql.NVarChar(500), payload.avatarUrl ?? payload.avatar ?? null)
    .query(
      `UPDATE users
       SET first_name = COALESCE(@firstName, first_name),
           last_name = COALESCE(@lastName, last_name),
           phone = COALESCE(@phone, phone),
           gender = COALESCE(@gender, gender),
           birth_date = COALESCE(@birthDate, birth_date),
           avatar_url = COALESCE(@avatarUrl, avatar_url)
       WHERE id=@id AND is_deleted=0`
    );
  return getMe(userId);
};
