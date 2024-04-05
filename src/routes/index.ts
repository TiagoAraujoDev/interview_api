import { Router, Request, Response } from "express";
import { join } from "node:path";
import { authController } from "../controllers/auth";

const router = Router();

// api endpoints
router.post("/login", authController);

// views
router.get("/", (_req: Request, res: Response) => {
    return res.sendFile(join(__dirname, "..", "view", "index.html"))
});

export { router };