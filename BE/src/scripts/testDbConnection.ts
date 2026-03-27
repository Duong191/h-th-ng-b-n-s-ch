import { closeDb, getDb } from "../config/db";
import { env } from "../config/env";

const run = async (): Promise<void> => {
  try {
    const pool = await getDb();
    const result = await pool.request().query(`
      SELECT
        @@SERVERNAME AS server_name,
        DB_NAME() AS database_name,
        GETUTCDATE() AS server_utc_time
    `);
    const row = result.recordset[0];

    console.log("DB connection: SUCCESS");
    console.log(`Server: ${row.server_name}`);
    console.log(`Instance: ${env.db.instanceName || "SQLEXPRESS"}`);
    console.log(`Database: ${row.database_name}`);
    console.log(`Server UTC time: ${row.server_utc_time}`);

    await closeDb();
    process.exit(0);
  } catch (error) {
    console.error("DB connection: FAILED");
    if (error instanceof Error) {
      console.error(`Reason: ${error.message}`);
      const detailed = error as Error & {
        code?: string;
        name?: string;
        stack?: string;
        originalError?: { message?: string; code?: string };
      };
      if (detailed.code) console.error(`Code: ${detailed.code}`);
      if (detailed.originalError?.code) console.error(`Driver Code: ${detailed.originalError.code}`);
      if (detailed.originalError?.message) console.error(`Driver Message: ${detailed.originalError.message}`);
      if (detailed.stack) console.error(`Stack: ${detailed.stack.split("\n")[0]}`);
    } else {
      console.error("Reason: Unknown error");
    }
    await closeDb();
    process.exit(1);
  }
};

void run();
