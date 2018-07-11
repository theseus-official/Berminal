pragma solidity 0.4.24;

import "./utility/IdArray.sol";

/**
@title PostPublisher
@author Dong
*/
contract PostPublisher {
    struct SuperNode {
        string name;
        uint bandwidth;
        // post key => rating score
        mapping (bytes32 => uint) ratings;
        uint[] posts;
    }
    using IdArray for IdArray.Data;

    // id list of active super nodes
    IdArray.Data activeSuperNodes;

    // mapping super node id to super node
    mapping (uint => SuperNode) public allSuperNodes;

    /**
    @notice add the super node as publisher
    @param _snid The ID of super node
    */
    function addActiveSuperNode(uint _snid) public {
        activeSuperNodes.addId(_snid);
    }

    /**
    @notice remove the super node from publishers
    @param _snid The ID of super node
    */
    function removeActiveSuperNode(uint _snid) public {
        activeSuperNodes.removeId(_snid);
    }

    /**
    @notice get the name of super node
    @param _snid The ID of super node
    @return {
        "name": "The name of super node"
    }
    */
    function getSuperNodeName(uint _snid) public view returns (string) {
        return allSuperNodes[_snid].name;
    }

    /**
    @notice set the name of super node
    @param _snid The ID of super node
    @param _name The new name of super node
    */
    function setSuperNodeName(uint _snid, string _name) public {
        allSuperNodes[_snid].name = _name;
    }

    /**
    @notice get the bandwidth of super node
    @param _snid The ID of super node
    @return {
        "bandwidth": "The bandwidth of super node"
    }
    */
    function getSuperNodeBandwidth(uint _snid) public view returns (uint) {
        return allSuperNodes[_snid].bandwidth;
    }

    /**
    @notice set the bandwidth of super node
    @param _snid The ID of super node
    @param _bandwidth The new bandwidth of super node
    */
    function setSuperNodeBandwidth(uint _snid, uint _bandwidth) public {
        allSuperNodes[_snid].bandwidth = _bandwidth;
    }

    /**
    @notice get the rating of the post on super node
    @param _snid The ID of super node
    @param _postKey The post key
    @return  {
        "rating": "The rating of the post on super node"
    }
    */
    function getSuperNodePostRating(uint _snid, bytes32 _postKey) public view returns (uint) {
        return allSuperNodes[_snid].ratings[_postKey];
    }

    /**
    @notice set the rating of the post on super node
    @param _snid The ID of super node
    @param _postKey The post key
    @param _rating The rating of the post on super node
    */
    function setSuperNodePostRating(uint _snid, bytes32 _postKey, uint _rating) public {
        allSuperNodes[_snid].ratings[_postKey] = _rating;
    }

    /**
    @notice publish the candidate posts
    @dev according the ratings of posts, assign posts to super node in order to make the sum of ratings max
    @param _postKeys The post keys
    */
    function publishPosts(uint[] _postKeys) public {

    }
}
