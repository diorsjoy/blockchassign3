// PostList.js
import React, { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

const PostList = () => {
    const { isAuthenticated, Moralis } = useMoralis();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (isAuthenticated) {
                try {
                    const query = new Moralis.Query('Post');
                    // Additional logic to filter posts based on visibility and ownership
                    const results = await query.find();
                    setPosts(results);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        };

        fetchPosts();
    }, [isAuthenticated, Moralis.User]);

    return (
        <div>
            <h3>Posts</h3>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.get('content')}</p>
                    {/* Additional information about the post */}
                </div>
            ))}
        </div>
    );
};

export default PostList;
