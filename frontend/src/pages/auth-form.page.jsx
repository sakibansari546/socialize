import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/input.conponent'
import AnimationWrapper from '../common/AnimationWrapper';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/userSlice';
import axios from 'axios';
import BtnLoader from '../components/btn-loader.components';

const AuthForm = ({ type }) => {
    const isSignup = type === 'signup';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);

    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleFromSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/user/${type}`, data, { withCredentials: true });
            console.log(res);
            dispatch(signup(res.data.user));
            if (isSignup) {
                if (res.data.success) navigate('/verify-email');
            }
            else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/');
        reset()
    }, [type]);

    return (
        <AnimationWrapper keyValue={type}>
            <div className='w-full h-screen flex flex-col items-center justify-center bg-[#efefef] gap-5 px-4'>
                {/* Heading based on type */}
                <h1 className='font-mono font-bold text-3xl text-center'>
                    {isSignup ? 'Create an account' : 'Sign In to your account'}
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFromSubmit)} className='flex flex-col items-center justify-center gap-5 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw]'>

                    {/* Username field */}
                    {
                        isSignup && <InputBox label='Username' icon='fi-bs-user' type='text' placeholder='Username' {...register("username")} />
                    }

                    {/* Email field */}
                    <InputBox label='Email' icon='fi-br-at' type='email' placeholder='Email' {...register("email")} />

                    {/* Password field */}
                    <InputBox label='Password' icon='fi-rr-key' type='password' placeholder='Password' {...register("password")} />


                    {/* Checkbox for terms */}
                    <div className='flex items-center justify-between gap-2 w-full'>
                        <div className='flex items-center gap-2 '>
                            <input type='checkbox' id='terms' className='w-5 h-5' required />
                            <label htmlFor='terms' className='font-mono'>Remember</label>
                        </div>
                        <Link to='/verify-reset-email'>
                            <p className='text-md font-mono hover:underline'>Forgot password</p>
                        </Link>
                    </div>
                    {/* Error */}
                    {error && <p className='text-red-500 font-semibold text-left w-full my-0 py-0'>{error}</p>}

                    {/* Submit button */}
                    <button
                        className='relative cursor-pointer z-10 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10 flex items-center justify-center bg-white font-mono font-semibold text-lg rounded-md border-2 border-black disabled:cursor-not-allowed disabled:bg-[#efefef]'
                        disabled={loading}
                    >
                        {
                            loading ? <BtnLoader /> : isSignup ? 'Sign Up' : 'Sign In'
                        }
                    </button>
                </form>

                {/* Have an account link */}
                <p className='font-mono text-center'>
                    {isSignup
                        ? 'Already have an account? '
                        : 'Don’t have an account? '}
                    <Link to={isSignup ? '/signin' : '/signup'} className='text-blue-500 underline'>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </Link>
                </p>
            </div>
        </AnimationWrapper>
    )
}

export default AuthForm
