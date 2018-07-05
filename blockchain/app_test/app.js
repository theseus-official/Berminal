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
        account = accounts[2];
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

    // const contractInfo = await extractContractInfo('blockchain/build/contracts/HeroManager.json');
    // const heroManager = new web3.eth.Contract(
    //     contractInfo['abi'],
    //     contractInfo['address']
    // );
    // await heroManager.methods.createHero('dong', 0).send({from: account, gas: 6661234});

    // const HeroManager = createTruffleContract('../build/contracts/HeroManager.json', account, 6661234)
    // const heroManager = await HeroManager.deployed();
    // await heroManager.createHero('dong', 0);

    // const address = '0xc7fb696e1f1f7e13b0afda8aa0d5a0dd18aa4af2';
    // console.log(await web3.eth.getStorageAt(address, 0));
    // console.log(await web3.eth.getStorageAt(address, 1));
    // console.log(await web3.eth.getStorageAt(address, 2));
    // console.log(await web3.eth.getStorageAt(address, 3));

    // const offset = web3.utils.soliditySha3(1, 2);
    // console.log('offset', offset);
    // console.log(await web3.eth.getStorageAt(address, offset));
    // console.log(await web3.eth.getStorageAt(arrayAddress, 1));
    // console.log(await web3.eth.getStorageAt(arrayAddress, 2));
    // await testSetSwitcher(account, 1);

    // await testSetOraclizeCallbackGasPrice(account, 20000000000);
    // await testSetOraclizeCallbackGas(account, 200000);
    // const oraclizeCallbackGasPrice = await contract.methods.oraclizeCallbackGasPrice().call()
    // const oraclizeCallbackGas = await contract.methods.oraclizeCallbackGas().call();
    // console.log('oraclizeCallbackGasPrice', oraclizeCallbackGasPrice, 'oraclizeCallbackGas', oraclizeCallbackGas)

    // await testSetManager(account);
    // await testGetPastEvents();
    // await testWatchEvents();
    // await testCreateHero(account, 'kkk', 1);
    // await testChangeName(account, 0, 'koko');

    // const libInfo = await extractContractInfo('blockchain/build/contracts/HeroStorageLib.json');
    // lib = new web3.eth.Contract(
    //     libInfo['abi'],
    //     libInfo['address']
    // );
    // console.log('HeroStorageLib address', lib.options.address);
    // const storageInfo = await extractContractInfo('blockchain/build/contracts/HeroStorage.json');
    // const storageAddress = storageInfo['address'];

    // console.log('age', await lib.methods.getAge().call());
    // const name = await lib.methods.getName(storageAddress, 3).call();
    // console.log('name', name);

    // const wei = oraclizeCallbackGasPrice * oraclizeCallbackGas;
    // console.log('wei', wei);
    // await testObtainItem(account, 1, wei);

    // await testRequestURL(account, 'json(http://api.fixer.io/latest?symbols=USD,GBP).rates');

    // console.log(await testGetWarrior(1));
    // console.log(await testGetWarrior(2));

    // console.log(await testGetWarriorId(accounts[0]));
}

async function testSetManager(account) {
    const storageInfo = await extractContractInfo('blockchain/build/contracts/HeroStorage.json');
    const storage = new web3.eth.Contract(
        storageInfo['abi'],
        storageInfo['address']
    );

    const metadataInfo = await extractContractInfo('blockchain/build/contracts/HeroMetadata.json');
    const metadata = new web3.eth.Contract(
        metadataInfo['abi'],
        metadataInfo['address']
    );

    const managerInfo = await extractContractInfo('blockchain/build/contracts/HeroManager.json');
    const manager = new web3.eth.Contract(
        managerInfo['abi'],
        managerInfo['address']
    );

    const managerAddress = manager.options.address;
    await storage.methods.setManager(managerAddress).send({
        from: account,
        gas: gasLimit
    });
    await metadata.methods.setManager(managerAddress).send({
        from: account,
        gas: gasLimit
    });
    await manager.methods.setMetadata(metadata.options.address).send({
        from: account,
        gas: gasLimit
    });
    await manager.methods.setModel(storage.options.address).send({
        from: account,
        gas: gasLimit
    });
}

async function testCreateHero(account, name, gender) {
    await contract.methods.createHero(name, gender).send({
            from: account,
            gas: gasLimit
        });
}

