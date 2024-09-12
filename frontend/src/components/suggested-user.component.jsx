import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SuggestedUser = () => {
    const { user, suggestedUsers } = useSelector(state => state.user);

    return (
        <>
            <div className='ml-4 w-[29vw] h-screen fixed top-0 right-0 bg-[#efefef] flex flex-col gap-3 items-center py-10'>
                <div className='relative'>
                    <div className='relative z-30 w-[20vw] h-16 bg-white flex items-center justify-between px-3'>
                        <Link to={`/profile/${user._id}`} className='flex items-center gap-2'>
                            <img className='w-10 h-10 rounded-full object-cover' src={user?.profile_img} alt="" />
                            <div>
                                <p className='font-semibold'>@{user?.username}</p>
                                <p>{user?.fullname}</p>
                            </div>
                        </Link>
                        <div>
                            <button className='font-bold'>Switch</button>
                        </div>
                    </div>
                    <div className='w-[20vw] h-16 bg-black absolute top-2 left-2 z-0'></div>
                </div>

                <div>
                    <h1 className='w-[20vw] text-left font-bold my-5'>Suggested for you</h1>
                </div>
                {
                    suggestedUsers?.length === 0 && <p>No suggested users</p>
                }
                {
                    suggestedUsers?.map((sugg, index) => (
                        <div className='relative z-30 w-[20vw] h-16 bg-white flex items-center justify-between px-3'>
                            <Link to={`/profile/${sugg?._id}`} className='flex items-center gap-3'>
                                <img className='border w-10 h-10 rounded-full object-cover' src={sugg?.profile_img} alt="" />
                                <div>
                                    <p className='font-semibold'>@{sugg?.username}</p>
                                    <p>{sugg?.fullname}</p>
                                </div>
                            </Link>
                            <div>
                                <button className='font-bold'>Follow</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default SuggestedUser
