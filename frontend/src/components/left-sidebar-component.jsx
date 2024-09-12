import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logout } from '../store/userSlice'
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
                navigate('/signin');
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <>
            <div>
                <div className='w-[20vw] h-screen fixed left-0 top-0 bg-[#efefef]'>
                    <h1 className='text-3xl font-mono font-bold text-center py-8'>SocialiZe</h1>

                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link to={'/'} className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Home</span>
                                <div>
                                    <i className={`fi fi-rs-house-chimney mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Search</span>
                                <div>
                                    <i className={`fi fi-bs-search mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/search' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Explore</span>
                                <div>
                                    <i className={`fi fi-br-arrow-trend-up mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/explore' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Create</span>
                                <div>
                                    <i className={`fi fi-rr-square-plus mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/create' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Message</span>
                                <div>
                                    <i className={`fi fi-rr-comment-alt-dots mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/message' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Notification</span>
                                <div>
                                    <i className={`fi fi-rr-bell mt-1`}></i>
                                </div>
                            </Link>
                            {
                                location.pathname === '/notification' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <Link to={`/profile/${user._id}`} className='absolute z-50 w-full h-full flex px-24 items-center justify-between text-xl'>
                                <img className='w-8 h-8 rounded-full' src={user?.profile_img} alt="" />
                                <span>{user?.username}</span>
                            </Link>
                            {
                                location.pathname === `/profile/${user._id}` && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>
                    <div className='w-full h-16 mb-2'>
                        <div className='relative w-full h-full bg-white flex items-center justify-start'>
                            <div className='absolute z-50 w-full h-full flex px-20 items-center justify-between text-xl'>
                                <span>Logout</span>
                                <button onClick={handleLogout}>
                                    <i className={`fi fi-bs-sign-out-alt mt-1`}></i>
                                </button>
                            </div>
                            {
                                location.pathname === '/logout' && <div className='w-[20vw] h-16 absolute top-2 left-2 transition-all duration-300 bg-black -z-20'></div>
                            }
                        </div>
                    </div>


                </div>
            </div>
            <Outlet />
        </>
    )
}

export default LeftSideBar
