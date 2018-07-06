pragma solidity ^0.4.24;

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

    event AddSuperNode(address idenfity, uint superNodeId, uint bandwidth);
    event Voting(address voter, uint voteId, uint[] votedSuperNodeId);

    mapping(address => uint[]) addressToVoteInfo;
    mapping(uint => uint[]) idToVoteInfo;

    mapping(address => SuperNode) addressToSuperNode;
    mapping(uint => SuperNode) idToSuperNode;

    struct SuperNode {
        uint id;
        uint bandwidth;
        address identify;
    }

    function addSuperNode(address _identify, uint _bandwidth) public onlyManager {
        require(addressToSuperNode[_identify].id == 0, "node exist");
        SuperNode memory superNode = SuperNode(superNodeId, _bandwidth, _identify);
        addressToSuperNode[_identify] = superNode;
        idToSuperNode[superNodeId] = superNode;
        emit AddSuperNode(_identify, superNodeId, _bandwidth);
        superNodeId++;
    }

    function addSuperNodes(address[] _identifies, uint[] _bandwidth) external onlyManager {
        require(_identifies.length == _bandwidth.length, "illegal input, address size not equal bandwidth size");
        for (uint i = 0; i < _identifies.length; i++) {
            addSuperNode(_identifies[i], _bandwidth[i]);
        }
    }

    function voting(uint[] _superNodeIds) external {
        require(addressToVoteInfo[msg.sender].length == 0, "you have voted");
        addressToVoteInfo[msg.sender] = _superNodeIds;
        idToVoteInfo[voteId] = _superNodeIds;
        emit Voting(msg.sender, voteId, _superNodeIds);
        voteId++;
    }

    function getVoteInfoById(uint _id) external view returns (uint[]) {
        uint[] memory voteInfo = new uint[](superNodeId - 1);
        for (uint i = 0; i < superNodeId - 1; i++) {
            voteInfo[i] = idToVoteInfo[_id][i];
        }
        return voteInfo;
    }

    function getVoteInfoByAddress(address _address) external view returns (uint[]) {
        uint[] memory voteInfo = new uint[](superNodeId - 1);
        for (uint i = 0; i < superNodeId - 1; i++) {
            voteInfo[i] = addressToVoteInfo[_address][i];
        }
        return voteInfo;
    }

    function getSuperNodeById(uint _id) external view returns (uint id, uint bandwidth, address identify) {
        SuperNode memory superNode = idToSuperNode[_id];
        return (superNode.id, superNode.bandwidth, superNode.identify);
    }

    function getSuperNodeByAddress(address _address) external view returns (uint id, uint bandwidth, address identify) {
        SuperNode memory superNode = addressToSuperNode[_address];
        return (superNode.id, superNode.bandwidth, superNode.identify);
    }

    function getSuperNodeCount() external view returns (uint) {
        return superNodeId - 1;
    }

    function getVoteCount() external view returns (uint) {
        return voteId - 1;
    }
}
