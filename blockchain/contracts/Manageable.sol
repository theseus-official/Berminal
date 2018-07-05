pragma solidity 0.4.24;

import "./node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./node_modules/openzeppelin-solidity/contracts/lifecycle/Destructible.sol";

contract Manageable is Pausable, Destructible {    
    event LogDebug(string text, uint code);

    address public administrator;
    address[] public operators;

    modifier onlyAdmin() {
        require(isAdministrator());
        _;
    }

    modifier adminOrHigher() {
        require(isAdministrator() || isOwner());
        _;
    }

    modifier onlyOperator() {
        require(isOperator());
        _;
    }

    modifier operatorOrHigher() {
        require(isOperator() || isAdministrator() || isOwner());
        _;
    }

    function setAdministrator(address _administrator) public onlyOwner {
        administrator = _administrator;
    }

    function getOperators() public view returns (address[]) {
        uint count = operators.length;
        address[] memory array = new address[](count);
        for (uint i = 0; i < count; i++) {
            array[i] = operators[i];
        }
        return array;
    }

    function addOperator(address _operator) public adminOrHigher {
        (bool contains,) = containsOperator(_operator);
        if (!contains) {
            operators.push(_operator);
        }
    }

    function removeOperator(address _operator) public adminOrHigher {
        (bool contains, uint index) = containsOperator(_operator);
        if (contains) {
            operators[index] = operators[operators.length - 1];
            operators.length--;
        }
    }

    function containsOperator(address _operators) private view returns (bool, uint) {
        for (uint i = 0; i < operators.length; i++) {
            if (_operators == operators[i]) {
                return (true, i);
            }
        }
        return (false, 0);
    }

    function isOwner() private view returns (bool) {
        return msg.sender == owner;
    }

    function isAdministrator() private view returns (bool) {
        return msg.sender == administrator;
    }

    function isOperator() private view returns (bool) {
        (bool contains,) = containsOperator(msg.sender);
        return contains;
    }
}