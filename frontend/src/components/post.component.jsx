import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import AnimationWrapper from '../common/AnimationWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { likeOrNot, postSavedOrNot, updateTrandingPosts } from '../store/postSlice';
import { toast } from 'sonner';

const Post = ({ post }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { posts, trandingPosts } = useSelector(state => state.post);

    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
    const [isSaved, setIsSaved] = useState(post?.saved?.includes(user._id));

    const handleLikeOrNot = async () => {
        try {
            // Optimistically toggle like status
            setIsLiked(!isLiked);

            // Create a copy of posts array and update the specific post's likes
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return {
                        ...p, // Copy the post object
                        likes: isLiked
                            ? p.likes.filter((id) => id !== user._id) // Remove like
                            : [...p.likes, user._id], // Add like
                    };
                }
                return p;
            });

            // Dispatch to update Redux state immediately
            dispatch(likeOrNot(updatedPosts));
            // dispatch(postSavedOrNot(updatedPosts));
            // dispatch(updateTra   ndingPosts(updatedPosts));

            // Call API to actually like/unlike on the server
            const res = await axios.post(
                `http://localhost:3000/api/post/like-dislike/${post._id}`,
                { userId: user._id },
                { withCredentials: true }
            );

            // If server fails, rollback the change
            if (!res.data.success) {
                setIsLiked(!isLiked); // Reverse the optimistic update
                toast.error(res.data.message || 'Something went wrong!');
            }
        } catch (error) {
            // Rollback the like status in case of error
            setIsLiked(!isLiked);
            console.error('Error liking/unliking the post:', error);
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    const handleSavedPost = async () => {
        try {
            // Optimistically toggle save status
            setIsSaved(!isSaved);

            // Create a copy of posts array and update the specific post's saved status
            const updatedPosts = posts.map((p) => {
                // Ensure saved is always an array
                const savedIds = Array.isArray(p.saved) ? p.saved : [];

                if (p._id === post._id) {
                    return {
                        ...p, // Copy the post object
                        saved: isSaved
                            ? savedIds.filter((id) => id !== user._id) // Remove save
                            : [...savedIds, user._id], // Add save
                    };
                }
                return p;
            });

            // Dispatch to update Redux state immediately
            dispatch(postSavedOrNot(updatedPosts));
            // dispatch(updateTrandingPosts(updatedPosts));

            // Call API to actually save/unsave on the server
            const res = await axios.post(
                `http://localhost:3000/api/post/saved-unsaved/${post._id}`,
                { userId: user._id },
                { withCredentials: true }
            );

            // If server fails, rollback the change
            if (!res.data.success) {
                setIsSaved(!isSaved); // Reverse the optimistic update
                toast.error(res.data.message || 'Something went wrong!');
            }
        } catch (error) {
            // Rollback the save status in case of error
            setIsSaved(!isSaved);
            console.error('Error saving/unsaving the post:', error);
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <AnimationWrapper>
            <div className='relative lg:w-[30vw] w-[90vw] h-[100%] bg-white py-4 px-5 z-20'>
                <div className='flex gap-4 items-center justify-between'>
                    <div className='flex gap-3 items-center'>
                        <img className='w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover' src={post?.author.profile_img} alt="" />
                        <div>
                            <h2 className='text-md sm:text-sm font-semibold'>@{post?.author.username}</h2>
                            <p className='text-sm sm:text-xs text-gray-500'>{post?.author.fullname}</p>
                        </div>
                    </div>
                    <button>
                        <i className="fi fi-bs-menu-dots text-2xl sm:text-xl"></i>
                    </button>
                </div>

                <div className='my-5'>
                    {post?.type === 'post' ? (
                        <img className='w-full h-[100%] object-cover' src={post?.post} alt='' />
                    ) : (
                        <video
                            ref={videoRef}
                            className='w-full h-[50%] object-cover'
                            src={post?.post}
                            loop
                        />
                    )}
                </div>

                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-7'>
                        <button onClick={handleLikeOrNot}>
                            {isLiked ? <i className="fi fi-sr-heart sm:text-2xl text-xl text-red-500"></i> : <i className="fi fi-rr-heart sm:text-2xl text-xl"></i>}
                        </button>
                        <button><i className="fi fi-rs-comment-dots sm:text-2xl text-xl"></i></button>
                        <button><i className="fi fi-rr-paper-plane sm:text-2xl text-xl"></i></button>
                    </div>
                    <div>
                        <button onClick={handleSavedPost}>
                            {isSaved ? <i className="fi fi-sr-bookmark sm:text-2xl text-xl text-yellow-500"></i> : <i className="fi fi-rr-bookmark sm:text-2xl text-xl"></i>}
                        </button>
                    </div>
                </div>

                <div className='sm:text-lg text-base'><span className='font-semibold'>{post?.likes.length}</span> likes</div>
                <div>
                    <p className='text-sm max-sm:line-clamp-2'>
                        <span className='font-semibold'>@{post?.author.username} : </span> {post?.caption}
                    </p>
                </div>
                <button className='text-sm sm:text-xs text-gray-500 py-2 hover:underline'>
                    View all {post?.comments.length} comments
                </button>
                <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 rounded-full object-cover' src={user.profile_img} alt="" />
                    <input className='w-full outline-none sm:text-sm' type="text" placeholder='Add a comment...' />
                    <button className='sm:text-xl text-lg font-bold'>Post</button>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default Post;
