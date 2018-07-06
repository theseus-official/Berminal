const
    ballot = require('./ballot');


ballot.accounts().then(accounts => {
    ballot.addSuperNode(accounts[1], 1024 * 1024 * 1024).then(() => {
        console.log('successful add a super node')
        ballot.getSuperNodeCount().then(console.log)
    }, console.log)
});

ballot.accounts().then(accounts => {
    ballot.voting(accounts[0], [1]).then(() => {
        console.log('successful vote')
        ballot.getVoteCount().then(console.log)
    }, console.log)
});

