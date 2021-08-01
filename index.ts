import express from 'express';
import { Chain } from './src/chain';
import { Wallet } from './src/wallet';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Banks\' Blockchain</h1> <h3>commands:</h3> <ul><li>/createWallet</li><li>/chain</li><li>/sendMoney</li></ul>');
})

app.get('/createWallet', (req, res) => {
    const wallet = new Wallet();
    res.send({publicKey: wallet.publicKey, privateKey: wallet.privateKey})
});

app.get('/chain', (req,res) => {
    res.send(Chain.instance);
})

app.post('/sendMoney', (req,res) => {
    const amount = req.body.amount;
    const payerPublicKey = req.body.payerPublicKey;
    const payerPrivateKey = req.body.payerPrivateKey;
    const payeePublicKey = req.body.payeePublicKey;
    
    const blockHash = Wallet.sendMoney(amount, payerPublicKey, payerPrivateKey, payeePublicKey);    
    res.send(blockHash);
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
