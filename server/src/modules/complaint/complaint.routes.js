import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import { create, getMine, getOne, update, remove} from "./complaint.controller.js";

const router = express.Router();

router.post("/", protect, create);

router.get("/", protect, getMine);

router.get("/:id", protect, getOne);

router.patch("/:id", protect, update);

router.delete("/:id", protect, remove);

export default router;