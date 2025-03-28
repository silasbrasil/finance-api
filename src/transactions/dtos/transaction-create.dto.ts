import { z } from "zod";

// Mudar esse valores para enums que serão utilizados em outras partes
// do projeto
export const COINS = ["BRL", "USD", "BTC", "ETH", "SOL"] as const;
export const TRANSACTION_TYPES = ["Deposit", "Withdrawal"] as const;

export const TransactionSchema = z.object({
  amount: z.number(),
  coin: z.enum(COINS),
  description: z.string().max(5).optional(),
  transactionType: z.enum(TRANSACTION_TYPES),
});
