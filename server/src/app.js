import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import complaintRoutes from "./modules/complaint/complaint.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/complaints", complaintRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusCare API",
  });
});

// Error Handling Middleware
app.use(errorHandler);


export default app;