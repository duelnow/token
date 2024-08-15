// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

contract DuelNow is Initializable, ERC20Upgradeable, Ownable2StepUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializer function to replace the constructor
     */
    function initialize() external initializer {
        __ERC20_init("DuelNow", "DNOW");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _mint(msg.sender, 1_000_000_000 ether);
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
