// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DUNC is ERC20, Ownable {
    /**
     * @notice constructor function is used for initialization
     * @param name name of the token
     * @param symbol symbol of the token
     * @param initialSupply amount of tokens to be minted and transferred to {owner}
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @notice increaseAllowance function
     * @param spender address of the spender
     * @param addedValue value needs to be increased
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        uint256 newAllowance = allowance(msg.sender, spender) + addedValue;
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
        uint256 newAllowance = currentAllowance - subtractedValue;
        _approve(msg.sender, spender, newAllowance);
        return true;
    }
}
