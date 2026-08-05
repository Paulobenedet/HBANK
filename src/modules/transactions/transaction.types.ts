export interface DepositDTO {
  amount: number;
  description?: string;
}

export interface WithdrawDTO {
  amount: number;
  description?: string;
}

export interface TransferDTO {
  destinationAccountNumber: string;
  amount: number;
  description?: string;
}

export interface StatementQueryDTO {
  page?: number;
  limit?: number;
  type?: "DEPOSIT" | "WITHDRAW" | "TRANSFER_IN" | "TRANSFER_OUT";
}

export interface TransactionResponseDTO {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  status: string;
  createdAt: Date;
}

export interface StatementResponseDTO {
  balance: number;
  transactions: TransactionResponseDTO[];
}