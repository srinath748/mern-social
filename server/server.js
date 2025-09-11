// server/server.js  (replace the existing related parts with this)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* -------------------- Basic middleware -------------------- */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(morgan("dev"));

/* -------------------- Helmet: explicitly allow cross-origin resources -------------------- */
// set all the default helmet protections, then set a permissive CORP for resources
app.use(helmet());
// override CORP to allow cross-origin resource embedding (images)
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/* -------------------- CORS Setup -------------------- */
const allowedOrigins = [
  "http://localhost:3000", // local dev
  process.env.FRONTEND_URL || "https://mern-social-4.onrender.com", // deployed frontend
  // add other frontends here if needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* -------------------- Static folder for images -------------------- */
/* Serve public/assets at /assets and force permissive CORP + CORS headers for image responses */
app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"), {
    setHeaders: (res /*, filePath, stat */) => {
      // Allow other origins to embed and fetch these resources
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*"); // or set to your frontend origin
      // helpful CORS headers for some browsers / clients
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    },
  })
);

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

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
