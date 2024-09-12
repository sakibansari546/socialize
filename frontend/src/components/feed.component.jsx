import React from 'react'
import { Outlet } from 'react-router-dom'
import Post from './post.component'

const Feed = () => {
    return (
        <>
            <div className='ml-[20.5vw] w-[48.5vw] h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7'>
                <Post />
                <Post />
                <Post />
            </div>
        </>
    )
}

export default Feed
