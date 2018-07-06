pragma solidity 0.4.24;

import "./Manageable.sol";

contract PostFactory is Manageable {
    struct Post {
        uint weight;
        address publisher;
    }

    Post[] public posts;

    function createPost(uint _weight) public {
        Post memory post;
        post.weight = _weight;
        posts.push(post);
    }

    function setWightForPost(uint _postId, uint _weight) public {
        require(_postId > 0);
        Post storage post = posts[_postId - 1];
        post.weight = _weight;
    }

    function setPublisherForPost(uint _postId, address _publisher) public {
        require(_postId > 0);
        Post storage post = posts[_postId - 1];
        post.publisher = _publisher;
    }
}