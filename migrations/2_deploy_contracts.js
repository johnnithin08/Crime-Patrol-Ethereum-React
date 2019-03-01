var Crime = artifacts.require("./Crime.sol");

module.exports = function(deployer) {
  deployer.deploy(Crime);
};
