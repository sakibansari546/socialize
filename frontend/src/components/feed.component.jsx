import React from 'react'
import { Outlet } from 'react-router-dom'
import Post from './post.component'

const Feed = ({ tabActive }) => {
    return (
        <>
            <div className={`lg:ml-[20.5vw] lg:w-[48.5vw] max-sm:px-5 ${tabActive == 'home' ? "flex" : "max-lg:hidden"} w-screen h-full bg-[#efefef] flex flex-col items-center justify-center py-6 gap-7 pb-20`}>
                <Post />
                <Post />
                <Post />
            </div>
        </>
    )
}

export default Feed
