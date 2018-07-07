pragma solidity 0.4.24;

import "./Manageable.sol";

contract PostPublisher is Manageable {
    uint public id;
    string public name;
    uint public bandwidth;

    // post key => rating score
    mapping (bytes32 => uint) public ratings;

    // posts that will be published
    bytes32[] public postKeys;

    constructor (uint _id, string _name, uint _bandwidth) public {
        id = _id;
        name = _name;
        bandwidth = _bandwidth;
    }

    function setRatingForPost(bytes32 _postKey, uint _rating) public {
        ratings[_postKey] = _rating;
    }

    function setPostsToPublish(bytes32[] _postKeys) public {
        postKeys = _postKeys;
    }
}