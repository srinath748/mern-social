// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

// Load environment variables
dotenv.config();

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(helmet());
app.use(morgan("dev"));

// CORS: allow your frontend to access backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://mern-social-4.onrender.com",
    credentials: true,
  })
);

/* -------------------- Static folder for images -------------------- */
app.use(
  "/assets",
  express.static(path.join(__dirname, "public/assets"), {
    setHeaders: (res) => {
      // Allow images to be loaded cross-origin
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); // posts.js handles upload middleware

/* -------------------- Default API Route -------------------- */
app.get("/api", (req, res) => {
  res.send("🚀 API is running");
});

/* -------------------- Start Server + Connect DB -------------------- */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
