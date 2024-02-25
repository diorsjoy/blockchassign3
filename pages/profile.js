// profile.js
import React from 'react';
import UserProfile from '../components/UserProfile';
import FriendRequest from '../components/FriendRequest';
import WritePost from '../components/WritePost';
import PostList from '../components/PostList';

const ProfilePage = () => {
    return (
        <div>
            <h1>User Profile</h1>
            <UserProfile />
            <FriendRequest />
            <WritePost />
            <PostList />
            {/* Additional content for the profile page */}
        </div>
    );
};

export default ProfilePage;
