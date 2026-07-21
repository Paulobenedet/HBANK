import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const accountController = new AccountController();

router.get("/me", authMiddleware, (req, res) =>
  accountController.me(req, res)
);

export default router;