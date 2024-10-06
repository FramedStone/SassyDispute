// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

/* 
    Sassy Bridge (contract factory, SassyDispute deploy this smart contract for each Partner's bridge)
    - setup bridge for partner to send dispute cases here
    - cooperate with SassyEscrow to deposit/release funds
    - cooperate with SassyJuggler to setup dispute cases


    1 dispute case = 0.001 SassyToken

    1000 dispute cases = 0.8 SassyToken (20% off)
    10,000 dispute cases = 5 SassyToken (50% off)
    100,000 dispute cases = 35 SassyToken (65% off)
    more = to be discussed with partner
*/

import "./SassyEscrow.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Partner Contract
interface IPartnerContract {
    function getDisputeCases() external view returns(string[] memory _ipfsHashes);
}

contract SassyBridgeV2 is AccessControl {
    /*
        SassyBridge roles setup
    */
    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

    bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
    bytes32 private constant PARTNER = keccak256(abi.encodePacked("PARTNER"));

    /*
        SassyBridge Main Body
    */

    event disputeCasesReceived(uint256[] caseID, string[] ipfsHash, address indexed submmiter);
    event SassyEscrowCreated(address contractAddress, address deployer);

    address private owner;
    modifier onlyOwner{
        require(msg.sender == owner, "not authorized");
        _;
    }

    string[] public ipfsHashes;

    IPartnerContract public PartnerContract;

    constructor(address _owner) {
        owner = _owner;
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, ADMIN);
        _grantRole(ADMIN, owner);
    }

    // function to start bridging (Web2)
    function setBridge(
        address _payer, 
        address _payee, 
        uint256 _disputeCasesAgreed, 
        string[] memory _disputeCases,
        address _SassyToken, 
        uint256 _fundsAgreed, 
        uint256 _holdDuration
    ) external onlyRole(PARTNER) {
        require(_disputeCases.length == _disputeCasesAgreed, "Dispute cases doesn't match dispute cases agreed");

        // Calculate SassyTokens to deposit based on the number of dispute cases
        _fundsAgreed = calculateRequiredTokens(_disputeCasesAgreed);

        // Create SassyEscrow
        SassyEscrow _SassyEscrow = new SassyEscrow(_payer, _payee, _disputeCasesAgreed, _SassyToken, _fundsAgreed, _holdDuration);
        emit SassyEscrowCreated(address(_SassyEscrow), address(this));

        // Deposit Dispute Cases into SassyEscrow
        _SassyEscrow.depositDisputeCases(_disputeCases);
    }
    
    // function to start bridging (ROLES = "Partner")
    function setBridge(
        address _payer, 
        address _payee, 
        uint256 _disputeCasesAgreed, 
        address _SassyToken, 
        uint256 _fundsAgreed, 
        uint256 _holdDuration
    ) external onlyRole(PARTNER) {
        require(PartnerContract.getDisputeCases().length == _disputeCasesAgreed, "Dispute cases doesn't match dispute cases agreed || Retrieving dispute cases from contract failed, please revise getDisputeCases() function");

        // Calculate SassyTokens to deposit based on the number of dispute cases
        _fundsAgreed = calculateRequiredTokens(_disputeCasesAgreed);

        // Create SassyEscrow
        SassyEscrow _SassyEscrow = new SassyEscrow(_payer, _payee, _disputeCasesAgreed, _SassyToken, _fundsAgreed, _holdDuration);
        emit SassyEscrowCreated(address(_SassyEscrow), address(this));

        // Point to Partner's smart contract
        PartnerContract = IPartnerContract(_payee);

        // Deposit Dispute Cases into SassyEscrow
        _SassyEscrow.depositDisputeCases(PartnerContract.getDisputeCases());
    }

    // Helper function to calculate required SassyTokens based on the pricing plan
    function calculateRequiredTokens(uint256 _disputeCases) internal pure returns (uint256) {
        uint256 basePrice = 1 * 10**15; // 0.001 SassyToken per dispute case

        if (_disputeCases >= 100000) {
            // 65% off for 100,000 or more dispute cases
            return (_disputeCases * basePrice * 35) / 100;
        } else if (_disputeCases >= 10000) {
            // 50% off for 10,000 or more dispute cases
            return (_disputeCases * basePrice * 50) / 100;
        } else if (_disputeCases >= 1000) {
            // 20% off for 1,000 or more dispute cases
            return (_disputeCases * basePrice * 80) / 100;
        } else {
            // No discount for fewer than 1,000 dispute cases
            return _disputeCases * basePrice;
        }
    }

    // function to send bridge'd dispute cases back to SassyJuggler
    function getDisputeCases() external view onlyRole(ADMIN) returns(string[] memory) {
        return ipfsHashes;
    }
}