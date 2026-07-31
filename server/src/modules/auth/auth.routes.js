import express from "express";
import { register, login, getMe } from "./auth.controller.js";
import protect from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, getMe);
//after /me first run protect middleware to verify token if succeeds then run getMe controller to return user data

export default router;