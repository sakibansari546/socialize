import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import axios from 'axios';

import InputBox from '../../components/input.conponent';
import AnimationWrapper from '../../common/AnimationWrapper';
import { passwordReset } from '../../store/userSlice';
import BtnLoader from '../../components/btn-loader.components';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams();

    const { handleSubmit, register, reset, formState: { errors } } = useForm()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (data) => {
        if (data.password !== data.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/user/reset-password/${token}`, { password: data.password }, { withCredentials: true });

            if (res.data.success) {
                dispatch(passwordReset(res.data.user));
                reset();
                navigate('/signin');
            }
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong";
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };



    return (
        <AnimationWrapper >
            <div className='w-full h-screen flex flex-col items-center justify-center bg-[#efefef] gap-5 px-4'>
                {/* Heading based on type */}
                <h1 className='font-mono font-bold text-3xl text-center'>
                    Reset your password
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col items-center justify-center gap-5 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw]'>

                    {/* Email field */}
                    <InputBox label='Email' icon='fi-rr-key' type='password' placeholder='New password' {...register("password")} />

                    {/* Password field */}
                    <InputBox label='Password' icon='fi-rr-key' type='password' placeholder='Confirm  password'{...register("confirm_password")} />



                    {/* Error */}
                    {error && <p className='text-red-500 font-semibold text-left w-full my-0 py-0'>{error}</p>}

                    {/* Submit button */}
                    <button
                        type='submit'
                        className='relative cursor-pointer z-10 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10 flex items-center justify-center bg-white font-mono font-semibold text-lg rounded-md border-2 border-black disabled:cursor-not-allowed disabled:bg-[#efefef]'
                        disabled={loading}
                    >
                        {
                            loading ? <BtnLoader /> : 'Reset'
                        }
                    </button>
                </form>

            </div>
        </AnimationWrapper>
    )
}

export default ResetPassword

