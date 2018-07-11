let ballot = require('../../../blockchain/interface/ballot'),
    chalk = require('chalk');

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function detailed_ballots(ballots) {
    let result = [];

    for (let groups of ballots) {
        for (let i = 0; i < groups['count']; ++i) {
            result.push(groups['ballot']);
        }
    }

    return shuffle(result);
}

function candidate_names_ids(input) {
    let ballots = detailed_ballots(input),
        ids = [],
        candidate_name_id = candidate_name_id_dic(input);

    ballots.forEach(names => {
        ids.push(names.map(x => candidate_name_id[x]));
    });

    let result = [];

    for (let i = 0; i < ids.length; ++i) {
        result.push({
            'names': ballots[i],
            'ids': ids[i],
        })
    }

    return result;
}

function run_set_candidates(input) {
    let candidate_name_id = candidate_name_id_dic(input),
        size = Object.values(candidate_name_id).length,
        candidate_ids = [];

    for (let i = 1; i <= size; ++i) {
        candidate_ids.push(i);
    }

    set_candidates(candidate_ids);
}

async function run_voting(input) {
    let names_ids = candidate_names_ids(input);

    for (let i = 1; i <= names_ids.length; ++i) {
        let ball = names_ids[i - 1];
        let hash = await vote_candidates(i, ball['ids']);
        console.log(chalk.inverse(('0' + i).slice(-2)) + ' ',
            ball['names'].join(', '), '\t[' + hash + ']');
    }
    console.log();
}

function candidate_name_id_dic(input) {
    let ballots = detailed_ballots(input);

    let candidates_set = new Set(),
        candidate_name_id = {},
        index = 1;

    for (let ballot of ballots) {
        for (let media of ballot) {
            if (!candidates_set.has(media)) {
                candidates_set.add(media);
                candidate_name_id[media] = index;
                index++;
            }
        }
    }

    return candidate_name_id;
}

function join_candidates_name(input) {
    let candidate_name_id = candidate_name_id_dic(input);

    return Object.keys(candidate_name_id).join(', ');
}

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
async function vote_candidates(account_id, candidates) {
    let accounts = await ballot.accounts(),
        transaction = await ballot.voting(accounts[account_id], candidates);

    return transaction.transactionHash;
}

exports.candidate_names_ids = candidate_names_ids;
exports.run_set_candidates = run_set_candidates;
exports.run_voting = run_voting;
exports.join_candidates_name = join_candidates_name;
exports.candidate_name_id_dic = candidate_name_id_dic;
