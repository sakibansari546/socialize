import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post.component';
import { useDispatch, useSelector } from 'react-redux';
import { getTrandingPosts } from '../store/postSlice';

const TrandingPosts = () => {
    const dispatch = useDispatch();
    const { trandingPosts, hasMore } = useSelector(state => state.post);
    const [page, setPage] = useState(1); // Start from page 1

    // Function to fetch posts
    const fetchMorePosts = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/post/tranding-posts?page=${page}`, { withCredentials: true });
            const newPosts = res.data.posts;

            // Dispatch to Redux store
            dispatch(getTrandingPosts(newPosts));
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
        <div className={`lg:ml-[20.5vw] lg:w-[48.5vw] max-sm:px-5  w-screen h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7 pb-20`}>
            {
                trandingPosts.map((post, index) => (
                    <Post key={index} post={post} />
                ))
            }
            {hasMore ? <p>Loading more posts...</p> : <p>No more posts!</p>}
        </div>
    );
};

export default TrandingPosts;
