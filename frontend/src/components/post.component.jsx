import React from 'react'

const Post = () => {
    return (
        <div>
            <div className='relative w-[30vw] h-[100%] bg-white py-4 px-5'>
                <div className=''>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <img className='w-10 h-10 rounded-full' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                            <div>
                                <h2 className='text-md font-semibold'>@username</h2>
                                <p className='text-sm text-gray-500'>12/21/210</p>
                            </div>
                        </div>
                        <button>
                            <i class="fi fi-bs-menu-dots text-2xl"></i>
                        </button>
                    </div>
                </div>

                <div className='my-5'>
                    <img className='w-full h-[100%] object-cover' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                </div>

                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-7'>
                        <button><i class="fi fi-rs-heart text-2xl"></i></button>
                        <button><i class="fi fi-rs-comment-dots text-2xl"></i></button>
                        <button><i class="fi fi-rr-paper-plane text-2xl"></i></button>
                    </div>
                    <div>
                        <i class="fi fi-rr-bookmark text-2xl"></i>
                    </div>
                </div>
                <div className='text-lg'><span className='font-semibold'>10</span> likes</div>
                <div>
                    <p><span className='font-semibold'>@username : </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
                <button className='text-sm text-gray-500 py-2 hover:underline'>view all 10 comments</button>
                <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 rounded-full' src="https://xsgames.co/randomusers/avatar.php?g=female" alt="" />
                    <input className='w-full outline-none' type="text" placeholder='Add a comment...' />
                    <button className='text-xl font-bold'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post
