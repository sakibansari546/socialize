import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { set, useForm } from 'react-hook-form';

import { Link, useParams } from 'react-router-dom';
import { editUser, getUserProfile } from '../store/userSlice';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import InputBox from '../components/input.conponent';
import BtnLoader from '../components/btn-loader.components';
import { toast } from 'sonner';
import AnimationWrapper from '../common/AnimationWrapper';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const inputRef = useRef();

    const { user, userProfile } = useSelector(state => state.user);
    const { handleSubmit, register, reset } = useForm()

    const [isFocus, setIsFocus] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(user?.following.includes(userId))

    // Handle image change
    const handleImageChange = () => {
        inputRef.current.click(); // Opens the file input dialog
    }

    const handleFileInput = async () => {
        const file = inputRef.current.files[0];
        if (file) {
            setImageFile(file);
            console.log(file);
        }
    }

    const handleFormSubmit = async (data) => {
        try {
            const formData = new FormData();
            if (data.bio.length > 100) {
                toast.error('Bio should be less than 100 characters');
                return;
            }

            // Append the selected image file and form fields
            if (imageFile) {
                formData.append('profileImage', imageFile);
            }
            formData.append('username', data.username);
            formData.append('fullname', data.fullname);
            formData.append('bio', data.bio);

            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/user/edit-profile`, formData, { withCredentials: true });
            if (res.data.success) {
                dispatch(editUser(res.data.user));
                dispatch(getUserProfile(res.data.user));
                reset();
                toast.success('Profile updated successfully');
                setIsDialogOpen(false); // Close the dialog
            }
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


    const handleFollowOrUnfollow = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/user/follow-unfollow/${userId}`, {}, { withCredentials: true });
            if (res.data.success) {
                // Update the local state to reflect follow/unfollow action
                setIsFollowing((prev) => !prev);

                // Update the followers list locally
                const updatedFollowers = isFollowing
                    ? userProfile.followers.filter(id => id !== user._id.toString()) // Remove follower on unfollow
                    : [...userProfile.followers, user._id]; // Add follower on follow
                dispatch(getUserProfile({ ...userProfile, followers: updatedFollowers }));
            } else {
                toast.error(res.data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        document.title = 'Profile'
        const getUserProfileAsync = async () => {
            try {
                const res = await axios.post(`http://localhost:3000/api/user/user-profile/${userId}`, {}, { withCredentials: true });
                if (res.data.success) {
                    dispatch(getUserProfile(res.data.user));
                    setIsFollowing(res.data.user.followers.includes(user._id));
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getUserProfileAsync();
    }, [userId, dispatch])


    return (
        <>
            <div className='lg:ml-[20.5vw] w-[78.vw] h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7'>
                <div className="w-full flex flex-col items-center py-10">
                    <AnimationWrapper>
                        <div className="flex flex-col md:flex-row items-center md:items-center lg:gap-12 mb-3">
                            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40">
                                <AvatarImage className='object-cover' src={userProfile?.profile_img} alt="Profile picture" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row justify-start lg:gap-10 items-center mb-4 my-4">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-0">@{userProfile?.username}</h1>
                                    <div className="space-x-2">
                                        {userProfile?._id === user?._id && (
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button onClick={() => setIsDialogOpen(true)} variant="outline">Edit Profile</Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-[90vw] sm:w-[70vw] flex items-center flex-col">
                                                    {/* Edit Profile form code */}
                                                    <DialogContent className="w-[90vw] sm:w-[70vw] flex items-center flex-col">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit profile</DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to your profile here. Click save when you're done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <form onSubmit={handleSubmit(handleFormSubmit)} >
                                                            <div className="grid gap-4 py-4">
                                                                <div className=''>
                                                                    <input ref={inputRef} onChange={handleFileInput} type="file" hidden />
                                                                    <div className='relative flex items-center justify-center'>
                                                                        <img className='w-20 h-20 rounded-full object-cover' src={imageFile ? URL.createObjectURL(imageFile) : userProfile.profile_img} alt="" />
                                                                        <button type='button' onClick={handleImageChange} className='w-6 h-6 bg-gray-500 rounded-full absolute lg:bottom-1 lg:right-[10vw] bottom-0 right-[33.5vw]'>
                                                                            <i className="fi fi-rc-pencil text-white text-lg"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <Input type='text' {...register("username")} defaultValue={userProfile.username} placeholder='username...' />
                                                                </div>
                                                                <div className="">
                                                                    <Input type='text' {...register("fullname")} defaultValue={userProfile.fullname} placeholder='Fullname...' />
                                                                </div>
                                                                <div className="">
                                                                    <div className='relative w-[90vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-17'>
                                                                        <div className='relative w-full h-full'>
                                                                            <textarea
                                                                                {...register("bio")}
                                                                                defaultValue={userProfile.bio}
                                                                                className='w-full h-full px-4 relative z-20 border'
                                                                                placeholder='Bio...'
                                                                                onFocus={() => setIsFocus(true)}
                                                                                onBlurCapture={() => setIsFocus(false)}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Error */}
                                                                {error && <p className='text-red-500 font-semibold text-left w-full my-0 py-0'>{error}</p>}
                                                            </div>
                                                            <DialogFooter>
                                                                <button
                                                                    type='submit'
                                                                    disabled={loading}
                                                                    className='relative cursor-pointer z-10 w-[90vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10 flex items-center justify-center bg-white font-mono font-semibold text-lg rounded-md border-2 border-black disabled:cursor-not-allowed disabled:bg-[#efefef]'
                                                                >
                                                                    {
                                                                        loading ? <BtnLoader /> : 'Save changes'
                                                                    }
                                                                </button>
                                                            </DialogFooter>
                                                        </form>
                                                    </DialogContent>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                        {
                                            user?._id === userProfile?._id ? "" :
                                                isFollowing ? <Button onClick={handleFollowOrUnfollow} variant='outline'>Unfollow</Button> : <Button onClick={handleFollowOrUnfollow}   >Follow</Button>
                                        }
                                        <Button variant="outline">Message</Button>
                                    </div>
                                </div>
                                <div className="flex justify-center md:justify-start space-x-4 text-sm sm:text-base md:text-lg pb-3">
                                    <span><strong>{userProfile?.posts?.length}</strong> posts</span>
                                    <span><strong>{userProfile?.followers?.length}</strong> followers</span>
                                    <span><strong>{userProfile?.following?.length}</strong> following</span>
                                </div>
                                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{userProfile?.fullname}</h2>
                                <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 lg:w-[25vw]">
                                    {userProfile?.bio?.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </AnimationWrapper>

                    <div className='w-full mt-8 pt-3 flex items-center justify-center gap-24 border-t border-gray-300'>
                        <button className='text-lg sm:text-xl font-bold font-mono underline'>Posts</button>
                        <button className='text-lg sm:text-xl font-mono'>Saved</button>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-1 md:gap-4">
                        {[...Array(9)].map((_, i) => (
                            <Card key={i} className="aspect-square">
                                <CardContent className="p-0">
                                    <img
                                        src={`https://xsgames.co/randomusers/avatar.php?g=female`}
                                        alt={`Post ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage;
