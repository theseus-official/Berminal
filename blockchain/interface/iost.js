const
    Web3 = require("Web3"),
    web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8546'));

const token = () => {
    // const json = require(`../build/contracts/${name}.json`);
    // const networkId = '5777';
    // const address = json['networks'][networkId].address;
    return new web3.eth.Contract(
        [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
            "name": "approve",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transferFrom",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{"name": "", "type": "uint8"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
            "name": "transfer",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
            "name": "allowance",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
                "indexed": true,
                "name": "_to",
                "type": "address"
            }, {"indexed": false, "name": "_value", "type": "uint256"}],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            }, {"indexed": false, "name": "_value", "type": "uint256"}],
            "name": "Approval",
            "type": "event"
        }],
        "0x4a19a73eb0c2a65c117e8fb164ec6f894e3fbff5"
    );
};

exports.token = token();