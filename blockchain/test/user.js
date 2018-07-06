const UserFactory = artifacts.require("UserFactory");

contract('UserFactory', async (accounts) => {
    it("game presettings", async () => {
        const userFactory = await UserFactory.deployed();
        await userFactory.createUser(11);
        await userFactory.createUser(12);
        await userFactory.createUser(13);
        await userFactory.createUser(14);
        await userFactory.createUser(15);

        const numberOfUsers = await userFactory.getUsersCount();
        assert.equal(numberOfUsers.toNumber(), 5);

        const user = await userFactory.getUser(3);
        console.log(user);
        console.log(user[1]);
        assert.equal(user[1].toNumber(), 13);
    });
});