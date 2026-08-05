import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import accountRoutes from "./modules/accounts/account.routes";
import transactionRoutes from "./modules/transactions/transaction.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

export default app;