const
    Web3 = require("Web3"),
    web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')),
    gasBase = 6500000,
    gasPrice = '220000';// to wei


const createContract = (name) => {
    const json = require(`../build/contracts/${name}.json`);
    const networkId = '5777';
    const address = json['networks'][networkId].address;
    return new web3.eth.Contract(
        json['abi'],
        address
    );
};

const ballot = createContract("Ballot");

exports.manager = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
};

exports.accounts = async () => {
    return await web3.eth.getAccounts();
};

exports.addSuperNode = async (address, bandwidth) => {
    const sender = await exports.manager();
    await ballot.methods.addSuperNode(address, bandwidth).send({
        from: sender,
        gas: gasBase,
        gasPrice: gasPrice
    })
};

exports.addSuperNodes = async (addresses, bandwidths) => {
    const sender = await exports.manager();
    await ballot.methods.addSuperNodes(addresses, bandwidths).send({
        from: sender,
        gas: gasBase,
        gasPrice: gasPrice
    })
};

exports.voting = async (address, superNodeIds) => {
    await ballot.methods.voting(superNodeIds).send({
        from: address,
        gas: gasBase,
        gasPrice: gasPrice
    })
};

exports.isVoted = async (address) => {
    return await ballot.methods.isVoted(address).call();
}

exports.getSuperNodeCount = async () => {
    return await ballot.methods.getSuperNodeCount().call();
};

exports.getVoteCount = async () => {
    return await ballot.methods.getVoteCount().call();
};

exports.getVoteInfoById = async (voteId) => {
    return await ballot.methods.getVoteInfoById(voteId).call();
};

