pragma solidity 0.4.24;

import "./Manageable.sol";
import "./utility/KeyedIdArray.sol";

contract UserFactory is Manageable {
    struct User {
        uint[] voteeIds;
        uint bandwidth;
        uint[] postIds;
    }

    User[] public users;

    function getUsersCount() public view returns (uint) {
        return users.length;
    }

    function getUser(uint _userId) public view returns (uint[], uint, uint[]) {
        require(_userId > 0);
        User storage user = users[_userId - 1];
        return (user.voteeIds, user.bandwidth, user.postIds);
    }

    function createUser(uint _bandwidth) public {
        User memory user;
        user.bandwidth = _bandwidth;
        users.push(user);
    }

    function vote(uint _voterId, uint[] _voteeIds) public {
        require(_voterId > 0);
        User storage voter = users[_voterId - 1];
        voter.voteeIds = _voteeIds;
    }

    function setPostsForUser(uint _userId, uint[] _postIds) public {
        require(_userId > 0);
        User storage user = users[_userId - 1];
        user.postIds = _postIds;
    }
}