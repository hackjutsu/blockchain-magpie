const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CityHall.json');
const fs = require('fs');
const path = require('path');

const INFURA_API_KEY = '16c6e1cade9642e9aa729b8267b6d8f2';
const METAMASK_ACCOUNT = 'glide number act target acid boat slender hint dwarf general pear section';

const provider = new HDWalletProvider(
  METAMASK_ACCOUNT,
  `https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q${INFURA_API_KEY}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '4612388', from: accounts[0] }); // 

  console.log('Contract deployed to', result.options.address);
};
deploy();
