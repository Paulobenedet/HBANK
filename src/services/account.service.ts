import { Prisma } from "@prisma/client";
import { prisma } from "../shared/config/prisma";

export class AccountService {
  async create(userId: string) {
    const accountNumber = await this.generateAccountNumber();

    return prisma.account.create({
      data: {
        agency: "0001",
        accountNumber,
        userId,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.account.findUnique({
      where: {
        userId,
      },
    });
  }

  async findById(id: string) {
    return prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async findByAccountNumber(accountNumber: string) {
    return prisma.account.findUnique({
      where: {
        accountNumber,
      },
    });
  }

  async exists(accountNumber: string): Promise<boolean> {
    const account = await this.findByAccountNumber(accountNumber);
    return !!account;
  }

  async updateBalance(
    accountId: string,
    balance: Prisma.Decimal
  ) {
    return prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance,
      },
    });
  }

  private async generateAccountNumber(): Promise<string> {
    let accountNumber = "";
    let exists = true;

    while (exists) {
      accountNumber = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();

      exists = await this.exists(accountNumber);
    }

    return accountNumber;
  }
}