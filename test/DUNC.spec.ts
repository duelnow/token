import { ethers } from 'hardhat'

import { expect, getSigners, INITIAL_SUPPLY, NAME, SYMBOL } from './shared'
import type { Signers } from './types'
import type { DUNC } from '../typechain-types'

describe('DUNC', async () => {
  let signers: Signers
  let token: DUNC

  before(async () => {
    signers = await getSigners()
  })

  beforeEach(async () => {

    const DUNCContract = await ethers.getContractFactory('DUNC')
    const args = [NAME, SYMBOL, INITIAL_SUPPLY]

    token = await DUNCContract.deploy(...args);

    expect(await token.balanceOf(signers.owner.address)).to.equal(INITIAL_SUPPLY)

    // transfer 1000 tokens to {user1}
    await token.connect(signers.owner.signer).transfer(signers.user1.address, 1000)
  })

  describe('ERC20', () => {
    it('has correct name', async () => {
      expect(await token.name()).to.equal(NAME)
    })

    it('has correct symbol', async () => {
      expect(await token.symbol()).to.equal(SYMBOL)
    })

    it('has correct number of decimals', async () => {
      expect(await token.decimals()).to.equal(18)
    })

    it('has correct total supply', async () => {
      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY)
    })

    it('has correct owner assigned', async () => {
      expect(await token.owner()).to.eq(signers.owner.address)
    })

    it('sends transfer successfully', async () => {
      await token.connect(signers.user1.signer).transfer(signers.user2.address, 100)
      expect(await token.balanceOf(signers.user1.address)).to.equal(900)
      expect(await token.balanceOf(signers.user2.address)).to.equal(100)
    })

    it("should increase allowance", async function () {
      const initialAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      const addedValue = 100;

      await expect(token.increaseAllowance(signers.user1.address, addedValue))
        .to.emit(token, "Approval")
        .withArgs(signers.owner.address, signers.user1.address, initialAllowance + BigInt(addedValue));

      const updatedAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      expect(updatedAllowance).to.equal(initialAllowance + BigInt(addedValue));
    });

    it("allowance should not increase total supply", async function () {
      const addedValue = 100000000000;
      await expect(token.increaseAllowance(signers.user1.address, addedValue))
        .to.be.revertedWith("ERC20: allowance exceeds total supply")
    });

    it("should decrease allowance", async function () {
      await token.increaseAllowance(signers.user1.address, 100)
      const initialAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      const subtractedValue = 10;

      await expect(token.decreaseAllowance(signers.user1.address, subtractedValue))
        .to.emit(token, "Approval")
        .withArgs(signers.owner.address, signers.user1.address, initialAllowance - BigInt(subtractedValue));

      const updatedAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      expect(updatedAllowance).to.equal(Number(initialAllowance) - subtractedValue);
    });

    it("should revert if decreasing allowance below zero", async function () {
      await token.increaseAllowance(signers.user1.address, 100)
      const initialAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      const subtractedValue = 110;

      await expect(token.decreaseAllowance(signers.user1.address, subtractedValue)).to.be.revertedWith(
        "ERC20: decreased allowance below zero"
      );

      const updatedAllowance = await token.allowance(signers.owner.address, signers.user1.address);
      expect(updatedAllowance).to.equal(initialAllowance);
    });
  })
})
