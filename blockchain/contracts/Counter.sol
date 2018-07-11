pragma solidity 0.4.24;

contract Counter {
    uint count = 0;

    function increase() external {
        count++;
    }

    function getCount() external view returns (uint) {
        return count;
    }
}
