import express from "express";
import { registerController } from "../controller/RegisterController";

const router = express.Router();

router.post("/", registerController);

export default router;
