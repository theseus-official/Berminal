const PostPublisher = artifacts.require("PostPublisher");

contract('PostPublisher', async (accounts) => {
    it("game presettings", async () => {
        const publisher1 = await PostPublisher.new(1, 10);
        let publisherId = await publisher1.id();
        assert.equal(publisherId.toNumber(), 1);
        let bandwidth = await publisher1.bandwidth();
        assert.equal(bandwidth.toNumber(), 10);

        let postId = 1;
        await publisher1.setRatingForPost(postId, 4);
        let rating = await publisher1.ratings(postId);
        assert.equal(rating.toNumber(), 4);

        postId = 2;
        await publisher1.setRatingForPost(postId, 6);
        rating = await publisher1.ratings(postId);
        assert.equal(rating.toNumber(), 6);
    });
});
