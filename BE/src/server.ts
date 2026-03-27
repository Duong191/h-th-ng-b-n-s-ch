import app from "./app";
import { env } from "./config/env";
import { probeDbConnection } from "./config/db";

const bootstrap = async (): Promise<void> => {
  try {
    const dbInfo = await probeDbConnection();
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
