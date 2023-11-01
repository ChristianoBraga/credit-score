// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VerifyProof {
    event VerifyProof(address indexed de, string key, string proof);

    function fireVerifyProof(string calldata key, string calldata proof) public {
        emit VerifyProof(msg.sender, key, proof);
    }
}
