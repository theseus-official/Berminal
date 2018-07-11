const PostPublisher = artifacts.require("PostPublisher.sol");

module.exports = function (deployer) {
    deployer.deploy(PostPublisher);
};