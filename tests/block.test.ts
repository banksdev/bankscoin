import { Block } from '../src/block';

test('nonces are random', () => {
    const a = new Block('',null);
    const b = new Block('', null);

    expect(a.nonce).not.toBe(b.nonce);
});