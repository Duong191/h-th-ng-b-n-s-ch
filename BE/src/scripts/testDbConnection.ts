/** File này test kết nối DB và in gợi ý xử lý lỗi thường gặp. */
import { closeDb, getDb, getSafeDbConnectionSummary } from "../config/db";

const explainFailure = (error: unknown): void => {
  const err = error as Error & {
    code?: string;
    originalError?: { message?: string; code?: string; number?: number };
  };
  const msg = (err.message || "").toLowerCase();
  const code = err.code || err.originalError?.code || "";
  const num = err.originalError && "number" in err.originalError ? Number(err.originalError.number) : undefined;

  console.error("\n--- Gợi ý xử lý ---");
  if (code === "ELOGIN" || msg.includes("login failed") || num === 18456) {
    console.error("• Lỗi đăng nhập SQL (sai user/mật khẩu, hoặc SQL Authentication chưa bật).");
    console.error("  → Kiểm tra DB_USER / DB_PASSWORD trong .env khớp với SSMS.");
    console.error("  → Nếu dùng 'sa': bật Mixed Mode, enable login 'sa', đặt mật khẩu mạnh (không dùng mật khẩu quá ngắn/placeholder).");
  } else if (code === "ESOCKET" || msg.includes("econnrefused") || msg.includes("could not connect")) {
    console.error("• Không kết nối được tới host:port (service SQL tắt, sai port, hoặc firewall).");
    console.error("  → Kiểm tra SQL Server đang chạy; netstat xem port thật; DB_PORT trong .env khớp.");
  } else if (msg.includes("timeout") || code === "ETIMEOUT" || code === "ETIMEDOUT") {
    console.error("• Hết thời gian chờ — kiểm tra firewall, SQL Browser (nếu dùng named instance không có port).");
  } else if (msg.includes("cannot open database") || msg.includes("unable to open")) {
    console.error("• Database không tồn tại hoặc không có quyền — tạo DB hoặc sửa DB_NAME.");
  } else {
    console.error("• Xem Reason / Code phía trên; đối chiếu với SQL Server Error Log nếu cần.");
  }
};

const run = async (): Promise<void> => {
  const summary = getSafeDbConnectionSummary();
  console.log("Effective DB config (password hidden):");
  console.log(JSON.stringify(summary, null, 2));

  try {
    const pool = await getDb();
    const result = await pool.request().query(`
      SELECT
        @@SERVERNAME AS server_name,
        DB_NAME() AS database_name,
        GETUTCDATE() AS server_utc_time
    `);
    const row = result.recordset[0];

    console.log("\nDB connection: SUCCESS");
    console.log(`Server (@@SERVERNAME): ${row.server_name}`);
    console.log(`Database (DB_NAME()):   ${row.database_name}`);
    console.log(`Server UTC time:        ${row.server_utc_time}`);

    await closeDb();
    process.exit(0);
  } catch (error) {
    console.error("\nDB connection: FAILED");
    if (error instanceof Error) {
      console.error(`Reason: ${error.message}`);
      const detailed = error as Error & {
        code?: string;
        name?: string;
        stack?: string;
        originalError?: { message?: string; code?: string; number?: number };
      };
      if (detailed.code) console.error(`Code: ${detailed.code}`);
      if (detailed.originalError?.number != null) {
        console.error(`SQL number: ${detailed.originalError.number}`);
      }
      if (detailed.originalError?.message) {
        console.error(`Driver message: ${detailed.originalError.message}`);
      }
      if (detailed.stack) console.error(`Stack (first line): ${detailed.stack.split("\n")[0]}`);
    } else {
      console.error("Reason: Unknown error");
    }
    explainFailure(error);
    await closeDb();
    process.exit(1);
  }
};

void run();
