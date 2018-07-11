const PostPublisher = artifacts.require("PostPublisher");

contract('PostPublisher', async (accounts) => {
    it("game presettings", async () => {
        const publisher = await PostPublisher.deployed();
        let snid = 1;
        await publisher.setSuperNodeName(snid, 'n1');
        await publisher.setSuperNodeBandwidth(snid, 5);
        await publisher.setSuperNodePostRating(snid, 'P1', 10);
        await publisher.setSuperNodePostRating(snid, 'P2', 6);
        await publisher.setSuperNodePostRating(snid, 'P3', 9);
        await publisher.setSuperNodePostRating(snid, 'P4', 4);
        await publisher.setSuperNodePostRating(snid, 'P5', 5);

        const name = await publisher.getSuperNodeName(snid);
        assert.equal(name, 'n1');

        const bandwidth = await publisher.getSuperNodeBandwidth(snid);
        assert.equal(bandwidth.toNumber(), 5);

        let rating = await publisher.getSuperNodePostRating(snid, 'P1');
        assert.equal(rating.toNumber(), 10);

        rating = await publisher.getSuperNodePostRating(snid, 'P2');
        assert.equal(rating.toNumber(), 6);

        rating = await publisher.getSuperNodePostRating(snid, 'P3');
        assert.equal(rating.toNumber(), 9);

        rating = await publisher.getSuperNodePostRating(snid, 'P4');
        assert.equal(rating.toNumber(), 4);

        rating = await publisher.getSuperNodePostRating(snid, 'P5');
        assert.equal(rating.toNumber(), 5);
    });
});
