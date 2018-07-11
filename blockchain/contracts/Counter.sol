pragma solidity 0.4.24;

contract Counter {
    uint totalCount;
    mapping(address => uint) senderCount;

    function increase() external {
        senderCount[msg.sender]++;
        totalCount++;
    }

    function getSenderCount() external view returns (uint) {
        return senderCount[msg.sender];
    }

    function getTotalCount() external view returns (uint) {
        return totalCount;
    }
}
