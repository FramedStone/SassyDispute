// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

/* 
    Sassy Escrow
    - setup T&C schema for dispute cases
    - hold and release funds based on T&C
    - Manual and Auto release/return funds
*/
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SassyEscrow {
    address public escrowAgent;
    address public payer;
    address public payee;

    uint256 public disputeCasesAgreed;
    string[] public disputeCasesHolding;

    uint256 public fundsAgreed;
    uint256 public fundsHolding;

    IERC20 public token;

    uint256 public releaseTimestamp;

    bool public isDeposited;

    modifier onlyEscrowAgent{
        require(msg.sender == escrowAgent, "not authorized");
        _;
    }

    modifier onlyPayer{
        require(msg.sender == payer, "not authorized");
        _;
    }

    modifier onlyPayee {
        require(msg.sender == payee, "not authorized");
        _;
    }

    constructor(address _payer, address _payee, uint256 _disputeCasesAgreed, address _tokenAddress, uint256 _fundsAgreed, uint256 _holdDuration) {
        escrowAgent = msg.sender;
        payer = _payer;
        payee = _payee;
        disputeCasesAgreed = _disputeCasesAgreed;
        token = IERC20(_tokenAddress); // Initialize SassyToken's smart contract
        fundsAgreed = _fundsAgreed;
        releaseTimestamp = block.timestamp + _holdDuration;
    }

    // payee deposit DisputeCases
    function depositDisputeCases(string[] memory _disputeCases) external onlyPayee {
        disputeCasesHolding = _disputeCases;
    }

    // payer deposit SassyTokens
    function depositFunds(uint256 _amount) external onlyPayer {
        require(!isDeposited, "Funds already deposited");
        require(fundsAgreed == _amount, "Current funds doesn't match initial agreed funds");

        isDeposited = true;

        require(token.transferFrom(payer, address(this), fundsHolding), "Tokens deposit failed");
    }

    function releaseFunds() external onlyEscrowAgent {
        require(isDeposited, "No funds deposited");
        require(block.timestamp >= releaseTimestamp, "Funds are still held");

        if (isDeposited && block.timestamp >= releaseTimestamp) {
            if (disputeCasesHolding.length == disputeCasesAgreed) {
                // Automatically release funds to payee
                _releaseFunds();
            } else {
                // Automatically return funds to payer
                _returnFunds();
            }
        }
    }

    function _releaseFunds() internal {
        // Transfer the funds to the payee
        require(token.transfer(payee, fundsHolding), "Funds release failed");
        
        // Reset state
        isDeposited = false;
        fundsHolding = 0;
        revert("Deposited dispute cases match initial agreed dispute cases, funds are sent to payee");
    }

    function _returnFunds() internal {
        require(isDeposited, "No funds deposited");

        // Transfer the funds back to the payer
        require(token.transfer(payer, fundsHolding), "Funds return failed");

        // Reset state
        isDeposited = false;
        fundsHolding = 0;
        revert("Deposited dispute cases didn't match initial agreed dispute cases, funds are returned back to payer");
    }
}