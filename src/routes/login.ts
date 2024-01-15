import express from "express";
import { LoginController } from "../controller/LoginController";

const router = express.Router();

router.post("/", LoginController);

export default router;
