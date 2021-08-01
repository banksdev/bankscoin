import { Block } from '../block';
import { Transaction } from '../transaction';

test('nonces are random', () => {
    const transaction = new Transaction(1, "a", "b");
    const a = new Block('', transaction);
    const b = new Block('', transaction);

    expect(a.nonce).not.toBe(b.nonce);
});

test('block hashes differ', () => {
    const transaction = new Transaction(1, "a", "b");
    const a = new Block('', transaction);
    const b = new Block('', transaction);

    expect(a.hash).not.toBe(b.hash);
});

test('block hash is consistent when recomputed', () => {
    const transaction = new Transaction(1, "a", "b");
    const block = new Block('', transaction);

    const h1 = block.hash;
    const h2 = block.hash;

    expect(h1).toBe(h2);
});


