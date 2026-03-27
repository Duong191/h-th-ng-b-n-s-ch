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

const buildWindowsConfig = (): SqlConfig => {
  return {
    server: env.db.server,
    database: env.db.database,
    ...(env.db.port ? { port: env.db.port } : {}),
    authentication: {
      type: "ntlm",
      options: {
        userName: env.db.user,
        password: env.db.password,
        domain: env.db.domain
      }
    },
    options: {
      trustServerCertificate: env.db.trustServerCertificate,
      ...(env.db.instanceName ? { instanceName: env.db.instanceName } : {})
    },
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 30000
    }
  };
};

const buildSqlAuthConfig = (): SqlConfig => ({
  server: env.db.server,
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
  ...(env.db.port ? { port: env.db.port } : {}),
  options: {
    trustServerCertificate: env.db.trustServerCertificate,
    ...(env.db.instanceName ? { instanceName: env.db.instanceName } : {})
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 30000
  }
});

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
