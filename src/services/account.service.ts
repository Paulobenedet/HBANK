import { prisma } from "../config/prisma";

export class AccountService {
  async create(userId: string) {
    const accountNumber = await this.generateAccountNumber();

    const account = await prisma.account.create({
      data: {
        agency: "0001",
        accountNumber,
        userId,
      },
    });

    return account;
  }

  async findByUserId(userId: string) {
    return prisma.account.findUnique({
      where: {
        userId,
      },
    });
  }

  private async generateAccountNumber(): Promise<string> {
    let accountNumber: string;
    let exists = true;

    while (exists) {
      accountNumber = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();

      const account = await prisma.account.findUnique({
        where: {
          accountNumber,
        },
      });

      exists = !!account;
    }

    return accountNumber!;
  }
}