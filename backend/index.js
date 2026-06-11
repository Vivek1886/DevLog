import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import authRoutes from "./modules/auth/auth.routes.js";
import logRoutes from "./modules/log/log.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Routes
app.get("/", (req, res) => res.send("DevLog API is running ✅"));
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/profile", profileRoutes);

// Global error handler — must be last
app.use(errorHandler);

// Start only after DB connects
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
});