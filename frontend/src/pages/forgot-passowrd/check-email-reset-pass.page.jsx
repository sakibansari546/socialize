import React, { useState, useEffect } from 'react';
import AnimationWrapper from '../../common/AnimationWrapper';

const CheckEmailForPassword = () => {


    return (
        <AnimationWrapper>
            <div className='w-screen h-screen bg-[#efefef] flex items-center justify-center'>
                <div className='w-[30vw] h-[30vh] relative text-center flex flex-col items-center justify-center'>
                    <div className='relative z-20 bg-white p-6'>
                        <h1 className='font-mono font-bold text-3xl text-center'>Check your email</h1>
                        <p className="text-gray-600 mt-4 font-mono">
                            We’ve sent a password reset link to your email. Please check your inbox and click the link to reset your password.
                        </p>
                        <p className="mt-4 text-gray-500">
                            Didn’t receive the email? <span className="text-blue-600 cursor-pointer">Resend</span>
                        </p>
                    </div>
                    <div
                        className={`absolute top-3.5 left-3 z-10 p-6 bg-black w-full h-full transition-all duration-300`}
                    ></div>
                </div>
            </div>
        </AnimationWrapper>
    );
}

export default CheckEmailForPassword;
