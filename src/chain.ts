import { Block } from "./block";
import { Transaction } from "./transaction";
import * as crypto from 'crypto';

class Chain {
    public static instance = new Chain();

    chain: Block[];

    private constructor() {
        this.chain = [new Block('', new Transaction(100, 'genesis', 'banks'))]
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    mine(nonce: number) {
        let solution = 1;
        console.log('⛏ Mining...');
        
        while (true) {
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.substr(0,4) === '0000') {
                console.log(`Solved in ${solution} tries: ${attempt}`)
                return attempt;
            }

            solution += 1;
        }
    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());

        const isValid = verifier.verify(senderPublicKey, signature);

        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
            return newBlock;
        }

        return null;
    }
}

export { Chain }