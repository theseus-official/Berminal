const
    iost = require('./iost');


// iost.token.getPastEvents("Transfer",{fromBlock:0, toBlock:"latest"}).then(console.log);
iost.token.events.allEvents({fromBlock: 0, toBlock: "latest"}, function (err, res) {
    console.log("on event");
    if (res.event == "Transfer") {
        console.log("on transfer event")
        iost.web3.eth.getTransactionReceipt(res.transactionHash).then(tx => {
            if(tx.status === true && tx.blockNumber != null) {
                console.log("transaction success");
                console.log("Transfer", res.returnValues)
            } else {
                console.log("transaction block number", tx.blockNumber, "transaction status", tx.status);
            }
        })
    } else {
        console.log("ignore event");
    }

});