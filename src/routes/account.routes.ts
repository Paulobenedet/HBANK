import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import { authMiddleware } from "../shared/middleware/auth.middleware";

const router = Router();
const accountController = new AccountController();

router.get(
  "/me",
  authMiddleware,
  accountController.me.bind(accountController)
);

export default router;