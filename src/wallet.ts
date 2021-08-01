import { Chain } from './chain';
import { Transaction } from './transaction';
import * as crypto from 'crypto';

class Wallet {
    public publicKey: string;
    public privateKey: string;

    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem'},
            privateKeyEncoding: { type: 'pkcs8', format: 'pem'}
        });

        this.publicKey = keypair.publicKey;
        this.privateKey = keypair.privateKey;
    }

    sendMoney(amount: number, payeePublicKey: string) : string | undefined {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
        const sign =    crypto.createSign('SHA256');
        sign.update(transaction.toString()).end()

        const signature = sign.sign(this.privateKey);
        const block = Chain.instance.addBlock(transaction, this.publicKey, signature);
        return block?.hash;
    }

    static sendMoney(amount: number, payerPublicKey: string, payerPrivateKey: string, payeePublicKey: string) : string | undefined {
        const transaction = new Transaction(amount, payerPublicKey, payeePublicKey);
        const sign =    crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(payerPrivateKey);
        const block = Chain.instance.addBlock(transaction, payerPublicKey, signature);
        return block?.hash;
    }

}

export { Wallet }