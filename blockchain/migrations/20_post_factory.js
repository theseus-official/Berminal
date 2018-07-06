var PostFactory = artifacts.require("PostFactory.sol");

module.exports = (deployer) => {
    deployer.deploy(PostFactory);
};