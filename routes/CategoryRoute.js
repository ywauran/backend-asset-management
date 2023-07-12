import express from "express";
import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/Category.js";

const router = express.Router();

router.get("/category", getCategory);
router.post("/category", createCategory);
router.delete("/category/:id", deleteCategory);
router.patch("/category/:id", updateCategory);

export default router;
