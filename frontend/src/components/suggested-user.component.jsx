import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/AnimationWrapper';

const SuggestedUser = ({ loading, setLoading, tabActive }) => {
    const { user, suggestedUsers } = useSelector(state => state.user);

    return (
        <AnimationWrapper>
            <div className={`lg:ml-4 md:w-[29vw] w-screen ${tabActive == 'users' ? "flex" : "max-lg:hidden"} h-full absolute top-0 right-0 bg-[#efefef] lg:flex flex-col gap-3 items-center py-10 z-10 max-md:mt-10`}>
                <div className='relative'>
                    <div className='relative z-30 lg:w-[20vw] w-[90vw] h-16 bg-white flex items-center justify-between px-3'>
                        <Link to={`/profile/${user._id}`} className='flex items-center gap-2'>
                            <img className='w-10 h-10 rounded-full object-cover' src={user?.profile_img} alt="" />
                            <div>
                                <p className='font-semibold text-sm sm:text-xs'>@{user?.username}</p>
                                <p className='text-xs'>{user?.fullname}</p>
                            </div>
                        </Link>
                        <div>
                            <button className='font-bold text-sm sm:text-xs'>Switch</button>
                        </div>
                    </div>
                    <div className='lg:w-[20vw] w-[90vw] h-16 bg-black absolute top-2 left-2 z-0'></div>
                </div>

                <div>
                    <h1 className='lg:w-[20vw] w-[90vw] text-left font-bold my-5 text-sm sm:text-xs'>Suggested for you</h1>
                </div>
                {
                    suggestedUsers?.length === 0 && <p className='text-xl sm:text-lg font-semibold'>No suggested users</p>
                }
                {
                    !loading ? suggestedUsers?.map((sugg, index) => (
                        <AnimationWrapper key={index}>
                            <div className='relative z-30 lg:w-[20vw] w-[90vw] h-16 bg-white flex items-center justify-between px-3'>
                                <Link to={`/profile/${sugg?._id}`} className='flex items-center gap-3'>
                                    <img className='border w-10 h-10 rounded-full object-cover' src={sugg?.profile_img} alt="" />
                                    <div>
                                        <p className='font-semibold text-sm sm:text-xs'>@{sugg?.username}</p>
                                        <p className='text-xs'>{sugg?.fullname}</p>
                                    </div>
                                </Link>
                                <div>
                                    <button className='font-bold text-sm sm:text-xs'>
                                        {
                                            sugg?.followers?.includes(user?._id) ? "Following" : "Follow"
                                        }
                                    </button>
                                </div>
                            </div>
                        </AnimationWrapper>
                    )) : "Loading..."
                }

            </div>
        </AnimationWrapper>

    )
}

export default SuggestedUser
