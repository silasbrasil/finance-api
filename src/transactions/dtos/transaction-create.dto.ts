import { z } from 'zod';
import { Coins, TransactionTypes } from '../enums';


export const TransactionSchema = z.object({
  amount: z.number().positive(),
  coin: z.nativeEnum(Coins),
  description: z.string().max(150).optional(),
  transactionType: z.nativeEnum(TransactionTypes),
});
