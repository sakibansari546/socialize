import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Feed from '../components/feed.component'
import SuggestedUser from '../components/suggested-user.component'

const Home = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user)

    return (
        <>
            <div className=' flex '>
                <Feed />
                <SuggestedUser />
            </div>
        </>
    );
}

export default Home;
