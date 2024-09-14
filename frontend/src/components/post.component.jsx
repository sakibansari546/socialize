import React from 'react'
import AnimationWrapper from '../common/AnimationWrapper'

const Post = () => {
    return (
        <AnimationWrapper>

            <div className='relative lg:w-[30vw] w-[90vw]] h-[100%] bg-white py-4 px-5 z-20'>
                <div className=''>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <img className='w-10 h-10 sm:w-8 sm:h-8 rounded-full' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                            <div>
                                <h2 className='text-md sm:text-sm font-semibold'>@username</h2>
                                <p className='text-sm sm:text-xs text-gray-500'>12/21/210</p>
                            </div>
                        </div>
                        <button>
                            <i class="fi fi-bs-menu-dots text-2xl sm:text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className='my-5'>
                    <img className='w-full h-[100%] object-cover' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                </div>

                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-7'>
                        <button><i class="fi fi-rs-heart sm:text-2xl text-xl"></i></button>
                        <button><i class="fi fi-rs-comment-dots sm:text-2xl text-xl"></i></button>
                        <button><i class="fi fi-rr-paper-plane sm:text-2xl text-xl"></i></button>
                    </div>
                    <div>
                        <i class="fi fi-rr-bookmark sm:text-2xl text-xl"></i>
                    </div>
                </div>

                <div className='sm:text-lg text-base'><span className='font-semibold'>10</span> likes</div>
                <div>
                    <p className='text-sm max-sm:line-clamp-2'><span className='font-semibold'>@username : </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
                <button className='text-sm sm:text-xs text-gray-500 py-2 hover:underline'>view all 10 comments</button>
                <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 sm:w-6 sm:h-6 rounded-full' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                    <input className='w-full outline-none sm:text-sm' type="text" placeholder='Add a comment...' />
                    <button className='sm:text-xl text-lg font-bold'>Post</button>
                </div>
            </div>

        </AnimationWrapper>
    )
}

export default Post
