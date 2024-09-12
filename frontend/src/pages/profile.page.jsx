import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../store/userSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const { userProfile } = useSelector(state => state.user);

    useEffect(() => {
        document.title = 'Profile'
        const getUserProfileAsync = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/api/user/user-profile/${userId}`, {}, { withCredentials: true });
                if (res.data.success) {
                    dispatch(getUserProfile(res.data.user))
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getUserProfileAsync();
    }, [userId, dispatch])

    return (
        <div className='ml-[20.5vw] w-[48.5vw] h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7'>
            {userProfile?.username}
        </div>
    )
}

export default ProfilePage;
