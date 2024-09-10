import React from 'react'
import InputBox from '../../components/input.conponent'
import { useForm } from 'react-hook-form'
import AnimationWrapper from '../../common/AnimationWrapper';
import { useNavigate } from 'react-router-dom';

const VerifyResetEmail = () => {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();

    const handleFormSubmit = (data) => {
        console.log(data);
    }

    return (
        <AnimationWrapper>
            <div className='bg-[#efefef] w-screen h-screen flex flex-col items-center justify-center px-3'>
                <h2 className='font-mono font-bold text-3xl text-center'>Verify your Email</h2>
                <p className='my-3 mb-6 text-lg font-mono text-center'>
                    Verify your email for forgoting password</p>
                <form onSubmit={handleSubmit(handleFormSubmit)} className='relative' >
                    <InputBox label='Email' icon='fi-br-at' {...register("email")} placeholder='email' type='email' />

                    <button onClick={() => navigate('/check-email')} className='w-14 h-10 bg-black text-white absolute top-0 right-0 z-20 felx items-center'><i className="fi fi-br-arrow-right text-white text-2xl pt-1"></i></button>
                </form>
            </div>
        </AnimationWrapper>
    )
}

export default VerifyResetEmail
