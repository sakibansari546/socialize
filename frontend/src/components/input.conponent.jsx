import React, { useState, forwardRef } from 'react'
import AnimationWrapper from '../common/AnimationWrapper';

const InputBox = forwardRef(({ label, icon, ...props }, ref) => {
    const [isFocus, setIsfocus] = useState(false);

    return (
        <AnimationWrapper>
            <div className='relative w-[75vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] h-10'>

                <div className='relative w-full h-full'>
                    <input
                        className='w-full h-full px-4 pl-12 outline-none font-mono font-semibold text-lg relative z-20'
                        onFocus={() => setIsfocus(true)}
                        onBlurCapture={() => setIsfocus(false)}
                        {...props}
                        ref={ref}
                    />

                    <div className='absolute top-1.5 left-0 z-30 px-3'>
                        <i className={`fi ${icon} text-balck text-2xl`}></i>
                    </div>
                </div>

                <div
                    className={`absolute ${isFocus ? 'top-0 left-0' : 'top-2 left-2 '} z-10 bg-black w-full h-full transition-all duration-300`}
                ></div>
            </div>
        </AnimationWrapper>
    )
});

export default InputBox;
