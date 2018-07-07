pragma solidity 0.4.24;

import "./Manageable.sol";

contract PostPublisher is Manageable {
    uint public id;
    uint public bandwidth;

    // post id => rating score
    mapping (uint => uint) public ratings;

    // posts that will be published
    uint[] public postIds;

    constructor (uint _id, uint _bandwidth) public {
        id = _id;
        bandwidth = _bandwidth;
    }

    function setRatingForPost(uint _postId, uint _rating) public {
        require(_postId > 0);
        ratings[_postId] = _rating;
    }

    function setPostsToPublish(uint[] _postIds) public {
        postIds = _postIds;
    }
}