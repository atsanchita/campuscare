import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusCare API",
  });
});

// Error Handling Middleware
app.use(errorHandler);


export default app;