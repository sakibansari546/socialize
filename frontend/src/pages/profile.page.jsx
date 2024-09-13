import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { Link, useParams } from 'react-router-dom';
import { getUserProfile } from '../store/userSlice';

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
import InputBox from '../components/input.conponent';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const inputRef = useRef();

    const { user, userProfile } = useSelector(state => state.user);
    const { handleSubmit, register, reset } = useForm()

    const [isFocus, setIsFocus] = useState(false);
    const [imageFile, setImageFile] = useState(null);

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
        console.log(data);
        try {
            const formData = new FormData();

            // Append the selected image file and form fields
            if (imageFile) {
                formData.append('profile_img', imageFile);
            }
            formData.append('username', data.username);
            formData.append('fullname', data.fullname);
            formData.append('bio', data.bio);

            // Inspect FormData for debugging
            console.log(formData);


        } catch (error) {

        }
    }

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
        <>
            <div className='ml-[20.5vw] w-[78.vw] h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7'>
                <div className="w-full flex flex-col items-center py-10">
                    <div className="flex flex-col md:flex-row items-center md:items-center gap-12 mb-3">
                        <Avatar className="w-32 h-32 md:w-40 md:h-40">
                            <AvatarImage src={userProfile.profile_img} alt="Profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row justify-start gap-10 items-center mb-4">
                                <h1 className="text-2xl font-bold mb-2 md:mb-0">@{userProfile.username}</h1>
                                <div className="space-x-2">
                                    {
                                        userProfile._id === user._id && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Edit Profile</Button>
                                                </DialogTrigger>

                                                <DialogContent className="w-[70vw] flex items-center flex-col">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit profile</DialogTitle>
                                                        <DialogDescription>
                                                            Make changes to your profile here. Click save when you're done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form onSubmit={handleSubmit(handleFormSubmit)} >
                                                        <div className="grid gap-4 py-4 ">
                                                            <div className=''>
                                                                <input ref={inputRef} onChange={handleFileInput} type="file" hidden />
                                                                <div className='relative w- flex items-center justify-center'>
                                                                    <img className='w-20 h-20 rounded-full object-cover' src={imageFile ? URL.createObjectURL(imageFile) : userProfile.profile_img} alt="" />
                                                                    <button type='button' onClick={handleImageChange} className='w-6 h-6 bg-black rounded-full absolute bottom-1 right-[10vw]'><i className="fi fi-rc-pencil text-white text-lg"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <InputBox {...register("username")} defaultValue={userProfile.username} placeholder='username...' />
                                                            </div>
                                                            <div className="">
                                                                <InputBox {...register("fullname")} defaultValue={userProfile.fullname} placeholder='Fullname...' />
                                                            </div>
                                                            <div className="">
                                                                <div className='relative w-[75vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-17'>
                                                                    <div className='relative w-full h-full'>
                                                                        <textarea
                                                                            {...register("bio")}
                                                                            defaultValue={userProfile.bio}
                                                                            className='w-full h-full px-4 pl-12 outline-none font-mono font-semibold text-lg relative z-20'
                                                                            placeholder='Bio...'
                                                                            onFocus={() => setIsFocus(true)}
                                                                            onBlurCapture={() => setIsFocus(false)}
                                                                        ></textarea>
                                                                    </div>

                                                                    <div
                                                                        className={`absolute  ${isFocus ? '-top-0 left-0' : 'top-2 left-2'}   z-10 bg-black w-full h-full transition-all duration-300`}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <button
                                                                type='submit'
                                                                className='relative cursor-pointer z-10 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10 flex items-center justify-center bg-white font-mono font-semibold text-lg rounded-md border-2 border-black disabled:cursor-not-allowed disabled:bg-[#efefef]'
                                                            >Save Changes</button>
                                                        </DialogFooter>
                                                    </form>

                                                </DialogContent>
                                            </Dialog>
                                        )
                                    }
                                    <Button>Follow</Button>
                                    <Button variant="outline">Message</Button>
                                </div>
                            </div>
                            <div className="flex justify-center md:justify-start space-x-4 text-lg pb-3">
                                <span><strong>{userProfile.posts.length}</strong> posts</span>
                                <span><strong>{userProfile.followers.length}</strong> followers</span>
                                <span><strong>{userProfile.following.length}</strong> following</span>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{userProfile.fullname}</h2>
                            <p className="text-muted-foreground mb-4 w-[25vw]">
                                {userProfile.bio}
                            </p>
                        </div>
                    </div>

                    <div className='w-full mt-8 pt-3 flex items-center justify-center gap-24 border-t border-gray-300'>
                        <button className='text-xl font-bold font-mono underline'>Posts</button>
                        <button className='text-xl font- font-mono'>Saved</button>
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
