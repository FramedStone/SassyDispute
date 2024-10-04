// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

/* 
    Sassy Juggler Demo
    - interface schema for SassyBridge
    - retrieve dispute cases's ipfsHash from SassyBridge
    - reward users SassyToken for each participation

*/

import "@openzeppelin/contracts/access/AccessControl.sol";

// SassyToken.sol
interface ISassyToken {
    function permit_token(
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

// SassyBridge.sol
interface ISassyBridge{
    function getDisputeCases() external view returns(string[] memory _ipfsHashes);
}

contract SassyJuggler is AccessControl {
    /*
        SassyJuggler roles setup
    */
    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

    bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));

    /*
        SassyJuggler Main Body
    */

    event disputeCasesAdded(uint256[] caseID, string[] ipfsHash, address indexed submmiter);
    event disputeCaseInteracted(uint256 caseID, address indexed user);
    event userRewarded(address indexed user, uint256 rewardAmount);

    address private owner;
    modifier onlyOwner{
        require(msg.sender == owner, "not authorized");
        _;
    }

    struct disputeCase {
        string ipfsHash;
        address submitter;
        uint256 timestamp;
    }
    disputeCase[] public _disputeCases;

    ISassyToken public SassyToken;
    ISassyBridge public SassyBridge;
    uint256 public rewardAmount;

    // check if a user has interacted with a case
    mapping(uint256 => mapping(address => bool)) public hasJuggled;

    constructor(address _owner) {
        owner = _owner;
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, ADMIN);
        _grantRole(ADMIN, owner);
    }

    // point to SassyToken's smart contract
    function setSassyToken(address _SassyToken, uint256 _rewardAmount) public onlyOwner {
        SassyToken = ISassyToken(_SassyToken);
        rewardAmount = _rewardAmount*10**18;
    }

    function updateRewardAmount(uint256 _rewardAmount) public onlyRole(ADMIN) {
        rewardAmount = _rewardAmount*10**18;
    }

    // point to SassyBridge's smart contract
    function setSassyBridge(address _SassyBridge) public onlyRole(ADMIN) {
        SassyBridge = ISassyBridge(_SassyBridge);
    }

    // load and document dispute cases retrieved from SassyBridge
    function addDisputeCases() external onlyRole(ADMIN) {
        string[] memory disputeCases = SassyBridge.getDisputeCases();
        uint256[] memory caseIDs = new uint256[](disputeCases.length);

        for (uint256 i = 0; i < SassyBridge.getDisputeCases().length; i++) {
            _disputeCases.push(disputeCase({
                ipfsHash: disputeCases[i],
                submitter: msg.sender,
                timestamp: block.timestamp
            }));

            uint256 caseID = _disputeCases.length - 1;
            caseIDs[i] = caseID;
        }
        emit disputeCasesAdded(caseIDs, disputeCases, msg.sender);
    }

    // interact with dispute case
    function interactDisputeCase(uint256 _caseID, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public {
        require(_caseID < _disputeCases.length, "Case does not exist");
        require(!hasJuggled[_caseID][msg.sender], "User has already started a conversation with this case");
        
        hasJuggled[_caseID][msg.sender] = true;
        emit disputeCaseInteracted(_caseID, msg.sender);

        // reward user with SassyToken
        SassyToken.permit_token(msg.sender, rewardAmount, deadline, v, r, s);
        emit userRewarded(msg.sender, rewardAmount);
    }
}