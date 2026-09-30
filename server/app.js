import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import errorHandler from "./common/middleware/errorHandler.js";
import notFound from "./common/middleware/notFound.js";
import authRoutes from "./modules/auth/auth.routes.js";
import contentRoutes from "./modules/content/content.routes.js";
import healthRoutes from "./modules/health/health.routes.js";
import inquiryRoutes from "./modules/inquiries/inquiry.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()), credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));
if (env.NODE_ENV !== "test") app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/inquiries", inquiryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