async function testChangeName(account, index, name) {
    await contract.methods.changeName(index, name).send({
            from: account,
            gas: gasLimit
        });
}

// async function testRequestURL(account, url, gasLimit = 500000) {
//     await contract.methods.requestURL(url, gasLimit).send({
//             from: account,
//             gas: gasLimit,
//             value: web3.utils.toWei('40', 'milli')
//         })
//         .on('transactionHash', function (hash) {
//             console.log('testRequestURL transactionHash', hash);
//         })
//         .on('confirmation', function (confirmationNumber, receipt) {
//             console.log('testRequestURL confirmation', confirmationNumber);
//         })
//         .on('receipt', function (receipt) {
//             console.log('testRequestURL receipt');
//         })
//         .on('error', console.error);
// }

async function testObtainItem(account, warriorId, wei) {
    await contract.methods.obtainItem(warriorId).send({
            from: account,
            gas: gasLimit,
            value: wei
        })
        .on('transactionHash', function (hash) {
            console.log('testObtainItem transactionHash', hash);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            console.log('testObtainItem confirmation', confirmationNumber);
        })
        .on('receipt', function (receipt) {
            console.log('testObtainItem receipt');
        })
        .on('error', console.error);
}

async function testSetOraclizeCallbackGas(account, gas) {
    await contract.methods.setOraclizeCallbackGas(gas).send({
            from: account,
            gas: gasLimit
        }).on('transactionHash', function (hash) {
            console.log('testSetOraclizeCallbackGas transactionHash', hash);
        })
        .on('receipt', function (receipt) {
            console.log('testSetOraclizeCallbackGas receipt');
        })
        .on('error', console.error);
}

async function testSetOraclizeCallbackGasPrice(account, gasPrice) {
    await contract.methods.setOraclizeCallbackGasPrice(gasPrice).send({
            from: account,
            gas: gasLimit
        }).on('transactionHash', function (hash) {
            console.log('testSetOraclizeCallbackGasPrice transactionHash', hash);
        })
        .on('receipt', function (receipt) {
            console.log('testSetOraclizeCallbackGasPrice receipt');
        })
        .on('error', console.error);
}

async function testSetSwitcher(account, switcher) {
    await contract.methods.setSwitcher(switcher).send({
        from: account,
        gas: gasLimit
    });
}

async function testGetWarriorId(account) {
    return await contract.methods.account2Warrior(account).call()
}

async function testGetWarrior(warriroId) {
    return await contract.methods.warriors(warriroId - 1).call()
}

async function testGetPastEvents() {
    let events = await testGetPastEvent('LogHeroCreated');
    console.log('Past Event LogHeroCreated');
    for (event of events) {
        console.log(event.returnValues);
    }

    // events = await testGetPastEvent('ItemObtained');
    // console.log('--- ItemObtained --- ');
    // for (event of events) {
    //     console.log(event.returnValues);
    // }

    // events = await testGetPastEvent('Error');
    // console.log('--- Error --- ');
    // for (event of events) {
    //     console.log(event.returnValues);
    // }

    // events = await testGetPastEvent('DebugInfo');
    // console.log('--- DebugInfo --- ');
    // for (event of events) {
    //     console.log(event.returnValues);
    // }
}

async function testWatchEvents() {
    await contract.events.LogHeroCreated()
        .on("data", function (event) {
            const info = event.returnValues;
            console.log("Watch Event LogHeroCreated", info.id, info.name, info.gender);
        })
        .on("error", console.error);
    // await contract.events.ItemObtained()
    //     .on("data", function (event) {
    //         const info = event.returnValues;
    //         console.log("... ItemObtained warriorId:", info.warriorId, "itemId:", info.itemId, "level:", info.level, "part:", info.part, "quality:", info.quality, "power:", info.power, "basePower:", info.basePower);
    //     })
    //     .on("error", console.error);
    // await contract.events.Error()
    //     .on("data", function (event) {
    //         const info = event.returnValues;
    //         console.log("... Error warriorId:", info.warriorId, info.code, info.description);
    //     })
    //     .on("error", console.error);
    // await contract.events.DebugInfo()
    //     .on("data", function (event) {
    //         const info = event.returnValues;
    //         console.log("... DebugInfo:", info.text, info.value1, info.value2);
    //     })
    //     .on("error", console.error);
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