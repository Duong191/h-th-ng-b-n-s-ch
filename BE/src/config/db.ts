/** File này quản lý kết nối SQL Server và các hàm tiện ích DB. */
import sql, { type config as SqlConfig, type ConnectionPool } from "mssql";
import { env } from "./env";

let pool: ConnectionPool | null = null;

export type DbConnectionInfo = {
  serverName: string;
  databaseName: string;
  loginName: string;
  authMode: "windows" | "sql";
  isSaLogin: boolean;
};

/** Tùy chọn tedious dùng chung — encrypt + trustServerCertificate theo env. */
const tediousCommonOptions = (): Record<string, unknown> => ({
  encrypt: env.db.encrypt,
  trustServerCertificate: env.db.trustServerCertificate,
  enableArithAbort: true,
  /**
   * Chỉ truyền instanceName khi **không** dùng DB_PORT.
   * Nếu vừa port vừa instance, driver có thể kết nối sai endpoint.
   */
  ...(env.db.port === undefined && env.db.instanceName
    ? { instanceName: env.db.instanceName }
    : {})
});

const serverAndPort = (): Pick<SqlConfig, "server"> & Partial<Pick<SqlConfig, "port">> => ({
  server: env.db.server,
  ...(env.db.port !== undefined ? { port: env.db.port } : {})
});

const buildWindowsConfig = (): SqlConfig => {
  return {
    ...serverAndPort(),
    database: env.db.database,
    authentication: {
      type: "ntlm",
      options: {
        userName: env.db.user,
        password: env.db.password,
        domain: env.db.domain
      }
    },
    options: tediousCommonOptions() as SqlConfig["options"],
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 30000
    }
  };
};

const buildSqlAuthConfig = (): SqlConfig => ({
  ...serverAndPort(),
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
  options: tediousCommonOptions() as SqlConfig["options"],
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 30000
  }
});

/** Log / debug: không chứa mật khẩu. */
export const maskIdentifier = (value: string): string => {
  const v = value.trim();
  if (!v) return "(empty)";
  if (v.length <= 2) return "**";
  return `${v.slice(0, 2)}${"*".repeat(Math.min(6, v.length - 2))}`;
};

export type SafeDbConnectionSummary = {
  server: string;
  database: string;
  port: number | null;
  instanceName: string | null;
  /** `tcp` = có DB_PORT; `named` = chỉ DB_INSTANCE; `default` = không port, không instance. */
  routing: "tcp" | "named" | "default";
  auth: "sql" | "windows_ntlm";
  userMasked: string;
  encrypt: boolean;
  trustServerCertificate: boolean;
};

export const getSafeDbConnectionSummary = (): SafeDbConnectionSummary => {
  const d = env.db;
  const port = d.port !== undefined && !Number.isNaN(d.port) ? d.port : undefined;
  let routing: SafeDbConnectionSummary["routing"] = "default";
  if (port !== undefined) routing = "tcp";
  else if (d.instanceName) routing = "named";

  return {
    server: d.server,
    database: d.database,
    port: port ?? null,
    instanceName: d.instanceName ?? null,
    routing,
    auth: d.useWindowsAuth ? "windows_ntlm" : "sql",
    userMasked: maskIdentifier(d.user),
    encrypt: d.encrypt,
    trustServerCertificate: d.trustServerCertificate
  };
};

export const getDb = async (): Promise<ConnectionPool> => {
  if (pool?.connected) return pool;

  const config = env.db.useWindowsAuth ? buildWindowsConfig() : buildSqlAuthConfig();
  pool = await sql.connect(config);
  return pool;
};

export const closeDb = async (): Promise<void> => {
  if (pool?.connected) {
    await pool.close();
  }
  pool = null;
};

export const probeDbConnection = async (): Promise<DbConnectionInfo> => {
  const db = await getDb();
  const result = await db.request().query(`
    SELECT
      @@SERVERNAME AS server_name,
      DB_NAME() AS database_name,
      SYSTEM_USER AS login_name
  `);
  const row = result.recordset[0] as { server_name: string; database_name: string; login_name: string };
  const loginName = String(row.login_name ?? "");

  return {
    serverName: String(row.server_name ?? ""),
    databaseName: String(row.database_name ?? ""),
    loginName,
    authMode: env.db.useWindowsAuth ? "windows" : "sql",
    isSaLogin: loginName.toLowerCase() === "sa"
  };
};

export { sql };
