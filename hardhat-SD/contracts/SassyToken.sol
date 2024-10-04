// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// import "hardhat/console.sol";


/* 
    Sassy Token
    + Total Supply = Unlimited
    + Burnable
    + Mintable
    + Ownable

    future plan
    * Flash Mint
    * Pausable
    * Managed (AccessManaged, AccessControl)
*/

contract SassyToken is ERC20, ERC20Permit, ERC20Burnable, Ownable, ReentrancyGuard {
    // Events to be emit into blockchain for transparency
    event tokens_minted(address indexed receiver, uint256 amount);
    event tokens_permitted(address indexed spender, uint256 value);
    event withdrawalOwner(address indexed owner, uint256 amount);

    address public SassyJuggler;

    constructor(address initialOwner, address _SassyJuggler) ERC20("SassyToken", "ST") ERC20Permit("SassyToken") Ownable(initialOwner) {
        SassyJuggler = _SassyJuggler;
    }

    // will be called by SassyJuggler to reward users
    function permit_token(
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(msg.sender == SassyJuggler, "not authorized");

        address owner = owner();
        permit(owner, spender, value, deadline, v, r, s);
        transferFrom(owner, spender, value);

        emit tokens_permitted(spender, value);
    }

    function mint_token(address receiver, uint256 amount) public onlyOwner {
        amount = amount*10**18;

        _mint(receiver, amount);
        emit tokens_minted(receiver, amount);
    }

    // super
    function _withdraw() external onlyOwner nonReentrant {
        require(address(this).balance > 0, "ERC20 contract has no funds");
        payable(owner()).transfer(address(this).balance);
        // address(this).balance = 0; 
        emit withdrawalOwner(owner(), address(this).balance);
    }
}