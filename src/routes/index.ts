import { Router } from "express";
import { authController } from "../controllers/auth";

const router = Router();

router.post("/login", authController);

export { router };