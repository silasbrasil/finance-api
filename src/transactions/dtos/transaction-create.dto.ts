import { z } from 'zod';
import { COINS, TRANSACTION_TYPES } from '../enums';

export const TransactionSchema = z.object({
  amount: z.number().positive(),
  coin: z.nativeEnum(COINS),
  description: z.string().max(150).optional(),
  transactionType: z.nativeEnum(TRANSACTION_TYPES),
});
