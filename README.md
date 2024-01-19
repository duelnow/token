# duelnow-token

[![Coverage](https://github.com/stormxio/duelnow-token/actions/workflows/Coverage.yml/badge.svg)](https://github.com/stormxio/duelnow-token/actions/workflows/Coverage.yml)

Duelnow (DUNC) token is deployed on [mainnet](https://etherscan.io/token): `N/A`

The new DUNC token will be an OpenZeplin based ERC20 contract.

## Requirements

This project consists of DUNC ERC20 token.

### DUNC contract

- Supports the standard ERC20 interface
- The name of the token is "Duelnow"
- The symbol of the token is "DUNC"
- The total supply is 12.500.000.000
- The decimals remain according to the standard
- The token is ownable
- Duelnow owns the token

## Technical Executions

Duelnow developed the contract according to the requirements using Solidity, Hardhat and TypeScript. This section outlines the technical solution.

### DUNC contract

DUNC token is in compliance with ERC20 as described in ​[eip-20.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)​. 

#### Allowance Double-Spend Exploit

The allowance double-spend exploit is mitigated in this contract with functions `increaseAllowance()` and `decreaseAllowance()`.

However, community agreement on an ERC standard that would protect against this exploit is still pending. Users should be aware of this exploit when interacting with this contract. Developers who use `approve()`/`transferFrom()` should keep in mind that they have to set the allowance to 0 first and verify if it was used before setting the new value.

#### Ownable

The contract `DUNC.sol` uses ownable pattern and has a function `owner()` to report the address with special privileges. Currently, the owner only receives all the initial supply tokens, and there are no additional functionalities associated with the ownable pattern. That may change in future versions of the contract.

## Local Development

### Install dependencies

```
npm install
```

### Run tests

```
npx hardhat test
```

### Run coverage

```
npx hardhat coverage
```

### Run Slither via Docker

```
docker run -it -v `pwd`:/src trailofbits/eth-security-toolbox
solc-select install 0.8.20 && solc-select use 0.8.20 && cd /src
slither .
```

## Deployment

Pass environment variables via `.env` file or shell.  Use `SEPOLIA_` perfix for Sepolia and `ARBITRUMSEPOLIA_` perfix for Arbitrum sepolia as in the below examples or `MAINNET_` for Mainnet and `ARBITRUMONE` for ArbitrumOne.

```ini
SEPOLIA_INFURA_API_KEY=infura_api_key
SEPOLIA_PRIVATE_KEY=sepolia_private_key

or 

ARBITRUMSEPOLIA_INFURA_API_KEY=infura_api_key
ARBITRUMSEPOLIA_PRIVATE_KEY=arbitrum_sepolia_private_key

or

MAINNET_INFURA_API_KEY=infura_api_key
MAINNET_PRIVATE_KEY=arbitrum_sepolia_private_key

or

ARBITRUMONE_INFURA_API_KEY=infura_api_key
ARBITRUMONE_PRIVATE_KEY=arbitrum_sepolia_private_key

and 

ETHERSCAN_API_KEY=etherscan_api_key
```

### DUNC contract

Since the DUNC token is an ERC20 contract and required parameters in contructor function needs to be passed for deploying the contract.

```ini
For Sepolia Netowrk

SEPOLIA_TOKEN_NAME=Duelnow
SEPOLIA_TOKEN_SYMBOL=DUNC
SEPOLIA_TOKEN_INITIAL_SUPPLY=12500000000

For Arbitrum Sepolia Netowrk

ARBITRUMSEPOLIA_TOKEN_NAME=Duelnow
ARBITRUMSEPOLIA_TOKEN_SYMBOL=DUNC
ARBITRUMSEPOLIA_TOKEN_INITIAL_SUPPLY=12500000000

For Ethereum Mainnet

MAINNET_TOKEN_NAME=Duelnow
MAINNET_TOKEN_SYMBOL=DUNC
MAINNET_TOKEN_INITIAL_SUPPLY=12500000000

For Arbitrum Mainnet

ARBITRUMONE_TOKEN_NAME=Duelnow
ARBITRUMONE_TOKEN_SYMBOL=DUNC
ARBITRUMONE_TOKEN_INITIAL_SUPPLY=12500000000
```

Run the following command to deploy the smart contract. Replace the `[network_name]` with the network you want to deploy to. For example, sepolia (see these from hardhat.config.ts in networks object)
```
npx hardhat run --network [network_name] scripts/deploy.ts
```

