# duelnow-token

[![Coverage](https://github.com/duelnow/token/actions/workflows/Coverage.yml/badge.svg)](https://github.com/duelnow/token/actions/workflows/Coverage.yml)

Duelnow (DNOW) token is deployed on [mainnet](https://etherscan.io/token): `N/A`

The new DNOW token will be an OpenZeplin based ERC20 contract.

## Requirements

This project consists of DNOW ERC20 token.

### DNOW contract

- Supports the standard ERC20 interface
- The name of the token is "DuelNow"
- The symbol of the token is "DNOW"
- The total supply is 1_000_000_000
- The decimals remain according to the standard
- The token is ownable
- DuelNow owns the token

## Technical Executions

Duelnow developed the contract according to the requirements using Solidity, Hardhat and TypeScript. This section outlines the technical solution.

### DNOW contract

DNOW token is in compliance with ERC20 as described in ​[eip-20.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)​. 

#### Allowance Double-Spend Exploit

The allowance double-spend exploit is mitigated in this contract with functions `increaseAllowance()` and `decreaseAllowance()`.

However, community agreement on an ERC standard that would protect against this exploit is still pending. Users should be aware of this exploit when interacting with this contract. Developers who use `approve()`/`transferFrom()` should keep in mind that they have to set the allowance to 0 first and verify if it was used before setting the new value.

#### Ownable

The contract DuelNow.sol uses the Ownable2Step pattern and has a function owner() to report the address with special privileges. Currently, the owner only receives all the initial supply tokens, and there are no additional functionalities associated with the ownable pattern. That may change in future versions of the contract.

Additionally, the renounceOwnership function is overridden to disable the ability to renounce ownership. This ensures that the contract always has an owner:

# Development Environment Setup

## Install dependencies
`yarn install`

## Run tests
`yarn run coverage`

# Deployments

Pass environment variables via .env file.
Use specific network values as in the below examples.

```shell
ETHERSCAN_API_KEY=etherscan_api_key
ARBISCAN_API_KEY=arbiscan_api_key
INFURA_KEY=infura_key
PRIVATE_KEY=wallet_private_key
```

## Testnet Deployment

### Run deploy command

Run below command to deploy on Ethereum Sepolia testnet.

`yarn run deploy:sepolia`

Run below command to deploy on Arbitrum Sepolia testnet.

`yarn run deploy:arbitrumSepolia`

## Mainnet Deployment

### Run deploy command

Run below command to deploy on Ethereum mainnet.

`yarn run deploy:mainnet`

Run below command to deploy on Arbitrum One mainnet.

`yarn run deploy:arbitrumOne`
