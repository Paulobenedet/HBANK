import { Router } from "express";

import { authMiddleware } from "../shared/middleware/auth.middleware";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();

const transactionController = new TransactionController();

router.post(
  "/deposit",
  authMiddleware,
  transactionController.deposit.bind(transactionController)
);

export default router;