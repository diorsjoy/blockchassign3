// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyNFT.sol";

contract Friendship {
    MyNFT public topWeb3NFT; // Reference to the TOPWEB3 NFT contract
    mapping(address => uint256) public friendCount;

    constructor(address _topWeb3NFT) {
        topWeb3NFT = MyNFT(_topWeb3NFT);
    }

    function addFriend(address friend, uint256 tokenId) external {
        friendCount[msg.sender]++;
        friendCount[friend]++;

        // Check if the user now has 5 or more friends
        if (friendCount[msg.sender] >= 5) {
            // Mint TOPWEB3 NFT with the specified tokenId
            topWeb3NFT.mint(msg.sender, tokenId);
        }
    }
}
