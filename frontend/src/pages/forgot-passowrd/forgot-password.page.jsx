import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import InputBox from '../../components/input.conponent'
import { useForm } from 'react-hook-form'
import AnimationWrapper from '../../common/AnimationWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BtnLoader from '../../components/btn-loader.components';

const VerifyResetEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setIsloading] = useState(false)
    const [error, setError] = useState(null)

    const { handleSubmit, register } = useForm();

    const handleFormSubmit = async (data) => {
        try {
            setIsloading(true)
            const res = await axios.post("http://localhost:3000/api/user/forgot-password", data, { withCredentials: true })
            if (res.data.success) {
                navigate('/check-email')
            }
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.respose.data.message);
        } finally {
            setIsloading(false)
        }
    }

    return (
        <AnimationWrapper>
            <div className='bg-[#efefef] w-screen h-screen flex flex-col items-center justify-center px-3'>
                <h2 className='font-mono font-bold text-3xl text-center'>Verify your Email</h2>
                <p className='my-3 mb-6 text-lg font-mono text-center'>
                    Verify your email for forgoting password</p>
                <form onSubmit={handleSubmit(handleFormSubmit)} className='relative' >
                    <InputBox label='Email' icon='fi-br-at' {...register("email")} placeholder='email' type='email' />

                    <button disabled={loading} type='submit' className='w-14 h-10 bg-black text-white absolute top-0 right-0 z-20 felx items-center'>
                        {
                            loading ? <BtnLoader /> : <i className="fi fi-br-arrow-right text-white text-2xl pt-1"></i>
                        }

                    </button>
                </form>
                {error && <p className='text-red-500 font-semibold text-center w-full my-3 py-0'>{error}</p>}
            </div>
        </AnimationWrapper>
    )
}

export default VerifyResetEmail
