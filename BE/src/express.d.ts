/** File này mở rộng kiểu Request của Express để gắn thông tin user. */
import { AuthUser } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
