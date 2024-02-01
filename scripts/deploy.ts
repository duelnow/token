import { ethers } from "hardhat";
import verifyEnvVars from './helpers/env-vars'
import getEtherscanUri from './helpers/etherscan'

async function main() {
  const values = verifyEnvVars(['NAME', 'SYMBOL', 'INITIAL_SUPPLY'], 'TOKEN')

  const [owner] = await ethers.getSigners()

  console.info(
    `Deploying "${values.NAME}" [${values.SYMBOL}] with initial supply of ` +
    `${values.INITIAL_SUPPLY} and owner ${owner.address}...`
  )

  const DUNCContract = await ethers.getContractFactory('DUNC', owner)
  const initialSupplyInWei = ethers.parseUnits(values.INITIAL_SUPPLY, 18);
  console.log("initialSupplyInWei = ", initialSupplyInWei)
  const args = [values.NAME, values.SYMBOL, initialSupplyInWei]
  const token = await DUNCContract.deploy(...args)
  await token.waitForDeployment()
  console.info(`Verify here: ${getEtherscanUri('address', token.target)}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


