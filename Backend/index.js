import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { apiMsg } from "./controllers/notesController.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// CORS
app.use(cors({ origin: "http://localhost:5173",
  // origin:"https://noteboard-alpha.vercel.app",
 }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Logger
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
  next();
});

// -------------------------
// Routes that use multer first
// -------------------------
app.use("/api/notes", notesRoutes);

// -------------------------
// Body parsers & rate limiter AFTER upload routes
// -------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(rateLimiter);

// Test route
app.use("/", apiMsg);

// -------------------------
// Connect DB & Start Server
// -------------------------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
