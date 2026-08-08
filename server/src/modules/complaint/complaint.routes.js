import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import authorizeAdmin from "../../middlewares/admin.middleware.js";
import { create, getMine, getOne, update, remove, adminUpdate, getAll} from "./complaint.controller.js";

const router = express.Router();

router.post("/", protect, create);

router.get("/", protect, getMine);

router.get("/admin/all", protect, authorizeAdmin, getAll);

router.get("/:id", protect, getOne);

router.patch(
  "/admin/:id",
  protect,
  authorizeAdmin,
  adminUpdate
);

router.patch("/:id", protect, update);

router.delete("/:id", protect, remove);

export default router;