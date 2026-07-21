import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();

const transactionController = new TransactionController();

router.post(
  "/deposit",
  authMiddleware,
  transactionController.deposit.bind(transactionController)
);

export default router;