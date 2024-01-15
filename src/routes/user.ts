import express from "express";
import {
  UpdateUser,
  getAllUser,
  getUserSelf,
  getUserById,
} from "../controller/User";
import Authentication from "../utils/Authentication";
const router = express.Router();

router.put("/", Authentication, UpdateUser);
router.get("/", Authentication, getAllUser);
router.get("/self", Authentication, getUserSelf);
router.get("/:id", Authentication, getUserById);
export default router;
