import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Signer } from "ethers";
import { wei } from "../scripts/utils";
import { DuelNow } from "../typechain-types";

describe("DuelNow ERC20 Token", async () => {
  let OWNER: Signer;
  let SECOND: Signer;
  let THIRD: Signer;
  let token: DuelNow;

  before(async () => {
    [OWNER, SECOND, THIRD] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const DuelNowContract = await ethers.getContractFactory("DuelNow");

    token = await upgrades.deployProxy(DuelNowContract, [], { initializer: 'initialize' });

    await expect(token.connect(OWNER).initialize()).to.be.rejected

    expect(await token.balanceOf(await OWNER.getAddress())).to.equal(wei(1_000_000_000));

    // transfer 1000 tokens to {user1}
    await token.connect(OWNER).transfer(await SECOND.getAddress(), 1000);
  });

  it("has correct name", async () => {
    expect(await token.name()).to.equal("DuelNow");
  });

  it("has correct symbol", async () => {
    expect(await token.symbol()).to.equal("DNOW");
  });

  it("has correct number of decimals", async () => {
    expect(await token.decimals()).to.equal(18);
  });

  it("has correct total supply", async () => {
    expect(await token.totalSupply()).to.equal(wei(1_000_000_000));
  });

  it("has correct owner assigned", async () => {
    expect(await token.owner()).to.eq(await OWNER.getAddress());
  });

  it("sends transfer successfully", async () => {
    await token.connect(SECOND).transfer(await THIRD.getAddress(), 100);
    expect(await token.balanceOf(await SECOND.getAddress())).to.equal(900);
    expect(await token.balanceOf(await THIRD.getAddress())).to.equal(100);
  });

  it("should not renounce ownership", async () => {
    await expect(token.connect(OWNER).renounceOwnership()).to.be.revertedWith("Renouncing ownership is disabled");
  });

  it("only owner should call renounceOwnership", async function () {
    await expect(token.connect(SECOND).renounceOwnership()).to.be.rejected
  });

  it("should upgrade contract only by owner", async function () {
    const DuelNowV2 = await ethers.getContractFactory("DuelNow");
    await expect(upgrades.upgradeProxy(await token.getAddress(), DuelNowV2.connect(SECOND)))
      .to.rejected
    await expect(upgrades.upgradeProxy(await token.getAddress(), DuelNowV2.connect(OWNER)))
      .not.to.be.reverted;
  });
})
