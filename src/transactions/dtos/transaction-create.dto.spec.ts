import { ZodError } from 'zod';
import { COINS, TRANSACTION_TYPES } from '../enums';
import { TransactionSchema } from './transaction-create.dto';

describe('transaction-create DTO test Suite', () => {
  it('Validate transaction object only required values', () => {
    // Arranges
    const body = {
      amount: 1,
      coin: COINS.BRL,
      transactionType: TRANSACTION_TYPES.DEPOSIT,
    };

    // Acts
    const transaction = TransactionSchema.parse(body);

    // Asserts
    expect(transaction.amount).toBe(1);
    expect(transaction.coin).toBe('BRL');
    expect(transaction.transactionType).toBe('Deposit');
  });

  it('Validate transaction object with description', () => {
    // Arranges
    const body = {
      amount: 1,
      coin: COINS.BTC,
      description: 'Foi um pix de 1 bitcoin',
      transactionType: TRANSACTION_TYPES.DEPOSIT,
    };

    // Actions
    const transaction = TransactionSchema.parse(body);

    // Asserts
    expect(transaction.amount).toBe(1);
    expect(transaction.coin).toBe('BTC');
    expect(transaction.description).toBe(body.description);
    expect(transaction.transactionType).toBe('Deposit');
  });

  it('Validate transaction withdrawal 0.0035 in BTC', () => {
    // Arranges
    const body = {
      amount: 0.0035,
      coin: COINS.BTC,
      transactionType: TRANSACTION_TYPES.WITHDRAWAL,
    };

    // Actions
    const transaction = TransactionSchema.parse(body);

    // Asserts
    expect(transaction.amount).toBe(0.0035);
    expect(transaction.coin).toBe('BTC');
    expect(transaction.transactionType).toBe('Withdrawal');
  });

  it('Invalidate transaction withdrawal negative value', () => {
    // Arranges
    const body = {
      amount: -0.035,
      coin: COINS.BTC,
      transactionType: TRANSACTION_TYPES.WITHDRAWAL,
    };

    try {
      // Actions
      TransactionSchema.parse(body);
    } catch(error) {
      // Asserts
      expect(error).toBeInstanceOf(ZodError);
      expect(error.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "Number must be greater than 0"
          })
        ])
      );
    }
  });
});
