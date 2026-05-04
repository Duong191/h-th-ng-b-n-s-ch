/** File này khởi động server, kiểm tra DB và bootstrap dữ liệu mặc định. */
import app from "./app";
import { env } from "./config/env";
import { getSafeDbConnectionSummary, probeDbConnection } from "./config/db";
import { ensureDefaultAdmin } from "./services/auth.service";

const bootstrap = async (): Promise<void> => {
  try {
    // eslint-disable-next-line no-console
    console.log("DB config (no secrets):", JSON.stringify(getSafeDbConnectionSummary(), null, 2));

    const dbInfo = await probeDbConnection();
    await ensureDefaultAdmin();
    // eslint-disable-next-line no-console
    console.log("DB connection: SUCCESS");
    // eslint-disable-next-line no-console
    console.log(`DB server: ${dbInfo.serverName} | DB: ${dbInfo.databaseName}`);
    // eslint-disable-next-line no-console
    console.log(`Auth mode: ${dbInfo.authMode} | Login: ${dbInfo.loginName}`);
    // eslint-disable-next-line no-console
    console.log(`Using sa login: ${dbInfo.isSaLogin ? "YES" : "NO"}`);

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`BE server running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("DB connection: FAILED");
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Reason: ${error.message}`);
    } else {
      // eslint-disable-next-line no-console
      console.error("Reason: Unknown error");
    }
    process.exit(1);
  }
};

void bootstrap();
