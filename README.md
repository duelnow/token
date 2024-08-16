# duelnow-token

[![Coverage](https://github.com/duelnow/token/actions/workflows/Coverage.yml/badge.svg)](https://github.com/duelnow/token/actions/workflows/Coverage.yml)

DuelNow (DNOW) token is deployed on [mainnet](https://etherscan.io/token): `N/A`

The new DNOW token will be an OpenZeplin based ERC20 contract.

## Token Purpose and Ecosystem

The DuelNow (DNOW) token is designed to facilitate secure and transparent transactions within the sports betting ecosystem. It enables players and participants to hold, earn, and spend tokens in a decentralized and trustless environment, supporting a new economy in competitive sports entertainment.

Within the betting application known as duelnow.com, the DNOW token will be utilized to place bets on various sports events. This integration ensures that transactions are not only secure but also fast and efficient, enhancing the user experience in sports betting. The framework aims to revolutionize the way bets are placed and managed, offering a robust platform backed by blockchain technology to ensure fairness and security in every transaction.

In addition to its use in betting, the DuelNow (DNOW) token will also manage membership levels for users, with the membership level being determined by the number of tokens held in their wallet. This system incentivize users to hold more DNOW tokens to unlock higher membership tiers, which may offer exclusive benefits and rewards.

Moreover, the DNOW token will be instrumental in raising funds for the betting platform. Investors who contribute to the platform will receive DNOW tokens in return for their investment. The number of tokens issued will be based on a specific USD equivalent, allowing investors to acquire tokens proportionate to the amount they invest in the platform. This funding mechanism not only supports the growth of the DuelNow ecosystem but also provides investors with a stake in the platform's success.


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

## Allowance and Approval

To ensure user flexibility and security, the DNOW token implements methods to manage allowances. 

### Unlimited Approval

To provide unlimited approval to a spender, users should call `approve(address spender, uint256 amount)` with the amount set to the maximum uint256 value. This allows the spender to transfer an indefinite amount of DNOW on behalf of the token holder. It is crucial for users to trust the spender, as this could lead to potential risks.

## Technical Executions

Duelnow developed the contract according to the requirements using Solidity, Hardhat, and TypeScript. This section outlines the technical solution.

### DNOW contract

DNOW token is in compliance with ERC20 as described in ​[eip-20.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)​. 

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

## Mainnet Deployment

### Run deploy command

Run below command to deploy on Ethereum mainnet.

`yarn run deploy:mainnet`

