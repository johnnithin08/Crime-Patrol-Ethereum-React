# Crime Patrol

Crime Patrol is a Dapp for storing the criminal records along with with the fingerprint in a blockchain network using IPFS.


## Features
Crime Patrol features:

 • Easy to purchase ticket interface (and prevention of duplicate tickets)  

 • Works with the Metamask wallet

 • A simple but functional front-end built with Bootstrap  

 • Integration with all major Ethereum testnets

 • A blockchain-based randomness generator to ensure fairness

 • Real-time ether to USD converter

## Technologies Used

 • [Truffle](https://github.com/trufflesuite/truffle)  

 • [React](https://github.com/reactjs/reactjs.org)

 • [Ganache](https://github.com/trufflesuite/ganache-cli)    

 • [Web3](https://github.com/ethereum/web3.js/)

## Installation
Installing Crime Patrol to use on your machine is simple. First,  

`git clone`  

the repository. Next, navigate to the cloned directory and install the necessary Node.js modules with  

`npm install`  

## Install dependencies

-ipfs (npm install  ipfs-api)

-react (sudo npm install -g create-react-app)

-react-dom(npm install react react-dom)

-react-router dom(npm install  react-router-dom)

-truffle-contract(npm install truffle-contract)

-hd wallet provider(npm install truffle-hdwallet-provider)

 • Once dependencies are installed run truffle compile.

 • Ropsten network deployement - truffle migrate --reset --network ropsten

 • Copy the mnemonic in truffle-config.js to metamask to obtain the accounts and add the custom token with address “0x540e8BFa34E7445EF34436cA16411C993086DF53”.

 • Now run client and then npm start to start the Dapp.

 • There are 3 cases of access for the Dapp :
	
	a)Admin access : Use the first account in metamask.It can be used to search , enter and add a new user to the private network.

	b)Existing user : Existing user gets redirected to the home page and have access to the search using a unique ID.

	c)New User : New user has a one time signup.On signup a certain amount of token gets transferred to the user account which can be used as an access right for searching.


