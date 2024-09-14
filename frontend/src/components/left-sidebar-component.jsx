import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logout } from '../store/userSlice'
import { toast } from 'sonner'
import AnimationWrapper from '../common/AnimationWrapper'
const sidebarItems = [
    { icon: 'fi-rs-house-chimney', text: 'Home' },
    { icon: 'fi-bs-search', text: 'Search' },
    { icon: 'fi-br-arrow-trend-up', text: 'Explore' },
    { icon: 'fi-rr-square-plus', text: 'Create' },
    { icon: 'fi-rr-comment-alt-dots', text: 'Message' },
    { icon: 'fi-rr-bell', text: 'Notification' },
    { icon: 'fi-bs-sign-out-alt', text: 'Logout' },
]

const LeftSideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(state => state.user);

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/logout', {}, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                dispatch(logout())
                toast.success("Logged out successfully!")
                navigate('/signin');
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <AnimationWrapper>
            {/* Sidebar for large screens */}
            <div>
                <div className='w-[20vw] h-screen fixed left-0 top-0 bg-[#ffffff] hidden lg:grid'>
                    <h1 className='text-3xl font-mono font-bold text-center py-8'>SocialiZe</h1>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Home</span>
                                <div>
                                    <i className='fi fi-rs-house-chimney mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/' && (
                                <div className='w-full h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/search'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Search</span>
                                <div>
                                    <i className='fi fi-bs-search mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/search' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/explore'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Explore</span>
                                <div>
                                    <i className='fi fi-br-arrow-trend-up mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/explore' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/create'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Create</span>
                                <div>
                                    <i className='fi fi-rr-square-plus mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/create' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/message'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Message</span>
                                <div>
                                    <i className='fi fi-rr-comment-alt-dots mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/message' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={'/notification'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Notification</span>
                                <div>
                                    <i className='fi fi-rr-bell mt-1'></i>
                                </div>
                            </Link>
                            {location.pathname === '/notification' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <Link to={`/profile/${user?._id}`} className='absolute z-50 w-full h-full flex px-16 items-center justify-between text-xl'>
                                <img className='w-10 h-10 rounded-full object-cover' src={user?.profile_img} alt="" />
                                <span className='text-md'>@{user?.username}</span>
                            </Link>
                            {location.pathname === `/profile/${user?._id}` && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white hover:bg-[#efefef] transition-all duration-300 flex items-center justify-start'>
                            <div className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span className='md:hidden lg:flex'>Logout</span>
                                <button onClick={handleLogout}>
                                    <i className='fi fi-bs-sign-out-alt mt-1'></i>
                                </button>
                            </div>
                            {location.pathname === '/logout' && (
                                <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom navigation for medium and small screens */}
            <div className='lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white flex justify-around items-center shadow-md z-50'>
                <Link to={'/'} className='w-16 h-full flex flex-col items-center justify-center'>
                    <i className='fi fi-rs-house-chimney'></i>
                </Link>
                <Link to={'/search'} className='w-16 h-full flex flex-col items-center justify-center'>
                    <i className='fi fi-bs-search'></i>
                </Link>
                <Link to={'/create'} className='w-16 h-full flex flex-col items-center justify-center'>
                    <i className='fi fi-rr-square-plus'></i>
                </Link>
                <Link to={'/explore'} className='w-16 h-full flex flex-col items-center justify-center'>
                    <i className='fi fi-br-arrow-trend-up'></i>
                </Link>
                <Link to={'/message'} className='w-16 h-full flex flex-col items-center justify-center'>
                    <i className='fi fi-rr-comment-alt-dots '></i>
                </Link>
                <Link to={`/profile/${user?._id}`} className='w-16 h-full flex flex-col items-center justify-center'>
                    <img className='w-8 h-8 rounded-full object-cover' src={user?.profile_img} alt="" />
                </Link>
            </div>

            <Outlet />
        </AnimationWrapper>


    )
}

export default LeftSideBar
