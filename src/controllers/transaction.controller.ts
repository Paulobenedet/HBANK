import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";

const transactionService = new TransactionService();

export class TransactionController {
  async deposit(req: Request, res: Response) {
    try {
      const result = await transactionService.deposit(
        req.userId,
        req.body
      );

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Erro interno."
      });
    }
  }
}