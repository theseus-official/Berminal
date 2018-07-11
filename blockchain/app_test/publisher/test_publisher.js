let clear = require('clear'),
    figlet = require('figlet'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    question = [
        {
            name: 'Next round',
            type: 'input',
            message: 'Press ENTER to add one post:',
        }
    ];

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Berminal', {horizontalLayout: 'full'})
    )
);

const postData = require('./postData.json');
const {Post, Snode, bestComb} = require('./greedy');

let Posts = postData.Posts.map(i => {return new Post(i)});
let SNodes = postData.Snodes.map(i => {return new Snode(i)});

//web3.js
const Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'); // ganache
// const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546') // geth
// const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')
const web3 = new Web3(provider);
// console.log(web3);
const TruffleContract = require('truffle-contract');

test();

async function test() {
    const networkId = await web3.eth.net.getId();
    const gasPrice = await web3.eth.getGasPrice();
    console.log('version:', web3.version, 'networkID:', networkId, 'gasPrice:', gasPrice);
    let account;
    if (networkId == 4) {
        // rinkeby
        account = '0x55d95463A92f270c5b5980A69C5fA0B3767Af12E';
        const privateKey = '0x932fdcd8c48678f2c6d9fd0a9d69d308d810dfc6a1d8afaa642486dac91dc96a';
        web3.eth.accounts.wallet.add(privateKey);
    } else if (networkId == 5777) {
        // ganache
        const accounts = await web3.eth.getAccounts();
        account = accounts[1];
    }
    const balance = await web3.eth.getBalance(account);
    console.log('account:', account, 'balance:', balance, 'Wei', web3.utils.fromWei(balance), 'ETH');

    const PostPublisher = createTruffleContract('../../build/contracts/PostPublisher.json', account, 2000000)
    
    // console.log('All Super Nodes:');
    for (const snode of SNodes) {
        const publisher = await PostPublisher.new(snode.id, snode.name, snode.bandw);
        console.log('\nCreate Super Node at address:', publisher.address);
        for (const key in snode.rateData) {
            const value = snode.rateData[key];
            console.log('Contract: set rating for post', key, value);
            await publisher.setRatingForPost(key, value);
        }
        console.log('Super Node:', snode.name, 'bandwidth', snode.bandw, 'ratings:', snode.rateData);
    }

    await inquirer.prompt(question);
    bestComb(Posts.slice(0, 1), SNodes);

    await inquirer.prompt(question);
    bestComb(Posts.slice(0, 2), SNodes);

    await inquirer.prompt(question);
    bestComb(Posts.slice(0, 3), SNodes);

    await inquirer.prompt(question);
    bestComb(Posts.slice(0, 4), SNodes);
}; 

function createTruffleContract(jsonFilePath, account, gas) {
    const json = require(jsonFilePath);
    const Contract = TruffleContract(json);
    Contract.setProvider(provider);
    fixTruffleContractCompatibilityIssue(Contract);
    Contract.defaults({
        from: account,
        gas: gas
    });
    return Contract;
}
// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}