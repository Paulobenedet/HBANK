import { Request, Response } from "express";

import { TransactionService } from "./transaction.service";
import { TransactionError } from "./transaction.errors";

export class TransactionController {
  private transactionService = new TransactionService();

  async deposit(req: Request, res: Response) {
    try {
      const result = await this.transactionService.deposit(
        req.userId,
        req.body
      );

      return res.status(201).json(result);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async withdraw(req: Request, res: Response) {
    try {
      const result = await this.transactionService.withdraw(
        req.userId,
        req.body
      );

      return res.status(201).json(result);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async statement(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await this.transactionService.statement(
        req.userId,
        page,
        limit
      );

      return res.status(200).json(result);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof TransactionError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
}