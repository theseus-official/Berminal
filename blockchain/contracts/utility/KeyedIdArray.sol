pragma solidity ^0.4.24;

import "./UIntArrayExt.sol";

///@dev Id is a unique non-zero uint
library KeyedIdArray {
    struct Data {
        mapping (bytes32 => uint[]) ids;
        // mapping id to id index
        mapping (bytes32 => mapping(uint => uint)) idIndex;
    }

    function addIdForKey(Data storage self, bytes32 _key, uint _id) internal {
        self.ids[_key].push(_id);
        self.idIndex[_key][_id] = self.ids[_key].length - 1;
    }

    function removeIdForKey(Data storage self, bytes32 _key, uint _id) internal {
        (bool contains, uint index) = indexOfIdForKey(self, _key, _id);
        require (contains);

        removeIdAtIndexForKey(self, _key, index);
    }

    function removeIdAtIndexForKey(Data storage self, bytes32 _key, uint _index) internal {
        uint id = self.ids[_key][_index];
        uint lastIdIndex = self.ids[_key].length - 1;
        uint lastId = self.ids[_key][lastIdIndex];

        // swap id at index with the last id
        self.ids[_key][_index] = self.ids[_key][lastIdIndex];
        // decrease array
        self.ids[_key].length--;

        // adjust the last id's index
        self.idIndex[_key][lastId] = _index;
        // set removed id's index to zero at last, so it is correct even if there is only one element
        self.idIndex[_key][id] = 0;
    }

    function indexOfIdForKey(Data storage self, bytes32 _key, uint _id) internal view returns (bool, uint) {
        uint index = self.idIndex[_key][_id];
        if (index == 0) {
            if (self.ids[_key].length > 0 && _id == self.ids[_key][0]) {
                return (true, 0);
            } else {
                return (false, 0);
            }
        } else {
            return (true, index);
        }
    }
}