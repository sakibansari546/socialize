import axios from 'axios'
import React, { useEffect } from 'react'
import { checkUserAuth } from '../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user)

    return (
        <div>
            {user?.email || "User not found"}
        </div>
    );
}

export default Home;
