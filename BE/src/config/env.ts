/** File này đọc và chuẩn hóa biến môi trường cho backend. */
import dotenv from "dotenv";

dotenv.config();

const must = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  db: {
    useWindowsAuth: (process.env.DB_USE_WINDOWS_AUTH ?? "true") === "true",
    user: process.env.DB_USER ?? process.env.USERNAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    domain: process.env.DB_DOMAIN ?? ".",
    server: must("DB_SERVER", "localhost"),
    database: must("DB_NAME", "bookstore_db"),
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    instanceName: process.env.DB_INSTANCE?.trim() || undefined,
    trustServerCertificate: (process.env.DB_TRUST_CERT ?? "true") === "true",
    encrypt: (process.env.DB_ENCRYPT ?? "true") === "true"
  },
  jwt: {
    accessSecret: must("JWT_ACCESS_SECRET", "access_secret_dev"),
    refreshSecret: must("JWT_REFRESH_SECRET", "refresh_secret_dev"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d"
  }
};
