import React, { useEffect, useRef, useState } from 'react';
import AnimationWrapper from '../common/AnimationWrapper';
import { useSelector } from 'react-redux';
const Post = ({ post }) => {

    const { posts } = useSelector(state => state.post);
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Create an Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting); // Update state based on visibility
            },
            { threshold: 0.5 } // Video is visible when at least 50% of it is in view
        );

        if (videoRef.current) {
            observer.observe(videoRef.current); // Observe the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Cleanup observer on unmount
            }
        };
    }, []);

    useEffect(() => {
        // Play/pause video based on visibility
        if (isVisible && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <AnimationWrapper>
            <div className='relative lg:w-[30vw] w-[90vw] h-[100%] bg-white py-4 px-5 z-20'>
                <div>
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
                        <button><i className="fi fi-rs-heart sm:text-2xl text-xl"></i></button>
                        <button><i className="fi fi-rs-comment-dots sm:text-2xl text-xl"></i></button>
                        <button><i className="fi fi-rr-paper-plane sm:text-2xl text-xl"></i></button>
                    </div>
                    <div>
                        <i className="fi fi-rr-bookmark sm:text-2xl text-xl"></i>
                    </div>
                </div>

                <div className='sm:text-lg text-base'><span className='font-semibold'>{post?.likes.length}</span> likes</div>
                <div>
                    <p className='text-sm max-sm:line-clamp-2'><span className='font-semibold'>@{post?.author.username} : </span> {post?.caption}</p>
                </div>
                <button className='text-sm sm:text-xs text-gray-500 py-2 hover:underline'>view all {post?.comments.length} comments</button>
                <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 rounded-full object-cover' src={post?.author.profile_img} alt="" />
                    <input className='w-full outline-none sm:text-sm' type="text" placeholder='Add a comment...' />
                    <button className='sm:text-xl text-lg font-bold'>Post</button>
                </div>
            </div>
        </AnimationWrapper>
    );
}

export default Post;
