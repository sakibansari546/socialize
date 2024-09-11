import axios from 'axios'
import React, { useEffect } from 'react'
import { checkUserAuth } from '../store/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthAsync = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/user/check-auth', { withCredentials: true });
                if (res.data.success) {
                    dispatch(checkUserAuth(res.data.user));
                } else {
                    navigate('/signup');
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                navigate('/signup');
            }
        };

        checkAuthAsync();
        if (!isAuthenticated) {
            Navigate('/signup')
        }
    }, [isAuthenticated, dispatch, navigate]); // Add dependencies to avoid infinite loops

    return (
        <div>
            {user?.email || "User not found"}
        </div>
    );
}

export default Home;
