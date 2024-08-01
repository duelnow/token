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

  it("should increase allowance", async function () {
    const initialAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    const addedValue = 100;

    await expect(token.increaseAllowance(await SECOND.getAddress(), addedValue))
      .to.emit(token, "Approval")
      .withArgs(await OWNER.getAddress(), await SECOND.getAddress(), Number(initialAllowance) + Number(addedValue));

    const updatedAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    expect(updatedAllowance).to.equal(Number(initialAllowance) + Number(addedValue));
  });

  it("allowance should not increase total supply", async function () {
    let addedValue = wei(1_000_000_000_00);
    await expect(token.increaseAllowance(await SECOND.getAddress(), addedValue)).to.be.revertedWith(
      "ERC20: allowance exceeds total supply"
    );

    addedValue = wei(2_000_000_000_00);
    await expect(token.increaseAllowance(await SECOND.getAddress(), addedValue)).to.be.revertedWith(
      "ERC20: allowance exceeds total supply"
    );
  });

  it("should decrease allowance", async function () {
    await token.increaseAllowance(await SECOND.getAddress(), 100);
    const initialAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    const subtractedValue = 10;

    await expect(token.decreaseAllowance(await SECOND.getAddress(), subtractedValue))
      .to.emit(token, "Approval")
      .withArgs(
        await OWNER.getAddress(),
        await SECOND.getAddress(),
        Number(initialAllowance) - Number(subtractedValue)
      );

    const updatedAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    expect(updatedAllowance).to.equal(Number(initialAllowance) - subtractedValue);
  });

  it("should revert if decreasing allowance below zero", async function () {
    await token.increaseAllowance(await SECOND.getAddress(), 100);
    const initialAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    const subtractedValue = 110;

    await expect(token.decreaseAllowance(await SECOND.getAddress(), subtractedValue)).to.be.revertedWith(
      "ERC20: decreased allowance below zero"
    );

    const updatedAllowance = await token.allowance(await OWNER.getAddress(), await SECOND.getAddress());
    expect(updatedAllowance).to.equal(initialAllowance);
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
