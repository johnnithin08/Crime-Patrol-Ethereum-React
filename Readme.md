# Crime Patrol

The “CRIME PATROL” provides a  decentralized platform on which the details regarding the criminal records  of an individual can be viewed or added(admins only) based on a unique identification number. This can be used to check if the person is a registered offender or if any offenses are charged against the person.The records that are uploaded can be easily available for verification and thereby makes the whole process faster.The Criminal Records are  stored in the IPFS.Any recruiting agency can register with the police to gain access to the permissioned network.Once added to the permissioned network the registered agency can check if a candidate have any criminal records using a unique ID.


## Features
Crime Patrol features:

 • SImple Dapp with IPFS  

 • Works with the Metamask wallet

 • A simple but functional front-end built with Bootstrap  

 • Integration with all major Ethereum testnets

 • Permissioned network

 • Provision to add new users on registration

## Technologies Used

 • [Truffle](https://github.com/trufflesuite/truffle)  

 • [React](https://github.com/reactjs/reactjs.org)

 • [Ganache](https://github.com/trufflesuite/ganache-cli)    

 • [Web3](https://github.com/ethereum/web3.js/)

## Installation
Installing Crime Patrol to use on your machine is simple. First,  

`git clone`  

the repository. Next, navigate to the cloned directory into the client directory and install the necessary Node.js modules with  

`npm install`  

## Install dependencies

 • truffle compile

 • On compiling, deploy on ropsten network - truffle migrate --reset --network ropsten

 • Copy the mnemonic in truffle-config.js to metamask to obtain the accounts and add the custom token with address “0x540e8BFa34E7445EF34436cA16411C993086DF53”.

 • Now get into the client directory and then npm start to start the Dapp.

 • There are 3 cases of access for the Dapp :
	
	a)Admin access : Use the first account in metamask.It can be used to search , enter and add a new user to the private network.

	b)Existing user : Existing user gets redirected to the home page and have access to the search using a unique ID.

	c)New User : New user has a one time signup.On signup a certain amount of token gets transferred to the user account which can be used as an access right for searching.

Note : Kindly refresh page to initialise web3 on each page access.Any issues faced would be most probably because of web3 which would be solved once you reload the page.


