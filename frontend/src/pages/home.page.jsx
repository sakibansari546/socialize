import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const { user } = useSelector((state) => state.user)

    return (
        <div>
            {
                user?.email || "user not found"
            }
        </div>
    )
}

export default Home
