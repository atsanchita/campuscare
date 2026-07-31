import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusCare API",
  });
});

export default app;