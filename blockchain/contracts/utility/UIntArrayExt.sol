pragma solidity ^0.4.24;

library UIntArrayExt {
    function memoryArray(uint[] storage self) internal view returns (uint[]) {
        uint[] memory array = new uint[](self.length);
        for (uint i = 0; i < self.length; i++) {
            array[i] = self[i];
        }
        return array;
    }

    /// @dev uses when sequence is trivial
    function removeAtIndex(uint[] storage self, uint index) internal {
        self[index] = self[self.length - 1];
        self.length--;
    }
}