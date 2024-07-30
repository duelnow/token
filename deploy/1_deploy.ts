import { artifacts } from "hardhat";
import { Deployer, Logger } from "@solarity/hardhat-migrate";

const DuelNow = artifacts.require("DuelNow");

const OWNER = "0x59fcCB18F3b19B3282b27Ca20169732880Fdb3A6";

export = async (deployer: Deployer, logger: Logger) => {
  const token = await deployer.deploy(DuelNow, "DuelNow", "DNOW", 1_000_000_000);

  logger.logTransaction(await token.transferOwnership(OWNER), "Ownership");
};
