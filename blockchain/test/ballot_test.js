const Ballot = artifacts.require("Ballot");

contract('Ballot', async (accounts) => {
    let ballot;
    it('set up', async () => {
        ballot = await Ballot.deployed();
    });

    it('add super node', async () => {
        await ballot.addSuperNodes(accounts,
            [1024 * 1024, 2 * 1024 * 1024, 3 * 1024 * 1024,
                4 * 1024 * 1024, 5 * 1024 * 1024, 6 * 1024 * 1024,
                7 * 1024 * 1024, 8 * 1024 * 1024, 9 * 1024 * 1024,
                10 * 1024 * 1024]);
        const superNodeCount = await ballot.getSuperNodeCount();
        assert.equal(superNodeCount.toNumber(), accounts.length);
        for (let i = 1; i <= superNodeCount; i++) {
            const superNodeInfo = await ballot.getSuperNodeById(i);
            console.log(superNodeInfo);
        }
    });

    it('voting', async () => {
        for (account of accounts) {
            await ballot.voting([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {from: account});
        }
        const voteCount = await ballot.getVoteCount();
        assert.equal(voteCount.toNumber(), accounts.length);

        for (let i = 1; i <= voteCount; i++) {
            const voteInfo = await ballot.getVoteInfoById(i);
            console.log(voteInfo);
        }
    });

    it('can not voting repeat', async () => {
        let error = false;
        try {
            await ballot.voting([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        } catch (e) {
            console.log(e)
            error = true;
        }
        assert.isTrue(error);
    });

    it('can not add super node repeat ', async () => {
        let error = false;
        try {
            await ballot.addSuperNodes(accounts,
                [1024 * 1024, 2 * 1024 * 1024, 3 * 1024 * 1024,
                    4 * 1024 * 1024, 5 * 1024 * 1024, 6 * 1024 * 1024,
                    7 * 1024 * 1024, 8 * 1024 * 1024, 9 * 1024 * 1024,
                    10 * 1024 * 1024]);
        } catch (e) {
            console.log(e)
            error = true
        }
        assert.isTrue(error);
    });
});