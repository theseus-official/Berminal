pragma solidity ^0.4.24;

///@title An array that supports removal of element
///@dev Id is a unique non-zero uint
library IdArray {
    struct Data {
        // id list
        uint[] ids;
        // mapping id to it's index in id list
        mapping(uint => uint) idIndex;
    }

    function addId(Data storage self, uint _id) internal {
        self.ids.push(_id);
        self.idIndex[_id] = self.ids.length - 1;
    }

    function removeId(Data storage self, uint _id) internal {
        (bool contains, uint index) = indexOfId(self, _id);
        require (contains);

        removeIdAtIndex(self, index);
    }

    function removeIdAtIndex(Data storage self, uint _index) internal {
        uint id = self.ids[_index];
        uint lastIdIndex = self.ids.length - 1;
        uint lastId = self.ids[lastIdIndex];

        // swap id at index with the last id
        self.ids[_index] = self.ids[lastIdIndex];
        // decrease array
        self.ids.length--;

        // adjust the last id's index
        self.idIndex[lastId] = _index;
        // set removed id's index to zero at last, so it is correct even if there is only one element
        self.idIndex[id] = 0;
    }

    function indexOfId(Data storage self, uint _id) internal view returns (bool, uint) {
        uint index = self.idIndex[_id];
        if (index == 0) {
            if (self.ids.length > 0 && _id == self.ids[0]) {
                return (true, 0);
            } else {
                return (false, 0);
            }
        } else {
            return (true, index);
        }
    }
}