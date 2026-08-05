export class TransactionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TransactionError";
  }
}

export class InsufficientBalanceError extends TransactionError {
  constructor() {
    super("Saldo insuficiente.");
  }
}

export class AccountNotFoundError extends TransactionError {
  constructor() {
    super("Conta bancária não encontrada.");
  }
}

export class InvalidAmountError extends TransactionError {
  constructor() {
    super("Valor inválido.");
  }
}