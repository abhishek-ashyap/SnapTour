import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import db from "./db";

import authRoutes from "./routes/auth.routes";
import tourRoutes from "./routes/tours.routes";
import stepsRoutes from "./routes/steps.routes";
import publicRoutes from "./routes/public.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/tours/:tourId/steps", stepsRoutes);
app.use("/api/public", publicRoutes);

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

const startServer = async () => {
  try {
    await db.query("SELECT 1");
    console.log("🐘 Database connected");
  } catch (err: any) {
    console.error("⚠️ Database connection failed:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
