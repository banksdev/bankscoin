import { Chain } from '../chain';
import { Transaction } from '../transaction';
import { Wallet } from '../wallet';
import * as crypto from 'crypto';

test('chain is singleton', () => {
    expect(Chain.instance).not.toBeUndefined();
    expect(Chain.instance).not.toBeNull();
})

test('block[0] is genesis', () => {
    expect(Chain.instance.chain[0].transaction.payer).toBe('genesis');
})

test('mine finds a correct solution', () => {
    const result = Chain.instance.mine(1234).toString();
    expect(result).toMatch(new RegExp('0000.*'));
})

test('addBlock returns null if signature is invalid given unmatch public/private key pair', () => {
    const a = new Wallet();
    const b = new Wallet();
    const transaction = new Transaction(100, "banks", "kosta");
    const sign =    crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(a.privateKey);
    const newBlock = Chain.instance.addBlock(transaction, b.publicKey, signature);
    expect(newBlock).toBeNull();
})

test('addBlock is also latest block', () => {
    const banksWallet = new Wallet();
    const kostaWallet = new Wallet();
    const transaction = new Transaction(100, banksWallet.publicKey, kostaWallet.publicKey);
    const sign =    crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();
    const signature = sign.sign(banksWallet.privateKey);
    const newBlock = Chain.instance.addBlock(transaction, banksWallet.publicKey, signature);
    expect(newBlock).not.toBeNull();
    expect(newBlock).toBe(Chain.instance.lastBlock);
})