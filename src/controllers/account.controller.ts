import { Request, Response } from "express";
import { prisma } from "../shared/config/prisma";

export class AccountController {
  async me(req: Request, res: Response) {
    try {
      const account = await prisma.account.findUnique({
        where: {
          userId: req.userId,
        },
        select: {
          id: true,
          agency: true,
          accountNumber: true,
          balance: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!account) {
        return res.status(404).json({
          message: "Conta não encontrada.",
        });
      }

      return res.status(200).json(account);
    } catch {
      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  }
}