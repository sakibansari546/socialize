import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import InputBox from '../../components/input.conponent';
import AnimationWrapper from '../../common/AnimationWrapper';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, reset, formState: { errors } } = useForm()

    const handleFromSubmit = (data) => {
        console.log(data);
    }



    return (
        <AnimationWrapper >
            <div className='w-full h-screen flex flex-col items-center justify-center bg-[#efefef] gap-5 px-4'>
                {/* Heading based on type */}
                <h1 className='font-mono font-bold text-3xl text-center'>
                    Reset your password
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFromSubmit)} className='flex flex-col items-center justify-center gap-5 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw]'>

                    {/* Email field */}
                    <InputBox label='Email' icon='fi-br-at' type='password' placeholder='New password' {...register("new-password")} />

                    {/* Password field */}
                    <InputBox label='Password' icon='fi-rr-key' type='password' placeholder='Confirm  password' {...register("confirm-password")} />



                    {/* Error */}
                    {<p className='text-red-500 font-semibold text-left w-full my-0 py-0'>Error</p>}

                    {/* Submit button */}
                    <button className='relative cursor-pointer z-10 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10 flex items-center justify-center bg-white font-mono font-semibold text-lg rounded-md border-2 border-black'>
                        Reset
                    </button>
                </form>

                {/* Have an account link */}
                <p className='font-mono text-center'>
                    Don’t have an account?
                    <Link to={'/signup'} className='text-blue-500 underline'>
                        Signup
                    </Link>
                </p>
            </div>
        </AnimationWrapper>
    )
}

export default ResetPassword

