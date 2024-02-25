// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct UserProfile {
        string name;
        string bio;
        address profilePictureNFT;
        address[] friends;
        address[] friendRequests;
        bool isRegistered;
    }

    mapping(address => UserProfile) public users;

    event FriendRequestSent(address indexed from, address indexed to);
    event FriendRequestAccepted(address indexed from, address indexed to);

    function registerUser(string memory _name, string memory _bio) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = UserProfile(_name, _bio, address(0), new address[](0), new address[](0), true);
    }

    function sendFriendRequest(address _to) external {
        require(users[_to].isRegistered, "Recipient not registered");
        require(!isFriend(msg.sender, _to), "Already friends");

        users[_to].friendRequests.push(msg.sender);
        emit FriendRequestSent(msg.sender, _to);
    }

    function acceptFriendRequest(address _from) external {
        require(users[_from].isRegistered, "Sender not registered");
        require(!isFriend(msg.sender, _from), "Already friends");

        users[msg.sender].friends.push(_from);
        users[_from].friends.push(msg.sender);

        removeFriendRequest(_from, msg.sender);

        emit FriendRequestAccepted(_from, msg.sender);
    }

    function getFriendRequests() external view returns (address[] memory) {
        return users[msg.sender].friendRequests;
    }

    function getFriends() external view returns (address[] memory) {
        return users[msg.sender].friends;
    }

    function isFriend(address _user, address _friend) public view returns (bool) {
        for (uint256 i = 0; i < users[_user].friends.length; i++) {
            if (users[_user].friends[i] == _friend) {
                return true;
            }
        }
        return false;
    }

    function removeFriendRequest(address _from, address _to) internal {
        for (uint256 i = 0; i < users[_to].friendRequests.length; i++) {
            if (users[_to].friendRequests[i] == _from) {
                delete users[_to].friendRequests[i];
                break;
            }
        }
    }
}
