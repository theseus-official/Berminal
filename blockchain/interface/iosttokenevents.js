const
    iost = require('./iost');


iost.token.getPastEvents("Transfer",{fromBlock:0, toBlock:"latest"}).then(console.log);