pragma solidity 0.4.24;

import "./Manageable.sol";

contract PostFactory is Manageable {
    struct Post {
        uint weight;
        uint publisherId;
    }

    uint public nextPostId = 1;

    // mapping post id to post
    mapping (uint => Post) public posts;

    function createPost(uint _weight) public {
        uint postId = nextPostId++;
        setWightForPost(postId, _weight);
    }

    function setWightForPost(uint _postId, uint _weight) public {
        posts[_postId].weight = _weight;
    }

    function setPublisherForPost(uint _postId, uint _publisherId) public {
        posts[_postId].publisherId = _publisherId;
    }
}