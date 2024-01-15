import express from "express";
import {
  createProducts,
  getProducts,
  updateProducts,
} from "../controller/ProductsController";
import Authentication from "../utils/Authentication";

const router = express.Router();
router.post("/", Authentication, createProducts);
router.get("/", Authentication, getProducts);
router.put("/:id", Authentication, updateProducts);

export default router;
