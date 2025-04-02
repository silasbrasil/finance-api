import { ZodError } from 'zod';
import { Coins, TransactionTypes } from '../enums';
import { TransactionSchema } from './transaction-create.dto';

describe('transaction-create DTO test Suite', () => {
  it('Validate transaction object only required values', () => {
    // Arranges
    const body = {
      amount: 1,
      coin: Coins.BRL,
      transactionType: TransactionTypes.DEPOSIT,
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
      coin: Coins.BTC,
      description: 'Foi um pix de 1 bitcoin',
      transactionType: TransactionTypes.DEPOSIT,
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
      coin: Coins.BTC,
      transactionType: TransactionTypes.WITHDRAWAL,
    };

    // Actions
    const transaction = TransactionSchema.parse(body);

    // Asserts
    expect(transaction.amount).toBe(0.0035);
    expect(transaction.coin).toBe('BTC');
    expect(transaction.transactionType).toBe('Withdrawal');
  });

  it('Invalidate transaction amount is negative value', () => {
    // Arranges
    const body = {
      amount: -0.035,
      coin: Coins.BTC,
      transactionType: TransactionTypes.WITHDRAWAL,
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
            message: "Number must be greater than 0",
            path: ["amount"]
          })
        ])
      );
    }
  });

  it('Invalidate transaction when coin is invalid', () => {
    // Arranges
    const body = {
      amount: 0.035,
      coin: "JST",
      transactionType: TransactionTypes.WITHDRAWAL,
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
            path: ["coin"]
          })
        ])
      );
    }
  });

  it('Invalidate transaction when transactionType is invalid', () => {
    // Arranges
    const body = {
      amount: 0.035,
      coin: Coins.BRL,
      transactionType: 'PIX',
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
            path: ["transactionType"]
          })
        ])
      );
    }
  });
});
