import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1).default("mongodb://127.0.0.1:27017/jaimin_portfolio"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must contain at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  const messages = result.error.issues.map(({ path, message }) => `${path.join(".")}: ${message}`);
  throw new Error(`Invalid environment configuration:\n${messages.join("\n")}`);
}

export const env = result.data;
