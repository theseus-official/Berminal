let stv = require('./stv').single_transferable_vote,
    lib = require('./lib'),
    candidate_names_ids = lib.candidate_names_ids,
    run_set_candidates = lib.run_set_candidates,
    run_voting = lib.run_voting;

function test_input(input, seats) {
    stv(input, seats);
}

function test_stv_landslide() {
    let input = [
        {"count": 56, "ballot": ["c1", "c2", "c3"]},
        {"count": 40, "ballot": ["c2", "c3", "c1"]},
        {"count": 20, "ballot": ["c3", "c1", "c2"]}
    ];
    test_input(input, 2);
}

function test_stv_everyone_wins() {
    let input = [
        {"count": 56, "ballot": ["c1", "c2", "c3"]},
        {"count": 40, "ballot": ["c2", "c3", "c1"]},
        {"count": 20, "ballot": ["c3", "c1", "c2"]}
    ];
    test_input(input, 3);
}

function test_stv_wiki_example() {
    let input = [
        {"count": 4, "ballot": ["BBC"]},
        {"count": 2, "ballot": ["HBO", "BBC"]},
        {"count": 8, "ballot": ["CNN", "FOX"]},
        {"count": 4, "ballot": ["CNN", "CBS"]},
        {"count": 1, "ballot": ["FOX"]},
        {"count": 1, "ballot": ["CBS"]}
    ];

    // candidate_names_ids(input);
    // run_set_candidates(input);
    // run_voting(input);

    test_input(input, 3);
}


async function main() {
    // await test_stv_landslide();
    // await test_stv_everyone_wins();
    await test_stv_wiki_example();
}

main();
