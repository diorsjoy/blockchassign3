// WritePost.js
import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';

const WritePost = () => {
    const { isAuthenticated, Moralis } = useMoralis();
    const [postContent, setPostContent] = useState('');

    const handlePost = async () => {
        if (!postContent.trim()) {
            // Handle empty post content
            return;
        }

        try {
            const Post = Moralis.Object.extend('Post');
            const newPost = new Post();
            newPost.set('content', postContent);
            newPost.set('user', Moralis.User.current());
            // Additional logic to set post visibility or ownership
            await newPost.save();

            // Clear the input field
            setPostContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h3>Write a Post</h3>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="What's on your mind?"
                    />
                    <button onClick={handlePost}>Post</button>
                </div>
            ) : null}
        </div>
    );
};

export default WritePost;
