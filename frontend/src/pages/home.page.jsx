import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Feed from '../components/feed.component'
import SuggestedUser from '../components/suggested-user.component'
import { getSuggestedUsers } from '../store/userSlice'

const Home = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, suggestedUsers } = useSelector(state => state.user);
    const { posts } = useSelector(state => state.post);
    console.log(posts);


    const [loading, setLoading] = useState(false);
    const [tabActive, setTabActive] = useState("home");

    const getSuggestedUsersAsync = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/user/suggested-users", {
                withCredentials: true, // This ensures cookies are sent
            });
            if (res.data.success) {
                dispatch(getSuggestedUsers(res.data.users));
            } else {
                dispatch(getSuggestedUsers(null));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getSuggestedUsersAsync();
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className='w-screen flex flex-col -z-30'>
                <div className={`lg:hidden flex items-center justify-center gap-8 py-5 sticky top-0 z-50 bg-white font-mono`}>
                    <button className={`${tabActive == 'home' ? "font-bold underline" : ""}`} onClick={() => setTabActive("home")}>Home</button>
                    <button className={`${tabActive == 'users' ? "font-bold underline" : ""}`} onClick={() => setTabActive("users")}>Users</button>
                </div>

                <Feed tabActive={tabActive} />
                <SuggestedUser tabActive={tabActive} loading={loading} suggestedUsers={suggestedUsers} />
                <Outlet />
            </div >
        </>
    );
}

export default Home;
