const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic="major more attitude piano disagree pave exact envelope clump raw wise nurse"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gasLimit:0x6691b7,
      gasPrice:20000000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/a643cdcf363846b08e3a856717cbb83d")
      },
      network_id: 3
    }  
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
