const Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'); // ganache
// const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546') // geth
// const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')

const web3 = new Web3(provider); 

const TruffleContract = require('truffle-contract');

test();

async function test() {
    console.log(web3);
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

    // web3.eth.defaultAccount = account;
    const balance = await web3.eth.getBalance(account);
    console.log('account:', account, 'balance:', balance, 'Wei', web3.utils.fromWei(balance), 'ETH');

    // const contractInfo = await extractContractInfo('blockchain/build/contracts/HeroAccessorExt.json');
    // const heroAccessorExt = new web3.eth.Contract(
    //     contractInfo['abi'],
    //     contractInfo['address']
    // );
    // const heroAccessorAddressInfo = await extractContractInfo('blockchain/build/contracts/HeroAccessor.json');
    // const heroAccessorAddress = heroAccessorAddressInfo['address'];
    // console.log('heroAccessorAddress', heroAccessorAddress);

    // const itemIds = await heroAccessorExt.methods.getItemsOnAllParts(heroAccessorAddress, 0).call();
    // console.log('itemIds', itemIds);

    // const level = 40 // 1123400

    // const contractInfo = await extractContractInfo('blockchain/build/contracts/ConfigAccessor.json');
    // const configAccessor = new web3.eth.Contract(
    //     contractInfo['abi'],
    //     contractInfo['address']
    // );
    // await configAccessor.methods.setExpForLevel(level, 678).send({from: account, gas: 200000});
    // const exp = await configAccessor.methods.getExpForLevel(level).call();
    // console.log('exp', exp);

    // const ConfigAccessor = createTruffleContract('../build/contracts/ConfigAccessor.json', account)
    // const configAccessor = await ConfigAccessor.deployed();
    // await configAccessor.setExpForLevel(level, 123);
    // const exp = await configAccessor.getExpForLevel(level);
    // console.log('exp', exp.toNumber());
}



async function testGetPastEvents() {
    let events = await testGetPastEvent('LogHeroCreated');
    console.log('Past Event LogHeroCreated');
    for (event of events) {
        console.log(event.returnValues);
    }
}

async function testWatchEvents() {
    await contract.events.LogHeroCreated()
        .on("data", function (event) {
            const info = event.returnValues;
            console.log("Watch Event LogHeroCreated", info.id, info.name, info.gender);
        })
        .on("error", console.error);
}

async function testGetPastEvent(name) {
    return await contract.getPastEvents(name, {
        fromBlock: 0,
        toBlock: "latest"
    });
}

async function extractContractInfo(file) {
    const fs = require('mz/fs');
    const data = await fs.readFile(file);
    const json = await JSON.parse(data);
    const abi = json['abi'];
    const networkId = await web3.eth.net.getId();
    const address = json['networks'][networkId]['address']
    return {
        'abi': abi,
        'address': address
    }
}

function getPrivateKey(account = '0x55d95463a92f270c5b5980a69c5fa0b3767af12e', password = 'dong123') {
    const keythereum = require("keythereum");
    const datadir = "/Users/dark/Library/Ethereum/rinkeby";

    const keyObject = keythereum.importFromFile(account, datadir);
    const privateKey = keythereum.recover(password, keyObject);
    return '0x' + privateKey.toString('hex');
}

function hex2Text(hexString) {
    if (hexString.startsWith('0x') || hexString.startsWith('0X')) {
        hexString = hexString.substring(2);
    }
    let text = '';
    for (let i = 0; i < hexString.length - 1; i += 2) {
        const byte = hexString.substring(i, (i + 2));
        const charCode = parseInt(byte, 16);
        const char = String.fromCharCode(charCode);
        text += char;
    }
    return text;
}

function createTruffleContract(jsonFilePath, account, gas) {
    const json = require(jsonFilePath);
    const Contract = TruffleContract(json);
    Contract.setProvider(provider);
    fixTruffleContractCompatibilityIssue(Contract);
    Contract.defaults({from: account, gas: gas});
    return Contract;
}
// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}