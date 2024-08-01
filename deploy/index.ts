import { ethers, upgrades } from "hardhat";

async function main() {
  console.log(`Deploying DuelNow ERC20 token...`)
  const DUNCContract = await ethers.getContractFactory('DuelNow')
  const token = await upgrades.deployProxy(DUNCContract, [])
  await token.waitForDeployment()
  console.log(`Verify contract by running the below command`)
  console.log(`npm run verify:[network_name] ${token.target}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


