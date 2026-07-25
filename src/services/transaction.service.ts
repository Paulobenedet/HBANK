import { Prisma } from "@prisma/client";
import { prisma } from "../shared/config/prisma";
import { DepositDTO } from "../types/transaction.types";
import { AccountService } from "./account.service";

const accountService = new AccountService();

export class TransactionService {
  async deposit(userId: string, data: DepositDTO) {
    const account = await accountService.findByUserId(userId);

    if (!account) {
      throw new Error("Conta bancária não encontrada.");
    }

    const amount = new Prisma.Decimal(data.amount);

    if (amount.lte(0)) {
      throw new Error("O valor do depósito deve ser maior que zero.");
    }

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          accountId: account.id,
          amount,
          description: data.description,
          type: "DEPOSIT",
          status: "COMPLETED",
        },
      });

      const updatedAccount = await tx.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return {
        transaction,
        balance: updatedAccount.balance,
      };
    });

    return {
      message: "Depósito realizado com sucesso.",
      ...result,
    };
  }
}