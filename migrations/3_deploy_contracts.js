var CrimeToken = artifacts.require("./CrimeToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CrimeToken);
};
