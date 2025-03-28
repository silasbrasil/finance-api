import { TransactionSchema } from "./transaction-create.dto";

describe("transaction-create DTO test Suite", () => {
  it("create a valid transaction object only required values", ()=> {
    const transaction = TransactionSchema.parse({
      amount: 1,
      coin: "BRL",
      transactionType: "Deposit"
    });

    expect(transaction.amount).toBe(1);
    expect(transaction.coin).toBe("BRL");
    expect(transaction.transactionType).toBe("Deposit");
  });
});