import { Chain } from '../chain';
import { Wallet } from '../wallet';

test('wallet keys are different', () => {
    const a = new Wallet();
    const b = new Wallet();

    expect(a.publicKey).not.toBe(b.publicKey);
    expect(a.privateKey).not.toBe(b.privateKey);
});

test('sendMoney succesfully adds money to the blockchain', () => {
    const banks = new Wallet();
    const kosta = new Wallet();
    const amountSent = 1337;

    const blockHash = banks.sendMoney(amountSent, kosta.publicKey);

    expect(blockHash).toBe(Chain.instance.lastBlock.hash);
    expect(amountSent).toBe(Chain.instance.lastBlock.transaction.amount);
})
