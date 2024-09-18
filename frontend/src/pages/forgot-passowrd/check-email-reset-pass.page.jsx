import React, { useState, useEffect } from 'react';
import AnimationWrapper from '../../common/AnimationWrapper';

const CheckEmailForPassword = () => {


    return (
        <AnimationWrapper>
            <div className='w-screen h-screen bg-[#efefef] flex items-center justify-center'>
                <div className='w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-auto max-w-[600px] relative text-center flex flex-col items-center justify-center'>
                    <div className='relative z-20 bg-white p-6'>
                        <h1 className='font-mono font-bold text-2xl sm:text-3xl text-center'>Check your email</h1>
                        <p className="text-gray-600 mt-4 font-mono text-sm sm:text-base">
                            We’ve sent a password reset link to your email. Please check your inbox and click the link to reset your password.
                        </p>
                        <p className="mt-4 text-gray-500 text-sm sm:text-base">
                            Didn’t receive the email? <span className="text-blue-600 cursor-pointer">Resend</span>
                        </p>
                    </div>
                    <div
                        className={`absolute top-2 left-2 z-10 p-6 bg-black w-full h-full transition-all duration-300`}
                    ></div>
                </div>
            </div>
        </AnimationWrapper>

    );
}

export default CheckEmailForPassword;
