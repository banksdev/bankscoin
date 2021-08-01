import { Transaction } from '../src/transaction';

test('transaction correctly constructs', () => {
    const transaction = new Transaction(100, "Banks", "Kosta");
    expect(transaction.amount).toBe(100);
    expect(transaction.payer).toBe("Banks");
    expect(transaction.payee).toBe("Kosta");
});