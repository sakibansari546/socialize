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

    const [loading, setLoading] = useState(false)

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
            <div className='flex '>
                <Feed />
                <SuggestedUser loading={loading} suggestedUsers={suggestedUsers} />
            </div>
        </>
    );
}

export default Home;
