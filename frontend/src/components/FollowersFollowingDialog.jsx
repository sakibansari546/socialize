import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import AnimationWrapper from '../common/AnimationWrapper'
import { Link } from 'react-router-dom'

const FollowersFollowingDialog = ({ isOpen, onOpenChange, title, userList, loading }) => {

    return (
        <AnimationWrapper>
            <Dialog open={isOpen} onOpenChange={onOpenChange} className='mx-4'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {title === "Followers" ? "People who follow you" : "People you follow"}
                        </DialogDescription>
                    </DialogHeader>
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                {userList?.length > 0 ? userList.map((user) => (
                                    <Link to={`/profile/${user._id}`} key={user._id} className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage className='object-cover' src={user?.profile_img} alt={user.username} />
                                            <AvatarFallback>FN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-md font-semibold">@{user.username}</h3>
                                            <p>{user.fullname}</p>
                                        </div>
                                        <Button variant="outline">View Profile</Button>
                                    </Link>
                                )) : <p>No {title.toLowerCase()} yet.</p>}
                            </div>
                        )
                    }

                </DialogContent>
            </Dialog>

        </AnimationWrapper >
    )
}

export default FollowersFollowingDialog;
