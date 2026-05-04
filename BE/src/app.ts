/** File này cấu hình Express app, middleware và route gốc. */
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { env } from "./config/env";

const app = express();
const allowedOrigins = (env.corsOrigin || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localDevOrigins = ["http://localhost:3000", "http://localhost:3002"];
const corsOrigins = Array.from(new Set([...allowedOrigins, ...localDevOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin) and configured local dev origins.
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ message: "Bookstore API is running" });
});

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
