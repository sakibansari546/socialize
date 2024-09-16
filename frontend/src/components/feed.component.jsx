import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post.component';
import { useDispatch } from 'react-redux';

import { fetchPosts } from '../store/postSlice';

const Feed = ({ tabActive }) => {
    const dispatch = useDispatch()

    const [postsStat, setPosts] = useState([]); // Local state for posts
    const [page, setPage] = useState(1); // Start from page 1
    const [hasMore, setHasMore] = useState(true); // To check if there are more posts to load

    // Function to fetch posts
    const fetchMorePosts = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/post/get-posts?page=${page}`, { withCredentials: true });
            const newPosts = res.data.posts;

            // Check if newPosts already exist in postsStat
            if (newPosts.length === 0) {
                setHasMore(false); // No more posts to load
            } else {
                setPosts(prevPosts => [...prevPosts, ...newPosts]); // Merge new posts
                // dispatch(fetchPosts(newPosts))
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMorePosts(); // Fetch posts when component mounts or page changes
    }, [page]);

    // Infinite scroll logic
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && hasMore) {
            setPage(prevPage => prevPage + 1); // Load the next page when user scrolls near bottom
        }
    };

    // Adding scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <>
            <div className={`lg:ml-[20.5vw] lg:w-[48.5vw] max-sm:px-5 ${tabActive == 'home' ? "flex" : "max-lg:hidden"} w-screen h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7 pb-20`}>
                {
                    postsStat.map((post, index) => (
                        <Post key={index} post={post} />
                    ))
                }
                {hasMore ? <p>Loading more posts...</p> : <p>No more posts!</p>}
            </div>
        </>
    );
};

export default Feed;
