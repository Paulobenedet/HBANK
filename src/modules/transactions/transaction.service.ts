import { Prisma } from "@prisma/client";

import { prisma } from "../../shared/config/prisma";

import { AccountService } from "../accounts/account.service";

import {
  DepositDTO,
  WithdrawDTO,
} from "./transaction.types";

import { TransactionValidator } from "./transaction.validators";

import {
  AccountNotFoundError,
  InsufficientBalanceError,
} from "./transaction.errors";

export class TransactionService {
  private accountService = new AccountService();

  async deposit(userId: string, data: DepositDTO) {
    TransactionValidator.validateDeposit(data);

    const account = await this.getAccountByUserId(userId);

    const amount = new Prisma.Decimal(data.amount);

    return prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          accountId: account.id,
          amount,
          type: "DEPOSIT",
          description: data.description,
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
        message: "Depósito realizado com sucesso.",
        transaction,
        balance: updatedAccount.balance,
      };
    });
  }

  async withdraw(userId: string, data: WithdrawDTO) {
    TransactionValidator.validateWithdraw(data);

    const account = await this.getAccountByUserId(userId);

    const amount = new Prisma.Decimal(data.amount);

    if (account.balance.lessThan(amount)) {
      throw new InsufficientBalanceError();
    }

    return prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          accountId: account.id,
          amount,
          type: "WITHDRAW",
          description: data.description,
          status: "COMPLETED",
        },
      });

      const updatedAccount = await tx.account.update({
        where: {
          id: account.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      return {
        message: "Saque realizado com sucesso.",
        transaction,
        balance: updatedAccount.balance,
      };
    });
  }

  private async getAccountByUserId(userId: string) {
    const account = await this.accountService.findByUserId(userId);

    if (!account) {
      throw new AccountNotFoundError();
    }

    return account;
  }
}