import express from "express";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../controller/CategoryController";
import Authentication from "../utils/Authentication";

const router = express.Router();

router.post("/", Authentication, createCategory);
router.get("/", Authentication, getCategory);
router.put("/:id", Authentication, updateCategory);

export default router;
