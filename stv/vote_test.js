let ballot = require('../blockchain/interface/ballot');

/**
 * set superNodes as candidates
 *
 * @param account_ids set these account_ids as supernodes
 */
function set_candidates(account_ids) {
    ballot.accounts().then(accounts => {
        let sub_accounts = [],
            bandwidths = [];
        account_ids.forEach(x => {
            sub_accounts.push(accounts[x]);
            bandwidths.push(1024 * 1024 * 1024);
        });
        ballot.addSuperNodes(sub_accounts, bandwidths).then(() => {
            console.log('successful add a list of super nodes');
            ballot.getSuperNodeCount().then(console.log)
        }, console.log)
    });
}

/**
 *
 * @param account_id
 * @param candidates a list of supernode ids
 */
function vote_candidates(account_id, candidates) {
    ballot.accounts().then(accounts => {
        ballot.voting(accounts[account_id], candidates).then(() => {
            console.log('successful vote');
            ballot.getVoteCount().then(cnt => {
                // ballot.getVoteInfoById(cnt).then(console.log);
                console.log('vote cnt = ', cnt);
            })
        }, console.log)
    });
}

// ballot.getSuperNodeCount().then(x => {
//     console.log('cnt = ', x);
// });

// ballot.getVoteCount().then(cnt => {
//     console.log('vote cnt = ', cnt);
//     for (let i = 1; i <= cnt; ++i) {
//         ballot.getVoteInfoById(i).then(console.log);
//     }
// });

// set_candidates([2, 3, 4]);
// vote_candidates(10, [2]);

// ballot.getVoteInfoById(1).then(console.log);

ballot.getVoteCount().then(console.log);
ballot.getVoteInfoById(1).then(console.log);

