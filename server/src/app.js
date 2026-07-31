import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CampusCare API",
  });
});

export default app;