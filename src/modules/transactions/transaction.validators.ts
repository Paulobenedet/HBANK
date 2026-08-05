import {
  DepositDTO,
  WithdrawDTO,
  TransferDTO,
} from "./transaction.types";

export class TransactionValidator {
  static validateDeposit(data: DepositDTO): void {
    if (data.amount === undefined || data.amount === null) {
      throw new Error("Informe o valor do depósito.");
    }

    if (typeof data.amount !== "number") {
      throw new Error("O valor do depósito deve ser numérico.");
    }

    if (data.amount <= 0) {
      throw new Error("O valor do depósito deve ser maior que zero.");
    }
  }

  static validateWithdraw(data: WithdrawDTO): void {
    if (data.amount === undefined || data.amount === null) {
      throw new Error("Informe o valor do saque.");
    }

    if (typeof data.amount !== "number") {
      throw new Error("O valor do saque deve ser numérico.");
    }

    if (data.amount <= 0) {
      throw new Error("O valor do saque deve ser maior que zero.");
    }
  }

  static validateTransfer(data: TransferDTO): void {
    if (!data.destinationAccountNumber) {
      throw new Error("Informe a conta de destino.");
    }

    if (typeof data.amount !== "number") {
      throw new Error("O valor da transferência deve ser numérico.");
    }

    if (data.amount <= 0) {
      throw new Error("O valor da transferência deve ser maior que zero.");
    }
  }
}