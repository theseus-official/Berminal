pragma solidity ^0.4.24;

/**
@title Ballot
@author Ke
*/
contract Ballot {

    address manager;
    uint superNodeId = 1;
    uint voteId = 1;
    uint[] campaignerIds;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    event AddSuperNode(address idenfity, uint indexed superNodeId, uint bandwidth);
    event Voting(address voter, uint indexed voteId, uint[] votedSuperNodeId);

    mapping(address => uint[]) addressToVoteInfo;
    mapping(uint => uint[]) idToVoteInfo;

    mapping(address => SuperNode) addressToSuperNode;
    mapping(uint => SuperNode) idToSuperNode;

    struct SuperNode {
        uint id;
        uint bandwidth;
        address identify;
    }

    /**
    @notice Add a super node campaigner
    @dev Only contract owner could call this function, each super node only add once
    @param _identify The address of super node
    @param _bandwidth Bandwidth of super node
    */
    function addSuperNode(address _identify, uint _bandwidth) public onlyManager {
        require(addressToSuperNode[_identify].id == 0, "node exist");
        SuperNode memory superNode = SuperNode(superNodeId, _bandwidth, _identify);
        addressToSuperNode[_identify] = superNode;
        idToSuperNode[superNodeId] = superNode;
        emit AddSuperNode(_identify, superNodeId, _bandwidth);
        superNodeId++;
    }

    /**
    @notice Add super node campaigners
    @dev Only contract owner could call this function, each super node only add once
    @param _identifies The address of super nodes
    @param _bandwidth The bandwidth of super node
    */
    function addSuperNodes(address[] _identifies, uint[] _bandwidth) external onlyManager {
        require(_identifies.length == _bandwidth.length, "illegal input, address size not equal bandwidth size");
        for (uint i = 0; i < _identifies.length; i++) {
            addSuperNode(_identifies[i], _bandwidth[i]);
        }
    }

    /**
    @notice Voting campaigners
    @dev Each address could only vote once
    @param _superNodeIds The super nodes to vote
    */
    function voting(uint[] _superNodeIds) external {
        require(addressToVoteInfo[msg.sender].length == 0, "you have voted");
        addressToVoteInfo[msg.sender] = _superNodeIds;
        idToVoteInfo[voteId] = _superNodeIds;
        emit Voting(msg.sender, voteId, _superNodeIds);
        voteId++;
    }

    /**
    @notice Get vote information by id
    @dev Statistic after voting
    @param _id Vote id
    @return {
        "voteInfo": "super node id of this vote"
    }
    */
    function getVoteInfoById(uint _id) external view returns (uint[] voteInfo) {
        voteInfo = new uint[](superNodeId - 1);
        for (uint i = 0; i < superNodeId - 1; i++) {
            if (i < idToVoteInfo[_id].length) {
                voteInfo[i] = idToVoteInfo[_id][i];
            } else {
                break;
            }
        }
        return voteInfo;
    }

    /**
    @notice Get vote information by address
    @dev Statistic after voting
    @param _address Voter eth address
    @return {
        "voteInfo": "super node id of this vote"
    }
    */
    function getVoteInfoByAddress(address _address) external view returns (uint[] voteInfo) {
        voteInfo = new uint[](superNodeId - 1);
        for (uint i = 0; i < superNodeId - 1; i++) {
            if (i < addressToVoteInfo[_address].length) {
                voteInfo[i] = addressToVoteInfo[_address][i];
            } else {
                break;
            }
        }
        return voteInfo;
    }

    /**
    @notice Get super node desc by id
    @dev Show super node desc
    @param _id Super node id
    @return {
        "id": "super node id",
        "bandwidth": "bandwidth of this super node",
        "identify": "address of this super node"
    }
    */
    function getSuperNodeById(uint _id) external view returns (uint id, uint bandwidth, address identify) {
        SuperNode memory superNode = idToSuperNode[_id];
        return (superNode.id, superNode.bandwidth, superNode.identify);
    }

    /**
    @notice Get super node desc by address
    @dev Show super node desc
    @param _address Super node address
    @return {
        "id": "super node id",
        "bandwidth": "bandwidth of this super node",
        "identify": "address of this super node"
    }
    */
    function getSuperNodeByAddress(address _address) external view returns (uint id, uint bandwidth, address identify) {
        SuperNode memory superNode = addressToSuperNode[_address];
        return (superNode.id, superNode.bandwidth, superNode.identify);
    }

    /**
    @notice Get total campaigner of super node count
    @dev Statistic after voting
    @return {
        "superNodeCount": "total campaigner count"
    }
    */
    function getSuperNodeCount() external view returns (uint superNodeCount) {
        superNodeCount = superNodeId - 1;
    }

    /**
    @notice Get total vote count
    @dev Statistic after voting
    @return {
        "voteCount": "total vote count"
    }
    */
    function getVoteCount() external view returns (uint voteCount) {
        voteCount =  voteId - 1;
    }
}
