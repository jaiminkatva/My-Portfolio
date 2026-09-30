import http from "node:http";
import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

async function start() {
  await connectDatabase();
  server.listen(env.PORT, () => console.log(`API listening on http://localhost:${env.PORT}`));
}

async function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

start().catch((error) => {
  console.error("API failed to start", error);
  process.exit(1);
});
