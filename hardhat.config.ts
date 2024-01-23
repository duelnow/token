import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv-extended';
import "@nomicfoundation/hardhat-toolbox";
import { SolcUserConfig } from "hardhat/types";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";

dotenv.load()

const { ETHERSCAN_API_KEY } = process.env;

const getAccounts = (network: string): string[] | undefined => {
  let accounts
  const privateKey = process.env[`${network}_PRIVATE_KEY`]

  if (privateKey) {
    accounts = [privateKey]
  }
  return accounts
}

const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.8.20',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

interface EtherscanConfig {
  apiKey: {
    mainnet: string,
    sepolia: string,
    arbitrumSepolia: string
    arbitrumOne: string
  },
  customChains: any
}
const EtherscanConfig: EtherscanConfig = {
  apiKey: {
    mainnet: ETHERSCAN_API_KEY || "",
    sepolia: ETHERSCAN_API_KEY || "",
    arbitrumSepolia: ETHERSCAN_API_KEY || "",
    arbitrumOne: ETHERSCAN_API_KEY || "",
  },
  customChains: [
    {
      network: "arbitrumSepolia",
      chainId: 421614,
      urls: {
        apiURL: "https://api-sepolia.arbiscan.io/api",
        browserURL: "https://sepolia.arbiscan.io/",
      },
    },
  ],
};
interface ExtendedHardhatUserConfig extends HardhatUserConfig {
  etherscan: EtherscanConfig;
}

const config: ExtendedHardhatUserConfig = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_API_KEY}`,
      accounts: getAccounts('MAINNET'),
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.SEPOLIA_INFURA_API_KEY}`,
      accounts: getAccounts('SEPOLIA'),
      gasMultiplier: 1.2,
      timeout: 0,
    },
    arbitrumOne: {
      url: "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
      accounts: getAccounts('ARBITRUMONE'),
      gasMultiplier: 1.2,
      timeout: 0,
    },
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: getAccounts('ARBITRUMSEPOLIA'),
      gasMultiplier: 1.2,
      timeout: 0,
    },
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  etherscan: EtherscanConfig,
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  sourcify: {
    enabled: true
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 21,
    outputFile: 'gas-report.txt',
    showMethodSig: true,
    noColors: true,
  },
}

export default config;
