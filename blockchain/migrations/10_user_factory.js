var UserFactory = artifacts.require("UserFactory.sol");

module.exports = (deployer) => {
    deployer.deploy(UserFactory);
};