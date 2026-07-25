import { Router } from "express";

import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", (req, res) =>
  authController.register(req, res)
);

router.post("/login", (req, res) =>
  authController.login(req, res)
);

router.get("/me", authMiddleware, (req, res) =>
  authController.me(req, res)
);

export default router;