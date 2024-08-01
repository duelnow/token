// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

contract DuelNow is Initializable, ERC20Upgradeable, Ownable2StepUpgradeable, UUPSUpgradeable {
    /**
     * @notice Initializer function to replace the constructor
     */
    function initialize() public initializer {
        __ERC20_init("DuelNow", "DNOW");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _mint(msg.sender, 1_000_000_000 ether);
    }

    /**
     * @notice increaseAllowance function
     * @param spender address of the spender
     * @param addedValue value needs to be increased
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        (, uint256 newAllowance) = Math.tryAdd(allowance(msg.sender, spender), addedValue);
        require(newAllowance <= totalSupply(), "ERC20: allowance exceeds total supply");
        _approve(msg.sender, spender, newAllowance);
        return true;
    }

    /**
     * @notice decreaseAllowance function
     * @param spender address of the spender
     * @param subtractedValue value needs to be decreased
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        uint256 currentAllowance = allowance(msg.sender, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        (, uint256 newAllowance) = Math.trySub(currentAllowance, subtractedValue);
        _approve(msg.sender, spender, newAllowance);
        return true;
    }

    /**
     * @dev Overrides the renounceOwnership function to disable the ability to renounce ownership.
     * This ensures that the contract always has an owner.
     */
    function renounceOwnership() public view override onlyOwner {
        revert("Renouncing ownership is disabled");
    }

    /**
     * @dev Required by the UUPS proxy pattern for upgrade authorization
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
