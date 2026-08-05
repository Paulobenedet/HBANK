import { Router } from "express";

import { TransactionController } from "./transaction.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

const transactionController = new TransactionController();

router.post(
  "/deposit",
  authMiddleware,
  transactionController.deposit.bind(transactionController)
);

router.post(
  "/withdraw",
  authMiddleware,
  transactionController.withdraw.bind(transactionController)
);

export default router;